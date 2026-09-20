import { Component } from '@theme/component';
import {
  fetchConfig,
  onAnimationEnd,
  prefersReducedMotion,
  resetShimmer,
  startViewTransition,
} from '@theme/utilities';
import { morphSection, sectionRenderer } from '@theme/section-renderer';
import { ThemeEvents, QuantitySelectorUpdateEvent } from '@theme/events';
import { cartPerformance } from '@theme/performance';
import {
  createViewEventElement,
  CartErrorEvent,
  CartDiscountUpdateEvent,
  CartLinesUpdateEvent,
  CartNoteUpdateEvent,
  StandardEvents,
} from '@shopify/events';

/** @typedef {import('./utilities').TextComponent} TextComponent */

/**
 * A shopper's absolute intended quantity for one Shopify cart line.
 * Line content, prices, properties and totals remain server-owned.
 *
 * @typedef {object} CartMutationIntent
 * @property {string} lineKey
 * @property {number} quantity
 * @property {'change' | 'clear'} action
 */

/**
 * A custom element that displays a cart items component.
 *
 * @typedef {object} Refs
 * @property {HTMLElement[]} quantitySelectors - The quantity selector elements.
 * @property {HTMLTableRowElement[]} cartItemRows - The cart item rows.
 * @property {TextComponent} cartTotal - The cart total.
 *
 * @extends {Component<Refs>}
 */
export class CartItemsComponent extends createViewEventElement(Component) {
  /** @type {Map<string, ReturnType<typeof setTimeout>>} */
  #lineIntentTimers = new Map();
  /** @type {Map<string, CartMutationIntent>} */
  #debouncedLineIntents = new Map();
  /** @type {Map<string, CartMutationIntent>} */
  #queuedIntents = new Map();
  /** @type {string[]} */
  #mutationQueue = [];
  /** @type {CartMutationIntent | null} */
  #activeIntent = null;
  /** @type {CartMutationIntent | null} */
  #lastFailedIntent = null;
  #lastFailedMessage = '';
  #isProcessingMutations = false;
  #cartUpdateVersion = 0;
  #activeExternalUpdates = 0;
  #needsReconciliation = false;
  /** @type {Set<() => void>} */
  #externalSettleResolvers = new Set();
  /** @type {Promise<{sectionHTML: string, cart: any}> | null} */
  #reconciliationPromise = null;
  /** @type {Promise<void> | null} */
  #reconciliationBroadcastPromise = null;
  /** @type {Promise<any> | null} */
  #pendingCartFetch = null;

