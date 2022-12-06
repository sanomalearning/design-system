import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { FormControlMixin } from '@open-wc/form-control';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './button.scss.js';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonFill = 'default' | 'outline' | 'pill';

export type ButtonType = 'button' | 'reset' | 'submit';

export type ButtonVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export class Button extends FormControlMixin(LitElement) {
  /** @private */
  static override styles: CSSResultGroup = styles;

  #onClick = (event: Event): void => {
    if (this.hasAttribute('disabled')) {
      event.preventDefault();
      event.stopPropagation();
    } else if (this.type === 'reset' && !event.defaultPrevented) {
      this.form?.reset();
    } else if (this.type === 'submit' && !event.defaultPrevented) {
      this.form?.requestSubmit();
    }
  };

  #onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      this.click();

      event.preventDefault();
      event.stopPropagation();
    }
  };

  /** The original tabIndex before disabled. */
  #originalTabIndex = 0;

  /** Whether the button is disabled. */
  @property({ type: Boolean }) disabled?: boolean;

  /** The button fill. */
  @property({ reflect: true }) fill: ButtonFill = 'default';

  /** Button size. */
  @property({ reflect: true }) size: ButtonSize = 'md';

  /**
   * The button type. Defaults to `button`, but can be set to `submit` when used in a form.
   * @type {button | reset | submit}
   */
  @property() type: ButtonType = 'button';

  /** The button variant. If no variant is specified, it uses the default button style. */
  @property({ reflect: true }) variant: ButtonVariant = 'default';

  override connectedCallback(): void {
    super.connectedCallback();

    this.internals.role = 'button';

    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeydown);
  }

  override disconnectedCallback(): void {
    this.removeEventListener('click', this.#onClick);
    this.removeEventListener('keydown', this.#onKeydown);

    super.disconnectedCallback();
  }

  override firstUpdated(changes: PropertyValues<this>): void {
    super.firstUpdated(changes);

    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }
  }

  override updated(changes: PropertyValues<this>): void {
    super.updated(changes);

    if (changes.has('disabled')) {
      if (this.disabled) {
        this.#originalTabIndex = this.tabIndex;
      }

      this.tabIndex = this.disabled ? -1 : this.#originalTabIndex;
    }
  }

  override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
