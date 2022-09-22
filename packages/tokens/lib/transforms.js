const FONT_WEIGHTS = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  DemiBold: 600,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
  ExtraBlack: 950
};

export const fontWeights = {
  name: 'css/font-weight',
  type: 'value',
  matcher: token => token.type === 'fontWeights',
  transformer: token => FONT_WEIGHTS[token.value] ?? token.value
};

export const palette = {
  name: 'attribute/palette',
  type: 'attribute',
  transformer: token => {
    const { category, type } = token.attributes;

    if (category === 'color' && type === 'palette') {
      token.palette = true;
    }

    return token;
  }
};

export const shadow = {
  name: 'shadow/css',
  type: 'value',
  transitive: true,
  matcher: token => token.type === 'boxShadow',
  transformer: token => {
    return `${token.value.x} ${token.value.y} ${token.value.blur} ${token.value.spread} ${token.value.color}`;
  }
};

export const sizePx = {
  name: 'size/px',
  type: 'value',
  matcher: token =>
    [
      'borderRadius', 
      'borderWidth',
      'fontSizes',
      'lineHeights', 
      'paragraphSpacing', 
      'sizing', 
      'spacing'
    ].includes(token.type),
  transformer: token => (typeof token.value === 'string' ? token.value : `${token.value}px`)
};

export const typography = {
  name: 'typography/scss',
  type: 'value',
  transitive: true,
  matcher: token => token.type === 'typography',
  transformer: token => {
    console.log('typography', token);
    return '';
  }
};