  /**
   * True when the event was dispatched from outside this cart-items-component (e.g.
   * `Shopify.actions.updateCart(...)` from an external app, or the SFAPI default
   * handler). Internal dispatchers (cart-discount-component, cart-note) live inside
   * `this` and either morph the section themselves or don't need a refresh — running
   * a fallback render in that case double-renders and can clobber form state.
   * @param {Event} event
   */
  #isExternalCartUpdate(event) {
    return !(event.target instanceof Node) || !this.contains(event.target);
  }

  /** @param {CartDiscountUpdateEvent} event */
  #handleDiscountUpdate = (event) => {
    const external = this.#isExternalCartUpdate(event);
    if (!event.promise) return;

    const updateVersion = ++this.#cartUpdateVersion;
    if (this.#activeExternalUpdates > 0 || this.#hasLocalMutationWork) this.#needsReconciliation = true;
    this.#activeExternalUpdates += 1;

    event.promise
      ?.then(({ detail }) => {
        if (this.#needsReconciliation || updateVersion !== this.#cartUpdateVersion) {
          this.#needsReconciliation = true;
          return;
        }

        const sectionsHtml = detail?.sections?.[this.sectionId];
        if (sectionsHtml) {
          morphSection(this.sectionId, sectionsHtml, { mode: this.isDrawer ? 'hydration' : 'full' });
          this.#reapplyPendingStates();
          this.#reapplyMutationError();
          this.#updateCartQuantitySelectorButtonStates();
        } else if (external) {
          // External caller (Shopify.actions.updateCart or SFAPI default handler) didn't
          // attach sections; refetch so the discount UI reflects the post-mutation cart.
          // Internal cart-discount-component morphs the section itself — no fallback needed.
          sectionRenderer.renderSection(this.sectionId, {
            cache: false,
            mode: this.isDrawer ? 'hydration' : 'full',
          });
        }
      })
      .catch((error) => {
        this.#needsReconciliation = true;
        if (error?.name !== 'AbortError') console.warn('[cart-items] Event promise rejected:', error);
      })
      .finally(() => {
        this.#finishExternalUpdate();
      });
  };

  /** @param {CartNoteUpdateEvent} event */
  #handleNoteUpdate = (event) => {
    if (!event.promise) return;

    const external = this.#isExternalCartUpdate(event);
    const updateVersion = ++this.#cartUpdateVersion;
    if (this.#activeExternalUpdates > 0 || this.#hasLocalMutationWork) this.#needsReconciliation = true;
    this.#activeExternalUpdates += 1;

    event.promise
      ?.then(({ detail }) => {
        // Internal notes retain the typed value and need no render unless
        // another cart mutation overlapped them.
        if (!external && !this.#needsReconciliation) return;
        if (this.#needsReconciliation || updateVersion !== this.#cartUpdateVersion) {
          this.#needsReconciliation = true;
          return;
        }

        const sections = /** @type {Record<string, string> | undefined} */ (detail?.sections);
        const sectionsHtml = sections?.[this.sectionId];
        if (sectionsHtml) {
          morphSection(this.sectionId, sectionsHtml, { mode: this.isDrawer ? 'hydration' : 'full' });
          this.#reapplyPendingStates();
          this.#reapplyMutationError();
        } else {
          sectionRenderer.renderSection(this.sectionId, {
            cache: false,
            mode: this.isDrawer ? 'hydration' : 'full',
          });
        }
      })
      .catch((error) => {
        this.#needsReconciliation = true;
        if (error?.name !== 'AbortError') console.warn('[cart-items] Event promise rejected:', error);
      })
      .finally(() => {
        this.#finishExternalUpdate();
      });
  };

  connectedCallback() {
    super.connectedCallback();

    document.addEventListener(StandardEvents.cartLinesUpdate, this.#handleCartUpdate);
    document.addEventListener(ThemeEvents.quantitySelectorUpdate, this.#onQuantityChange);
    document.addEventListener(StandardEvents.cartDiscountUpdate, this.#handleDiscountUpdate);
    document.addEventListener(StandardEvents.cartNoteUpdate, this.#handleNoteUpdate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener(StandardEvents.cartLinesUpdate, this.#handleCartUpdate);
    document.removeEventListener(ThemeEvents.quantitySelectorUpdate, this.#onQuantityChange);
    document.removeEventListener(StandardEvents.cartDiscountUpdate, this.#handleDiscountUpdate);
    document.removeEventListener(StandardEvents.cartNoteUpdate, this.#handleNoteUpdate);

    for (const timer of this.#lineIntentTimers.values()) clearTimeout(timer);
    this.#lineIntentTimers.clear();
    this.#debouncedLineIntents.clear();
  }

  /**
   * Handles QuantitySelectorUpdateEvent change event.
   * @param {QuantitySelectorUpdateEvent} event - The event.
   */
  #onQuantityChange = (event) => {
    if (!(event instanceof QuantitySelectorUpdateEvent)) return;
    if (!(event.target instanceof Node) || !this.contains(event.target)) return;

    const { quantity, cartLine: line } = event.detail;

    // Cart items require a line number
    if (!line || !Number.isInteger(quantity) || quantity < 0) return;

    const lineItemRow = this.refs.cartItemRows[line - 1];
    const lineKey = lineItemRow?.dataset.key;
    if (!lineItemRow || !lineKey) return;

    const intent = {
      lineKey,
      quantity,
      action: /** @type {'change' | 'clear'} */ (quantity === 0 ? 'clear' : 'change'),
    };

    const existingTimer = this.#lineIntentTimers.get(lineKey);
    if (existingTimer) clearTimeout(existingTimer);
    this.#debouncedLineIntents.set(lineKey, intent);

    const timer = setTimeout(() => {
      this.#lineIntentTimers.delete(lineKey);
      const latestIntent = this.#debouncedLineIntents.get(lineKey);
      this.#debouncedLineIntents.delete(lineKey);
      if (latestIntent) this.#enqueueMutation(latestIntent);
    }, 300);
    this.#lineIntentTimers.set(lineKey, timer);

    const textComponent = /** @type {TextComponent | undefined} */ (lineItemRow.querySelector('text-component'));
    textComponent?.shimmer();
  };

  /**
   * Handles the line item removal.
   * @param {number} line - The line item index.
   */
  onLineItemRemove(line) {
    const row = this.refs.cartItemRows[line - 1];
    const lineKey = row?.dataset.key;
    if (!lineKey) return;

    const timer = this.#lineIntentTimers.get(lineKey);
    if (timer) clearTimeout(timer);
    this.#lineIntentTimers.delete(lineKey);
    this.#debouncedLineIntents.delete(lineKey);

    // Keep the authoritative row visible until Shopify confirms removal.
    this.#enqueueMutation({ lineKey, quantity: 0, action: 'clear' });
  }

  /**
   * Updates the quantity.
   * @param {Object} config - The config.
   * @param {number} config.line - The current line index.
   * @param {number} config.quantity - The absolute desired quantity.
   * @param {'change' | 'clear'} config.action - The action.
   */
  updateQuantity(config) {
    const row = this.refs.cartItemRows[config.line - 1];
    const lineKey = row?.dataset.key;
    if (!lineKey || !Number.isInteger(config.quantity) || config.quantity < 0) return;

    this.#enqueueMutation({ lineKey, quantity: config.quantity, action: config.action });
  }

  /**
   * Retries only the last recoverable absolute line mutation.
   * @param {Event} event
   */
  retryLastMutation(event) {
    event.preventDefault();
    if (!this.#lastFailedIntent || this.#isProcessingMutations) return;

    const intent = this.#lastFailedIntent;
    this.#lastFailedIntent = null;
    this.#lastFailedMessage = '';
    this.#enqueueMutation(intent);
  }

  /** @param {CartMutationIntent} intent */
  #enqueueMutation(intent) {
    this.#clearMutationErrors();
    this.#lastFailedIntent = null;
    this.#lastFailedMessage = '';

    if (!this.#queuedIntents.has(intent.lineKey)) this.#mutationQueue.push(intent.lineKey);
    this.#queuedIntents.set(intent.lineKey, intent);
    this.#setLinePending(intent.lineKey, true);
    this.#syncComponentBusyState();
    void this.#drainMutationQueue();
  }

  async #drainMutationQueue() {
    if (this.#isProcessingMutations) return;
    this.#isProcessingMutations = true;

    try {
      while (this.#mutationQueue.length > 0) {
        const lineKey = this.#mutationQueue.shift();
        if (!lineKey) continue;
        const intent = this.#queuedIntents.get(lineKey);
        this.#queuedIntents.delete(lineKey);
        if (!intent) continue;

        this.#activeIntent = intent;
        await this.#performMutation(intent);
        this.#activeIntent = null;

        if (!this.#queuedIntents.has(lineKey)) this.#setLinePending(lineKey, false);
      }
    } finally {
      this.#activeIntent = null;
      this.#isProcessingMutations = false;
      this.#syncComponentBusyState();

      if (this.#needsReconciliation && this.#activeExternalUpdates === 0) {
        void this.#reconcileAndBroadcast();
      }
    }
  }

  /** @param {CartMutationIntent} intent */
  async #performMutation(intent) {
    const cartPerformaceUpdateMarker = cartPerformance.createStartingMarker(`${intent.action}:user-action`);
    const { lineKey, quantity } = intent;
    const { cartTotal } = this.refs;

    const cartItemsComponents = document.querySelectorAll('cart-items-component');
    const sectionsToUpdate = new Set([this.sectionId]);
    cartItemsComponents.forEach((item) => {
      if (item instanceof HTMLElement && item.dataset.sectionId) {
        sectionsToUpdate.add(item.dataset.sectionId);
      }
    });

    const body = JSON.stringify({
      id: lineKey,
      quantity,
      sections: Array.from(sectionsToUpdate).join(','),
      sections_url: window.location.pathname,
    });

    cartTotal?.shimmer();

    const deferredUpdatePromise = CartLinesUpdateEvent.createPromise();
    this.dispatchEvent(
      new CartLinesUpdateEvent({
        action: intent.action === 'change' && quantity > 0 ? 'update' : 'remove',
        context: 'cart',
        lines: [{ id: lineKey, quantity }],
        promise: deferredUpdatePromise.promise,
      })
    );
    const requestVersion = this.#cartUpdateVersion;
    if (this.#activeExternalUpdates > 0) this.#needsReconciliation = true;

    try {
      const response = await fetch(`${Theme.routes.cart_change_url}`, fetchConfig('json', { body }));
      const responseText = await response.text();
      const parsedResponseText = this.#parseCartResponse(responseText);
      const responseError = this.#getCartResponseError(parsedResponseText);

      if (!response.ok || responseError) {
        throw new CartMutationError(responseError || this.#fallbackErrorMessage, response.status);
      }

      const sectionHTML = parsedResponseText?.sections?.[this.sectionId];
      this.#validateSectionHTML(sectionHTML);
      if (!Array.isArray(parsedResponseText.items)) {
        throw new CartMutationError(this.#fallbackErrorMessage, response.status);
      }

      resetShimmer(this);

      if (this.#needsReconciliation || requestVersion !== this.#cartUpdateVersion) {
        this.#needsReconciliation = true;
        await this.#waitForExternalUpdates();
        const reconciled = await this.#reconcileAuthoritativeState();
        this.#resolveCartUpdate(deferredUpdatePromise, reconciled.cart, reconciled.sectionHTML);
      } else {
        this.#updateQuantitySelectors(parsedResponseText);
        this.#resolveCartUpdate(deferredUpdatePromise, parsedResponseText, sectionHTML);
        await morphSection(this.sectionId, sectionHTML, {
          mode: this.isDrawer ? 'hydration' : 'full',
        });
        this.#reapplyPendingStates();
      }

      this.#reapplyMutationError();
      this.#updateCartQuantitySelectorButtonStates();
    } catch (error) {
      resetShimmer(this);
      const message = error instanceof CartMutationError ? error.message : this.#fallbackErrorMessage;
      const code = error instanceof CartMutationError && error.status === 422 ? 'INVALID' : 'SERVICE_UNAVAILABLE';

      this.#lastFailedIntent = intent;
      this.#lastFailedMessage = message;
      this.#showMutationError(lineKey, message);
      deferredUpdatePromise.reject(error instanceof Error ? error : new Error(message));
      this.dispatchEvent(new CartErrorEvent({ error: message, code }));
    } finally {
      cartPerformance.measureFromMarker(cartPerformaceUpdateMarker);
    }
  }

  /**
   * Handles the cart error.
   * @param {string} lineKey
   * @param {string} message
   */
  #showMutationError(lineKey, message) {
    const row = this.#findRow(lineKey);
    const quantitySelector = row?.querySelector('cart-quantity-selector-component');
    const quantityInput = quantitySelector?.querySelector('input');
    if (quantityInput instanceof HTMLInputElement) quantityInput.value = quantityInput.defaultValue;

    const cartItemError = row?.querySelector('[data-cart-item-error-text]');
    const cartItemErrorContainer = row?.querySelector('[data-cart-item-error-container]');
    const retryButton = row?.querySelector('[data-cart-mutation-retry]');
    if (!(cartItemError instanceof HTMLElement) || !(cartItemErrorContainer instanceof HTMLElement)) {
      const componentError = this.querySelector('[data-cart-component-error]');
      const componentMessage = componentError?.querySelector('[data-cart-item-error-text]');
      const componentRetry = componentError?.querySelector('[data-cart-mutation-retry]');
      if (!(componentError instanceof HTMLElement) || !(componentMessage instanceof HTMLElement)) return;

      componentMessage.textContent = message;
      componentError.classList.remove('hidden');
      if (componentRetry instanceof HTMLButtonElement) componentRetry.hidden = false;
      return;
    }

    cartItemError.textContent = message;
    cartItemErrorContainer.classList.remove('hidden');
    if (retryButton instanceof HTMLButtonElement) retryButton.hidden = false;
  }

  /**
   * Handles the cart update.
   *
   * @param {CartLinesUpdateEvent} event
   */
  #handleCartUpdate = (event) => {
    const updateVersion = ++this.#cartUpdateVersion;
    if (event.target === this) return;
    if (!event.promise) return;

    if (this.#activeExternalUpdates > 0 || this.#hasLocalMutationWork) this.#needsReconciliation = true;
    this.#activeExternalUpdates += 1;

    event.promise
      ?.then(async ({ detail }) => {
        if (this.#needsReconciliation || updateVersion !== this.#cartUpdateVersion) {
          this.#needsReconciliation = true;
          return;
        }

        const sections = detail?.sections;
        const cartItemsHtml = sections?.[this.sectionId];
        // Animate empty → non-empty in the drawer (possible in squeeze mode
        // where the page is interactive alongside the open drawer). This also
        // needs the response stylesheet because it adds the cart summary markup.
        const wasEmptyCartDrawer = this.isDrawer && this.querySelector('[data-cart-drawer-empty]') !== null;
        /** @type {'hydration' | 'full'} */
        const mode = this.isDrawer ? 'hydration' : 'full';
        const morphOptions = {
          mode,
          injectStylesheet: wasEmptyCartDrawer,
        };

        if (cartItemsHtml) {
          const existingKeys = new Set(this.refs.cartItemRows?.map((row) => row.dataset.key) ?? []);

          if (wasEmptyCartDrawer) {
            startViewTransition(() => {
              morphSection(this.sectionId, cartItemsHtml, morphOptions);
            }, ['fill-cart-drawer']);
          } else {
            await morphSection(this.sectionId, cartItemsHtml, morphOptions);
          }
          this.#reapplyPendingStates();
          this.#reapplyMutationError();

          // Animate newly added rows (reverse of the remove animation).
          if (!wasEmptyCartDrawer && !prefersReducedMotion()) {
            for (const row of this.refs.cartItemRows ?? []) {
              if (!existingKeys.has(row.dataset.key)) {
                row.classList.add('adding');
                onAnimationEnd(row, () => row.classList.remove('adding'));
              }
            }
          }

          // Update button states for all cart quantity selectors after morph
          this.#updateCartQuantitySelectorButtonStates();
        } else {
          await sectionRenderer.renderSection(this.sectionId, { cache: false, ...morphOptions });
        }
      })
      .catch((error) => {
        this.#needsReconciliation = true;
        if (error?.name !== 'AbortError') console.warn('[cart-items] Event promise rejected:', error);
      })
      .finally(() => {
        this.#finishExternalUpdate();
      });
  };

  get #hasLocalMutationWork() {
    return this.#activeIntent !== null || this.#isProcessingMutations || this.#mutationQueue.length > 0;
  }

  #waitForExternalUpdates() {
    if (this.#activeExternalUpdates === 0) return Promise.resolve();
    return new Promise((resolve) => this.#externalSettleResolvers.add(resolve));
  }

  #finishExternalUpdate() {
    this.#activeExternalUpdates = Math.max(0, this.#activeExternalUpdates - 1);
    if (this.#activeExternalUpdates !== 0) return;

    for (const resolve of this.#externalSettleResolvers) resolve();
    this.#externalSettleResolvers.clear();

    if (this.#needsReconciliation && !this.#hasLocalMutationWork) {
      void this.#reconcileAndBroadcast();
    }
  }

  async #reconcileAuthoritativeState() {
    if (this.#reconciliationPromise) return this.#reconciliationPromise;

    this.#reconciliationPromise = (async () => {
      this.#needsReconciliation = false;
      const [sectionHTML, cart] = await Promise.all([
        sectionRenderer.renderSection(this.sectionId, {
          cache: false,
          mode: this.isDrawer ? 'hydration' : 'full',
        }),
        this.fetchCartData(),
      ]);
      this.#updateQuantitySelectors(cart);
      this.#reapplyPendingStates();
      this.#reapplyMutationError();
      this.#updateCartQuantitySelectorButtonStates();
      return { sectionHTML, cart };
    })().finally(() => {
      this.#reconciliationPromise = null;
    });

    return this.#reconciliationPromise;
  }

  #reconcileAndBroadcast() {
    if (this.#reconciliationBroadcastPromise) return this.#reconciliationBroadcastPromise;

    this.#reconciliationBroadcastPromise = (async () => {
      try {
        await this.#waitForExternalUpdates();
        const { sectionHTML, cart } = await this.#reconcileAuthoritativeState();
        const deferred = CartLinesUpdateEvent.createPromise();
        this.dispatchEvent(
          new CartLinesUpdateEvent({
            action: 'update',
            context: 'cart',
            lines: [],
            promise: deferred.promise,
          })
        );
        this.#resolveCartUpdate(deferred, cart, sectionHTML, 'cart-items-reconciliation');
      } catch (error) {
        this.#needsReconciliation = true;
        if (error?.name !== 'AbortError') console.warn('[cart-items] Reconciliation failed:', error);
      }
    })().finally(() => {
      this.#reconciliationBroadcastPromise = null;
    });

    return this.#reconciliationBroadcastPromise;
  }

  /**
   * @param {{resolve: (value: any) => void}} deferred
   * @param {any} cart
   * @param {string} sectionHTML
   * @param {string} [source]
   */
  #resolveCartUpdate(deferred, cart, sectionHTML, source = 'cart-items-component') {
    const parsedHTML = new DOMParser().parseFromString(sectionHTML, 'text/html');
    const hiddenCount = parsedHTML.querySelector('[ref="cartItemCount"]')?.textContent;
    const itemCount = hiddenCount ? parseInt(hiddenCount, 10) : Number(cart?.item_count ?? cart?.totalQuantity ?? 0);

    deferred.resolve({
      cart: CartLinesUpdateEvent.createCartFromAjaxResponse(cart),
      detail: {
        sections: { [this.sectionId]: sectionHTML },
        items: cart?.items,
        itemCount,
        source,
        didError: false,
      },
    });
  }

  /** @param {string} responseText */
  #parseCartResponse(responseText) {
    try {
      return JSON.parse(responseText);
    } catch (_) {
      throw new CartMutationError(this.#fallbackErrorMessage, 0);
    }
  }

  /** @param {any} response */
  #getCartResponseError(response) {
    const error = response?.errors ?? response?.description ?? response?.message;
    if (typeof error === 'string' && error.trim()) return error.trim();
    if (Array.isArray(error)) return error.find((value) => typeof value === 'string' && value.trim()) ?? '';
    if (error && typeof error === 'object') {
      for (const value of Object.values(error)) {
        if (typeof value === 'string' && value.trim()) return value.trim();
        if (Array.isArray(value)) {
          const nested = value.find((item) => typeof item === 'string' && item.trim());
          if (nested) return nested;
        }
      }
    }
    return '';
  }

  /** @param {unknown} sectionHTML */
  #validateSectionHTML(sectionHTML) {
    if (typeof sectionHTML !== 'string' || !sectionHTML.trim()) {
      throw new CartMutationError(this.#fallbackErrorMessage, 0);
    }

    const parsedHTML = new DOMParser().parseFromString(sectionHTML, 'text/html');
    if (!parsedHTML.getElementById(`shopify-section-${this.sectionId}`)) {
      throw new CartMutationError(this.#fallbackErrorMessage, 0);
    }
  }

  get #fallbackErrorMessage() {
    return (
      Theme.translations?.cart_update_error ||
      this.querySelector('[data-cart-update-error-message]')?.getAttribute('data-cart-update-error-message') ||
      ''
    );
  }

  /** @param {string} lineKey */
  #findRow(lineKey) {
    return this.refs.cartItemRows?.find((row) => row.dataset.key === lineKey);
  }

  #clearMutationErrors() {
    for (const container of this.querySelectorAll('[data-cart-item-error-container]')) {
      container.classList.add('hidden');
      const message = container.querySelector('[data-cart-item-error-text]');
      const retry = container.querySelector('[data-cart-mutation-retry]');
      if (message) message.textContent = '';
      if (retry instanceof HTMLButtonElement) retry.hidden = true;
    }

    const componentError = this.querySelector('[data-cart-component-error]');
    if (componentError instanceof HTMLElement) {
      componentError.classList.add('hidden');
      const message = componentError.querySelector('[data-cart-item-error-text]');
      const retry = componentError.querySelector('[data-cart-mutation-retry]');
      if (message) message.textContent = '';
      if (retry instanceof HTMLButtonElement) retry.hidden = true;
    }
  }

  #reapplyMutationError() {
    if (this.#lastFailedIntent && this.#lastFailedMessage) {
      this.#showMutationError(this.#lastFailedIntent.lineKey, this.#lastFailedMessage);
    } else {
      this.#clearMutationErrors();
    }
  }

  #reapplyPendingStates() {
    if (this.#activeIntent) this.#setLinePending(this.#activeIntent.lineKey, true);
    for (const lineKey of this.#queuedIntents.keys()) this.#setLinePending(lineKey, true);
  }

  /**
   * @param {string} lineKey
   * @param {boolean} pending
   */
  #setLinePending(lineKey, pending) {
    const row = this.#findRow(lineKey);
    if (!row) return;

    row.classList.toggle('cart-items__table-row--pending', pending);
    row.toggleAttribute('aria-busy', pending);
    const selector = row.querySelector('cart-quantity-selector-component');
    selector?.toggleAttribute('aria-busy', pending);

    for (const control of row.querySelectorAll('button, input')) {
      if (!(control instanceof HTMLButtonElement || control instanceof HTMLInputElement)) continue;
      if (pending) {
        if (!control.disabled) control.setAttribute('data-cart-mutation-disabled', '');
        control.disabled = true;
      } else if (control.hasAttribute('data-cart-mutation-disabled')) {
        control.disabled = false;
        control.removeAttribute('data-cart-mutation-disabled');
      }
    }

    if (!pending) this.#updateCartQuantitySelectorButtonStates();
  }

  #syncComponentBusyState() {
    const busy = this.#isProcessingMutations || this.#mutationQueue.length > 0;
    this.toggleAttribute('aria-busy', busy);
  }

  /**
   * Updates quantity selectors for all matching variants in the cart.
   * @param {Object} updatedCart - The updated cart object.
   * @param {Array<{variant_id: number, quantity: number}>} [updatedCart.items] - The cart items.
   */
  #updateQuantitySelectors(updatedCart) {
    if (!updatedCart.items) return;

    /** @type {Map<string, number>} */
    const quantitiesByVariant = new Map();
    for (const item of updatedCart.items) {
      const variantId = item.variant_id?.toString();
      if (!variantId) continue;
      quantitiesByVariant.set(variantId, (quantitiesByVariant.get(variantId) ?? 0) + Number(item.quantity ?? 0));
    }

    for (const [variantId, quantity] of quantitiesByVariant) {
      const selectors = document.querySelectorAll(`quantity-selector-component[data-variant-id="${variantId}"]`);

      for (const selector of selectors) {
        const input = selector.querySelector('input[data-cart-quantity]');
        if (!input) continue;

        input.setAttribute('data-cart-quantity', quantity.toString());

        // Update the quantity selector's internal state
        if ('updateCartQuantity' in selector && typeof selector.updateCartQuantity === 'function') {
          selector.updateCartQuantity();
        }
      }
    }
  }

  /**
   * Updates button states for all cart quantity selector components.
   */
  #updateCartQuantitySelectorButtonStates() {
    for (const selector of document.querySelectorAll('cart-quantity-selector-component')) {
      /** @type {any} */ (selector).updateButtonStates?.();
    }
  }

  async fetchCartData() {
    if (this.#pendingCartFetch) return this.#pendingCartFetch;

    this.#pendingCartFetch = (async () => {
      const response = await fetch(`${Theme.routes.cart_url}.json`, {
        headers: { Accept: 'application/json' },
        credentials: 'same-origin',
      });
      if (!response.ok) throw new Error(`Failed to fetch cart: ${response.status} ${response.statusText}`);
      const data = await response.json();
      return data;
    })().finally(() => {
      this.#pendingCartFetch = null;
    });

    return this.#pendingCartFetch;
  }

  /**
   * Gets the section id.
   * @returns {string} The section id.
   */
  get sectionId() {
    const { sectionId } = this.dataset;

    if (!sectionId) throw new Error('Section id missing');

    return sectionId;
  }

  /**
   * @returns {boolean} Whether the component is a drawer.
   */
  get isDrawer() {
    return this.dataset.drawer !== undefined;
  }
}

class CartMutationError extends Error {
  /**
   * @param {string} message
   * @param {number} status
   */
  constructor(message, status) {
    super(message);
    this.name = 'CartMutationError';
    this.status = status;
  }
}

if (!customElements.get('cart-items-component')) {
  customElements.define('cart-items-component', CartItemsComponent);
}
