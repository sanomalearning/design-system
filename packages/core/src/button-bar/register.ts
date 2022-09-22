import { ButtonBar } from './button-bar.js';

customElements.define('sl-button-bar', ButtonBar);

declare global {
  interface HTMLElementTagNameMap {
    'sl-button-bar': ButtonBar;
  }
}
