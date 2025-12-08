"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@draw-house/common/dist/utils");
const ts_utils_1 = require("@arthurka/ts-utils");
const Icons_1 = require("../Icons");
const styles_1 = require("./styles");
const icons = {
    myAssets: Icons_1.MyAssetsIcon,
};
const DropdownItem = ({ className, label, image, icon, state = 'default', onClick, }) => ((0, jsx_runtime_1.jsxs)(styles_1.MenuItem, { className: className, onClick: onClick, selected: state === 'active', tabIndex: 0, children: [(0, jsx_runtime_1.jsx)(styles_1.Text, { children: label }), !(0, ts_utils_1.isUndefined)(image) && ((0, jsx_runtime_1.jsx)(styles_1.Image, { src: image })), !(0, ts_utils_1.isUndefined)(icon) && (0, utils_1.letIn)(icons[icon], Icon => ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Icon, {}) })))] }));
exports.DropdownItem = DropdownItem;
//# sourceMappingURL=index.js.map