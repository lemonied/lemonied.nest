module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'semi': 'error',
    'object-curly-spacing': ['error', 'always'],
    'no-console': 'warn',
    'quotes': ['error', 'single'],
    'indent': ['error', 2, { 'SwitchCase': 1, 'ignoredNodes': ['PropertyDefinition'] }],
    'keyword-spacing': 'error',
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'camelcase': ['error', {
      'properties': 'never'
    }],
    'space-infix-ops': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'no-debugger': 'warn',
  },
};
