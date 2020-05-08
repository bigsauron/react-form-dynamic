module.exports = {
  'plugins': [
    'react',
    'react-hooks',
    'eslint-plugin-import'
  ],
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'node': true,
    'jest': true,
    'es6': true,
    'jasmine': true
  },
  'rules': {
    'no-console': 1,
    'no-multiple-empty-lines': 1,
    'eol-last': 2,
    'semi': 2,
    'eqeqeq': 2,
    'quotes': ['error', 'single'],
    'curly': 2,
    'prefer-const': 2,
    'dot-notation': 1,
    'no-empty-pattern': 1,
    'import/order': ['error', { 'groups': ['external', 'internal'] }],
    'no-unused-vars': 1,
    'react/prop-types': 2,
    'react/destructuring-assignment': [2, 'always'],
    'react/display-name': [2, {
      'ignoreTranspilerName': true
    }],
    'react-hooks/rules-of-hooks': 2,
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1,
        'ignoredNodes': [
          'TemplateLiteral'
        ]
      }
    ],
    'template-curly-spacing': [
      'off'
    ]
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  }
};
