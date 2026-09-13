import { Component } from '@theme/component';

/**
 * Handles copying text to clipboard, from an event like a click.
 * Optionally, reveals a success message after copying.
 * @extends {Component}
 */
class CopyToClipboardComponent extends Component {
  async copyToClipboard() {
    const copyContent = this.getAttribute('text-to-copy');

    if (!copyContent) return;

    const copySuccessMessage = this.refs.copySuccessMessage;
    const copyErrorMessage = this.refs.copyErrorMessage;

    try {
      await navigator.clipboard.writeText(copyContent);
      if (copyErrorMessage instanceof Element) copyErrorMessage.classList.add('visually-hidden');
      if (copySuccessMessage instanceof Element) copySuccessMessage.classList.remove('visually-hidden');
    } catch {
      if (copySuccessMessage instanceof Element) copySuccessMessage.classList.add('visually-hidden');
      if (copyErrorMessage instanceof Element) copyErrorMessage.classList.remove('visually-hidden');
    }
  }
}

if (!customElements.get('copy-to-clipboard-component')) {
  customElements.define('copy-to-clipboard-component', CopyToClipboardComponent);
}
