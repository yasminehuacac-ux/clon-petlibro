class RelivanowFinalCta extends HTMLElement {
  /** @type {AbortController | undefined} */
  #controller;

  connectedCallback() {
    this.#controller?.abort();
    this.#controller = new AbortController();
    const link = this.querySelector('[data-relivanow-purchase-link]');
    link?.addEventListener('click', this.#handleClick, { signal: this.#controller.signal });
  }

  disconnectedCallback() {
    this.#controller?.abort();
  }

  #handleClick = (event) => {
    const purchasePanel = document.querySelector('[id^="ProductInformation-"]');
    if (!(purchasePanel instanceof HTMLElement)) return;

    event.preventDefault();
    const previousTabindex = purchasePanel.getAttribute('tabindex');
    purchasePanel.setAttribute('tabindex', '-1');
    purchasePanel.focus({ preventScroll: true });
    purchasePanel.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });

    purchasePanel.addEventListener(
      'blur',
      () => {
        if (previousTabindex === null) purchasePanel.removeAttribute('tabindex');
        else purchasePanel.setAttribute('tabindex', previousTabindex);
      },
      { once: true }
    );
  };
}

if (!customElements.get('relivanow-final-cta')) {
  customElements.define('relivanow-final-cta', RelivanowFinalCta);
}
