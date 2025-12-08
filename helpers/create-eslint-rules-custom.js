// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { trimMultiline } = require('@arthurka/ts-utils');

/** @param {string} pathName */
const checkFileExists = pathName => {
  try {
    fs.readFileSync(pathName);

    return true;
  } catch(e) {
    assert(e instanceof Error, 'This should never happen. |kp9pfh|');

    if(e.message.match(/no such file or directory/i)) {
      return false;
    }

    throw e;
  }
};

const fileName = '.eslint-rules-custom.js';
const pathName = path.resolve(`./${fileName}`);

if(checkFileExists(pathName)) {
  console.info(`${fileName} exists. Not modified.`);
} else {
  fs.writeFileSync(pathName, `${trimMultiline`
    // @ts-check
    'use strict';

    module.exports = ((/** @type {Required<Pick<import('eslint').Linter.Config, 'rules' | 'overrides'>>} */ e) => e)({
      rules: {},
      overrides: [],
    });
  `}\n`);
  console.info(`${fileName} created.`);
}
