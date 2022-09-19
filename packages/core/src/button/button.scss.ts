import { css } from 'lit';

export default css`
  :host {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  :host {
    background: var(--_background);
    border: 1px solid var(--_border-color);
    color: var(--_color);
    display: inline-flex;
  }

  :host([variant='solid']) {
    --_background: var(--sl-color-button-primary-solid-idle-background);
    --_border-color: var(--sl-color-button-primary-solid-idle-border);
    --_color: var(--sl-color-button-primary-solid-idle-foreground);
  }
`;
