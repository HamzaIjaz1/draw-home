// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');

const filePath = path.resolve('node_modules/zustand/vanilla.d.ts');
const filename = path.parse(__filename).base;

/** @param {boolean} isCheckMode */
module.exports = isCheckMode => {
  const fileLines = fs.readFileSync(filePath, 'utf-8').split('\n');

  if(
    true
      && fileLines[1]?.trim() === '_(partial: T | Partial<T> | {'
      && fileLines[2]?.trim() === '_(state: T): T | Partial<T>;'
  ) {
    if(isCheckMode === true) {
      return 'update-needed';
    }

    fileLines.splice(1, 3, `${fileLines[1].replace(' | {', '): void;')} // modified from \`${filename}\``);

    fs.writeFileSync(filePath, fileLines.join('\n'));
    console.info(`${filename} applied successfully.`);
  } else if(isCheckMode === false) {
    console.info(`${filename} WAS NOT APPLIED.`);
  }
};
