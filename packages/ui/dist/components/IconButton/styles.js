"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.ArrowRotateRightIcon = exports.ArrowRotateLeftIcon = exports.ExpandArrowsIcon = exports.UploadIcon = exports.InsideWallAttachmentIcon = exports.OutsideWallAttachmentIcon = exports.CenterWallAttachmentIcon = exports.RoofIcon = exports.FireplaceIcon = exports.WindowIcon = exports.DoorIcon = exports.BinIcon = exports.EyeClosedIcon = exports.EyeIcon = exports.DuplicateIcon = exports.ToolsIcon = exports.CircleAroundDotIcon = exports.LessThenSignIcon = exports.HamburgerMenuIcon = exports.FloppyDiskIcon = exports.HouseIcon = exports.GearIcon = exports.CloseIcon = exports.LayersIcon = exports.TextIcon = exports.HandPointerIcon = exports.StyledButton = exports.sizeMdDesktop = void 0;
const material_1 = require("@mui/material");
const Button_1 = require("@mui/material/Button");
const ts_utils_1 = require("@arthurka/ts-utils");
const BaseButton_1 = require("../BaseButton");
const Icons_1 = require("../Icons");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const makeLoaderStyles_1 = require("../../utils/makeLoaderStyles");
const theme_1 = require("../../theme");
const StyledButtonOptions = (0, createStyledOptions_1.createStyledOptions)({
    borderRadius: true,
    size: true,
    state: true,
    userVariant: true,
    isLoading: true,
    pulseGlow: true,
});
exports.sizeMdDesktop = 52;
const sizeStyles = {
    xs: theme => (0, material_1.css) `
    width: 28px;
    height: 28px;
    padding: 2px;

    ${theme.breakpoints.up('md')} {
      width: 32px;
      height: 32px;
    }
  `,
    'xs-mobile': () => (0, material_1.css) `
    width: 28px;
    height: 28px;
    padding: 2px;
  `,
    sm: theme => (0, material_1.css) `
    width: 32px;
    height: 32px;
    padding: 4px;

    ${theme.breakpoints.up('md')} {
      width: 40px;
      height: 40px;
    }
  `,
    'sm-mobile': () => (0, material_1.css) `
    width: 32px;
    height: 32px;
    padding: 4px;
  `,
    md: theme => (0, material_1.css) `
    width: 44px;
    height: 44px;
    padding: 6px 8px;

    ${theme.breakpoints.up('md')} {
      width: ${exports.sizeMdDesktop}px;
      height: ${exports.sizeMdDesktop}px;
    }
  `,
    'md-mobile': () => (0, material_1.css) `
    width: 44px;
    height: 44px;
    padding: 6px 8px;
  `,
};
const borderRadiusStyles = {
    default: (0, material_1.css) `
    border-radius: 10px;
  `,
    circle: (0, material_1.css) `
    border-radius: 50%;
  `,
};
const pulseGlowKeyframes = {
    1: (0, material_1.keyframes) `
  0%, 100% {
    box-shadow: 0px 0px 4px 1px ${(0, material_1.alpha)(theme_1.theme.palette.primary.main, 0.6)};
  }
  50% {
    box-shadow: 0px 0px 10px 4px ${theme_1.theme.palette.primary.main};
  }
`,
    2: (0, material_1.keyframes) `
  0%, 100% {
    box-shadow: 0px 0px 4px 1px ${(0, material_1.alpha)(theme_1.theme.palette.primary.main, 0.6)};
  }
  50% {
    box-shadow: 0px 0px 10px 6px ${theme_1.theme.palette.primary.main};
  }
`,
};
exports.StyledButton = (0, material_1.styled)(BaseButton_1.BaseButton, StyledButtonOptions)(({ theme, borderRadius, size, userVariant, state, isLoading, pulseGlow, }) => (0, material_1.css) `
  ${sizeStyles[size](theme)}
  ${borderRadiusStyles[borderRadius]}
  flex-shrink: 0;

  ${(0, makeLoaderStyles_1.makeLoaderStyles)('::before', isLoading, theme.palette.primary.main)}

  ${(() => {
    switch (true) {
        case (userVariant === 'default' || userVariant === 'outlined') && state === 'active': return (0, material_1.css) `
        box-shadow: 2px 2px 10px 0px #0003;
        :hover {
          box-shadow: 4px 4px 12px 0px #0003;
        }
      `;
        case userVariant === 'default' && state !== 'active': return (0, material_1.css) `
        border: none;
        background-color: ${theme.palette.background.paper};
        box-shadow: 2px 2px 10px 0px #0003;
        :hover {
          border: none;
          background-color: ${theme.palette.background.paper};
          box-shadow: 4px 4px 12px 0px #0003;
        }
        &.${Button_1.buttonClasses.disabled} {
          border: none;
        }
      `;
        case userVariant === 'outlined' && state !== 'active': return (0, material_1.css) `
        background-color: ${theme.palette.background.paper};
        box-shadow: 2px 2px 10px 0px #0003;
        border-width: 2px;
        :hover {
          background-color: ${theme.palette.background.paper};
          box-shadow: 4px 4px 12px 0px #0003;
          border-width: 2px;
        }
      `;
        case userVariant === 'text': return (0, material_1.css) `
        background: none;
        box-shadow: none;
      `;
        default: {
            return '';
        }
    }
})()}

  ${!(0, ts_utils_1.isUndefined)(pulseGlow) && (0, material_1.css) `
    animation: ${pulseGlowKeyframes[pulseGlow]} 3s infinite ease-in-out;
  `}
`);
const commonIconSize = (0, material_1.css) `
  width: 24px;
  height: 24px;
`;
exports.HandPointerIcon = (0, material_1.styled)(Icons_1.HandPointerIcon) `
  width: 22px;
  height: 22px;
`;
exports.TextIcon = (0, material_1.styled)(Icons_1.TextIcon) `
  width: 22px;
  height: 22px;
`;
exports.LayersIcon = (0, material_1.styled)(Icons_1.LayersIcon) `
  ${commonIconSize}
`;
exports.CloseIcon = (0, material_1.styled)(Icons_1.CloseIcon) `
  ${commonIconSize}
`;
exports.GearIcon = (0, material_1.styled)(Icons_1.GearIcon) `
  ${commonIconSize}
`;
exports.HouseIcon = (0, material_1.styled)(Icons_1.HouseIcon) `
  width: 20px;
  height: 20px;
`;
exports.FloppyDiskIcon = (0, material_1.styled)(Icons_1.FloppyDiskIcon) `
  ${commonIconSize}
`;
exports.HamburgerMenuIcon = (0, material_1.styled)(Icons_1.HamburgerMenuIcon) `
  width: 22px;
  height: 22px;
`;
exports.LessThenSignIcon = (0, material_1.styled)(Icons_1.LessThenSignIcon) `
  ${commonIconSize}
`;
exports.CircleAroundDotIcon = (0, material_1.styled)(Icons_1.CircleAroundDotIcon) `
  ${commonIconSize}
`;
exports.ToolsIcon = (0, material_1.styled)(Icons_1.ToolsIcon) `
  width: 22px;
  height: 22px;
`;
exports.DuplicateIcon = (0, material_1.styled)(Icons_1.DuplicateIcon) `
  ${commonIconSize}
`;
exports.EyeIcon = (0, material_1.styled)(Icons_1.EyeIcon) `
  ${commonIconSize}
`;
exports.EyeClosedIcon = (0, material_1.styled)(Icons_1.EyeClosedIcon) `
  ${commonIconSize}
`;
exports.BinIcon = (0, material_1.styled)(Icons_1.BinIcon) `
  width: 22px;
  height: 22px;
`;
exports.DoorIcon = (0, material_1.styled)(Icons_1.DoorIcon) `
  width: 22px;
  height: 22px;
`;
exports.WindowIcon = (0, material_1.styled)(Icons_1.WindowIcon) `
  width: 22px;
  height: 22px;
`;
exports.FireplaceIcon = (0, material_1.styled)(Icons_1.FireplaceIcon) `
  width: 22px;
  height: 22px;
`;
exports.RoofIcon = (0, material_1.styled)(Icons_1.RoofIcon) `
  width: 22px;
  height: 22px;
`;
exports.CenterWallAttachmentIcon = (0, material_1.styled)(Icons_1.CenterWallAttachmentIcon) `
  ${commonIconSize}
`;
exports.OutsideWallAttachmentIcon = (0, material_1.styled)(Icons_1.OutsideWallAttachmentIcon) `
  ${commonIconSize}
`;
exports.InsideWallAttachmentIcon = (0, material_1.styled)(Icons_1.InsideWallAttachmentIcon) `
  ${commonIconSize}
`;
exports.UploadIcon = (0, material_1.styled)(Icons_1.UploadIcon) `
  ${commonIconSize}
`;
exports.ExpandArrowsIcon = (0, material_1.styled)(Icons_1.ExpandArrowsIcon) `
  width: 20px;
  height: 20px;
`;
exports.ArrowRotateLeftIcon = (0, material_1.styled)(Icons_1.ArrowRotateLeftIcon) `
  width: 16px;
  height: 16px;
`;
exports.ArrowRotateRightIcon = (0, material_1.styled)(Icons_1.ArrowRotateRightIcon) `
  width: 16px;
  height: 16px;
`;
exports.Image = (0, material_1.styled)('img') `
  width: 24px;
  aspect-ratio: 1 / 1;
`;
//# sourceMappingURL=styles.js.map