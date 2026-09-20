export const RELIVANOW_ANALYTICS_EVENT = 'relivanow:analytics';

const EVENT_FIELDS = Object.freeze({
  GalleryInteraction: ['productId', 'mediaType', 'mediaIndex', 'interactionType'],
  AddOnSelected: ['productId', 'addOnVariantId', 'selected'],
  FAQOpened: ['productId', 'faqId', 'category'],
});

const installedTargets = new WeakSet();

/**
 * Creates a provider-neutral event containing only approved, non-personal fields.
 * Provider mapping remains outside the theme and must be consent-aware.
 * @param {keyof typeof EVENT_FIELDS} eventName
 * @param {Record<string, unknown>} payload
 */
export function createSemanticEvent(eventName, payload = {}) {
  const allowedFields = EVENT_FIELDS[eventName];
  if (!allowedFields) throw new TypeError(`Unsupported analytics event: ${eventName}`);

  const safePayload = {};
  for (const field of allowedFields) {
    const value = payload[field];
    if (!['string', 'number', 'boolean'].includes(typeof value) || value === '') continue;
    safePayload[field] = value;
  }

  return new CustomEvent(RELIVANOW_ANALYTICS_EVENT, {
    bubbles: true,
    detail: {
      event: eventName,
      payload: safePayload,
    },
  });
}

/** @param {Element | null | undefined} element */
function productIdFor(element) {
  const productComponent = element?.closest?.('product-component');
  const payload = productComponent?.getAttribute('view-event-payload');
  if (!payload) return undefined;

  try {
    return JSON.parse(payload).product?.id;
  } catch {
    return undefined;
  }
}

/** @param {Element | null | undefined} slide */
function mediaTypeFor(slide) {
  const prefix = 'product-media-container--';
  const typeClass = [...(slide?.classList ?? [])].find(
    (className) => className.startsWith(prefix) && className !== `${prefix}zoomable` && className !== `${prefix}tallest`
  );
  return typeClass?.slice(prefix.length);
}

/**
 * Installs one delegated listener set. This layer only emits DOM events; it does
 * not store data or contact an analytics provider.
 * @param {Document} target
 */
export function installSemanticAnalytics(target) {
  if (installedTargets.has(target)) return;
  installedTargets.add(target);

  target.addEventListener('slideshow:select', (event) => {
    const source = event.target instanceof Element ? event.target : null;
    if (!event.detail?.userInitiated || !source?.closest('[data-testid="product-information-media"]')) return;

    target.dispatchEvent(
      createSemanticEvent('GalleryInteraction', {
        productId: productIdFor(source),
        mediaType: mediaTypeFor(event.detail.slide),
        mediaIndex: event.detail.index,
        interactionType: event.detail.trigger,
      })
    );
  });

  target.addEventListener('zoom-media:selected', (event) => {
    const source = event.target instanceof Element ? event.target : null;
    if (!source?.closest('[data-testid="product-information-media"]')) return;

    target.dispatchEvent(
      createSemanticEvent('GalleryInteraction', {
        productId: productIdFor(source),
        mediaIndex: event.detail?.index,
        interactionType: 'zoom',
      })
    );
  });

  target.addEventListener('change', (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || !input.matches('[data-addon-variant-id]')) return;

    target.dispatchEvent(
      createSemanticEvent('AddOnSelected', {
        productId: productIdFor(input),
        addOnVariantId: input.dataset.addonVariantId,
        selected: input.checked,
      })
    );
  });

  target.addEventListener(
    'toggle',
    (event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open || !details.closest('.relivanow-faq')) return;

      const section = details.closest('[data-analytics-product-id]');
      target.dispatchEvent(
        createSemanticEvent('FAQOpened', {
          productId: section?.dataset.analyticsProductId,
          faqId: details.dataset.analyticsFaqId,
          category: details.dataset.analyticsFaqCategory,
        })
      );
    },
    true
  );
}

if (typeof document !== 'undefined') installSemanticAnalytics(document);
