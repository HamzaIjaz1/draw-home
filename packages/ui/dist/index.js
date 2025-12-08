"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("@draw-house/common/dist/polyfills");
const react_1 = require("react");
const client_1 = __importDefault(require("react-dom/client"));
const assert_1 = __importDefault(require("assert"));
const ts_utils_1 = require("@arthurka/ts-utils");
const App_1 = require("./App");
const rootElement = document.getElementById('root');
(0, assert_1.default)(!(0, ts_utils_1.isNull)(rootElement), 'Something went wrong. |mre2a9|');
client_1.default.createRoot(rootElement).render((0, jsx_runtime_1.jsx)(react_1.StrictMode, { children: (0, jsx_runtime_1.jsx)(App_1.App, {}) }));
//# sourceMappingURL=index.js.map