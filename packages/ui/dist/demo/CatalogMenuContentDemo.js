"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogMenuContentDemo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const components_1 = require("../components");
const data = [
    {
        title: 'Construction',
        items: ['Doors', 'Windows', 'Columns'],
    },
    {
        title: 'Furniture',
        items: ['Kitchen', 'Bathroom'],
    },
];
exports.CatalogMenuContentDemo = (0, react_1.memo)(() => {
    const [chosen, setChosen] = (0, react_1.useState)(false);
    const [chosenMaterialCategory, setChosenMaterialCategory] = (0, react_1.useState)();
    const [chosenMaterial, setChosenMaterial] = (0, react_1.useState)();
    if (chosen === true) {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MaterialCategoryPicker, { chosenOption: chosenMaterialCategory, onClick: id => setChosenMaterialCategory(id), options: ['None', 'Paint', 'Tiles', 'Wallpapers', 'Panels', 'Plaster']
                        .map((name, index) => ({
                        id: index,
                        image: 'https://placehold.co/56',
                        name,
                    })), squareImages: true, highlightVariant: 'background', size: 'sm' }), (0, jsx_runtime_1.jsx)(components_1.MaterialPicker, { shape: 'square', options: [
                        '# F2F2F2',
                        '# C5B2AE',
                        '# A8B0A5',
                        '# F8B0A5',
                        '# E8B0A5',
                        '# B8B0A5 Lorem ipsum',
                        '# A8C0A5',
                    ].map((name, i) => ({
                        id: i,
                        name,
                        image: 'https://placehold.co/82',
                    })), chosenOption: chosenMaterial, onClick: idx => setChosenMaterial(idx) })] }));
    }
    return (data.map(({ title, items }) => ((0, jsx_runtime_1.jsx)(components_1.MenuSection, { title: title, type: 'collapsible', divider: 'summary', defaultExpanded: true, children: items.map(subtitle => ((0, jsx_runtime_1.jsx)(components_1.MenuSection, { title: subtitle, type: 'buttonlike', titleVariant: 'pale', image: 'https://placehold.co/24', onClick: () => setChosen(true) }, subtitle))) }, title))));
});
//# sourceMappingURL=CatalogMenuContentDemo.js.map