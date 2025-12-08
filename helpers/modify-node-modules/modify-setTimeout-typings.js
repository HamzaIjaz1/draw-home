// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');

/** @param {boolean} isCheckMode */
module.exports = isCheckMode => {
  {
    const filePath = path.resolve('node_modules/@types/node/timers.d.ts');
    const filename = path.parse(__filename).base;
    const fileLines = fs.readFileSync(filePath, 'utf-8').split('\n');

    if(fileLines[158]?.trim() === `function ${['set', 'Timeout'].join('')}(callback: (args: void) => void, ms?: number): NodeJS.Timeout;`) {
      if(isCheckMode === true) {
        return 'update-needed';
      }

      fileLines.splice(158, 1, `${fileLines[158].replace('ms?: number', 'ms: number')} // modified from \`${filename}\``);

      fs.writeFileSync(filePath, fileLines.join('\n'));
      console.info(`${filename} applied successfully.`);
    } else if(isCheckMode === false) {
      console.info(`${filename} WAS NOT APPLIED.`);
    }

    if(fileLines.slice(151, 156).join('\n').trim() === 'function setTimeout<TArgs extends any[]>(\n            callback: (...args: TArgs) => void,\n            ms?: number,\n            ...args: TArgs\n        ): NodeJS.Timeout;') {
      if(isCheckMode === true) {
        return 'update-needed';
      }

      fileLines.splice(153, 1, `${fileLines[153].replace('ms?: number', 'ms: number')} // modified from \`${filename}\``);

      fs.writeFileSync(filePath, fileLines.join('\n'));
      console.info(`${filename} applied successfully.`);
    } else if(isCheckMode === false) {
      console.info(`${filename} WAS NOT APPLIED.`);
    }
  }

  {
    const filePath = path.resolve('node_modules/typescript/lib/lib.dom.d.ts');
    const filename = path.parse(__filename).base;
    const fileLines = fs.readFileSync(filePath, 'utf-8').split('\n');

    if(fileLines[26304]?.trim() === `${['set', 'Timeout'].join('')}(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;`) {
      if(isCheckMode === true) {
        return 'update-needed';
      }

      fileLines.splice(26304, 1, `${fileLines[26304].replace('timeout?: number', 'timeout: number')} // modified from \`${filename}\``);

      fs.writeFileSync(filePath, fileLines.join('\n'));
      console.info(`${filename} applied successfully.`);
    } else if(isCheckMode === false) {
      console.info(`${filename} WAS NOT APPLIED.`);
    }

    if(fileLines[28334]?.trim() === `declare function ${['set', 'Timeout'].join('')}(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;`) {
      if(isCheckMode === true) {
        return 'update-needed';
      }

      fileLines.splice(28334, 1, `${fileLines[28334].replace('timeout?: number', 'timeout: number')} // modified from \`${filename}\``);

      fs.writeFileSync(filePath, fileLines.join('\n'));
      console.info(`${filename} applied successfully.`);
    } else if(isCheckMode === false) {
      console.info(`${filename} WAS NOT APPLIED.`);
    }
  }
};
