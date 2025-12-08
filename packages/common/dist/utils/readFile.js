"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const promises_1 = require("fs/promises");
const readFile = async (filePath) => {
    try {
        return await (0, promises_1.readFile)(filePath, 'utf-8');
    }
    catch (e) {
        return null;
    }
};
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map