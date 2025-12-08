"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CenterBlurryWrapperFullViewport = exports.CenterWrapperFullViewport = void 0;
const constants_1 = require("@draw-house/common/dist/constants");
const material_1 = require("@mui/material");
exports.CenterWrapperFullViewport = (0, material_1.styled)('div') `
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
exports.CenterBlurryWrapperFullViewport = (0, material_1.styled)('div') `
  position: fixed;
  inset: 0;
  z-index: ${constants_1.specialZIndexTop};
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(20px);
  background: rgba(0, 0, 0, 0.15);
  pointer-events: all;
`;
//# sourceMappingURL=CenterWrapperFullViewport.js.map