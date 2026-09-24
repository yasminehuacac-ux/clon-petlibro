class RelivanowPdpUgc extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', this.#onClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#onClick);
  }

  #onClick = (event) => {
    if (event.target instanceof HTMLDialogElement && event.target.hasAttribute('data-ugc-dialog')) {
      const bounds = event.target.getBoundingClientRect();
      const outside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;
      if (outside) event.target.close();
      return;
    }

    const button = event.target.closest('button');
    if (!button || !this.contains(button)) return;

    if (button.dataset.ugcOpen) {
      this.#dialog(button.dataset.ugcOpen)?.showModal();
      return;
    }
    if (button.hasAttribute('data-ugc-close')) {
      button.closest('dialog')?.close();
      return;
    }
    if (button.dataset.ugcMove) {
      const dialog = button.closest('dialog');
      const dialogs = [...this.querySelectorAll('dialog[data-ugc-dialog]')];
      const index = dialogs.indexOf(dialog);
      const next = dialogs[(index + Number(button.dataset.ugcMove) + dialogs.length) % dialogs.length];
      dialog?.close();
      next?.showModal();
      return;
    }
    if (button.dataset.ugcScroll) {
      this.querySelector('[data-ugc-rail]')?.scrollBy({
        left: Number(button.dataset.ugcScroll) * Math.max(this.clientWidth * 0.72, 260),
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  };

  #dialog(id) {
    return [...this.querySelectorAll('dialog[data-ugc-dialog]')].find((dialog) => dialog.id === id);
  }
}

if (!customElements.get('relivanow-pdp-ugc')) {
  customElements.define('relivanow-pdp-ugc', RelivanowPdpUgc);
}
