"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuHeader = exports.MenuFrame = exports.animationDuration = void 0;
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const MenuFrame_1 = require("../../MenuFrame");
const MenuHeader_1 = require("../../MenuHeader");
const styles_1 = require("../../../utils/styles");
const styles_2 = require("../base/styles");
const _props_1 = require("../../../utils/$props");
// Without 'visibility: hidden', interactable elements such as buttons
// would remain focusable even when offscreen
const hideKeyframes = (0, material_1.keyframes) `
  0% {
    visibility: visible;
  }
  100% {
    visibility: hidden;
  }
`;
exports.animationDuration = 0.2;
exports.MenuFrame = (0, material_1.styled)(MenuFrame_1.MenuFrame, (0, _props_1.$props)())(({ theme, $opened, $noHeightLimit }) => (0, material_1.css) `
  display: flex;
  flex-direction: column;

  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, ${$opened ? 0 : 'calc(100% + 5px)'});
  transition: transform ${exports.animationDuration}s;

  ${$opened === false && (0, material_1.css) `
    animation: ${hideKeyframes} ${exports.animationDuration}s forwards;
  `}

  width: 100%;
  max-width: ${styles_1.menuContainerWidth}px;
  max-height: ${$noHeightLimit === true ? '100svh' : '60svh'};

  ${theme.breakpoints.up('md')} {
    max-width: ${styles_1.menuContainerWidth + styles_1.scrollbarWidth}px;
  }
`);
exports.MenuHeader = (0, material_1.styled)(MenuHeader_1.MenuHeader, (0, _props_1.$props)())(({ $bottomSpacing }) => (0, material_1.css) `
  ${!(0, ts_utils_1.isUndefined)($bottomSpacing) && (0, material_1.css) `
    margin-bottom: ${styles_2.headerSpacing[$bottomSpacing]};
  `}
`);
//# sourceMappingURL=styles.js.map