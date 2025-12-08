"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const styles_1 = require("./styles");
const Icons_1 = require("../../Icons");
const icons = {
    blank: Icons_1.BlankTemplateIcon,
    rectangular: Icons_1.RectangularTemplateIcon,
    TShape: Icons_1.TShapeTemplateIcon,
    LShape: Icons_1.LShapeTemplateIcon,
};
const TemplateButton = ({ className, image, onClick, text, }) => {
    const Icon = !(0, ts_utils_1.isArrayIncludes)((0, ts_utils_1.ObjKeys)(icons), image) ? null : icons[image];
    return ((0, jsx_runtime_1.jsxs)(styles_1.Button, { className: className, variant: 'text', onClick: onClick, children: [!(0, ts_utils_1.isNull)(Icon) ? (0, jsx_runtime_1.jsx)(Icon, {}) : ((0, jsx_runtime_1.jsx)(styles_1.Image, { src: image, width: 72, height: 72, draggable: 'false' })), (0, jsx_runtime_1.jsx)(styles_1.Text, { accent: image === 'blank', children: text })] }));
};
exports.TemplateButton = TemplateButton;
//# sourceMappingURL=index.js.map