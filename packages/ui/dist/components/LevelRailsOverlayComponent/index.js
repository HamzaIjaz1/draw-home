"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LevelRailsOverlayComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ts_utils_1 = require("@arthurka/ts-utils");
const assert_1 = __importDefault(require("assert"));
const styles_1 = require("./styles");
const LevelRailsOverlayComponent = ({ visible, rightPad, overlayRightEdgePx, rails, }) => (visible === false ? null : ((0, jsx_runtime_1.jsx)(styles_1.Overlay, { "$visible": visible, "$rightPad": rightPad, children: rails.map(({ levelId, title, railX1, railX2, screenY, active = true, elevationText = '' }) => {
        (0, assert_1.default)(!(0, ts_utils_1.isUndefined)(title), 'This should never happen. |8a1w7a|');
        const endX = Math.min(railX2, overlayRightEdgePx - 2);
        const startX = Math.min(railX1, endX);
        const elevationY = Math.round(screenY) - 16;
        const labelY = elevationY + 18;
        const lineY = Math.round(screenY) + 0.5;
        return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(styles_1.RailLine, { "$y": lineY, "$x1": startX, "$x2": endX }), (0, jsx_runtime_1.jsxs)(styles_1.Pill, { "$y": labelY, "$x": endX, children: [(0, jsx_runtime_1.jsx)(styles_1.PillText, { children: title }), (0, jsx_runtime_1.jsx)("div", { style: { transform: 'none' }, children: (0, jsx_runtime_1.jsx)(styles_1.Triangle, { "$active": active }) })] }), elevationText.length > 0 && (0, jsx_runtime_1.jsx)(styles_1.ElevationText, { "$y": elevationY, "$x": endX, children: elevationText })] }, levelId));
    }) })));
exports.LevelRailsOverlayComponent = LevelRailsOverlayComponent;
//# sourceMappingURL=index.js.map