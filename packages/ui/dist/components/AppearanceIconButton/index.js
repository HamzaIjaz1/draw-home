"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppearanceIconButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const Icons_1 = require("../Icons");
const styles_1 = require("./styles");
const icons = {
    download: Icons_1.DownloadIcon,
    stars: Icons_1.StarsIcon,
    plus: Icons_1.Plus2Icon,
    arrowToHeart: Icons_1.ArrowToHeartIcon,
    recent: Icons_1.RecentIcon,
    colorPicker: Icons_1.ColorPickerIcon,
    close: Icons_1.CloseIconSmall,
};
const AppearanceIconButton = ({ className, icon, onClick, state = 'default', isColorPicker = false, }) => {
    const theme = (0, material_1.useTheme)();
    const Icon = icons[icon];
    const iconColor = (0, react_1.useMemo)(() => {
        const colors = {
            default: theme.palette.primary.main,
            disabled: theme.palette.text.disabled,
        };
        return colors[state];
    }, [state, theme.palette.primary.main, theme.palette.text.disabled]);
    return ((0, jsx_runtime_1.jsx)(styles_1.IconButton, { className: className, onClick: onClick, disabled: state === 'disabled', style: isColorPicker === true ? { height: '24px', width: '24px', padding: '0px 2px' } : {}, children: (0, jsx_runtime_1.jsx)(Icon, { color: iconColor }) }));
};
exports.AppearanceIconButton = AppearanceIconButton;
//# sourceMappingURL=index.js.map