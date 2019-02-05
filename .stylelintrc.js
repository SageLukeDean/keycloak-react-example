module.exports = {
  extends: [
    'stylelint-config-standard',
    // 'stylelint-config-styled-components',
    'stylelint-config-prettier',
  ],
  // processors: ['stylelint-processor-styled-components'],
  rules: {
    'at-rule-no-vendor-prefix': true,
    'font-family-name-quotes': 'always-where-recommended',
    'function-url-quotes': ['always', { except: ['empty'] }],
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'selector-attribute-quotes': 'always',
    'selector-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
  },
};
