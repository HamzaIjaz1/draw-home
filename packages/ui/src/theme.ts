import { createTheme, ThemeOptions as MuiThemeOptions } from '@mui/material';

export const backgroundSecondary = '#e9e9e9';
export const slightShadow = '0px 5px 10px 0px #0000000d';
export const accentShadow = '0px 4px 10px 0px #00000026';
export const menuShadow = '4px 0px 10px 0px #00000040';
export const buttonShadow = '4px 0px 10px 0px #00000040';
export const menuRowDisabled = '#aeaeae';

export const colorPickerRed = '#de0c0f';
export const colorPickerGreen = '#2cc765';
export const colorPickerBlue = '#1f50d8';

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
} as const satisfies MuiThemeOptions['palette'];

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
} as const satisfies MuiThemeOptions;

export const theme = createTheme(themeOptions);
