"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitledIsle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Icons_1 = require("../../../Icons");
const Isle_1 = require("../Isle");
const styles_1 = require("./styles");
const TitledIsle = ({ className, title, children, expanded, onChange, type, defaultCollapsed = false, }) => {
    const theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)(Isle_1.Isle, { className: className, children: [(0, jsx_runtime_1.jsxs)(styles_1.MobileAccordion, { elevation: 0, disableGutters: true, defaultExpanded: !defaultCollapsed, expanded: type === 'always-static' ? true : expanded, onChange: (_, expanded) => onChange?.(expanded), children: [(0, jsx_runtime_1.jsx)(styles_1.AccordionSummary, { type: type, expandIcon: (type === 'always-static'
                            ? undefined
                            : (0, jsx_runtime_1.jsx)(Icons_1.DownArrowIcon, { color: theme.palette.general.purpleGray })), tabIndex: type === 'always-static' ? -1 : 0, children: (0, jsx_runtime_1.jsx)(styles_1.Title, { children: title }) }), (0, jsx_runtime_1.jsx)(styles_1.AccordionDetails, { children: children })] }), (0, jsx_runtime_1.jsxs)(styles_1.DesktopContent, { children: [(0, jsx_runtime_1.jsx)(styles_1.Title, { children: title }), children] })] }));
};
exports.TitledIsle = TitledIsle;
//# sourceMappingURL=index.js.map