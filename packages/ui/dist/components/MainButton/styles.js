"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.PlusIcon = exports.StyledButton = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const ts_utils_1 = require("@arthurka/ts-utils");
const BaseButton_1 = require("../BaseButton");
const Icons_1 = require("../Icons");
const _props_1 = require("../../utils/$props");
const makeLoaderStyles_1 = require("../../utils/makeLoaderStyles");
const lookup_1 = require("../../utils/lookup");
const textWidths = {
    xl: '230px',
    lg: '174px',
    md: '152px',
    'fit-content': 'fit-content',
    fill: '100%',
};
const heights = {
    md: '44px',
    lg: '56px',
};
const getWidth = (mode, textWidth) => {
    switch (mode) {
        case 'icon':
            return '52px';
        case 'text':
        case 'icon-text':
            return textWidths[textWidth ?? 'fit-content'];
        default:
            ((e) => e)(mode);
            throw new Error('Should be unreachable. |cvx92c|');
    }
};
const getPaddingMultiplier = (padding) => {
    const x = {
        'row 1/4': 0.25,
        sm: 0.5,
        md: 1,
    };
    const y = {
        ...x,
        'row 1/4': 0,
    };
    return { x: x[padding], y: y[padding] };
};
exports.StyledButton = (0, material_1.styled)(BaseButton_1.BaseButton, (0, _props_1.$props)())(({ theme, $mode, $textWidth, $height, $shadowless, $padding, $isLoading, $rounded, $backgroundColor, }) => {
    const paddingValue = (() => {
        const { x, y } = getPaddingMultiplier($padding);
        switch ($mode) {
            case 'text':
            case 'icon-text': return `${8 * y}px ${16 * x}px`;
            case 'icon': return `${6 * y}px ${8 * x}px`;
            default:
                ((e) => e)($mode);
                throw new Error('This should never happen. |97qr2u|');
        }
    })();
    return (0, material_1.css) `
    display: flex;
    gap: 8px;

    width: ${getWidth($mode, $textWidth)};
    height: ${heights[$height]};
    padding: ${paddingValue};

    ${$shadowless === true && (0, material_1.css) `
      box-shadow: none;
      :hover, :active, :focus-within {
        box-shadow: none;
      }
    `}

    border-radius: ${(0, lookup_1.lookup)($rounded, { sm: '10px', md: '100px' })};

    ${!(0, ts_utils_1.isUndefined)($backgroundColor) && (0, material_1.css) `
      background-color: ${$backgroundColor};
      :hover {
        background-color: ${(0, material_1.darken)($backgroundColor, 0.1)};
      }
    `}

    ${(0, makeLoaderStyles_1.makeLoaderStyles)('::before', $isLoading, theme.palette.background.paper)}
  `;
});
exports.PlusIcon = (0, material_1.styled)(Icons_1.PlusIcon) `
  width: 25px;
  height: 25px;
`;
exports.Text = (0, material_1.styled)(Typography_1.default) `
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
`;
//# sourceMappingURL=styles.js.map