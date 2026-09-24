class RelivanowOfferings extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeydown);
    const firstOffer = this.querySelector('[data-offer-slot]');
    const initialSlot = firstOffer?.getAttribute('data-offer-slot');
    const initialTab = initialSlot
      ? [...this.querySelectorAll('[role="tab"]')].find((tab) => tab.dataset.benefitSlot === initialSlot)
      : null;
    this.#select(initialTab ?? this.querySelector('[role="tab"]'));
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick);
    this.removeEventListener('keydown', this.#onKeydown);
  }

  #onKeydown = (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    const current = event.target.closest('[role="tab"]');
    if (!current || !this.contains(current)) return;
    const tabs = [...this.querySelectorAll('[role="tab"]')];
    const currentIndex = tabs.indexOf(current);
    const nextIndex =
      event.key === 'Home'
        ? 0
        : event.key === 'End'
          ? tabs.length - 1
          : (currentIndex + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    event.preventDefault();
    tabs[nextIndex]?.focus();
    this.#select(tabs[nextIndex]);
  };

  #onClick = (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (tab && this.contains(tab)) {
      this.#select(tab);
      return;
    }
    const control = event.target.closest('[data-offerings-scroll]');
    if (!control || !this.contains(control)) return;
    this.querySelector('[data-offerings-rail]')?.scrollBy({
      left: Number(control.dataset.offeringsScroll) * Math.max(this.clientWidth * 0.7, 280),
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  #select(tab) {
    if (!(tab instanceof HTMLElement)) return;
    const slot = tab.dataset.benefitSlot;
    this.querySelector('[role="tabpanel"]')?.setAttribute('aria-labelledby', tab.id);
    for (const candidate of this.querySelectorAll('[role="tab"]')) {
      const selected = candidate === tab;
      candidate.setAttribute('aria-selected', String(selected));
      candidate.tabIndex = selected ? 0 : -1;
    }
    for (const offer of this.querySelectorAll('[data-offer-slot]')) {
      offer.hidden = offer.getAttribute('data-offer-slot') !== slot;
    }
  }
}

if (!customElements.get('relivanow-offerings')) customElements.define('relivanow-offerings', RelivanowOfferings);
