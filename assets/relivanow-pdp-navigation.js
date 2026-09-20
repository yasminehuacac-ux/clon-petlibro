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

class RelivanowPdpNavigation extends HTMLElement {
  /** @type {AbortController | undefined} */
  #controller;

  /** @type {ResizeObserver | undefined} */
  #resizeObserver;

  /** @type {number | undefined} */
  #animationFrame;

  /** @type {{ link: HTMLAnchorElement, target: HTMLElement }[]} */
  #destinations = [];

  connectedCallback() {
    this.#controller?.abort();
    this.#resizeObserver?.disconnect();
    this.#controller = new AbortController();
    const { signal } = this.#controller;

    window.addEventListener('scroll', this.#scheduleActiveUpdate, { passive: true, signal });
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

      if (!(target instanceof HTMLElement) || seenTargets.has(target)) {
        link.hidden = true;
        link.parentElement?.setAttribute('hidden', '');
        link.removeAttribute('aria-current');
        continue;
      }

      seenTargets.add(target);
      target.dataset.relivanowPdpAnchor = key ?? '';
      link.href = `#${target.id}`;
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

  #updateActiveLocation() {
    if (this.hidden || this.#destinations.length === 0) return;

    const headerHeight = Number.parseFloat(
      getComputedStyle(document.body).getPropertyValue('--header-group-height')
    );
    const activationLine = (Number.isFinite(headerHeight) ? headerHeight : 0) + this.offsetHeight + 1;
    let activeDestination = this.#destinations[0];

    for (const destination of this.#destinations) {
      if (destination.target.getBoundingClientRect().top <= activationLine) activeDestination = destination;
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
