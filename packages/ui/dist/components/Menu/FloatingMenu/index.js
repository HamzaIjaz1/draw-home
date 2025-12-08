"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloatingMenu = exports.floatingMenuClassName = exports.menuFrameWidth = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const MenuHeader_1 = require("../../MenuHeader");
const MenuFrame_1 = require("../../MenuFrame");
const clsx_1 = require("../../../utils/clsx");
const _props_1 = require("../../../utils/$props");
const lookup_1 = require("../../../utils/lookup");
const styles_1 = require("../../../utils/styles");
const styles_2 = require("../base/styles");
exports.menuFrameWidth = styles_1.menuContainerWidth + styles_1.scrollbarWidth;
const MenuFrame = (0, material_1.styled)(MenuFrame_1.MenuFrame, (0, _props_1.$props)())(({ $width }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;
  flex: 1;
  width: ${(0, lookup_1.lookup)($width, { fixed: `${exports.menuFrameWidth}px`, 'fit-content': 'fit-content' })};
  max-width: 95svw;
  max-height: 100%;
`);
exports.floatingMenuClassName = 'floating-menu';
const FloatingMenu = ({ className, title, onClose, onBack, children, header, noDivider = false, noStableScrollbarGutter = false, width = 'fixed', }) => ((0, jsx_runtime_1.jsxs)(MenuFrame, { className: (0, clsx_1.clsx)([className, exports.floatingMenuClassName]), "$width": width, children: [(0, jsx_runtime_1.jsxs)(styles_2.FixedContent, { "$noDivider": noDivider, "$noStableScrollbarGutter": noStableScrollbarGutter, children: [(0, jsx_runtime_1.jsx)(MenuHeader_1.MenuHeader, { text: title, onBack: onBack, onClose: onClose }), header] }), (0, jsx_runtime_1.jsx)(styles_2.ScrollableContent, { "$noStableScrollbarGutter": noStableScrollbarGutter, children: children })] }));
exports.FloatingMenu = FloatingMenu;
//# sourceMappingURL=index.js.map