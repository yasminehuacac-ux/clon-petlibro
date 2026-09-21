import { getScrollEventTarget, scrollContainerMediaQuery, scrollTo } from './scroll-container.js';

const ANCHOR_GAP = 16;
const ACTIVATION_EPSILON = 1;

const TARGET_SELECTORS = {
  purchase: '[id^="ProductInformation-"]',
  overview: [
    '.relivanow-benefits-bar',
    '.relivanow-two-ways',
    '.relivanow-precise-feeding',
    '.relivanow-feeding-insights',
    '.relivanow-remote-control',
    '.relivanow-product-features',
    '.relivanow-how-it-works',
    '.relivanow-lifestyle',
    '.relivanow-product-comparison',
    '.relivanow-smart-feeding',
    '.relivanow-app-experience',
  ].join(','),
  specs: '.relivanow-specifications',
  faq: '.relivanow-faq',
  reviews: '.relivanow-reviews',
};

/**
 * Returns an element's stable layout offset, unaffected by sticky positioning.
 *
 * @param {HTMLElement} element
 * @returns {number}
 */
function getAbsoluteOffsetTop(element) {
  let offsetTop = 0;
  let current = element;

  while (current) {
    offsetTop += current.offsetTop;
    current = /** @type {HTMLElement | null} */ (current.offsetParent);
  }

  return offsetTop;
}

/**
 * Keeps active-location logic in document order even when navigation blocks are reordered.
 *
 * @param {{ link: HTMLAnchorElement, target: HTMLElement }[]} destinations
 * @returns {{ link: HTMLAnchorElement, target: HTMLElement }[]}
 */
function getDestinationsInPageOrder(destinations) {
  return [...destinations].sort(
    (first, second) => getAbsoluteOffsetTop(first.target) - getAbsoluteOffsetTop(second.target)
  );
}

class RelivanowPdpNavigation extends HTMLElement {
  /** @type {AbortController | undefined} */
  #controller;

  /** @type {ResizeObserver | undefined} */
  #resizeObserver;

  /** @type {number | undefined} */
  #animationFrame;

  /** @type {EventTarget | undefined} */
  #scrollTarget;

  /** @type {{ link: HTMLAnchorElement, target: HTMLElement }[]} */
  #destinations = [];

