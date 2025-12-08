"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const react_1 = require("react");
const Icons_1 = require("../Icons");
const styles_1 = require("./styles");
const useOnClickWithLoading_1 = require("../../hooks/useOnClickWithLoading");
const icons = {
    plus: styles_1.PlusIcon,
    plusCircled: Icons_1.PlusCircledIcon,
    bin: Icons_1.BinIcon,
    saveCopy: Icons_1.SaveCopyIcon,
    eyeOutlined: Icons_1.EyeOutlinedIcon,
    reset: Icons_1.ResetIcon,
    chain: Icons_1.ChainIcon,
};
const MainButton = ({ className, icon, onClick, state = 'default', text, width, height = 'lg', shadowless = false, variant = 'contained', iconColors = {}, textColors = {}, backgroundColors = {}, padding = 'md', rounded = 'sm', }) => {
    const theme = (0, material_1.useTheme)();
    const mode = ((0, ts_utils_1.isUndefined)(icon)
        ? 'text'
        : (0, ts_utils_1.isUndefined)(text)
            ? 'icon'
            : 'icon-text');
    const stateToColor = (0, react_1.useMemo)(() => {
        const byVariant = {
            contained: {
                default: theme.palette.background.paper,
                disabled: theme.palette.background.paper,
            },
            text: {
                default: theme.palette.secondary.main,
                disabled: theme.palette.text.disabled,
            },
        };
        return byVariant[variant];
    }, [
        variant,
        theme.palette.background.paper,
        theme.palette.secondary.main,
        theme.palette.text.disabled,
    ]);
    const customIconColor = iconColors[state];
    const IconJSX = (0, react_1.useMemo)(() => {
        if ((0, ts_utils_1.isUndefined)(icon)) {
            return null;
        }
        const Icon = icons[icon];
        const color = !(0, ts_utils_1.isUndefined)(customIconColor) ? customIconColor : stateToColor[state];
        return (0, jsx_runtime_1.jsx)(Icon, { color: color });
    }, [customIconColor, icon, state, stateToColor]);
    const { isOnClickLoading, onCLickWithLoading } = (0, useOnClickWithLoading_1.useOnClickWithLoading)(onClick);
    return ((0, jsx_runtime_1.jsxs)(styles_1.StyledButton, { className: className, variant: variant, disabled: state === 'disabled', "$isLoading": isOnClickLoading, onClick: onCLickWithLoading, "$mode": mode, "$textWidth": width, "$height": height, "$shadowless": shadowless, "$padding": padding, "$rounded": rounded, "$backgroundColor": backgroundColors[state], children: [IconJSX, !!text && ((0, jsx_runtime_1.jsx)(styles_1.Text, { style: { color: textColors[state] ?? stateToColor[state] }, children: text }))] }));
};
exports.MainButton = MainButton;
//# sourceMappingURL=index.js.map