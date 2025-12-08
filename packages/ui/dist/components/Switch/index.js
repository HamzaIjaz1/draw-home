"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Switch_1 = __importDefault(require("@mui/material/Switch"));
const theme_1 = require("../../theme");
const StyledSwitch = (0, material_1.styled)((props) => ((0, jsx_runtime_1.jsx)(Switch_1.default, { focusVisibleClassName: '.Mui-focusVisible', disableRipple: true, ...props })))(({ theme, disabled }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: theme.palette.background.paper,
            '& + .MuiSwitch-track': {
                backgroundColor: disabled === true
                    ? theme_1.menuRowDisabled
                    : theme.palette.secondary.main,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
            '& .MuiSwitch-thumb': {
                backgroundColor: theme.palette.background.paper,
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                backgroundColor: theme.palette.secondary.main,
                border: `6px solid ${theme.palette.background.paper}`,
            },
        },
        '& + .MuiSwitch-track': {
            opacity: 1,
            border: `1px solid ${theme.palette.secondary.main}`,
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            backgroundColor: theme.palette.background.paper,
            border: `6px solid ${theme.palette.secondary.main}`,
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            backgroundColor: theme.palette.text.disabled,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
        backgroundColor: theme.palette.secondary.main,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.background.paper,
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));
const Switch = (props) => ((0, jsx_runtime_1.jsx)(StyledSwitch, { ...props }));
exports.Switch = Switch;
//# sourceMappingURL=index.js.map