  connectedCallback() {
    this.#removeScrollListeners();
    this.#controller?.abort();
    this.#resizeObserver?.disconnect();
    this.#controller = new AbortController();
    const { signal } = this.#controller;

    this.#bindScrollTarget();
    scrollContainerMediaQuery.addEventListener('change', this.#handleScrollContainerChange);
    this.addEventListener('click', this.#handleNavigation, { signal });
    window.addEventListener('resize', this.#handleResize, { passive: true, signal });
    window.addEventListener('hashchange', this.#scheduleActiveUpdate, { signal });
    document.addEventListener('shopify:section:load', this.#refresh, { signal });
    document.addEventListener('shopify:section:unload', this.#refresh, { signal });
    document.addEventListener('shopify:section:reorder', this.#refresh, { signal });

    this.#resizeObserver = new ResizeObserver(this.#updateHeight);
    this.#resizeObserver.observe(this);
    this.#refresh();
  }

  disconnectedCallback() {
    this.#controller?.abort();
    this.#removeScrollListeners();
    this.#resizeObserver?.disconnect();
    if (this.#animationFrame !== undefined) cancelAnimationFrame(this.#animationFrame);
    document.body.style.removeProperty('--relivanow-pdp-nav-height');
  }

  #refresh = () => {
    const seenTargets = new Set();
    this.#destinations = [];

    for (const link of this.querySelectorAll('[data-relivanow-pdp-target]')) {
      if (!(link instanceof HTMLAnchorElement)) continue;

      const key = link.dataset.relivanowPdpTarget;
      const selector = key ? TARGET_SELECTORS[key] : undefined;
      const matched = selector ? document.querySelector(selector) : null;
      const target = matched?.closest('.shopify-section[id]') ?? matched;
      const anchor = key === 'purchase' ? matched : target;

      if (!(target instanceof HTMLElement) || !(anchor instanceof HTMLElement) || seenTargets.has(target)) {
        link.hidden = true;
        link.parentElement?.setAttribute('hidden', '');
        link.removeAttribute('aria-current');
        continue;
      }

      seenTargets.add(target);
      target.dataset.relivanowPdpAnchor = key ?? '';
      link.href = `#${anchor.id}`;
      link.hidden = false;
      link.parentElement?.removeAttribute('hidden');
      this.#destinations.push({ link, target });
    }

    this.hidden = this.#destinations.length < 2;
    this.#updateHeight();
    this.#scheduleActiveUpdate();
  };

  #handleResize = () => {
    this.#updateHeight();
    this.#scheduleActiveUpdate();
  };

  #handleScrollContainerChange = () => {
    this.#bindScrollTarget();
    this.#scheduleActiveUpdate();
  };

  #handleNavigation = (event) => {
    if (!(event.target instanceof Element)) return;

    const link = event.target.closest('a[data-relivanow-pdp-target]');
    if (!(link instanceof HTMLAnchorElement)) return;

    const destination = this.#destinations.find((item) => item.link === link);
    if (!destination) return;

    event.preventDefault();
    const destinationTop = Math.max(
      0,
      getAbsoluteOffsetTop(destination.target) - this.#getActivationLine()
    );
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

    history.pushState(history.state, '', destination.link.hash);
    scrollTo({ top: destinationTop, behavior });
    this.#scheduleActiveUpdate();
  };

  #bindScrollTarget() {
    const nextTarget = getScrollEventTarget();
    if (nextTarget === this.#scrollTarget) return;

    this.#scrollTarget?.removeEventListener('scroll', this.#scheduleActiveUpdate);
    this.#scrollTarget = nextTarget;
    this.#scrollTarget.addEventListener('scroll', this.#scheduleActiveUpdate, { passive: true });
  }

  #removeScrollListeners() {
    this.#scrollTarget?.removeEventListener('scroll', this.#scheduleActiveUpdate);
    this.#scrollTarget = undefined;
    scrollContainerMediaQuery.removeEventListener('change', this.#handleScrollContainerChange);
  }

  #updateHeight = () => {
    const height = this.hidden ? 0 : Math.round(this.getBoundingClientRect().height);
    document.body.style.setProperty('--relivanow-pdp-nav-height', `${height}px`);
  };

  #scheduleActiveUpdate = () => {
    if (this.#animationFrame !== undefined) return;
    this.#animationFrame = requestAnimationFrame(() => {
      this.#animationFrame = undefined;
      this.#updateActiveLocation();
    });
  };

  #getActivationLine() {
    const headerHeight = Number.parseFloat(
      getComputedStyle(document.body).getPropertyValue('--header-group-height')
    );
    return (Number.isFinite(headerHeight) ? headerHeight : 0) + this.offsetHeight + ANCHOR_GAP + 1;
  }

  #updateActiveLocation() {
    if (this.hidden || this.#destinations.length === 0) return;

    const activationLine = this.#getActivationLine();
    const pageDestinations = getDestinationsInPageOrder(this.#destinations);
    let activeDestination = pageDestinations[0];

    for (const destination of pageDestinations) {
      if (destination.target.getBoundingClientRect().top <= activationLine + ACTIVATION_EPSILON) {
        activeDestination = destination;
      }
    }

    const scrollContainer =
      this.#scrollTarget instanceof HTMLElement ? this.#scrollTarget : document.scrollingElement;

    if (scrollContainer) {
      const { scrollTop, clientHeight: viewportHeight, scrollHeight } = scrollContainer;
      if (scrollTop + viewportHeight >= scrollHeight - 1) {
        activeDestination = pageDestinations.at(-1) ?? activeDestination;
      }
    }

    for (const destination of this.#destinations) {
      if (destination === activeDestination) destination.link.setAttribute('aria-current', 'location');
      else destination.link.removeAttribute('aria-current');
    }
  }
}

if (!customElements.get('relivanow-pdp-navigation')) {
  customElements.define('relivanow-pdp-navigation', RelivanowPdpNavigation);
}
