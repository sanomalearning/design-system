import type { TemplateResult } from 'lit';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-counter')
export class MyCounter extends LitElement {
  @property({ type: Number }) count = 0;

  override render(): TemplateResult {
    return html`
      <button @click=${() => this.count++}>Increment</button>
      <div>Count: ${this.count}</div>
    `;
  }

  static override styles = css`
    :host {
      display: block;
    }

    button {
      background-color: var(--primary-color);
      color: var(--on-primary-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-counter': MyCounter;
  }
}
