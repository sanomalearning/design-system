import type { Placement } from './utils/position-anchored-element.js';
import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { supportsTopLayer } from '../utils/css.js';
import { AnchoredPopoverMixin } from './mixins/anchored-popover.js';
import styles from './popover.scss.js';
import { popoverMixinStyles } from './mixins/popover.js';

/**
 * Base popover web component.
 *
 * @csspart container - The container for the popover
 */
export class Popover extends AnchoredPopoverMixin(LitElement) {
  /** @private */
  static override styles: CSSResultGroup = [popoverMixinStyles, styles];

  #onAnchorClick = (event: Event): void => {
    this.#onClick(event);
    event.preventDefault();
  };

  #onDocumentClick = (event: Event): void => this.#onClick(event);

  #onDocumentKeydown = (event: KeyboardEvent): void => {
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();

    if (event.key === 'Escape') {
      this.open = false;
    }
  };

  /** The default popover attribute value. */
  protected defaultPopoverValue?: 'auto' | 'manual';

  /** Popover placement relative to the anchor. */
  @property() placement: Placement = 'top';

  override connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute('popover', this.defaultPopoverValue || '');
  }

  override disconnectedCallback(): void {
    void this.#teardown();

    super.disconnectedCallback();
  }

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has('open')) {
      if (this.open) {
        this.showPopover();
        void this.#setup();
      } else if (typeof changes.get('open') !== 'undefined') {
        this.hidePopover();
        void this.#teardown();
      }
    }
  }

  override render(): TemplateResult {
    return html`
      <div @click=${this.#onContainerClick} class="container" part="container">
        <slot></slot>
      </div>
    `;
  }

  override addEventListenersToAnchor(): void {
    this.anchorElement?.addEventListener('click', this.#onAnchorClick);
  }

  override removeEventListenersFromAnchor(): void {
    this.anchorElement?.removeEventListener('click', this.#onAnchorClick);
  }

  #onClick(event: Event): void {
    if (event.defaultPrevented) {
      return;
    }

    this.open = !this.open;
  }

  #onContainerClick(event: Event): void {
    event.stopPropagation();
  }

  async #setup(): Promise<void> {
    if (!supportsTopLayer) {
      document.documentElement.addEventListener('click', this.#onDocumentClick);
      document.documentElement.addEventListener('keydown', this.#onDocumentKeydown);
    }
  }

  async #teardown(): Promise<void> {
    if (!supportsTopLayer) {
      document.documentElement.removeEventListener('click', this.#onDocumentClick);
      document.documentElement.removeEventListener('keydown', this.#onDocumentKeydown);
    }
  }
}
