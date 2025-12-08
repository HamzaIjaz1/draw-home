// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');

const filePath = path.resolve('node_modules/zustand/vanilla.d.ts');
const filename = path.parse(__filename).base;

/** @param {boolean} isCheckMode */
module.exports = isCheckMode => {
  const fileLines = fs.readFileSync(filePath, 'utf-8').split('\n');

  if(fileLines[3]?.trim() === "}['_'], replace?: boolean | undefined): void;") {
    if(isCheckMode === true) {
      return 'update-needed';
    }

    fileLines.splice(3, 1, `${fileLines[3].replace(', replace?: boolean | undefined', '')} // modified from \`${filename}\``);

    fs.writeFileSync(filePath, fileLines.join('\n'));
    console.info(`${filename} applied successfully.`);
  } else if(isCheckMode === false) {
    console.info(`${filename} WAS NOT APPLIED.`);
  }
};
