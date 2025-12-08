"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscMenuContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const components_1 = require("../components");
const noop_1 = require("../utils/noop");
const negate_1 = require("../utils/negate");
const theme_1 = require("../theme");
const Icons_1 = require("../components/Icons");
const SelectRowWrap = (0, react_1.memo)(() => {
    const [value, setValue] = (0, react_1.useState)(2);
    return ((0, jsx_runtime_1.jsx)(components_1.SelectRow, { label: 'Parent level', value: value, options: [
            { label: 'label1', value: 1 },
            { label: 'label2', value: 2 },
            { label: 'label3', value: 3 },
        ], onChange: setValue }));
});
exports.MiscMenuContent = (0, react_1.memo)(() => {
    const [spaceOption, setSpaceOption] = (0, react_1.useState)(null);
    const [iconPickerItems, setIconPickerItems] = (0, react_1.useState)([
        { id: 'hipRoof', icon: 'hipRoof', state: 'active' },
        { id: 'gableRoof', icon: 'gableRoof', state: 'default' },
        { id: 'wraparoundRoof', icon: 'wraparoundRoof', state: 'default' },
        { id: 'slantedRoof', icon: 'slantedRoof', state: 'default' },
        { id: 'flatRoof', icon: 'flatRoof', state: 'default' },
        { id: 'noRoof', icon: 'noRoof', state: 'default' },
    ]);
    const [expanded, setExpanded] = (0, react_1.useState)(true);
    const [iconPickerItems2, setIconPickerItems2] = (0, react_1.useState)([
        { id: 0, icon: 'floor', state: 'default', variant: 'highlight-on-active' },
        { id: 1, icon: 'roof', state: 'active', variant: 'highlight-on-active' },
        { id: 2, icon: 'ceiling', state: 'default', variant: 'highlight-on-active' },
    ]);
    const [value, setValue] = (0, react_1.useState)('0.24');
    const [value2, setValue2] = (0, react_1.useState)('My project 1');
    const [illustrationBtnState, setIllustrationBtnState] = (0, react_1.useState)('general');
    const [isActive, setIsActive] = (0, react_1.useState)(false);
    const [isActive2, setIsActive2] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(components_1.MenuSection, { title: 'This is a shared roof. To change Roof settings of one room, use space settings', type: 'collapsible', titleVariant: 'pale', titleSize: '14px', icon: 'hint', divider: 'content', children: [(0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingHorizontal: true, spaceBetween: true, children: [(0, jsx_runtime_1.jsx)(components_1.SettingsSpaceTitle, { children: "Living Room 1" }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'gear', variant: 'text', size: 'sm', state: 'active', onClick: noop_1.noop })] }), (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingHorizontal: true, spaceBetween: true, children: [(0, jsx_runtime_1.jsx)(components_1.SettingsSpaceTitle, { children: "Area 1" }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'gear', variant: 'text', size: 'sm', state: 'active', onClick: noop_1.noop })] })] }), (0, jsx_runtime_1.jsx)(components_1.MenuSection, { title: 'Roof hint', type: 'collapsible', titleVariant: 'pale', icon: 'hint', divider: 'content', defaultExpanded: true, children: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { center: true, children: (0, jsx_runtime_1.jsx)(components_1.RoofLegendIcon, {}) }) }), (0, jsx_runtime_1.jsxs)(components_1.MenuSection, { title: `Roof type / ${iconPickerItems
                    .filter(e => e.state === 'active')
                    .map(e => e.icon.replace('Roof', ''))
                    .join('+')}`, type: 'collapsible', titleVariant: 'pale', icon: 'roof', divider: 'content', defaultExpanded: true, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { children: (0, jsx_runtime_1.jsx)(components_1.IconPickerRow, { items: iconPickerItems, onClick: idx => {
                                setIconPickerItems(items => items.map((e) => (e.id !== idx ? e : {
                                    ...e,
                                    state: e.state === 'active' ? 'default' : 'active',
                                })));
                            } }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { name: 'roof-overhang', label: 'Overhang', size: 'sm', onChange: noop_1.noop, type: 'number', value: '30', adornment: 'cm', max: 200 }) })] }), (0, jsx_runtime_1.jsxs)(components_1.MenuSection, { title: 'Construction', type: 'collapsible', expanded: expanded, onChange: e => setExpanded(e), children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.TextOptionRow, { label: 'Language', value: 'English', onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, paddingVertical: 'md', minHeight: 'unset', children: (0, jsx_runtime_1.jsx)(components_1.MenuItemTitle, { children: "Space options" }) }), (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingHorizontal: true, paddingBottom: 'ml', divider: true, gap: 10, children: [(0, jsx_runtime_1.jsxs)(components_1.OptionButton, { state: spaceOption === 'wall' ? 'active' : 'default', onClick: () => setSpaceOption(e => e === 'wall' ? null : 'wall'), children: [(0, jsx_runtime_1.jsx)(Icons_1.WallIcon, { color: 'currentColor' }), (0, jsx_runtime_1.jsx)(components_1.OptionButtonTitle, { children: "Wall" })] }), (0, jsx_runtime_1.jsxs)(components_1.OptionButton, { state: spaceOption === 'roof' ? 'active' : 'default', onClick: () => setSpaceOption(e => e === 'roof' ? null : 'roof'), children: [(0, jsx_runtime_1.jsx)(Icons_1.RoofOnlyIcon, { color: 'currentColor' }), (0, jsx_runtime_1.jsx)(components_1.OptionButtonTitle, { children: "Roof" })] }), (0, jsx_runtime_1.jsxs)(components_1.OptionButton, { state: spaceOption === 'floor' ? 'active' : 'default', onClick: () => setSpaceOption(e => e === 'floor' ? null : 'floor'), children: [(0, jsx_runtime_1.jsx)(Icons_1.FloorWithCornersIcon, { color: 'currentColor' }), (0, jsx_runtime_1.jsx)(components_1.OptionButtonTitle, { children: "Floor" })] }), (0, jsx_runtime_1.jsxs)(components_1.OptionButton, { state: spaceOption === 'ceiling' ? 'active' : 'default', onClick: () => setSpaceOption(e => e === 'ceiling' ? null : 'ceiling'), children: [(0, jsx_runtime_1.jsx)(Icons_1.CeilingWithCornersIcon, { color: 'currentColor' }), (0, jsx_runtime_1.jsx)(components_1.OptionButtonTitle, { children: "Ceiling" })] })] }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingVertical: 'md', children: (0, jsx_runtime_1.jsx)(components_1.IconPickerRow, { items: iconPickerItems2, onClick: idx => {
                                setIconPickerItems2(items => items.map((e) => (e.id !== idx ? e : {
                                    ...e,
                                    state: e.state === 'active' ? 'default' : 'active',
                                })));
                            } }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.ButtonRow, { label: 'Replace / Wall', startIcon: 'replace', onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { name: 'wall-length', label: 'Length', type: 'number', size: 'sm', value: value, onChange: e => setValue(e), adornment: 'm', min: 1, max: 50 }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'text', name: 'project-name', label: 'Project name', size: 'lg', value: value2, onChange: e => setValue2(e) }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { children: (0, jsx_runtime_1.jsx)(SelectRowWrap, {}) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.ButtonOptionsRow, { label: 'Wall attachment', options: [
                                { icon: 'centerWallAttachment', onClick: noop_1.noop, selected: false },
                                { icon: 'outsideWallAttachment', onClick: noop_1.noop, selected: false },
                                { icon: 'insideWallAttachment', onClick: noop_1.noop, selected: true },
                            ] }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.ButtonOptionsRow, { label: 'Measurements', options: [
                                { text: 'M, cm', onClick: noop_1.noop, selected: true },
                                { text: 'F, inch', onClick: noop_1.noop, selected: false },
                            ] }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingBottom: 'md', children: (0, jsx_runtime_1.jsx)(components_1.IllustrationButtonRow, { text: illustrationBtnState === 'general'
                                ? 'Number of similar items: 3'
                                : 'One of a kind', beforeText: (0, jsx_runtime_1.jsx)(components_1.Checkbox, { checked: isActive2, onClick: () => setIsActive2(negate_1.negate), text: 'Make the item unique' }), afterText: (0, jsx_runtime_1.jsx)(components_1.IllustrationButton, { state: illustrationBtnState, generalLabel: 'General Item', uniqueLabel: 'Unique Item', onClick: () => {
                                    setIllustrationBtnState(s => s === 'general' ? 'unique' : 'general');
                                } }) }) })] }), (0, jsx_runtime_1.jsxs)(components_1.MenuSection, { title: 'Windows', type: 'static', children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.Material, { text: 'Door material', image: 'https://placehold.co/80x28', onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.Material, { text: 'Glass type', image: 'https://placehold.co/80x28', onClick: noop_1.noop, disabled: true }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.SwitchRow, { title: 'Threshold', checked: isActive, onClick: () => setIsActive(negate_1.negate) }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: 'row 3/4', children: (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'saveCopy', text: 'Save a Copy', variant: 'text', width: 'fit-content', height: 'md', padding: 'row 1/4', iconColors: { default: theme_1.theme.palette.primary.main }, textColors: { default: theme_1.theme.palette.text.secondary }, onClick: noop_1.noop }) })] }), (0, jsx_runtime_1.jsx)(components_1.MenuSection, { title: 'Door information', type: 'static', children: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.InfoRow, { title: 'Door area', value: '1,89 m\u00B2' }) }) })] }));
});
//# sourceMappingURL=MiscMenuContent.js.map