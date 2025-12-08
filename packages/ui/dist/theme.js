"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = exports.colorPickerBlue = exports.colorPickerGreen = exports.colorPickerRed = exports.menuRowDisabled = exports.buttonShadow = exports.menuShadow = exports.accentShadow = exports.slightShadow = exports.backgroundSecondary = void 0;
const material_1 = require("@mui/material");
exports.backgroundSecondary = '#e9e9e9';
exports.slightShadow = '0px 5px 10px 0px #0000000d';
exports.accentShadow = '0px 4px 10px 0px #00000026';
exports.menuShadow = '4px 0px 10px 0px #00000040';
exports.buttonShadow = '4px 0px 10px 0px #00000040';
exports.menuRowDisabled = '#aeaeae';
exports.colorPickerRed = '#de0c0f';
exports.colorPickerGreen = '#2cc765';
exports.colorPickerBlue = '#1f50d8';
const mainAccent = '#ff5b4a';
const palette = {
    primary: {
        main: mainAccent,
        light: '#fd7152',
    },
    secondary: {
        main: '#19172c',
    },
    text: {
        primary: '#19172c',
        secondary: '#5e5e5e',
        disabled: '#999',
    },
    background: {
        default: '#fafafa',
        paper: '#fff',
    },
    action: {
        hover: '#fd4431',
        hoverOpacity: 0.1,
        disabled: '#999',
        disabledBackground: '#999',
        disabledOpacity: 1,
        focus: '#ffefed',
    },
    common: {
        black: '#222733',
    },
    form: {
        disabled: 'rgba(255, 91, 74, .4)',
        inputBorder: '#d3d4d6',
    },
    general: {
        purpleGray: '#666276',
        successBorder: '#49b93b',
    },
    error: {
        main: mainAccent,
    },
};
const themeOptions = {
    palette,
    spacing: 4,
    typography: {
        fontFamily: 'Sofia Pro, Arial',
    },
    components: {
        MuiUseMediaQuery: {
            defaultProps: {
                noSsr: true,
            },
        },
    },
};
exports.theme = (0, material_1.createTheme)(themeOptions);
//# sourceMappingURL=theme.js.map