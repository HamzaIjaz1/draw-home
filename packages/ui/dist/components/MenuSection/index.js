"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuSection = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const material_1 = require("@mui/material");
const react_1 = require("@emotion/react");
const styles_1 = require("../../utils/styles");
const Icons_1 = require("../Icons");
const styles_2 = require("./styles");
const icons = {
    roof: Icons_1.RoofIcon,
    hint: Icons_1.HintIcon,
    eye: Icons_1.EyeIcon,
};
const EmptyComponent = () => null;
const Icon = ({ icon, active }) => {
    const Icon = (0, ts_utils_1.isUndefined)(icon) ? EmptyComponent : icons[icon];
    const theme = (0, material_1.useTheme)();
    const color = ((0, ts_utils_1.isUndefined)(active)
        ? undefined
        : active === true ? theme.palette.primary.main : theme.palette.text.disabled);
    return ((0, jsx_runtime_1.jsx)(react_1.ClassNames, { children: ({ css }) => ((0, jsx_runtime_1.jsx)(Icon, { className: css(styles_2.iconCss), color: color })) }));
};
const MenuSection = ({ className, title, children, type, expanded, defaultExpanded, onChange, onClick, iconButton, icon, image, paddingBottom, titleSize, titleVariant = 'primary-600', divider = 'summary', showArrowIcon = false, }) => {
    const theme = (0, material_1.useTheme)();
    const arrowColor = {
        'primary-600': theme.palette.text.primary,
        'primary-500': theme.palette.text.primary,
        'primary-400': theme.palette.text.primary,
        pale: theme.palette.text.disabled,
    };
    const _expanded = {
        buttonlike: false,
        collapsible: expanded,
        static: true,
    };
    const _expandIcon = {
        buttonlike: (showArrowIcon === true
            ? (0, jsx_runtime_1.jsx)(Icons_1.DownArrowIcon, { color: arrowColor[titleVariant], rotate: -90 })
            : undefined),
        collapsible: (0, jsx_runtime_1.jsx)(Icons_1.DownArrowIcon, { color: arrowColor[titleVariant] }),
        static: undefined,
    };
    const _tabIndex = {
        buttonlike: 0,
        collapsible: 0,
        static: -1,
    };
    return ((0, jsx_runtime_1.jsxs)(styles_2.Accordion, { className: className, style: {
            ...!(0, ts_utils_1.isUndefined)(paddingBottom) && (0, styles_1.setCssVarInline)(styles_2.cssVars.rootPaddingBottom, paddingBottom),
        }, elevation: 0, disableGutters: true, defaultExpanded: defaultExpanded, expanded: _expanded[type], onChange: (_, expanded) => onChange?.(expanded), "$divider": divider === 'content', children: [(0, jsx_runtime_1.jsxs)(styles_2.AccordionSummary, { "$type": type, "$divider": divider === 'summary', "$withIconButton": !(0, ts_utils_1.isUndefined)(iconButton), expandIcon: _expandIcon[type], tabIndex: _tabIndex[type], onClick: onClick, children: [!(0, ts_utils_1.isUndefined)(image) && ((0, jsx_runtime_1.jsx)(styles_2.Image, { src: image, width: 24, height: 24 })), !(0, ts_utils_1.isUndefined)(icon) && ((0, ts_utils_1.isUndefined)(iconButton)
                        ? (0, jsx_runtime_1.jsx)(Icon, { icon: icon })
                        : ((0, jsx_runtime_1.jsx)(styles_2.IconButton, { icon: icon, state: iconButton.state, size: 'xs', variant: 'text', iconColors: { default: theme.palette.text.disabled }, onClick: e => {
                                e.stopPropagation();
                                iconButton.onClick();
                            } }))), (0, jsx_runtime_1.jsx)(styles_2.Text, { "$titleVariant": titleVariant, "$titleSize": titleSize, children: title })] }), !(0, ts_utils_1.isUndefined)(children) && ((0, jsx_runtime_1.jsx)(styles_2.AccordionDetails, { children: children }))] }));
};
exports.MenuSection = MenuSection;
//# sourceMappingURL=index.js.map