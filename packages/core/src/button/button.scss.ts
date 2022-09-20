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

  :host([fill='ghost']) {
    --_border-width: var(--sl-border-width-button-ghost, var(--sl-border-width-button));
  }

  :host([fill='ghost'][variant='primary']) {
    --_background: var(--sl-color-button-primary-ghost-idle-background);
    --_border-color: var(--sl-color-button-primary-ghost-idle-border);
    --_color: var(--sl-color-button-primary-ghost-idle-foreground);
  }

  :host([fill='ghost'][variant='primary']:hover) {
    --_background: var(--sl-color-button-primary-ghost-hover-background);
    --_border-color: var(--sl-color-button-primary-ghost-hover-border);
    --_color: var(--sl-color-button-primary-ghost-hover-foreground);
  }

  :host([fill='ghost'][variant='primary']:active) {
    --_background: var(--sl-color-button-primary-ghost-active-background);
    --_border-color: var(--sl-color-button-primary-ghost-active-border);
    --_color: var(--sl-color-button-primary-ghost-active-foreground);
  }

  :host([fill='ghost'][variant='primary'][disabled]) {
    --_background: var(--sl-color-button-primary-ghost-disabled-background);
    --_border-color: var(--sl-color-button-primary-ghost-disabled-border);
    --_color: var(--sl-color-button-primary-ghost-disabled-foreground);
  }

  :host([fill='outline']) {
    --_border-width: var(--sl-border-width-button-outline, var(--sl-border-width-button));
  }

  :host([fill='outline'][variant='primary']) {
    --_background: var(--sl-color-button-primary-outline-idle-background);
    --_border-color: var(--sl-color-button-primary-outline-idle-border);
    --_color: var(--sl-color-button-primary-outline-idle-foreground);
  }

  :host([fill='outline'][variant='primary']:hover) {
    --_background: var(--sl-color-button-primary-outline-hover-background);
    --_border-color: var(--sl-color-button-primary-outline-hover-border);
    --_color: var(--sl-color-button-primary-outline-hover-foreground);
  }

  :host([fill='outline'][variant='primary']:active) {
    --_background: var(--sl-color-button-primary-outline-active-background);
    --_border-color: var(--sl-color-button-primary-outline-active-border);
    --_color: var(--sl-color-button-primary-outline-active-foreground);
  }

  :host([fill='outline'][variant='primary'][disabled]) {
    --_background: var(--sl-color-button-primary-outline-disabled-background);
    --_border-color: var(--sl-color-button-primary-outline-disabled-border);
    --_color: var(--sl-color-button-primary-outline-disabled-foreground);
  }

  :host([fill='solid']) {
    --_border-width: var(--sl-border-width-button-solid, var(--sl-border-width-button));
  }

  :host([fill='solid'][variant='primary']) {
    --_background: var(--sl-color-button-primary-solid-idle-background);
    --_border-color: var(--sl-color-button-primary-solid-idle-border);
    --_color: var(--sl-color-button-primary-solid-idle-foreground);
  }

  :host([fill='solid'][variant='primary']:hover) {
    --_background: var(--sl-color-button-primary-solid-hover-background);
    --_border-color: var(--sl-color-button-primary-solid-hover-border);
    --_color: var(--sl-color-button-primary-solid-hover-foreground);
  }

  :host([fill='solid'][variant='primary']:active) {
    --_background: var(--sl-color-button-primary-solid-active-background);
    --_border-color: var(--sl-color-button-primary-solid-active-border);
    --_color: var(--sl-color-button-primary-solid-active-foreground);
  }

  :host([fill='solid'][variant='primary'][disabled]) {
    --_background: var(--sl-color-button-primary-solid-disabled-background);
    --_border-color: var(--sl-color-button-primary-solid-disabled-border);
    --_color: var(--sl-color-button-primary-solid-disabled-foreground);
  }

  :host([fill='solid'][variant='secondary']) {
    --_background: var(--sl-color-button-secondary-solid-idle-background);
    --_border-color: var(--sl-color-button-secondary-solid-idle-border);
    --_color: var(--sl-color-button-secondary-solid-idle-foreground);
  }

  :host([fill='solid'][variant='secondary']:hover) {
    --_background: var(--sl-color-button-secondary-solid-hover-background);
    --_border-color: var(--sl-color-button-secondary-solid-hover-border);
    --_color: var(--sl-color-button-secondary-solid-hover-foreground);
  }

  :host([fill='solid'][variant='secondary']:active) {
    --_background: var(--sl-color-button-secondary-solid-active-background);
    --_border-color: var(--sl-color-button-secondary-solid-active-border);
    --_color: var(--sl-color-button-secondary-solid-active-foreground);
  }

  :host([fill='solid'][variant='secondary'][disabled]) {
    --_background: var(--sl-color-button-secondary-solid-disabled-background);
    --_border-color: var(--sl-color-button-secondary-solid-disabled-border);
    --_color: var(--sl-color-button-secondary-solid-disabled-foreground);
  }

  :host([fill='subtle']) {
    --_border-width: var(--sl-border-width-button-subtle, var(--sl-border-width-button));
  }

  :host([fill='subtle'][variant='primary']) {
    --_background: var(--sl-color-button-primary-subtle-idle-background);
    --_border-color: var(--sl-color-button-primary-subtle-idle-border);
    --_color: var(--sl-color-button-primary-subtle-idle-foreground);
  }

  :host([fill='subtle'][variant='primary']:hover) {
    --_background: var(--sl-color-button-primary-subtle-hover-background);
    --_border-color: var(--sl-color-button-primary-subtle-hover-border);
    --_color: var(--sl-color-button-primary-subtle-hover-foreground);
  }

  :host([fill='subtle'][variant='primary']:active) {
    --_background: var(--sl-color-button-primary-subtle-active-background);
    --_border-color: var(--sl-color-button-primary-subtle-active-border);
    --_color: var(--sl-color-button-primary-subtle-active-foreground);
  }

  :host([fill='subtle'][variant='primary'][disabled]) {
    --_background: var(--sl-color-button-primary-subtle-disabled-background);
    --_border-color: var(--sl-color-button-primary-subtle-disabled-border);
    --_color: var(--sl-color-button-primary-subtle-disabled-foreground);
  }

  :host([size='sm']) {
    --_font: var(--sl-text-button-sm);
    --_padding: var(--sl-space-button-sm);
  }

  :host([size='md']) {
    --_font: var(--sl-text-button-md);
    --_padding: var(--sl-space-button-md);
  }

  :host([size='lg']) {
    --_font: var(--sl-text-button-lg);
    --_padding: var(--sl-space-button-lg);
  }
`;
