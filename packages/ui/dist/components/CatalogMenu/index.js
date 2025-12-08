"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogMenuContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const MenuSection_1 = require("../MenuSection");
const CatalogMenuContent = ({ items }) => (items.map(({ title, children, defaultExpanded, expanded, onChange, icon, onClick, showArrowIcon = false, }) => ((0, jsx_runtime_1.jsx)(MenuSection_1.MenuSection, { title: title, image: icon, titleVariant: 'pale', divider: 'content', ...(0, ts_utils_1.isUndefined)(onClick)
        ? {
            type: 'collapsible',
            children,
            ...(!(0, ts_utils_1.isUndefined)(expanded) && !(0, ts_utils_1.isUndefined)(onChange)
                ? { expanded, onChange }
                : { defaultExpanded }),
        }
        : {
            type: 'buttonlike',
            onClick,
            showArrowIcon: showArrowIcon ?? false,
        } }, `${title}${icon}`))));
exports.CatalogMenuContent = CatalogMenuContent;
//# sourceMappingURL=index.js.map