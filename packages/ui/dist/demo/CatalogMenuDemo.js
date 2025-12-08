"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogMenuDemo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const components_1 = require("../components");
const negate_1 = require("../utils/negate");
const CatalogMenuContentDemo_1 = require("./CatalogMenuContentDemo");
exports.CatalogMenuDemo = (0, react_1.memo)(() => {
    const title = 'Catalog';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [searchCatalogValue, setSearchCatalogValue] = (0, react_1.useState)('');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsx)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, headerSpacing: { bottom: 'xl' }, header: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.SearchInput, { placeholder: 'Search', value: searchCatalogValue, setValue: setSearchCatalogValue }) }), children: (0, jsx_runtime_1.jsx)(CatalogMenuContentDemo_1.CatalogMenuContentDemo, {}) })] }));
});
//# sourceMappingURL=CatalogMenuDemo.js.map