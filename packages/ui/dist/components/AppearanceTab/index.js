"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppearanceTab = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const styles_1 = require("./styles");
const AppearanceTab = ({ className, label, badgeLabel, state, onClick, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, "$state": state, onClick: onClick, children: [(0, jsx_runtime_1.jsx)(styles_1.Label, { "$state": state, noWrap: true, children: label }), (0, ts_utils_1.isUndefined)(badgeLabel) ? null : ((0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(styles_1.BadgeLabel, { "$state": state, children: badgeLabel }) }))] }));
exports.AppearanceTab = AppearanceTab;
//# sourceMappingURL=index.js.map