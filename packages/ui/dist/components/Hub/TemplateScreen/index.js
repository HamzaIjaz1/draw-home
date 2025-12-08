"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateScreen = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TabButton_1 = require("../TabButton");
const TemplateButton_1 = require("../TemplateButton");
const styles_1 = require("./styles");
const TemplateScreen = ({ className, title, tabs, }) => {
    const activeTab = tabs.find(tab => tab.state === 'active');
    const items = activeTab?.items ?? [];
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_1.Title, { children: title }), (0, jsx_runtime_1.jsx)(styles_1.Tabs, { children: tabs.map(({ title, state, onClick }) => ((0, jsx_runtime_1.jsx)(TabButton_1.TabButton, { text: title, state: state, onClick: onClick }, title))) }), (0, jsx_runtime_1.jsx)(styles_1.Buttons, { children: items.map(({ title, image, onClick }) => ((0, jsx_runtime_1.jsx)(TemplateButton_1.TemplateButton, { text: title, image: image, onClick: onClick }, `${title}${image}`))) })] }));
};
exports.TemplateScreen = TemplateScreen;
//# sourceMappingURL=index.js.map