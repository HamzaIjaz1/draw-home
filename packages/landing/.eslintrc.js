// @ts-check
'use strict';

// eslint-disable-next-line no-process-env
const isHuskyPrecommitTime = process.env.IS_HUSKY_PRECOMMIT_TIME === 'true';

module.exports = ((/** @type {import('eslint').Linter.Config} */ e) => e)({
  extends: [
    '../../.eslintrc.js',
    ...isHuskyPrecommitTime ? [] : ['next/core-web-vitals'],
  ],
  rules: {
    ...!isHuskyPrecommitTime && {
      '@typescript-eslint/prefer-optional-chain': 'off',
    },
    strict: 'off',
    'react/display-name': 'off',
  },
});
