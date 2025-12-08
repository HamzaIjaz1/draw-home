"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioGroup = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const FormGroup_1 = __importDefault(require("@mui/material/FormGroup"));
const RadioGroup_1 = __importDefault(require("@mui/material/RadioGroup"));
const react_1 = require("react");
const styles_1 = require("./styles");
const RadioGroup = ({ className, name: _name, options, value, onChange, direction, }) => {
    const id = (0, react_1.useId)();
    const name = _name ?? id;
    return ((0, jsx_runtime_1.jsx)(FormGroup_1.default, { className: className, children: (0, jsx_runtime_1.jsx)(RadioGroup_1.default, { name: name, value: value, onChange: (_, value) => onChange(value), row: direction === 'row', children: options.map(({ value, label, disabled }) => ((0, jsx_runtime_1.jsx)(styles_1.FormControlLabel, { value: value, label: (0, jsx_runtime_1.jsx)(styles_1.Label, { children: label }), control: (0, jsx_runtime_1.jsx)(styles_1.Radio, {}), disabled: disabled }, value))) }) }));
};
exports.RadioGroup = RadioGroup;
//# sourceMappingURL=index.js.map