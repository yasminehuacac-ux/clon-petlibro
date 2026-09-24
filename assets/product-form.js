import { Component } from '@theme/component';
import { fetchConfig, preloadImage, onAnimationEnd, yieldToMainThread } from '@theme/utilities';
import { cartPerformance } from '@theme/performance';
import { morph } from '@theme/morph';
import { CartLinesUpdateEvent, CartErrorEvent, ProductSelectEvent, StandardEvents } from '@shopify/events';
import { resolveProductFormVariantId } from './relivanow-product-form-policy.js';

// Error message display duration - gives users time to read the message
const ERROR_MESSAGE_DISPLAY_DURATION = 10000;

// Button re-enable delay after error - prevents rapid repeat attempts
const ERROR_BUTTON_REENABLE_DELAY = 1000;

// Success message display duration for screen readers
const SUCCESS_MESSAGE_DISPLAY_DURATION = 5000;

/**
 * @typedef {HTMLElement & {
 *   source: Element,
 *   destination: Element,
 *   useSourceSize: string | boolean
 * }} FlyToCart
 */

/**
 * A custom element that manages an add to cart button.
 *
 * @typedef {object} AddToCartRefs
 * @property {HTMLButtonElement} addToCartButton - The add to cart button.
 * @extends Component<AddToCartRefs>
 */
export class AddToCartComponent extends Component {
  requiredRefs = ['addToCartButton'];

  /** @type {number[] | undefined} */
  #resetTimeouts = /** @type {number[]} */ ([]);

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('pointerenter', this.#preloadImage);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.#resetTimeouts) {
      this.#resetTimeouts.forEach(/** @param {number} timeoutId */ (timeoutId) => clearTimeout(timeoutId));
    }
    this.removeEventListener('pointerenter', this.#preloadImage);
  }

  /**
   * Disables the add to cart button.
   */
  disable() {
    this.refs.addToCartButton.disabled = true;
  }

  /**
   * Enables the add to cart button.
   */
  enable() {
    this.refs.addToCartButton.disabled = false;
  }

  /**
   * Handles the click event for the add to cart button.
   * @param {MouseEvent & {target: HTMLElement}} event - The click event.
   */
  handleClick(event) {
    const form = this.closest('form');
    if (!form?.checkValidity()) return;

    // Check if adding would exceed max before animating
    const productForm = /** @type {ProductFormComponent | null} */ (this.closest('product-form-component'));
    const quantitySelector = productForm?.refs.quantitySelector;
    if (quantitySelector?.canAddToCart) {
      const validation = quantitySelector.canAddToCart();
      // Don't animate if it would exceed max
      if (!validation.canAdd) {
        return;
      }
    }
    if (this.refs.addToCartButton.dataset.puppet !== 'true') {
      const animationEnabled = this.dataset.addToCartAnimation === 'true';
      if (animationEnabled && !event.target.closest('.quick-add-modal')) {
        this.#animateFlyToCart();
      }
      this.animateAddToCart();
    }
  }

  #preloadImage = () => {
    const image = this.dataset.productVariantMedia;

    if (!image) return;

    preloadImage(image);
  };

  /**
   * Animates the fly to cart animation.
   */
  #animateFlyToCart() {
    const { addToCartButton } = this.refs;
    const cartIcon = document.querySelector('.header-actions__cart-icon');

    const image = this.dataset.productVariantMedia;

    if (!cartIcon || !addToCartButton || !image) return;

    const flyToCartElement = /** @type {FlyToCart} */ (document.createElement('fly-to-cart'));

    let flyToCartClass = addToCartButton.classList.contains('quick-add__button')
      ? 'fly-to-cart--quick'
      : 'fly-to-cart--main';

    flyToCartElement.classList.add(flyToCartClass);
    flyToCartElement.style.setProperty('background-image', `url(${image})`);
    flyToCartElement.style.setProperty('--start-opacity', '0');
    flyToCartElement.source = addToCartButton;
    flyToCartElement.destination = cartIcon;

    document.body.appendChild(flyToCartElement);
  }

  /**
   * Animates the add to cart button.
   */
  animateAddToCart = async function () {
    const { addToCartButton } = this.refs;

    // Initialize the array if it doesn't exist
    if (!this.#resetTimeouts) {
      this.#resetTimeouts = [];
    }

    // Clear all existing timeouts
    this.#resetTimeouts.forEach(/** @param {number} timeoutId */ (timeoutId) => clearTimeout(timeoutId));
    this.#resetTimeouts = [];

    if (addToCartButton.dataset.added !== 'true') {
      addToCartButton.dataset.added = 'true';
    }

    // The onAnimationEnd can trigger a style recalculation so we yield to the main thread first.
    await yieldToMainThread();
    await onAnimationEnd(addToCartButton);

    // Create new timeout and store it in the array
    const timeoutId = setTimeout(() => {
      addToCartButton.removeAttribute('data-added');

      // Remove this timeout from the array
      const index = this.#resetTimeouts.indexOf(timeoutId);
      if (index > -1) {
        this.#resetTimeouts.splice(index, 1);
      }
    }, 800);

    this.#resetTimeouts.push(timeoutId);
  };
}

