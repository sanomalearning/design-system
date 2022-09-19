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
    --_border-radius: var(--sl-border-radius-button);
    --_padding: var(--sl-size-button-lg) var(--sl-space-button-lg);
  }

  :host {
    background: var(--_background);
    border: var(--_border-width) solid var(--_border-color);
    border-radius: var(--_border-radius);
    color: var(--_color);
    cursor: pointer;
    display: inline-flex;
    font: var(--_font);
    padding: var(--_padding);
  }

  :host([disabled]) {
    cursor: default;
    pointer-events: none;
  }

  :host([fill='solid']) {
    --_border-width: var(--sl-border-width-button-solid, var(--sl-border-width-button));
  }

  :host([fill='solid'][variant='primary']) {
    --_background: var(--sl-color-button-primary-solid-idle-background);
    --_border-color: var(--sl-color-button-primary-solid-idle-border);
    --_color: var(--sl-color-button-primary-solid-idle-foreground);
  }

  :host([fill='solid'][variant='secondary']) {
    --_background: var(--sl-color-button-secondary-solid-idle-background);
    --_border-color: var(--sl-color-button-secondary-solid-idle-border);
    --_color: var(--sl-color-button-secondary-solid-idle-foreground);
  }

  :host([size='sm']) {
    --_font: var(--sl-text-button-sm);
  }

  :host([size='md']) {
    --_font: var(--sl-text-button-md);
  }

  :host([size='lg']) {
    --_font: var(--sl-text-button-lg);
  }
`;
