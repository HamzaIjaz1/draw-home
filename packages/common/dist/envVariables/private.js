"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NODEMAILER_RECEIVER = exports.NODEMAILER_PASS = exports.NODEMAILER_USER = exports.WITH_REACT_SCAN = void 0;
const assert_1 = __importDefault(require("assert"));
const v4_1 = require("zod/v4");
const Envs = v4_1.z.object({
    WITH_REACT_SCAN: v4_1.z.enum(['true', 'false']).default('false'),
    NODEMAILER_USER: v4_1.z.email(),
    NODEMAILER_PASS: v4_1.z.string(),
    NODEMAILER_RECEIVER: v4_1.z.email(),
});
let envs;
try {
    // eslint-disable-next-line no-process-env
    envs = Envs.parse(process.env);
}
catch (e) {
    (0, assert_1.default)(e instanceof v4_1.ZodError, 'This should never happen. |81x6rn|');
    console.error('Zod issues:', e.issues);
    throw e;
}
exports.WITH_REACT_SCAN = Envs.shape.WITH_REACT_SCAN.transform(e => e === 'true').parse(envs.WITH_REACT_SCAN);
exports.NODEMAILER_USER = envs.NODEMAILER_USER;
exports.NODEMAILER_PASS = envs.NODEMAILER_PASS;
exports.NODEMAILER_RECEIVER = envs.NODEMAILER_RECEIVER;
//# sourceMappingURL=private.js.map