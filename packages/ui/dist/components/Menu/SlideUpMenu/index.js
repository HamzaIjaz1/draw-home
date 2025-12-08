"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlideUpMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("../base/styles");
const styles_2 = require("./styles");
const SlideUpMenu = ({ className, title, opened, onClose, onBack, children, header, noDivider = false, headerSpacing, noHeightLimit = false, }) => ((0, jsx_runtime_1.jsxs)(styles_2.MenuFrame, { className: className, corners: { down: 'angular' }, "$opened": opened, "$noHeightLimit": noHeightLimit, children: [(0, jsx_runtime_1.jsxs)(styles_1.FixedContent, { "$noDivider": noDivider, "$bottomSpacing": headerSpacing?.bottom, "$noStableScrollbarGutter": false, children: [(0, jsx_runtime_1.jsx)(styles_2.MenuHeader, { text: title, onBack: onBack, onClose: onClose, "$bottomSpacing": headerSpacing?.top }), header] }), (0, jsx_runtime_1.jsx)(styles_1.ScrollableContent, { "$noStableScrollbarGutter": false, children: children })] }));
exports.SlideUpMenu = SlideUpMenu;
//# sourceMappingURL=index.js.map