module.exports = {
  extends: ['airbnb', 'prettier'],
  // plugins: ['require-jsdoc-except'],
  env: {
    jest: true,
    jasmine: true,
    browser: true,
  },
  settings: {
    'import/resolver': 'webpack', // eslint-import-resolver-webpack
  },
  overrides: [
    {
      files: ['**/__tests__/**'], // For dynamic imports in our tests
      parser: 'babel-eslint',
    },
  ],
  rules: {
    'linebreak-style': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    radix: ['error', 'as-needed'],
    'spaced-comment': 'warn',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    // 'valid-jsdoc': ['error', { requireReturn: false, matchDescription: '.+' }],
    // 'require-jsdoc-except/require-jsdoc': [
    //   'error',
    //   {
    //     require: {
    //       FunctionDeclaration: true,
    //       MethodDefinition: true,
    //       ClassDeclaration: true,
    //       ArrowFunctionExpression: true,
    //       FunctionExpression: true,
    //     },
    //     ignore: ['render'],
    //   },
    // ],
  },
};
