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

    if(fileLines[190]?.trim() === `function ${['set', 'Interval'].join('')}(callback: (args: void) => void, ms?: number): NodeJS.Timeout;`) {
      if(isCheckMode === true) {
        return 'update-needed';
      }

      fileLines.splice(190, 1, `${fileLines[190].replace('ms?: number', 'ms: number')} // modified from \`${filename}\``);

      fs.writeFileSync(filePath, fileLines.join('\n'));
      console.info(`${filename} applied successfully.`);
    } else if(isCheckMode === false) {
      console.info(`${filename} WAS NOT APPLIED.`);
    }

    if(fileLines.slice(183, 188).join('\n').trim() === 'function setInterval<TArgs extends any[]>(\n            callback: (...args: TArgs) => void,\n            ms?: number,\n            ...args: TArgs\n        ): NodeJS.Timeout;') {
      if(isCheckMode === true) {
        return 'update-needed';
      }

      fileLines.splice(185, 1, `${fileLines[185].replace('ms?: number', 'ms: number')} // modified from \`${filename}\``);

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

    if(fileLines[26302]?.trim() === `${['set', 'Interval'].join('')}(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;`) {
      if(isCheckMode === true) {
        return 'update-needed';
      }

      fileLines.splice(26302, 1, `${fileLines[26302].replace('timeout?: number', 'timeout: number')} // modified from \`${filename}\``);

      fs.writeFileSync(filePath, fileLines.join('\n'));
      console.info(`${filename} applied successfully.`);
    } else if(isCheckMode === false) {
      console.info(`${filename} WAS NOT APPLIED.`);
    }

    if(fileLines[28332]?.trim() === `declare function ${['set', 'Interval'].join('')}(handler: TimerHandler, timeout?: number, ...arguments: any[]): number;`) {
      if(isCheckMode === true) {
        return 'update-needed';
      }

      fileLines.splice(28332, 1, `${fileLines[28332].replace('timeout?: number', 'timeout: number')} // modified from \`${filename}\``);

      fs.writeFileSync(filePath, fileLines.join('\n'));
      console.info(`${filename} applied successfully.`);
    } else if(isCheckMode === false) {
      console.info(`${filename} WAS NOT APPLIED.`);
    }
  }
};
