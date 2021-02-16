'use strict'

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['import', 'jsx-a11y', 'react', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          caseInsensitive: true,
          order: 'asc',
        },
      },
    ],
    'padding-line-between-statements': [
      'warn',
      {blankLine: 'always', prev: '*', next: 'block'},
      {blankLine: 'always', prev: '*', next: 'block-like'},
      {blankLine: 'always', prev: 'const', next: 'expression'},
      {blankLine: 'always', prev: 'let', next: 'expression'},
      {blankLine: 'always', prev: 'var', next: 'expression'},
      {blankLine: 'always', prev: 'block', next: '*'},
      {blankLine: 'always', prev: 'block-like', next: '*'},
      {blankLine: 'always', prev: '*', next: 'return'},
    ],
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react/no-unescaped-entities': 'off',
  },
  settings: {react: {version: 'detect'}},
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
