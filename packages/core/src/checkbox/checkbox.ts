import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { FormControlMixin } from '@open-wc/form-control';
import { LitElement, html, svg } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './checkbox.scss.js';

export class Checkbox extends FormControlMixin(LitElement) {
  /** @private */
  static override styles: CSSResultGroup = styles;

  /** Whether the checkbox is checked. */
  @property({ type: Boolean }) checked = false;

  /** Whether the checkbox has the indeterminate state. */
  @property({ type: Boolean }) indeterminate = false;

  /** The value of the checkbox when checked. */
  @property() value = '';

  connectedCallback(): void {
    super.connectedCallback();

    this.internals.role = 'checkbox';

    this.addEventListener('click', () => (this.checked = !this.checked));
  }

  updated(changes: PropertyValues<this>): void {
    if (changes.has('checked') || changes.has('indeterminate')) {
      this.internals.ariaChecked = this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false';

      if (this.indeterminate) {
        this.internals.states.add('--indeterminate');
      } else {
        this.internals.states.delete('--indeterminate');
      }

      if (this.checked) {
        this.internals.states.add('--checked');
      } else {
        this.internals.states.delete('--checked');
      }
    }

    if (changes.has('checked') || changes.has('value')) {
      this.setValue(this.value);
    }
  }

  render(): TemplateResult {
    return html`
      <span class="box">
        <svg version="1.1" aria-hidden="true" focusable="false" part="svg" viewBox="0 0 24 24">
          ${this.indeterminate
            ? svg`<path d="M4.1,12 9,12 20.3,12"></path>`
            : svg`<path d="M4.1,12.7 9,17.6 20.3,6.3"></path>`}
        </svg>
      </span>
      <slot></slot>
    `;
  }

  resetFormControl(): void {
    this.checked = this.hasAttribute('checked');
  }

  shouldFormValueUpdate(): boolean {
    return this.checked;
  }
}