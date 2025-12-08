"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainScreenOverlay = exports.FloatingMenuContainer = exports.IconMenuContainer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const constants_1 = require("@draw-house/common/dist/constants");
const styles_1 = require("./styles");
var styles_2 = require("./styles");
Object.defineProperty(exports, "IconMenuContainer", { enumerable: true, get: function () { return styles_2.IconMenuContainer; } });
Object.defineProperty(exports, "FloatingMenuContainer", { enumerable: true, get: function () { return styles_2.FloatingMenuContainer; } });
const MainScreenOverlay = ({ topLeft, topCenter, topRight, bottomLeft, bottomCenter, bottomCenterPriority, bottomRight, }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(styles_1.TopLeft, { children: topLeft }), (0, jsx_runtime_1.jsx)(styles_1.TopCenter, { children: topCenter }), (0, jsx_runtime_1.jsx)(styles_1.TopRight, { id: constants_1.topRightComponentId, children: topRight }), (0, jsx_runtime_1.jsx)(styles_1.BottomLeft, { hide: !(0, ts_utils_1.isNull)(bottomCenterPriority), children: bottomLeft }), (0, jsx_runtime_1.jsx)(styles_1.BottomCenter, { hide: !(0, ts_utils_1.isNull)(bottomCenterPriority), children: bottomCenter }), (0, jsx_runtime_1.jsx)(styles_1.BottomRight, { hide: !(0, ts_utils_1.isNull)(bottomCenterPriority), children: bottomRight }), (0, jsx_runtime_1.jsx)(styles_1.BottomCenterPriority, { children: bottomCenterPriority })] }));
exports.MainScreenOverlay = MainScreenOverlay;
//# sourceMappingURL=index.js.map