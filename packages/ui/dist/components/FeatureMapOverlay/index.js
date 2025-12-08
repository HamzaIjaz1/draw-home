"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureMapOverlay = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const system_1 = require("@mui/system");
const ViewModes_1 = require("./ViewModes");
const WallModes_1 = require("./WallModes");
const FeatureTipButton_1 = require("./FeatureTipButton");
const DrawTools_1 = require("./DrawTools");
const AutoGenerationTools_1 = require("./AutoGenerationTools");
const Overlay = (0, system_1.styled)('div') `
  position: fixed;
  z-index: 4;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;
const FeatureMapOverlay = ({ isTouchScreen, viewModesText, wallModesText, drawToolsText, autoGenerationToolsText, featureTipButtonText, }) => ((0, jsx_runtime_1.jsxs)(Overlay, { children: [(0, jsx_runtime_1.jsx)(ViewModes_1.ViewModes, { isTouchScreen: isTouchScreen, text: viewModesText }), (0, jsx_runtime_1.jsx)(WallModes_1.WallModes, { isTouchScreen: isTouchScreen, text: wallModesText }), (0, jsx_runtime_1.jsx)(DrawTools_1.DrawTools, { isTouchScreen: isTouchScreen, text: drawToolsText }), (0, jsx_runtime_1.jsx)(AutoGenerationTools_1.AutoGenerationTools, { isTouchScreen: isTouchScreen, text: autoGenerationToolsText }), (0, jsx_runtime_1.jsx)(FeatureTipButton_1.FeatureTipButton, { text: featureTipButtonText })] }));
exports.FeatureMapOverlay = FeatureMapOverlay;
//# sourceMappingURL=index.js.map