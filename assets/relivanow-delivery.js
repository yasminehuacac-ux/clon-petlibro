import { Component } from '@theme/component';
import { StandardEvents, ProductSelectEvent } from '@shopify/events';

/**
 * Keeps an approved market or variant delivery message synchronized with the
 * same server-rendered variant response used by Horizon commerce components.
 *
 * @extends {Component}
 */
class RelivanowDelivery extends Component {
  #controller = new AbortController();

  connectedCallback() {
    super.connectedCallback();
    const target = this.closest('.shopify-section, dialog');
    target?.addEventListener(StandardEvents.productSelect, this.#handleProductSelect, {
      signal: this.#controller.signal,
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#controller.abort();
  }

  /**
   * @param {ProductSelectEvent} event
   */
  #handleProductSelect = (event) => {
    if (!(event.target instanceof Element) || event.target.closest('product-card')) return;

    event.promise
      .then(({ detail }) => {
        if (!detail?.html) return;
        if (detail.productId && detail.productId !== this.dataset.productId) return;

        const newDelivery = detail.html.querySelector('relivanow-delivery');
        if (!newDelivery) return;

        this.replaceWith(newDelivery);
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') console.warn('[relivanow-delivery] Event promise rejected:', error);
      });
  };
}

if (!customElements.get('relivanow-delivery')) {
  customElements.define('relivanow-delivery', RelivanowDelivery);
}
