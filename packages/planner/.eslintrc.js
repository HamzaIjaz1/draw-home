// @ts-check
'use strict';

module.exports = ((/** @type {import('eslint').Linter.Config} */ e) => e)({
  extends: '../../.eslintrc.js',
  overrides: [
    {
      files: '*/calculationsByJovan/*',
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
      },
    },
  ],
});
