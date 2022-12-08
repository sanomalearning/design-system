import type { StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './register.js';

export default {
  title: 'Editor'
};

export const API: StoryObj = {
  render: () => html`<sl-editor value="<b>Hello</b> <em>world</em>!"></sl-editor>`
};
