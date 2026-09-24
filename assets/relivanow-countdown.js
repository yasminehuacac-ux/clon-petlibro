/**
 * Accept only a parseable future instant.
 *
 * @param {string} value
 * @param {number} [now]
 * @returns {number | null}
 */
export function parseCountdownTarget(value, now = Date.now()) {
  if (!value) return null;
  const isoWithTimezone = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;
  if (!isoWithTimezone.test(value)) return null;
  const target = Date.parse(value);
  return Number.isFinite(target) && target > now ? target : null;
}

/**
 * @param {number} remainingMilliseconds
 * @returns {{ days: number, hours: number, minutes: number, seconds: number }}
 */
export function getCountdownParts(remainingMilliseconds) {
  const totalSeconds = Math.max(0, Math.floor(remainingMilliseconds / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

if (typeof HTMLElement !== 'undefined' && typeof customElements !== 'undefined') {
  class RelivanowCountdown extends HTMLElement {
    /** @type {number | undefined} */
    #interval;

    /** @type {number | null} */
    #target = null;

    connectedCallback() {
      this.disconnectedCallback();
      this.#target = parseCountdownTarget(this.getAttribute('data-end-at') ?? '');
      if (!this.#target) {
        this.hidden = true;
        return;
      }

      this.#render();
      this.#interval = window.setInterval(() => this.#render(), 1000);
    }

    disconnectedCallback() {
      if (this.#interval !== undefined) window.clearInterval(this.#interval);
      this.#interval = undefined;
    }

    #render() {
      if (!this.#target) return;
      const remaining = this.#target - Date.now();
      if (remaining <= 0) {
        this.hidden = true;
        this.disconnectedCallback();
        this.dispatchEvent(new CustomEvent('relivanow:countdown-expired', { bubbles: true }));
        return;
      }

      const parts = getCountdownParts(remaining);
      for (const [name, value] of Object.entries(parts)) {
        const output = this.querySelector(`[data-countdown-${name}]`);
        if (output) output.textContent = String(value).padStart(2, '0');
      }
    }
  }

  if (!customElements.get('relivanow-countdown')) {
    customElements.define('relivanow-countdown', RelivanowCountdown);
  }
}
