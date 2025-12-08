"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconPickerRow = IconPickerRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@emotion/react");
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const styles_1 = require("./styles");
const Icons_1 = require("../Icons");
const icons = {
    flatRoof: Icons_1.FlatRoofIcon,
    gableRoof: Icons_1.GableRoofIcon,
    hipRoof: Icons_1.HipRoofIcon,
    slantedRoof: Icons_1.SlantedRoofIcon,
    wraparoundRoof: Icons_1.WraparoundRoofIcon,
    noRoof: Icons_1.NoRoofIcon,
    floor: Icons_1.FloorIcon,
    roof: Icons_1.RoofOnlyIcon,
    ceiling: Icons_1.CeilingIcon,
    straightStairs: Icons_1.StraightStairsIcon,
    UShapedStairs: Icons_1.UShapedStairsIcon,
    spiralStairs: Icons_1.SpiralStairsIcon,
    LShapedStairs: Icons_1.LShapedStairsIcon,
};
const iconSizes = {
    md: 36,
    lg: 56,
};
const Icon = (0, react_1.memo)(({ icon, color, size }) => {
    const Icon = icons[icon];
    const s = iconSizes[size];
    return ((0, jsx_runtime_1.jsx)(react_2.ClassNames, { children: ({ css }) => ((0, jsx_runtime_1.jsx)(Icon, { className: css({ width: s, height: s }), color: color })) }));
});
const ItemComp = ({ onClick, icon, state, id, size = 'md', variant = 'default', }) => {
    const theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsx)(styles_1.IconButton, { variant: 'text', state: state, disabled: state === 'disabled', onClick: e => {
            if (!(0, ts_utils_1.isUndefinedSimple)(id)) {
                onClick(id, e);
            }
        }, children: (0, jsx_runtime_1.jsx)(Icon, { icon: icon, size: size, ...variant === 'highlight-on-active' && {
                color: state === 'active'
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
            } }) }));
};
function IconPickerRow({ className, items, onClick, }) {
    return ((0, jsx_runtime_1.jsx)(styles_1.Container, { className: className, onClick: e => {
            if (e.target === e.currentTarget) {
                e.stopPropagation();
            }
        }, children: items.map(({ label, ...rest }) => {
            const key = (0, ts_utils_1.isUndefinedSimple)(rest.id) ? rest.icon : rest.id;
            return ((0, ts_utils_1.isUndefined)(label)
                ? (0, jsx_runtime_1.jsx)(ItemComp, { onClick: onClick, ...rest }, key)
                : ((0, jsx_runtime_1.jsxs)(styles_1.WithText, { children: [(0, jsx_runtime_1.jsx)(ItemComp, { onClick: onClick, ...rest }), (0, jsx_runtime_1.jsx)(styles_1.Text, { onClick: e => {
                                if (e.target === e.currentTarget) {
                                    e.stopPropagation();
                                }
                            }, children: label })] }, key)));
        }) }));
}
//# sourceMappingURL=index.js.map