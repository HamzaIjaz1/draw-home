"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisibilityMenuContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const MenuSection_1 = require("../MenuSection");
const createStyledOptions_1 = require("../../utils/createStyledOptions");
const opts = (0, createStyledOptions_1.createStyledOptions)({
    isRoot: true,
});
const StyledMenuSection = (0, material_1.styled)(MenuSection_1.MenuSection, opts) `
  ${p => p.isRoot === false && (0, material_1.css) `
    padding-left: 12px;
  `}
`;
const getActive = (items) => {
    const actives = items.map(({ active, items = [] }) => !(0, ts_utils_1.isUndefined)(active) ? active : getActive(items));
    return actives.some(e => e === true);
};
const getOnClick = (_items, targetActive) => (() => {
    for (const { active, onClick, items = [] } of _items) {
        if (active === targetActive) {
            continue;
        }
        if (!(0, ts_utils_1.isUndefined)(onClick)) {
            onClick();
        }
        else {
            getOnClick(items, targetActive)();
        }
    }
});
const VisibilityMenuContentInner = ({ items, isRoot = false }) => (items.map(({ title, active: _active, onClick: _onClick, items = [] }) => {
    const active = !(0, ts_utils_1.isUndefined)(_active) ? _active : getActive(items);
    const onClick = !(0, ts_utils_1.isUndefined)(_onClick) ? _onClick : getOnClick(items, active === false);
    return ((0, jsx_runtime_1.jsx)(StyledMenuSection, { isRoot: isRoot, title: title, icon: 'eye', titleVariant: active === false
            ? 'pale'
            : isRoot === true
                ? 'primary-600'
                : 'primary-400', iconButton: {
            onClick,
            state: active === true ? 'active' : 'default',
        }, ...(isRoot === false || items.length === 0
            ? {
                type: 'static',
            }
            : {
                type: 'collapsible',
                defaultExpanded: true,
            }), children: (0, jsx_runtime_1.jsx)(VisibilityMenuContentInner, { items: items }) }, title));
}));
const VisibilityMenuContent = ({ items }) => ((0, jsx_runtime_1.jsx)(VisibilityMenuContentInner, { isRoot: true, items: items }));
exports.VisibilityMenuContent = VisibilityMenuContent;
//# sourceMappingURL=index.js.map