/**
 * @typedef {{ id: number | string, available: boolean, options: string[] }} ProductVariant
 */

/**
 * Return an exact available Variant for the selected option values.
 *
 * @param {ProductVariant[]} variants
 * @param {string[]} selectedOptions
 * @returns {ProductVariant | null}
 */
export function findVariantByOptions(variants, selectedOptions) {
  if (!Array.isArray(variants) || !Array.isArray(selectedOptions)) return null;
  if (selectedOptions.length === 0) {
    return variants.length === 1 && variants[0].available === true ? variants[0] : null;
  }

  return (
    variants.find(
      (variant) =>
        variant.available === true &&
        variant.options.length === selectedOptions.length &&
        variant.options.every((option, index) => option === selectedOptions[index]),
    ) ?? null
  );
}

if (typeof HTMLElement !== 'undefined' && typeof customElements !== 'undefined') {
  class RelivanowCompleteLookCard extends HTMLElement {
    /** @type {AbortController | null} */
    #abortController = null;

    /** @type {ProductVariant[]} */
    #variants = [];

    connectedCallback() {
      this.#abortController?.abort();
      this.#abortController = new AbortController();

      const data = this.querySelector('[data-variants-json]')?.textContent;
      try {
        this.#variants = data ? JSON.parse(data) : [];
      } catch {
        this.#variants = [];
      }

      this.addEventListener('change', this.#handleChange, { signal: this.#abortController.signal });
      this.#sync();
    }

    disconnectedCallback() {
      this.#abortController?.abort();
      this.#abortController = null;
    }

    #handleChange = (event) => {
      if (!(event.target instanceof HTMLInputElement) || !event.target.matches('[data-relivanow-option]')) return;
      this.#sync();
    };

    #selectedOptions() {
      return Array.from(this.querySelectorAll('[data-relivanow-option]:checked'))
        .sort((left, right) => Number(left.dataset.optionPosition) - Number(right.dataset.optionPosition))
        .map((input) => /** @type {HTMLInputElement} */ (input).value);
    }

    #sync() {
      const selectedOptions = this.#selectedOptions();
      const variant = findVariantByOptions(this.#variants, selectedOptions);
      const variantId = variant ? String(variant.id) : '';
      const state = variantId
        ? this.querySelector(`[data-variant-state][data-variant-id="${CSS.escape(variantId)}"]`)
        : null;
      const variantInput = /** @type {HTMLInputElement | null} */ (this.querySelector('[ref="variantId"]'));
      const button = /** @type {HTMLButtonElement | null} */ (this.querySelector('[ref="addToCartButton"]'));
      const price = this.querySelector('[data-complete-look-price]');
      const availability = this.querySelector('[data-complete-look-availability]');
      const image = /** @type {HTMLImageElement | null} */ (
        this.querySelector('[data-complete-look-image], .rn-complete__image--native')
      );

      if (variantInput) {
        variantInput.value = variantId;
        variantInput.disabled = !variant;
      }
      if (button) button.disabled = !variant;

      if (price) price.textContent = state?.getAttribute('data-price') ?? '';
      if (availability) availability.textContent = state?.getAttribute('data-availability') ?? '';

      const imageUrl = state?.getAttribute('data-image-url');
      if (image && imageUrl) {
        image.src = imageUrl;
        image.srcset = imageUrl;
        image.alt = state?.getAttribute('data-image-alt') ?? '';
      }

      for (const selectedLabel of this.querySelectorAll('[data-selected-option-position]')) {
        const position = Number(selectedLabel.getAttribute('data-selected-option-position'));
        selectedLabel.textContent = selectedOptions[position - 1] ?? '';
      }
    }
  }

  if (!customElements.get('relivanow-complete-look-card')) {
    customElements.define('relivanow-complete-look-card', RelivanowCompleteLookCard);
  }
}
