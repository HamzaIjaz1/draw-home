// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { execSync } = require('child_process');

const nvmrc = fs.readFileSync(path.join(__dirname, '../.nvmrc'), 'utf-8').trim();

const { node } = process.versions;
const requiredMajor = nvmrc.split('.')[0];
const currentMajor = node.split('.')[0];
assert(currentMajor === requiredMajor, `You must use Node.js v${requiredMajor}.x for this project (${node} used)`);

const npmVersion = execSync('npm -v').toString().trim();
assert(Number(npmVersion.split('.')[0]) === 10, `You must use NPM v10.x.x (${npmVersion} used)`);
