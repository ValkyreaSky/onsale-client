module.exports = {
  'env': {
    'es6': true,
    'browser': true,
    'node': true,
    'jest': true
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'parser': 'babel-eslint',
  'settings': {
    'import/resolver': {
      'node': {
        'paths': [
          './src'
        ]
      }
    }
  },
  'plugins': [
    'react',
    'import'
  ],
  'extends': 'airbnb',
  'rules': {
    'max-len': ['error', {
      'code': 120,
      'tabWidth': 2,
      'ignoreUrls': true,
      'ignoreComments': false,
      'ignoreRegExpLiterals': true,
      'ignoreStrings': true,
      'ignoreTemplateLiterals': true
    }],
    'object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 4, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
      ImportDeclaration: 'never',
      ExportDeclaration: 'never',
    }],
    'no-shadow': 0,
    'no-console': 0,
    'no-alert': 0,
    'no-underscore-dangle': 0,
  },
}
