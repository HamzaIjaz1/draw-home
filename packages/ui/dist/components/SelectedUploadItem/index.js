"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedUploadItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const pretty_bytes_1 = __importDefault(require("pretty-bytes"));
const Icons_1 = require("../Icons");
const styles_1 = require("./styles");
const icons = {
    '.glb': Icons_1.GlbIcon,
    '.jpg': Icons_1.JpgIcon,
    '.jpeg': Icons_1.JpgIcon,
    '.png': Icons_1.PngIcon,
    '.skm': Icons_1.SkmIcon,
};
const SelectedUploadItem = ({ className, name, sizeBytes, extension, }) => {
    const Icon = icons[extension];
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(Icon, {}), (0, jsx_runtime_1.jsxs)(styles_1.TextContainer, { children: [(0, jsx_runtime_1.jsx)(styles_1.Name, { children: name }), (0, jsx_runtime_1.jsx)(styles_1.Size, { children: (0, pretty_bytes_1.default)(sizeBytes) })] })] }));
};
exports.SelectedUploadItem = SelectedUploadItem;
//# sourceMappingURL=index.js.map