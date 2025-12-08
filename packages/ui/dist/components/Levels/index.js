"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Levels = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const List_1 = __importDefault(require("@mui/material/List"));
const Level_1 = require("../Level");
const styles_1 = require("./styles");
const keys = [' ', 'Enter'];
const Levels = ({ className, items }) => ((0, jsx_runtime_1.jsx)(List_1.default, { className: className, role: 'listbox', children: items.map(({ id, onClick, highlighted = false, ...rest }) => ((0, jsx_runtime_1.jsx)(styles_1.ListItem, { role: 'option', tabIndex: 0, onClick: onClick, onKeyUp: e => {
            if (keys.includes(e.key)) {
                onClick();
            }
        }, onKeyDown: e => {
            if (keys.includes(e.key)) {
                e.preventDefault();
            }
        }, highlighted: highlighted, children: (0, jsx_runtime_1.jsx)(Level_1.Level, { ...rest, showTransparencyOption: highlighted }) }, id))) }));
exports.Levels = Levels;
//# sourceMappingURL=index.js.map