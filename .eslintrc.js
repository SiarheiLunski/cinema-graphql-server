module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    indent: ['error', 2],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/no-inferrable-types': [
      'warn',
      {
        ignoreParameters: true
      }
    ],
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  overrides: [
    {
      files: ['**/*.test.ts'],
      extends: ['plugin:jest/recommended'],
      env: {
        'jest': true
      },
      rules: {
        '@typescript-eslint/no-use-before-define': 'off'
      }
    }
  ]
};
