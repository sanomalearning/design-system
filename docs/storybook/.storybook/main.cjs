module.exports = {
  stories: [
    '../stories/**/*.stories.mdx', 
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '../../../tools/storybook-addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false
      }
    },
    '@storybook/addon-storysource'
  ],
  framework: {
    name: '@storybook/web-components-webpack5',
    options: {}
  },
  core: {
    disableTelemetry: true
  },
  refs: {
    core: {
      title: 'Core',
      url: '/core/'
    },
    grid: {
      title: 'Grid',
      url: '/grid/'
    }
  }
};
