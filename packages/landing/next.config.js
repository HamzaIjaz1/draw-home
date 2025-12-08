// @ts-check
'use strict';

const { publicEnvs: { NODE_ENV, ...publicEnvs } } = require('@draw-house/common/dist/envVariables/public');

module.exports = ((/** @type {import('next').NextConfig} */ e) => e)({
  env: publicEnvs,
  compiler: {
    styledComponents: true,
  },
});