if (!customElements.get('add-to-cart-component')) {
  customElements.define('add-to-cart-component', AddToCartComponent);
}

/**
 * A custom element that manages a product form.
 *
 * @typedef {{items: Array<{quantity: number, variant_id: number}>}} Cart
 *
 * @typedef {object} ProductFormRefs
 * @property {HTMLInputElement} variantId - The form input for submitting the variant ID.
 * @property {AddToCartComponent | undefined} addToCartButtonContainer - The add to cart button container element.
 * @property {HTMLElement | undefined} addToCartTextError - The add to cart text error.
 * @property {HTMLElement | undefined} acceleratedCheckoutButtonContainer - The accelerated checkout button container element.
 * @property {HTMLElement} liveRegion - The live region.
 * @property {HTMLElement | undefined} quantityLabelCartCount - The quantity label cart count element.
 * @property {HTMLElement | undefined} quantityRules - The quantity rules element.
 * @property {HTMLElement | undefined} productFormButtons - The product form buttons container.
 * @property {HTMLElement | undefined} volumePricing - The volume pricing component.
 * @property {any | undefined} quantitySelector - The quantity selector component.
 * @property {HTMLElement | undefined} quantitySelectorWrapper - The quantity selector wrapper element.
 * @property {HTMLElement | undefined} quantityLabel - The quantity label element.
 * @property {HTMLElement | undefined} pricePerItem - The price per item component.
 *
 * @extends Component<ProductFormRefs>
 */
class ProductFormComponent extends Component {
  requiredRefs = ['variantId', 'liveRegion'];
  #abortController = new AbortController();

  /** @type {number | undefined} */
  #timeout;

  /** @type {boolean} */
  #variantChangeInProgress = false;

  /** @type {number} */
  #variantChangeGeneration = 0;

  /** @type {Array<{variantId: string, quantity: number}>} */
  #addToCartQueue = [];

  /** @type {boolean} */
  #addToCartInProgress = false;

  /** @type {string | undefined} */
  #submittedVariantId;

  /** @type {AddToCartComponent[]} */
  #enabledAddToCartContainers = [];

  /** @type {HTMLButtonElement[]} */
  #enabledStickyAddToCartButtons = [];

  connectedCallback() {
    super.connectedCallback();

    const { signal } = this.#abortController;
    const target = this.closest('.shopify-section, dialog, product-card');
    target?.addEventListener(StandardEvents.productSelect, this.#onProductSelect, { signal });
    target?.addEventListener('change', this.#onAddOnSelectionChange, { signal });

    // Listen for cart updates to sync data-cart-quantity
    document.addEventListener(StandardEvents.cartLinesUpdate, this.#onCartUpdate, { signal });
    this.#syncAcceleratedCheckoutWithAddOns();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.#abortController.abort();
  }

  #getVariantIdInput() {
    return /** @type {HTMLInputElement | null} */ (this.querySelector('input[name="id"]'))?.value;
  }

  async #refreshCart() {
    /** @type {import('@theme/component-cart-items').CartItemsComponent | null} */
    const cartItemsComponent = document.querySelector('cart-items-component');

    if (cartItemsComponent) {
      await customElements.whenDefined('cart-items-component');
      return cartItemsComponent.fetchCartData();
    }

    // Fallback for pages without cart-items-component (e.g. page-based cart on product pages)
    return fetch(`${Theme.routes.cart_url}.json`, {
      headers: { Accept: 'application/json' },
      credentials: 'same-origin',
    }).then((response) => {
      if (!response.ok) throw new Error(`Failed to fetch cart: ${response.status}`);
      return response.json();
    });
  }

  /**
   * Updates quantity selector with cart data for current variant
   * @param {Cart} cart - The cart object with items array
   */
  #updateCartQuantity(cart) {
    const variantIdInput = this.#getVariantIdInput();
    if (!variantIdInput) return;

    const cartItem = cart.items.find(
      /** @param {any} item */
      (item) => item.variant_id.toString() === variantIdInput.toString()
    );
    const cartQty = cartItem ? cartItem.quantity : 0;

    // Use public API to update quantity selector
    const quantitySelector =
      /** @type {import('@theme/component-cart-quantity-selector').CartQuantitySelectorComponent | null} */ (
        this.querySelector('quantity-selector-component')
      );

    if (quantitySelector?.setCartQuantity) {
      quantitySelector.setCartQuantity(cartQty);
    }

    // Update quantity label if it exists
    this.#updateQuantityLabel(cartQty);
  }

