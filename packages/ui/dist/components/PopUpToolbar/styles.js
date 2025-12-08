"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandableItemsContainer = exports.Container = exports.Anchor = void 0;
const material_1 = require("@mui/material");
const framer_motion_1 = require("framer-motion");
const constants_1 = require("@draw-house/common/dist/constants");
const MenuFrame_1 = require("../MenuFrame");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
exports.Anchor = (0, material_1.styled)('div') `
  position: fixed;
  z-index: ${constants_1.specialZIndexTop};
  cursor: grab;

  * {
    :active {
      user-drag: none;
      -webkit-user-drag: none
    }
  }
`;
const ContainerOptions = (0, createStyledOptions_1.createStyledOptions)({
    orientation: true,
    mode: true,
});
exports.Container = (0, material_1.styled)(MenuFrame_1.MenuFrame, ContainerOptions)(({ orientation, mode }) => (0, material_1.css) `
  display: flex;
  align-items: center;
  padding: 4px;
  gap: 4px;
  flex-wrap: wrap;
  width: max-content;

  box-shadow: 2px 2px 10px 0px #0000004d;
  border-radius: 20px;

  ${orientation === 'vertical' && (0, material_1.css) `
    flex-direction: column;
    height: fit-content;
  `}
  ${mode === 'floating' && (0, material_1.css) `
    position: absolute;
    left: 0px;
    top: 0px;
  `}
`);
exports.ExpandableItemsContainer = (0, material_1.styled)(framer_motion_1.motion.div) `
  display: flex;
  flex-direction: column;
`;
//# sourceMappingURL=styles.js.map