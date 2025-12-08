"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInSuggestion = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("../Form/Button");
const styles_1 = require("./styles");
const LogInSuggestion = ({ text, buttonText, onClick, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { children: [(0, jsx_runtime_1.jsx)(styles_1.SuggestionText, { children: text }), (0, jsx_runtime_1.jsx)(Button_1.FormButton, { variant: 'contained', size: 'medium', text: buttonText, onClick: onClick })] }));
exports.LogInSuggestion = LogInSuggestion;
//# sourceMappingURL=index.js.map