  /**
   * Updates data-cart-quantity when cart is updated from elsewhere
   * @param {CartLinesUpdateEvent} event
   */
  #onCartUpdate = async (event) => {
    if (!this.#getVariantIdInput()) return;

    event.promise
      ?.then(({ detail }) => {
        // Skip if this event came from this component
        if (detail?.sourceId === this.id || detail?.source === 'product-form-component') return;

        if (detail?.items) {
          this.#updateCartQuantity(/** @type {Cart} */ ({ items: detail.items }));
        } else {
          this.#refreshCart().then((cart) => this.#updateCartQuantity(cart));
        }
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') console.warn('[product-form] Event promise rejected:', error);
      });
  };

  /** @param {Event} event */
  handleSubmit(event) {
    event.preventDefault();

    if (this.#addToCartInProgress || (this.#variantChangeInProgress && this.#addToCartQueue.length > 0)) return;

    if (this.#variantChangeInProgress) {
      const intendedVariantId = this.#getIntendedVariantId();
      const quantity = this.#getQuantity();

      if (intendedVariantId) {
        this.#addToCartQueue = this.#getSubmissionItems(intendedVariantId, quantity);
      }

      this.refs.addToCartButtonContainer?.animateAddToCart?.();
      return;
    }

    const intendedVariantId = this.#getIntendedVariantId();
    const submissionItems = intendedVariantId ? this.#getSubmissionItems(intendedVariantId, this.#getQuantity()) : [];

    if (!this.#validateQuantity()) return;

    if (submissionItems.length > 1) {
      this.#processBatchAddToCart(submissionItems, event);
    } else {
      this.#processAddToCart(undefined, undefined, event);
    }
  }

  /** @returns {string | undefined} */
  #getIntendedVariantId() {
    const productContext = this.closest('.shopify-section, dialog, product-card');
    const selectedVariant = /** @type {HTMLInputElement | null} */ (
      productContext?.querySelector('variant-picker input[type="radio"]:checked')
    );

    return resolveProductFormVariantId({
      urlVariantId: new URL(window.location.href).searchParams.get('variant'),
      formVariantId: this.refs.variantId?.value,
      selectedVariantId: selectedVariant?.dataset.variantId,
      preferFormVariant: this.dataset.variantSource === 'form',
    });
  }

  /**
   * Prevents concurrent cart requests and exposes an accessible loading state.
   * @param {string} variantId
   * @returns {boolean}
   */
  #beginAddToCart(variantId) {
    if (this.#addToCartInProgress) return false;

    this.#addToCartInProgress = true;
    this.#submittedVariantId = variantId;

    const { addToCartTextError } = this.refs;
    if (addToCartTextError) addToCartTextError.classList.add('hidden');
    this.#clearLiveRegionText();

    this.#enabledAddToCartContainers = Array.from(this.querySelectorAll('add-to-cart-component')).filter(
      (container) => !container.refs.addToCartButton?.disabled
    );

    const productSection = this.closest('.shopify-section');
    this.#enabledStickyAddToCartButtons = Array.from(
      productSection?.querySelectorAll('sticky-add-to-cart [ref="addToCartButton"]') ?? []
    ).filter((button) => button instanceof HTMLButtonElement && !button.disabled);

    for (const container of this.#enabledAddToCartContainers) {
      container.disable();
      container.refs.addToCartButton?.setAttribute('aria-busy', 'true');
    }

    for (const button of this.#enabledStickyAddToCartButtons) {
      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
    }

    return true;
  }

  #finishAddToCart() {
    const currentVariantId = this.#getIntendedVariantId();

    for (const container of this.querySelectorAll('add-to-cart-component')) {
      container.refs.addToCartButton?.removeAttribute('aria-busy');
    }

    const productSection = this.closest('.shopify-section');
    for (const button of productSection?.querySelectorAll('sticky-add-to-cart [ref="addToCartButton"]') ?? []) {
      button.removeAttribute('aria-busy');
    }

    if (!this.#submittedVariantId || currentVariantId === this.#submittedVariantId) {
      for (const container of this.#enabledAddToCartContainers) {
        if (container.isConnected) container.enable();
      }

      for (const button of this.#enabledStickyAddToCartButtons) {
        if (button.isConnected) button.disabled = false;
      }
    }

    this.#enabledAddToCartContainers = [];
    this.#enabledStickyAddToCartButtons = [];
    this.#submittedVariantId = undefined;
    this.#addToCartInProgress = false;
  }

  /** @returns {number} */
  #getQuantity() {
    return Number(this.refs.quantitySelector?.getValue?.()) || Number(this.dataset.quantityDefault) || 1;
  }

  /** @returns {boolean} */
  #validateQuantity() {
    if (!this.refs.quantitySelector?.canAddToCart) return true;

    const validation = this.refs.quantitySelector.canAddToCart();
    if (validation.canAdd) return true;

    const allAddToCartContainers = /** @type {NodeListOf<AddToCartComponent>} */ (
      this.querySelectorAll('add-to-cart-component')
    );
    for (const container of allAddToCartContainers) container.disable();

    const errorTemplate = this.dataset.quantityErrorMax || '';
    const errorMessage = errorTemplate.replace('{{ maximum }}', validation.maxQuantity?.toString() || '');
    this.#showAddToCartError(errorMessage);

    setTimeout(() => {
      for (const container of allAddToCartContainers) container.enable();
    }, ERROR_BUTTON_REENABLE_DELAY);

    return false;
  }

  /** @param {string} message */
  #showAddToCartError(message) {
    const errorMessage = message || 'Add to cart failed';
    const { addToCartTextError } = this.refs;

    if (this.#timeout) clearTimeout(this.#timeout);

    if (addToCartTextError) {
      addToCartTextError.classList.remove('hidden');
      const textNode = addToCartTextError.childNodes[2];
      if (textNode) {
        textNode.textContent = errorMessage;
      } else {
        addToCartTextError.appendChild(document.createTextNode(errorMessage));
      }
    }

    this.#setLiveRegionText(errorMessage);
    this.#timeout = setTimeout(() => {
      addToCartTextError?.classList.add('hidden');
      this.#clearLiveRegionText();
    }, ERROR_MESSAGE_DISPLAY_DURATION);
  }

  /** @returns {Array<{variantId: string, quantity: number}>} */
  #getSelectedAddOns() {
    const productContext = this.closest('.shopify-section, dialog, product-card');
    const selectedAddOns = /** @type {NodeListOf<HTMLInputElement>} */ (
      productContext?.querySelectorAll(
        '[data-relivanow-add-on] input[data-addon-variant-id][data-addon-available="true"]:checked:not(:disabled)'
      ) ?? []
    );
    const seenVariantIds = new Set();

    return Array.from(selectedAddOns).flatMap((input) => {
      const variantId = input.dataset.addonVariantId;
      if (!variantId || seenVariantIds.has(variantId)) return [];
      seenVariantIds.add(variantId);
      return [{ variantId, quantity: 1 }];
    });
  }

  /**
   * @param {string} mainVariantId
   * @param {number} quantity
   * @returns {Array<{variantId: string, quantity: number}>}
   */
  #getSubmissionItems(mainVariantId, quantity) {
    return [
      { variantId: mainVariantId, quantity },
      ...this.#getSelectedAddOns().filter((item) => item.variantId !== mainVariantId),
    ];
  }

  #syncAcceleratedCheckoutWithAddOns() {
    const acceleratedCheckout = this.refs.acceleratedCheckoutButtonContainer;
    if (!acceleratedCheckout) return;

    const hasSelectedAddOns = this.#getSelectedAddOns().length > 0;
    if (hasSelectedAddOns) {
      acceleratedCheckout.dataset.relivanowAddOnSuppressed = 'true';
      acceleratedCheckout.setAttribute('hidden', 'true');
      return;
    }

    if (acceleratedCheckout.dataset.relivanowAddOnSuppressed === 'true') {
      delete acceleratedCheckout.dataset.relivanowAddOnSuppressed;
      if (!this.refs.addToCartButtonContainer?.refs.addToCartButton?.disabled) {
        acceleratedCheckout.removeAttribute('hidden');
      }
    }
  }

  #onAddOnSelectionChange = (event) => {
    if (!(event.target instanceof HTMLInputElement) || !event.target.matches('[data-addon-variant-id]')) return;
    this.#syncAcceleratedCheckoutWithAddOns();
  };

  /**
   * @param {string} [overrideVariantId]
   * @param {number} [overrideQuantity]
   * @param {Event} [event]
   */
  #processAddToCart(overrideVariantId, overrideQuantity, event) {
    const { addToCartTextError } = this.refs;

    if (this.#timeout) clearTimeout(this.#timeout);

    const allAddToCartContainers = /** @type {NodeListOf<AddToCartComponent>} */ (
      this.querySelectorAll('add-to-cart-component')
    );

    if (!overrideVariantId) {
      const anyButtonDisabled = Array.from(allAddToCartContainers).some(
        (container) => container.refs.addToCartButton?.disabled
      );
      if (anyButtonDisabled) return;
    }

    const form = this.querySelector('form');
    if (!form) throw new Error('Product form element missing');

    const formData = new FormData(form);

    if (overrideVariantId) {
      formData.set('id', overrideVariantId);
    } else if (!formData.get('id')) {
      const intendedVariantId = this.#getIntendedVariantId();
      if (intendedVariantId) formData.set('id', intendedVariantId);
    }
    if (overrideQuantity !== undefined) {
      formData.set('quantity', overrideQuantity.toString());
    }

    const cartItemsComponents = document.querySelectorAll('cart-items-component');
    let cartItemComponentsSectionIds = [];
    cartItemsComponents.forEach((item) => {
      if (item instanceof HTMLElement && item.dataset.sectionId) {
        cartItemComponentsSectionIds.push(item.dataset.sectionId);
      }
      formData.append('sections', cartItemComponentsSectionIds.join(','));
    });

    const submittedVariantId = String(formData.get('id') || '');
    if (!submittedVariantId || !this.#beginAddToCart(submittedVariantId)) return;

    const itemCount = Number(formData.get('quantity')) || Number(this.dataset.quantityDefault);
    const deferredEventPromise = CartLinesUpdateEvent.createPromise();

    this.dispatchEvent(
      new CartLinesUpdateEvent({
        action: 'add',
        context: 'product',
        lines: [
          {
            merchandiseId: /** @type {string} */ (formData.get('id')),
            quantity: itemCount,
          },
        ],
        promise: deferredEventPromise.promise,
      })
    );

    const fetchCfg = fetchConfig('javascript', { body: formData });

    fetch(Theme.routes.cart_add_url, {
      ...fetchCfg,
      headers: {
        ...fetchCfg.headers,
        Accept: 'text/html',
      },
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status) {
          this.dispatchEvent(
            new CartErrorEvent({
              error: response.message || 'Add to cart failed',
              code: 'INVALID',
              detail: {
                description: response.description,
                errors: response.errors,
              },
            })
          );

          // Fetch the updated cart to get the actual total quantity for this variant
          this.#refreshCart()
            .then((ajaxCart) =>
              deferredEventPromise.resolve({
                cart: CartLinesUpdateEvent.createCartFromAjaxResponse(ajaxCart),
                detail: {
                  didError: true,
                  items: ajaxCart.items,
                  source: 'product-form-component',
                  sourceId: this.id.toString(),
                  itemCount,
                  productId: this.dataset.productId,
                },
              })
            )
            .catch(deferredEventPromise.reject);

          if (!addToCartTextError) return;
          addToCartTextError.classList.remove('hidden');

          // Reuse the text node if the user is spam-clicking
          const textNode = addToCartTextError.childNodes[2];
          if (textNode) {
            textNode.textContent = response.message;
          } else {
            const newTextNode = document.createTextNode(response.message);
            addToCartTextError.appendChild(newTextNode);
          }

          // Create or get existing error live region for screen readers
          this.#setLiveRegionText(response.message);

          this.#timeout = setTimeout(() => {
            if (!addToCartTextError) return;
            addToCartTextError.classList.add('hidden');

            // Clear the announcement
            this.#clearLiveRegionText();
          }, ERROR_MESSAGE_DISPLAY_DURATION);

          return;
        } else {
          const id = formData.get('id');

          if (addToCartTextError) {
            addToCartTextError.classList.add('hidden');
            addToCartTextError.removeAttribute('aria-live');
          }

          if (!id) throw new Error('Form ID is required');

          // Add aria-live region to inform screen readers that the item was added
          // Get the added text from any add-to-cart button
          const anyAddToCartButton = allAddToCartContainers[0]?.refs.addToCartButton;
          if (anyAddToCartButton) {
            const addedTextElement = anyAddToCartButton.querySelector('.add-to-cart-text--added');
            const addedText = addedTextElement?.textContent?.trim() || Theme.translations.added;

            this.#setLiveRegionText(addedText);

            setTimeout(() => {
              this.#clearLiveRegionText();
            }, SUCCESS_MESSAGE_DISPLAY_DURATION);
          }

          // Fetch the updated cart to get the actual total quantity for this variant
          const cart = await this.#refreshCart()
            .then((ajaxCart) => {
              deferredEventPromise.resolve({
                cart: CartLinesUpdateEvent.createCartFromAjaxResponse(ajaxCart),
                detail: {
                  items: ajaxCart.items,
                  source: 'product-form-component',
                  sourceId: this.id.toString(),
                  itemCount,
                  productId: this.dataset.productId,
                  sections: response.sections,
                  didError: false,
                },
              });

              if (this.#getVariantIdInput()) {
                this.#updateCartQuantity(ajaxCart);
              }

              return ajaxCart;
            })
            .catch(deferredEventPromise.reject);
        }
      })
      .catch((error) => {
        console.error(error);
        deferredEventPromise.reject(error);

        const errorMessage = error?.message || 'Network error during add to cart';

        this.dispatchEvent(
          new CartErrorEvent({
            error: errorMessage,
            code: 'SERVICE_UNAVAILABLE',
          })
        );
        this.#showAddToCartError(errorMessage);
      })
      .finally(() => {
        this.#finishAddToCart();

        if (event) {
          cartPerformance.measureFromEvent('add:user-action', event);
        }
      });
  }

  /**
   * @param {Array<{variantId: string, quantity: number}>} items
   * @param {Event} [event]
   */
  #processBatchAddToCart(items, event) {
    if (items.length === 0) return;

    const submittedVariantId = items[0]?.variantId;
    if (!submittedVariantId || !this.#beginAddToCart(submittedVariantId)) return;

    const { addToCartTextError } = this.refs;

    if (this.#timeout) clearTimeout(this.#timeout);

    const cartItemsComponents = document.querySelectorAll('cart-items-component');
    const cartItemComponentsSectionIds = [];
    for (const item of cartItemsComponents) {
      if (item instanceof HTMLElement && item.dataset.sectionId) {
        cartItemComponentsSectionIds.push(item.dataset.sectionId);
      }
    }

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    const deferredEventPromise = CartLinesUpdateEvent.createPromise();

    this.dispatchEvent(
      new CartLinesUpdateEvent({
        action: 'add',
        context: 'product',
        lines: items.map((item) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        })),
        promise: deferredEventPromise.promise,
      })
    );

    const payload = {
      items: items.map((item) => ({
        id: Number(item.variantId),
        quantity: item.quantity,
      })),
      sections: cartItemComponentsSectionIds.join(','),
    };

    fetch(Theme.routes.cart_add_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(async (response) => {
        if (response.status) {
          this.dispatchEvent(
            new CartErrorEvent({
              error: response.message || 'Add to cart failed',
              code: 'INVALID',
              detail: {
                description: response.description,
                errors: response.errors,
              },
            })
          );

          this.#refreshCart()
            .then((ajaxCart) =>
              deferredEventPromise.resolve({
                cart: CartLinesUpdateEvent.createCartFromAjaxResponse(ajaxCart),
                detail: {
                  didError: true,
                  items: ajaxCart.items,
                  source: 'product-form-component',
                  sourceId: this.id.toString(),
                  itemCount: totalQuantity,
                  productId: this.dataset.productId,
                },
              })
            )
            .catch(deferredEventPromise.reject);

          if (!addToCartTextError) return;
          addToCartTextError.classList.remove('hidden');
          const textNode = addToCartTextError.childNodes[2];
          if (textNode) {
            textNode.textContent = response.message;
          } else {
            addToCartTextError.appendChild(document.createTextNode(response.message));
          }
          this.#setLiveRegionText(response.message);

          this.#timeout = setTimeout(() => {
            addToCartTextError.classList.add('hidden');
            this.#clearLiveRegionText();
          }, ERROR_MESSAGE_DISPLAY_DURATION);

          return;
        }

        if (addToCartTextError) {
          addToCartTextError.classList.add('hidden');
          addToCartTextError.removeAttribute('aria-live');
        }

        const allAddToCartContainers = /** @type {NodeListOf<AddToCartComponent>} */ (
          this.querySelectorAll('add-to-cart-component')
        );
        const anyAddToCartButton = allAddToCartContainers[0]?.refs.addToCartButton;
        if (anyAddToCartButton) {
          const addedTextElement = anyAddToCartButton.querySelector('.add-to-cart-text--added');
          const addedText = addedTextElement?.textContent?.trim() || Theme.translations.added;
          this.#setLiveRegionText(addedText);
          setTimeout(() => this.#clearLiveRegionText(), SUCCESS_MESSAGE_DISPLAY_DURATION);
        }

        const cart = await this.#refreshCart();
        deferredEventPromise.resolve({
          cart: CartLinesUpdateEvent.createCartFromAjaxResponse(cart),
          detail: {
            items: cart.items,
            source: 'product-form-component',
            sourceId: this.id.toString(),
            itemCount: totalQuantity,
            productId: this.dataset.productId,
            sections: response.sections,
            didError: false,
          },
        });
        this.#updateCartQuantity(cart);
      })
      .catch((error) => {
        console.error(error);
        deferredEventPromise.reject(error);

        const errorMessage = error?.message || 'Network error during add to cart';

        this.dispatchEvent(
          new CartErrorEvent({
            error: errorMessage,
            code: 'SERVICE_UNAVAILABLE',
          })
        );

        this.#showAddToCartError(errorMessage);
      })
      .finally(() => {
        this.#finishAddToCart();
        if (event) cartPerformance.measureFromEvent('add:user-action', event);
      });
  }

  /**
   * Updates the quantity label with the current cart quantity
   * @param {number} cartQty - The quantity in cart
   */
  #updateQuantityLabel(cartQty) {
    const quantityLabel = this.refs.quantityLabelCartCount;
    if (quantityLabel) {
      const inCartText = quantityLabel.textContent?.match(/\((\d+)\s+(.+)\)/);
      if (inCartText && inCartText[2]) {
        quantityLabel.textContent = `(${cartQty} ${inCartText[2]})`;
      }

      // Show/hide based on quantity
      quantityLabel.classList.toggle('hidden', cartQty === 0);
    }
  }

  /**
   * @param {*} text
   */
  #setLiveRegionText(text) {
    const liveRegion = this.refs.liveRegion;
    liveRegion.textContent = text;
  }

  #clearLiveRegionText() {
    const liveRegion = this.refs.liveRegion;
    liveRegion.textContent = '';
  }

  /**
   * Morphs or removes/adds an element based on current and new element states
   * @param {Element | null | undefined} currentElement - The current element in the DOM
   * @param {Element | null | undefined} newElement - The new element from the server response
   * @param {Element | null} [insertReferenceElement] - Element to insert before if adding new element
   */
  #morphOrUpdateElement(currentElement, newElement, insertReferenceElement = null) {
    if (currentElement && newElement) {
      morph(currentElement, newElement);
    } else if (currentElement && !newElement) {
      currentElement.remove();
    } else if (!currentElement && newElement && insertReferenceElement) {
      insertReferenceElement.insertAdjacentElement('beforebegin', /** @type {Element} */ (newElement.cloneNode(true)));
    }
  }

  /**
   * @param {ProductSelectEvent} event
   */
  #onProductSelect = async (event) => {
    // Skip events from product-cards when this form is at the section level
    const sourceCard = /** @type {Element | null} */ (event.target)?.closest('product-card');
    if (sourceCard && !sourceCard.contains(this)) return;

    // Track generation to prevent a stale (aborted) call from clearing the flag
    // while a newer variant selection is still pending.
    const generation = ++this.#variantChangeGeneration;
    this.#variantChangeInProgress = true;

    try {
      const { detail } = await event.promise;
      if (!detail?.html) return;

      const { html, newProduct, productId, resource } = detail;

      // Update product context if new product loaded (combined listing)
      if (newProduct) {
        this.dataset.productId = newProduct.id;
      } else if (productId && productId !== this.dataset.productId) {
        return;
      }

      const { variantId } = this.refs;
      variantId.value = resource?.id ?? '';

      const { addToCartButtonContainer: currentAddToCartButtonContainer, acceleratedCheckoutButtonContainer } =
        this.refs;
      const currentAddToCartButton = currentAddToCartButtonContainer?.refs.addToCartButton;

      // Update state and text for add-to-cart button
      if (!currentAddToCartButtonContainer || (!currentAddToCartButton && !acceleratedCheckoutButtonContainer)) return;

      // Update the button state
      if (resource == null || resource.available == false) {
        currentAddToCartButtonContainer.disable();
      } else {
        currentAddToCartButtonContainer.enable();
      }

      const newAddToCartButton = html.querySelector('product-form-component [ref="addToCartButton"]');
      if (newAddToCartButton && currentAddToCartButton) {
        morph(currentAddToCartButton, newAddToCartButton);
      }

      if (acceleratedCheckoutButtonContainer) {
        if (resource == null || resource.available == false) {
          acceleratedCheckoutButtonContainer?.setAttribute('hidden', 'true');
        } else {
          acceleratedCheckoutButtonContainer?.removeAttribute('hidden');
        }
      }
      this.#syncAcceleratedCheckoutWithAddOns();

      // Set the data attribute for the product variant media if it exists
      if (resource) {
        const productVariantMedia = resource.featured_media?.preview_image?.src;
        if (productVariantMedia) {
          this.refs.addToCartButtonContainer?.setAttribute(
            'data-product-variant-media',
            productVariantMedia + '&width=100'
          );
        }
      }

      // Check if quantity rules, price-per-item, or add-to-cart are appearing/disappearing (causes layout shift)
      const {
        quantityRules,
        pricePerItem,
        quantitySelector,
        productFormButtons,
        quantityLabel,
        quantitySelectorWrapper,
      } = this.refs;

      // Update quantity selector's min/max/step attributes and cart quantity for the new variant
      const newQuantityInput = /** @type {HTMLInputElement | null} */ (
        html.querySelector('quantity-selector-component input[ref="quantityInput"]')
      );

      if (quantitySelector?.updateConstraints && newQuantityInput) {
        quantitySelector.updateConstraints(newQuantityInput.min, newQuantityInput.max || null, newQuantityInput.step);
        // Keep data-quantity-default attribute in sync with new variant's minimum quantity
        this.dataset.quantityDefault = newQuantityInput.min || '1';
      }

      const newQuantityRules = html.querySelector('.quantity-rules');
      const isQuantityRulesChanging = !!quantityRules !== !!newQuantityRules;

      const newPricePerItem = html.querySelector('price-per-item');
      const isPricePerItemChanging = !!pricePerItem !== !!newPricePerItem;

      if ((isQuantityRulesChanging || isPricePerItemChanging) && quantitySelector) {
        // Store quantity value before morphing entire container
        const currentQuantityValue = quantitySelector.getValue?.();

        const newProductFormButtons = html.querySelector('.product-form-buttons');

        if (productFormButtons && newProductFormButtons) {
          morph(productFormButtons, newProductFormButtons);

          // Get the NEW quantity selector after morphing and update its constraints
          const newQuantityInputElement = /** @type {HTMLInputElement | null} */ (
            html.querySelector('quantity-selector-component input[ref="quantityInput"]')
          );

          if (this.refs.quantitySelector?.updateConstraints && newQuantityInputElement && currentQuantityValue) {
            // Temporarily set the old value so updateConstraints can snap it properly
            this.refs.quantitySelector.setValue(currentQuantityValue);
            // updateConstraints will snap to valid increment if needed
            this.refs.quantitySelector.updateConstraints(
              newQuantityInputElement.min,
              newQuantityInputElement.max || null,
              newQuantityInputElement.step
            );
            // Keep data-quantity-default attribute in sync with new variant's minimum quantity
            this.dataset.quantityDefault = newQuantityInputElement.min || '1';
          }
        }
      } else {
        // Update elements individually when layout isn't changing
        /** @type {Array<[string, HTMLElement | undefined, HTMLElement | undefined]>} */
        const morphTargets = [
          ['.quantity-label', quantityLabel, quantitySelector],
          ['.quantity-rules', quantityRules, this.refs.productFormButtons],
          ['price-per-item', pricePerItem, quantitySelectorWrapper],
        ];

        for (const [selector, currentElement, fallback] of morphTargets) {
          this.#morphOrUpdateElement(currentElement, html.querySelector(selector), fallback);
        }
      }

      // Morph volume pricing if it exists
      const currentVolumePricing = this.refs.volumePricing;
      const newVolumePricing = html.querySelector('volume-pricing');
      this.#morphOrUpdateElement(currentVolumePricing, newVolumePricing, this.refs.productFormButtons);

      const hasB2BFeatures =
        quantityRules ||
        newQuantityRules ||
        pricePerItem ||
        newPricePerItem ||
        currentVolumePricing ||
        newVolumePricing;

      if (!hasB2BFeatures) return;

      // Fetch and update cart quantity for the new variant
      this.#refreshCart().then((cart) => this.#updateCartQuantity(cart));
    } finally {
      // Only clear the flag if no newer variant selection has started
      if (generation === this.#variantChangeGeneration) {
        this.#variantChangeInProgress = false;

        // Drain any queued add-to-cart requests that accumulated during the variant change
        if (this.#addToCartQueue.length > 0) {
          const queuedItems = [...this.#addToCartQueue];
          this.#addToCartQueue = [];
          if (!this.#validateQuantity()) return;

          if (queuedItems.length > 1) {
            this.#processBatchAddToCart(queuedItems);
          } else {
            const [queuedItem] = queuedItems;
            if (queuedItem) this.#processAddToCart(queuedItem.variantId, queuedItem.quantity);
          }
        }
      }
    }
  };
}

if (!customElements.get('product-form-component')) {
  customElements.define('product-form-component', ProductFormComponent);
}
