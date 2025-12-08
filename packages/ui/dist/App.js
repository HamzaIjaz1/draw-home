"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const CssBaseline_1 = __importDefault(require("@mui/material/CssBaseline"));
const styles_1 = require("@mui/material/styles");
const react_1 = require("react");
const material_1 = require("@mui/material");
const utils_1 = require("@draw-house/common/dist/utils");
const react_compare_slider_1 = require("react-compare-slider");
const assert_1 = __importDefault(require("assert"));
const ts_utils_1 = require("@arthurka/ts-utils");
const theme_1 = require("./theme");
const components_1 = require("./components");
const Hub_1 = require("./components/Hub");
const Icons_1 = require("./components/Icons");
const Switch_1 = require("./components/Switch");
const data_1 = require("./data");
const hooks_1 = require("./hooks");
const utils_2 = require("./utils");
const negate_1 = require("./utils/negate");
const noop_1 = require("./utils/noop");
const generateHSLColor_1 = require("./utils/generateHSLColor");
const string_1 = require("./components/Icons/string");
const styles_2 = require("./components/MainScreenOverlay/styles");
const CatalogMenuDemo_1 = require("./demo/CatalogMenuDemo");
const CatalogMenuContentDemo_1 = require("./demo/CatalogMenuContentDemo");
const PaywallMenuDemo_1 = require("./demo/PaywallMenuDemo");
const PaywallFloatingMenuDemo_1 = require("./demo/PaywallFloatingMenuDemo");
const HotkeysDemo_1 = require("./demo/HotkeysDemo");
const AllHotkeysDemo_1 = require("./demo/AllHotkeysDemo");
const MiscMenuContent_1 = require("./demo/MiscMenuContent");
const IconsDemo_1 = require("./demo/IconsDemo");
require("./styles.css");
const Container = (0, styles_1.styled)('div') `
  padding: 8px;
`;
const HorizontalSection = (0, styles_1.styled)('section') `
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding: 8px;
`;
const Base = ({ children }) => ((0, jsx_runtime_1.jsxs)(styles_1.ThemeProvider, { theme: theme_1.theme, children: [(0, jsx_runtime_1.jsx)(CssBaseline_1.default, {}), children] }));
const PopUpToolbarGeneric = (0, react_1.memo)(() => {
    const [chosenBtn, setChosenBtn] = (0, react_1.useState)(null);
    return ((0, jsx_runtime_1.jsx)(components_1.PopUpToolbar, { mode: 'static', items: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'tools', state: chosenBtn === 'tools' ? 'active' : 'default', onClick: () => setChosenBtn('tools') }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'plus', state: chosenBtn === 'plus' ? 'active' : 'default', onClick: () => setChosenBtn('plus') }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'duplicate', state: chosenBtn === 'duplicate' ? 'active' : 'default', onClick: () => setChosenBtn('duplicate') }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'eye', state: chosenBtn === 'eye' ? 'active' : 'default', onClick: () => setChosenBtn('eye') }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { image: (0, utils_2.makeSolidColorImageUri)('#ed8282'), onClick: () => setChosenBtn('image') }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'bin', state: chosenBtn === 'bin' ? 'active' : 'default', onClick: () => setChosenBtn('bin') })] }) }));
});
const PopUpToolbarExpandable = (0, react_1.memo)(() => ((0, jsx_runtime_1.jsx)(components_1.PopUpToolbar, { mode: 'static', orientation: 'vertical', items: (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'tools', onClick: noop_1.noop }), expandableItems: (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'eye', onClick: noop_1.noop }) })));
const TopToolbarDefault = (0, react_1.memo)(({ closeMainOverlay }) => {
    const render = mode => {
        const propsByMode = {
            desktop: {
                variant: 'default',
                size: 'md',
            },
            mobile: {
                variant: 'text',
                size: 'sm',
                state: 'active',
            },
        };
        const props = propsByMode[mode];
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.IconButton, { ...props, icon: 'back', onClick: closeMainOverlay }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { ...props, icon: 'save', onClick: noop_1.noop, state: 'disabled' })] }));
    };
    return ((0, jsx_runtime_1.jsx)(components_1.TopToolbar, { children: render }));
});
const commonErrorTexts = {
    required: 'This field is required',
    passwordsMismatch: 'Passwords are different',
};
const MaterialsMenuDemo = (0, react_1.memo)(() => {
    const title = 'Materials';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [chosenMaterial, setChosenMaterial] = (0, react_1.useState)();
    const [chosenMaterialCategory, setChosenMaterialCategory] = (0, react_1.useState)();
    const [radioValue, setRadioValue] = (0, react_1.useState)('');
    const [isActive, setIsActive] = (0, react_1.useState)(false);
    const theme = (0, material_1.useTheme)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsx)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, header: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MaterialCategoryPicker, { options: [
                                { id: 0, image: 'https://placehold.co/56', name: 'None' },
                                { id: 1, image: 'https://placehold.co/56', name: 'Paint' },
                                { id: 2, image: 'https://placehold.co/56', name: 'Tiles' },
                                { id: 3, image: (0, utils_2.makeSolidColorImageUri)('#ed8282'), name: 'Wallpapers' },
                                { id: 4, image: (0, utils_2.makeSolidColorImageUri)('#81c14b', { width: 56, height: 56 }), name: 'Panels' },
                                { id: 5, image: 'https://placehold.co/56', name: 'Plaster' },
                            ], chosenOption: chosenMaterialCategory, onClick: id => setChosenMaterialCategory(id) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.RadioGroup, { name: 'wall-picker', value: radioValue, options: [
                                    { label: 'Load-bearing wall', value: '1' },
                                    { label: 'Partition wall', value: '2' },
                                ], onChange: setRadioValue, direction: 'row' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.Checkbox, { checked: isActive, onClick: () => setIsActive(!isActive), text: 'Apply to all walls' }) })] }), children: (0, jsx_runtime_1.jsx)(components_1.MaterialPicker, { shape: 'round', options: [
                        ...([
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
                        }))),
                        {
                            id: -1,
                            name: 'Add New',
                            image: (0, utils_2.encodeSvgAsDataUri)((0, string_1.getPlusCircledSvgString)(theme.palette.primary.main)),
                            noBorder: true,
                        },
                    ], chosenOption: chosenMaterial, onClick: idx => setChosenMaterial(idx) }) })] }));
});
const MiscMenuDemo = (0, react_1.memo)(() => {
    const title = 'Misc';
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsx)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, children: (0, jsx_runtime_1.jsx)(MiscMenuContent_1.MiscMenuContent, {}) })] }));
});
const InitMenuDemo = (0, react_1.memo)(() => {
    const title = 'Init';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [iconPickerItems, setIconPickerItems] = (0, react_1.useState)([
        { id: 'hipRoof', icon: 'hipRoof', state: 'active' },
        { id: 'gableRoof', icon: 'gableRoof', state: 'default' },
        { id: 'wraparoundRoof', icon: 'wraparoundRoof', state: 'default' },
        { id: 'slantedRoof', icon: 'slantedRoof', state: 'default' },
        { id: 'flatRoof', icon: 'flatRoof', state: 'default' },
        { id: 'noRoof', icon: 'noRoof', state: 'default' },
    ]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), open === true && ((0, jsx_runtime_1.jsx)(components_1.InitialMenuWrapper, { children: (0, jsx_runtime_1.jsxs)(components_1.FloatingMenu, { title: 'float', onClose: () => setOpen(false), children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { children: (0, jsx_runtime_1.jsx)(components_1.InfoRow, { title: 'Name', value: 'kitchen' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuSection, { title: 'Auto Generated Roof Style', type: 'static', titleVariant: 'pale', divider: 'content', paddingBottom: '20px', children: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { children: (0, jsx_runtime_1.jsx)(components_1.IconPickerRow, { items: iconPickerItems, onClick: idx => {
                                        setIconPickerItems(items => items.map((e) => (e.id !== idx ? e : {
                                            ...e,
                                            state: e.state === 'active' ? 'default' : 'active',
                                        })));
                                    } }) }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, paddingTop: 'ml', children: (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Continue', width: 'fill', height: 'md', onClick: () => setOpen(false) }) })] }) }))] }));
});
const StairsMenuDemo = (0, react_1.memo)(() => {
    const title = 'Stairs';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [checkedUnique, setCheckedUnique] = (0, react_1.useState)(false);
    const [stairs, setStairs] = (0, react_1.useState)();
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsxs)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, children: [(0, jsx_runtime_1.jsx)(components_1.MenuSection, { title: 'Stairs hint', type: 'collapsible', titleVariant: 'pale', icon: 'hint', divider: 'content', defaultExpanded: true, children: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { center: true, children: (0, jsx_runtime_1.jsx)(Icons_1.StairsLegendIcon, {}) }) }), (0, jsx_runtime_1.jsxs)(components_1.MenuSection, { title: 'Stairs Type', type: 'collapsible', divider: 'content', defaultExpanded: true, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.IconPickerRow, { items: [
                                        { id: 0, icon: 'straightStairs', state: stairs === 0 ? 'active' : 'default', size: 'lg', label: 'Straight' },
                                        { id: 1, icon: 'LShapedStairs', state: stairs === 1 ? 'active' : 'default', size: 'lg', label: 'L-Shaped' },
                                        { icon: 'UShapedStairs', state: 'disabled', size: 'lg', label: 'U-Shaped' },
                                        { icon: 'spiralStairs', state: 'disabled', size: 'lg', label: 'Spiral' },
                                    ], onClick: setStairs }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'text', name: 'stairs-name', label: 'Name', size: 'lg', value: 'Straight stairs 1', onChange: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { children: (0, jsx_runtime_1.jsxs)(components_1.ScopeControlRow, { children: [(0, jsx_runtime_1.jsxs)(components_1.ScopeText, { children: ["Changes apply to", ' ', (0, jsx_runtime_1.jsx)(components_1.InlineAction, { onClick: () => window.alert('hi'), children: (0, jsx_runtime_1.jsx)(components_1.ScopeTextHighlighted, { children: "(5)" }) }), ' ', "items in the Project"] }), (0, jsx_runtime_1.jsx)(components_1.ScopeCheckbox, { checked: checkedUnique, text: 'Make Unique', onClick: () => setCheckedUnique(!checkedUnique) })] }) })] }), (0, jsx_runtime_1.jsxs)(components_1.MenuSection, { title: 'Settings', type: 'collapsible', defaultExpanded: true, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.ButtonOptionsRow, { label: 'Railings location', options: [
                                        { icon: 'railingsLeft', onClick: noop_1.noop, state: 'active', selected: true },
                                        { icon: 'railingsRight', onClick: noop_1.noop, state: 'default', selected: false },
                                    ] }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.ButtonOptionsRow, { label: 'Stringer location', options: [
                                        { icon: 'stringerLeft', onClick: noop_1.noop, state: 'default', selected: true },
                                        { icon: 'stringerCenter', onClick: noop_1.noop, state: 'active', selected: false },
                                        { icon: 'stringerRight', onClick: noop_1.noop, state: 'active', selected: false },
                                    ] }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.InfoRow, { title: 'Area', value: '10 m\u00B2' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { label: 'Width', type: 'number', size: 'sm', value: '1.8', onChange: noop_1.noop, adornment: 'm' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { label: 'Maximum rise', type: 'number', size: 'sm', value: '2.9', onChange: noop_1.noop, adornment: 'm' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { label: 'Run', type: 'number', size: 'sm', value: '0.3', onChange: noop_1.noop, adornment: 'm' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.ButtonRow, { label: 'Railings', startIcon: 'railings', onClick: noop_1.noop }) })] }), (0, jsx_runtime_1.jsxs)(components_1.MenuSection, { title: 'Color', type: 'collapsible', defaultExpanded: true, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.Material, { text: 'Color 1', image: 'https://placehold.co/80x28', onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.Material, { text: 'Color 2', image: 'https://placehold.co/80x28', onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.Material, { text: 'Railing color', image: 'https://placehold.co/80x28', onClick: noop_1.noop }) })] }), (0, jsx_runtime_1.jsxs)(components_1.MenuSection, { title: 'Assembly', type: 'collapsible', defaultExpanded: true, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'text', label: 'Stairs', size: 'lg', value: 'Tile', onChange: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'text', label: 'Stringer', size: 'lg', value: 'Concrete', onChange: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'text', label: 'Railings', size: 'lg', value: 'Wood', onChange: noop_1.noop }) })] }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: 'row 3/4', children: (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'bin', text: 'Delete the item', padding: 'row 1/4', variant: 'text', width: 'fit-content', height: 'md', iconColors: { default: theme_1.theme.palette.primary.main }, textColors: { default: theme_1.theme.palette.primary.main }, onClick: () => {
                                window.confirm('Are you sure?');
                            } }) }), (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { spaceBetween: true, paddingVertical: 'lg', paddingHorizontal: true, children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Cancel', variant: 'text', width: 'lg', height: 'md', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Apply', width: 'lg', height: 'md', shadowless: true, onClick: noop_1.noop })] })] })] }));
});
const LevelsMenuDemo = (0, react_1.memo)(() => {
    const title = 'Levels';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [levels, setLevels] = (0, react_1.useState)([
        { title: 'Level 3: Second floor', subtitle: 'Floor 2: + 6.000' },
        { title: 'Level 2: First floor', subtitle: 'Floor 1: ± 3.000' },
        { title: 'Level 1: First Floor', subtitle: 'Custom: ± 0.000' },
    ].map(({ title, subtitle }, idx) => {
        const id = `level-${idx}`;
        return {
            id,
            title,
            subtitle,
            visible: idx % 2 === 1,
            transparent: false,
            onVisibilityChange: () => alert(`change visibility for ${id}`),
            onSettingsClick: () => alert(`open settings for ${id}`),
            onTransparencyClick: () => (setLevels(levels => (levels.map((lvl, i) => ({
                ...lvl,
                transparent: i === idx ? !lvl.transparent : lvl.transparent,
            }))))),
            highlighted: false,
            onClick: () => (setLevels(levels => (levels.map((lvl, i) => ({
                ...lvl,
                highlighted: i === idx ? !lvl.highlighted : false,
            }))))),
            onDuplicationClick: () => alert(`duplication for ${id}`),
        };
    }));
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsx)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, header: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: 'row 3/4', children: (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plusCircled', text: 'Add new level', variant: 'text', height: 'md', padding: 'row 1/4', iconColors: { default: theme_1.theme.palette.primary.main }, onClick: noop_1.noop }) }), children: (0, jsx_runtime_1.jsx)(components_1.Levels, { items: levels }) })] }));
});
const NewLevelMenuDemo = (0, react_1.memo)(() => {
    const title = 'New Level';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [value, setValue] = (0, react_1.useState)('0.24');
    const [value2, setValue2] = (0, react_1.useState)('My project 1');
    const [levelElevationMajor, setLevelElevationMajor] = (0, react_1.useState)('4');
    const [levelElevationMinor, setLevelElevationMinor] = (0, react_1.useState)('11');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsxs)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'text', name: 'level-name', label: 'Level name', size: 'lg', value: value2, onChange: e => setValue2(e) }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.MeasurementInputRow, { icon: 'levelElevationHint', label: 'Floor level elevation', firstInput: {
                                name: 'floor-level-elevation-major',
                                value: levelElevationMajor,
                                onChange: setLevelElevationMajor,
                                min: 0,
                                adornment: '′',
                            }, secondInput: {
                                name: 'floor-level-elevation-minor',
                                value: levelElevationMinor,
                                onChange: setLevelElevationMinor,
                                min: 0,
                                adornment: '″',
                            } }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.MeasurementInputRow, { icon: 'floorHeightHint', label: 'Floor height', firstInput: {
                                name: 'floor-height',
                                value,
                                onChange: e => setValue(e),
                                min: 1,
                                max: 50,
                                adornment: 'm',
                            } }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: 'row 3/4', children: (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'bin', text: 'Delete the level', padding: 'row 1/4', variant: 'text', width: 'fit-content', height: 'md', iconColors: { default: theme_1.theme.palette.primary.main }, textColors: { default: theme_1.theme.palette.primary.main }, onClick: () => {
                                window.confirm('Are you sure?');
                            } }) }), (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { spaceBetween: true, paddingVertical: 'lg', paddingHorizontal: true, children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Cancel', variant: 'text', width: 'lg', height: 'md', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Create a level', width: 'lg', height: 'md', shadowless: true, onClick: noop_1.noop })] })] })] }));
});
const UploadModelMenuDemo = (0, react_1.memo)(() => {
    const title = 'Upload Model';
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsxs)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, noDivider: true, headerSpacing: { top: 'sm', bottom: 'sm' }, header: (0, jsx_runtime_1.jsxs)(components_1.Tabs, { chosenTab: 2, onClick: noop_1.noop, stretch: true, children: [(0, jsx_runtime_1.jsx)(components_1.Tab, { label: 'List' }), (0, jsx_runtime_1.jsx)(components_1.Tab, { label: 'Libraries' }), (0, jsx_runtime_1.jsx)(components_1.Tab, { label: 'Import' })] }), children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingVertical: 'md', children: (0, jsx_runtime_1.jsx)(components_1.SelectedUploadItem, { name: 'Model 345_4', sizeBytes: 35869024, extension: '.glb' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'text', name: 'catalog-upload-model-name', label: 'Name', size: 'lg', value: 'Door 76', onChange: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.TextOptionRow, { label: 'Category', value: 'Doors', onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { children: (0, jsx_runtime_1.jsx)(components_1.TextOptionRow, { label: 'Libraries', value: 'None', onClick: noop_1.noop, disabled: true }) }), (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { spaceBetween: true, paddingVertical: 'lg', paddingHorizontal: true, children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Cancel', variant: 'text', width: 'lg', height: 'md', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Import', width: 'lg', height: 'md', shadowless: true, onClick: noop_1.noop })] })] })] }));
});
const VisibilityMenuDemo = (0, react_1.memo)(() => {
    const title = 'Visibility';
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsx)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, children: (0, jsx_runtime_1.jsx)(components_1.VisibilityMenuContent, { items: data_1.visibilityMenuItems }) })] }));
});
const SliderRowWrap = (0, react_1.memo)(({ label, max, min, step, initialValue, color, }) => {
    const [value, setValue] = (0, react_1.useState)(initialValue);
    return ((0, jsx_runtime_1.jsx)(components_1.SliderRow, { label: label, value: value, onChange: setValue, min: min, max: max, step: step, color: color }));
});
const LocationButtonRowWrap = (0, react_1.memo)(() => {
    const [value, setValue] = (0, react_1.useState)('background');
    return ((0, jsx_runtime_1.jsx)(components_1.LocationButtonRow, { label: `Location: ${(0, utils_1.capitalize)(value)}`, value: value, onChange: setValue }));
});
const Asset2dMenuDemo = (0, react_1.memo)(() => {
    const title = '2D Asset';
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsxs)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'text', name: '2d-asset-name', label: 'Name', size: 'lg', value: 'Underlay Plan IMG', onChange: noop_1.noop }) }), (0, jsx_runtime_1.jsxs)(components_1.MenuSection, { type: 'collapsible', defaultExpanded: true, title: 'Settings', divider: 'content', children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, paddingVertical: 'md', children: (0, jsx_runtime_1.jsx)(SliderRowWrap, { label: 'Transparency', initialValue: 0.4, min: 0, max: 1, step: 0.001 }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, paddingVertical: 'md', children: (0, jsx_runtime_1.jsx)(LocationButtonRowWrap, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            padding: '8px 0',
                        }, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Create 3D', width: 'md', height: 'md', onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(SliderRowWrap, { initialValue: 0.988, label: 'AI Interpretation Precision Control', min: 0, max: 1, step: 0.001 }) })] })] })] }));
});
const ColorOverlayMenuDemo = (0, react_1.memo)(() => {
    const title = 'Color overlay';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [shouldCompare, setShouldCompare] = (0, react_1.useState)(false);
    const [activeTab, setActiveTab] = (0, react_1.useState)(0);
    const [chosenMaterial, setChosenMaterial] = (0, react_1.useState)();
    const [chosenTexture, setChosenTexture] = (0, react_1.useState)();
    const [isFavourite, setIsFavourite] = (0, react_1.useState)(false);
    const [applyToValue, setApplyToValue] = (0, react_1.useState)(0);
    const tabs = [
        { label: 'Walls', badge: '125' },
        { label: 'Recent', badge: '3' },
        { label: 'Favorites' },
        { label: 'Brands', badge: '37' },
        { label: 'Hidden' },
    ];
    const constraints = {
        min: 0,
        max: 255,
        step: 1,
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsxs)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, noDivider: true, children: [(0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingHorizontal: true, minHeight: 'unset', gap: 10, children: [(0, jsx_runtime_1.jsx)(components_1.SearchInput, { placeholder: 'Search', value: '', setValue: noop_1.noop }), (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { minHeight: 'unset', gap: 4, children: [(0, jsx_runtime_1.jsx)(components_1.AppearanceIconButton, { icon: 'download', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.AppearanceIconButton, { icon: 'stars', state: 'disabled', onClick: noop_1.noop })] })] }), (0, jsx_runtime_1.jsx)(components_1.AppearanceContainer, { children: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, minHeight: 'unset', children: (0, jsx_runtime_1.jsx)(components_1.AppearanceTabs, { children: tabs.map(({ label, badge }, i) => ((0, jsx_runtime_1.jsx)(components_1.AppearanceTab, { label: label, badgeLabel: badge, state: activeTab === i ? 'active' : 'default', onClick: () => setActiveTab(i) }, label))) }) }) }), (0, jsx_runtime_1.jsx)(components_1.AppearanceContainer, { children: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, spaceBetween: true, minHeight: 'unset', children: (0, jsx_runtime_1.jsx)(components_1.AppearanceSectionTitle, { children: "Collections" }) }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { children: (0, jsx_runtime_1.jsx)(components_1.MaterialCategoryPicker, { options: Array.from({ length: 10 }, () => null).map((_, idx) => ({
                                id: idx,
                                name: String(idx + 1),
                                image: (0, utils_2.makeSolidColorImageUri)((0, generateHSLColor_1.generateHSLColor)(idx)),
                            })), chosenOption: chosenMaterial, onClick: setChosenMaterial }) }), (0, jsx_runtime_1.jsx)(components_1.AppearanceContainer, { children: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, spaceBetween: true, minHeight: 'unset', children: (0, jsx_runtime_1.jsx)(components_1.AppearanceSectionTitle, { children: "Textures" }) }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { children: (0, jsx_runtime_1.jsx)(components_1.MaterialCategoryPicker, { options: Array.from({ length: 10 }, () => null).map((_, idx) => ({
                                id: idx,
                                name: String(idx + 1),
                                image: (0, utils_2.makeSolidColorImageUri)((0, generateHSLColor_1.generateHSLColor)(idx + 10)),
                            })), chosenOption: chosenTexture, onClick: setChosenTexture, wrap: true }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, paddingVertical: 'md', children: (0, jsx_runtime_1.jsx)(SliderRowWrap, { label: 'Red', initialValue: 225, color: theme_1.colorPickerRed, ...constraints }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, paddingVertical: 'md', children: (0, jsx_runtime_1.jsx)(SliderRowWrap, { label: 'Green', initialValue: 227, color: theme_1.colorPickerGreen, ...constraints }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, paddingVertical: 'md', children: (0, jsx_runtime_1.jsx)(SliderRowWrap, { label: 'Blue', initialValue: 141, color: theme_1.colorPickerBlue, ...constraints }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, paddingVertical: 'md', children: (0, jsx_runtime_1.jsx)(SliderRowWrap, { label: 'Transparency', initialValue: 0.4, min: 0, max: 1, step: 0.001 }) }), (0, jsx_runtime_1.jsx)(components_1.AppearanceContainer, { children: (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingHorizontal: true, spaceBetween: true, minHeight: 'unset', children: [(0, jsx_runtime_1.jsx)(components_1.AppearanceSectionTitle, { children: "Preview" }), (0, jsx_runtime_1.jsx)(components_1.Checkbox, { checked: shouldCompare, onClick: () => setShouldCompare(s => s === false), text: 'Compare to Original' })] }) }), shouldCompare === true ? ((0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingHorizontal: true, spaceBetween: true, children: [(0, jsx_runtime_1.jsx)(components_1.ImageCompareSlider, { imgOne: (0, jsx_runtime_1.jsx)(react_compare_slider_1.ReactCompareSliderImage, { src: (0, utils_2.makeSolidColorImageUri)('#ed8282') }), imgTwo: (0, jsx_runtime_1.jsx)(react_compare_slider_1.ReactCompareSliderImage, { src: (0, utils_2.makeSolidColorImageUri)('#81c14b') }) }), (0, jsx_runtime_1.jsxs)(components_1.AppearanceInputsContainer, { children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'number', size: 'sm', label: (0, jsx_runtime_1.jsx)(Icons_1.BidirectionalHorizontalArrowIcon, {}), value: '0.5', onChange: noop_1.noop, adornment: 'm' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'number', size: 'sm', label: (0, jsx_runtime_1.jsx)(Icons_1.BidirectionalVerticalArrowIcon, {}), value: '0.5', onChange: noop_1.noop, adornment: 'm' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { divider: true, children: (0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'number', size: 'sm', label: (0, jsx_runtime_1.jsx)(Icons_1.ArrowClockwiseIcon, {}), value: '45', onChange: noop_1.noop, adornment: '\u00B0' }) })] })] })) : ((0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, center: true, children: (0, jsx_runtime_1.jsx)(components_1.PreviewImage, { src: (0, utils_2.makeSolidColorImageUri)('#81c14b') }) })), (0, jsx_runtime_1.jsx)(components_1.AppearanceContainer, { children: (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingHorizontal: true, spaceBetween: true, gap: 10, children: [(0, jsx_runtime_1.jsx)(components_1.TextField, { type: 'text', label: 'Name', size: 'lg', value: 'Monolith #868686', onChange: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: isFavourite === true ? 'favouriteFilled' : 'circleAroundDot', size: 'sm-mobile', variant: 'text', state: 'active', onClick: () => setIsFavourite(negate_1.negate) })] }) }), (0, jsx_runtime_1.jsx)(components_1.AppearanceContainer, { children: (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingLeft: 'row 3/4', paddingRight: true, spaceBetween: true, minHeight: 'unset', children: [(0, jsx_runtime_1.jsx)(components_1.Checkbox, { checked: false, onClick: noop_1.noop, text: 'Apply to all' }), (0, jsx_runtime_1.jsx)(components_1.Select, { value: applyToValue, onChange: setApplyToValue, options: [
                                        'Exterior walls',
                                        'Interior walls',
                                    ].map((e, i) => ({ label: e, value: i })) })] }) })] })] }));
});
const ReplaceElementMenuDemo = (0, react_1.memo)(() => {
    const title = 'Replace element';
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsxs)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.ReplaceElementInfoRow, { img: (0, utils_2.makeSolidColorImageUri)('brown'), text: 'Default Vanity', highlightedText: '2 selected' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.Checkbox, { checked: false, onClick: noop_1.noop, text: 'Select all similar items' }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.SearchInput, { placeholder: 'Search', value: '', setValue: noop_1.noop }) })] })] }));
});
const AIToolsMenuDemo = (0, react_1.memo)(() => {
    const title = 'AI Tools';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [exteriorPrompt, setExteriorPrompt] = (0, react_1.useState)('');
    const [interiorPrompt, setInteriorPrompt] = (0, react_1.useState)('');
    const exteriorTab = 'Exterior';
    const interiorTab = 'Interior';
    const asset2DTab = '2D asset';
    const tabs = [
        { text: exteriorTab },
        { text: interiorTab },
        { text: asset2DTab },
    ];
    const [chosenTab, setChosenTab] = (0, react_1.useState)(0);
    const activeTab = tabs[chosenTab];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: title, variant: open === true ? 'text' : 'contained' }), (0, jsx_runtime_1.jsxs)(components_1.SlideUpMenu, { title: title, onClose: () => setOpen(false), opened: open, noDivider: true, children: [(0, jsx_runtime_1.jsx)(components_1.Tabs, { chosenTab: chosenTab, onClick: setChosenTab, stretch: true, children: tabs.map(e => ((0, jsx_runtime_1.jsx)(components_1.Tab, { label: e.text }, e.text))) }), activeTab?.text === interiorTab && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: { margin: '8px 0' } }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Select Room', width: 'fill', height: 'md', onClick: noop_1.noop }) })] })), (activeTab?.text === exteriorTab || activeTab?.text === interiorTab) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MenuSection, { type: 'static', title: 'Generate from Prompt', titleVariant: 'pale', children: (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.PromptTextArea, { value: activeTab.text === exteriorTab ? exteriorPrompt : interiorPrompt, onChange: activeTab.text === exteriorTab ? setExteriorPrompt : setInteriorPrompt }) }) }), (0, jsx_runtime_1.jsx)("div", { style: { margin: '8px 0' } }), (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingHorizontal: true, spaceBetween: true, children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Preview', width: 'lg', height: 'md', shadowless: true, onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Remake', width: 'lg', height: 'md', shadowless: true, onClick: noop_1.noop })] }), (0, jsx_runtime_1.jsxs)(components_1.MenuSection, { type: 'static', title: 'Preview:', titleVariant: 'pale', children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)("img", { style: { objectFit: 'contain', width: '100%' }, src: 'https://placehold.co/10', alt: 'prompt result preview' }) }), (0, jsx_runtime_1.jsx)("div", { style: { margin: '8px 0' } }), (0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingHorizontal: true, spaceBetween: true, children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                                                    display: 'flex',
                                                    gap: '10px',
                                                }, children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { text: '\u00A0<\u00A0', variant: 'contained', width: 'fit-content', height: 'md', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: '\u00A0>\u00A0', variant: 'contained', width: 'fit-content', height: 'md', onClick: noop_1.noop })] }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Create 3D', variant: 'contained', width: 'lg', height: 'md', onClick: noop_1.noop })] })] })] })), activeTab?.text === asset2DTab && ((0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            padding: '8px 0',
                        }, children: [(0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Select 2D asset', width: 'fill', height: 'md', onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Create 3D', width: 'md', height: 'md', onClick: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(components_1.MenuItem, { paddingHorizontal: true, children: (0, jsx_runtime_1.jsx)(SliderRowWrap, { initialValue: 0.988, label: 'AI Interpretation Precision Control', min: 0, max: 1, step: 0.001 }) })] }))] })] }));
});
const ImageAssetsPopup = (0, react_1.memo)(({ onClick: _onClick }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const onClick = () => {
        setOpen(false);
        _onClick();
    };
    return ((0, jsx_runtime_1.jsxs)(components_1.AnchoredMenu, { TriggerComp: (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'landscape', state: open === true ? 'active' : 'default', onClick: () => setOpen(negate_1.negate) }), open: open, onClose: () => setOpen(false), children: [(0, jsx_runtime_1.jsx)(components_1.DropdownItem, { image: 'https://placehold.co/24', label: 'Trace 2D Floorplan', onClick: onClick }), (0, jsx_runtime_1.jsx)(components_1.Divider, { fullWidth: true }), (0, jsx_runtime_1.jsx)(components_1.DropdownItem, { image: 'https://placehold.co/24', label: '2D Scene', onClick: onClick }), (0, jsx_runtime_1.jsx)(components_1.Divider, { fullWidth: true }), (0, jsx_runtime_1.jsx)(components_1.DropdownItem, { image: 'https://placehold.co/24', label: 'Sticker', onClick: onClick }), (0, jsx_runtime_1.jsx)(components_1.Divider, { fullWidth: true }), (0, jsx_runtime_1.jsx)(components_1.DropdownItem, { image: 'https://placehold.co/24', label: 'Texture', onClick: onClick }), (0, jsx_runtime_1.jsx)(components_1.Divider, { fullWidth: true }), (0, jsx_runtime_1.jsx)(components_1.DropdownItem, { icon: 'myAssets', label: 'My 2D Assets', onClick: onClick })] }));
});
const UploadImageAssetsMenu = (0, react_1.memo)(({ open, onClose }) => {
    const [chosenMaterial, setChosenMaterial] = (0, react_1.useState)();
    const addNewOptionId = -1;
    return ((0, jsx_runtime_1.jsx)(components_1.SlideUpMenu, { opened: open, title: 'Trace 2D Floorplan', onClose: onClose, noDivider: true, children: (0, jsx_runtime_1.jsx)(components_1.Upload2DAssetsMenuContent, { description: 'Similar to tracing paper, floorplans will be placed flat on the canvas with a 0\u00B0 tilt. Draw over existing walls, doors, etc. Quickly create 3D models from 2D floorplans.', title: 'Select or add a floorplan to trace', children: (0, jsx_runtime_1.jsx)(components_1.MaterialPicker, { shape: 'round', options: [
                    {
                        id: addNewOptionId,
                        name: 'Add New',
                        image: (0, utils_2.encodeSvgAsDataUri)((0, string_1.getPlusCircledSvgString)(theme_1.theme.palette.primary.main)),
                        noBorder: true,
                        textColor: theme_1.theme.palette.primary.main,
                    },
                    ...([
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
                    }))),
                ], chosenOption: chosenMaterial, onClick: idx => setChosenMaterial(idx) }) }) }));
});
const MainOverlayDemo = (0, react_1.memo)(({ closeMainOverlay }) => {
    const [isActive, setIsActive] = (0, react_1.useState)(false);
    const [showFloatingMenu, setShowFloatingMenu] = (0, react_1.useState)('none');
    const [tabIndex, setTabIndex] = (0, react_1.useState)(0);
    const [showDrawToolbar, setShowDrawToolbar] = (0, react_1.useState)(true);
    const [showBottom, setShowBottom] = (0, react_1.useState)(null);
    const [showFeatureMap, setShowFeatureMap] = (0, react_1.useState)(false);
    const [isTouchScreen, setIsTouchScreen] = (0, react_1.useState)(false);
    const [showImageAssetsMenu, setShowImageAssetsMenu] = (0, react_1.useState)(false);
    const stateProps = {
        state: isActive ? 'active' : 'default',
        onClick: () => setIsActive(!isActive),
    };
    const floatingMenuContent = {
        none: null,
        settings: {
            title: 'Settings',
            comp: (0, jsx_runtime_1.jsx)(MiscMenuContent_1.MiscMenuContent, {}),
        },
        visibility: {
            title: 'Hide/Show',
            comp: (0, jsx_runtime_1.jsx)(components_1.VisibilityMenuContent, { items: data_1.visibilityMenuItems }),
        },
        '3d-catalog': {
            title: 'Catalog',
            comp: (0, jsx_runtime_1.jsx)(CatalogMenuContentDemo_1.CatalogMenuContentDemo, {}),
        },
    };
    return ((0, jsx_runtime_1.jsxs)(Base, { children: [showFeatureMap === true && ((0, jsx_runtime_1.jsx)(components_1.FeatureMapOverlay, { isTouchScreen: isTouchScreen, viewModesText: 'Draw walls and rooms in 2D, view and design building in 3D', wallModesText: 'Switch between draw and select modes', drawToolsText: 'Draw using paths, Single lines, Poly lines, and other tools', autoGenerationToolsText: 'Use or turn off auto generation options - wall, floor, roof, ceiling etc.', featureTipButtonText: 'View tips, tutorials, and more' })), (0, jsx_runtime_1.jsx)(UploadImageAssetsMenu, { open: showImageAssetsMenu, onClose: () => setShowImageAssetsMenu(false) }), (0, jsx_runtime_1.jsx)(components_1.MainScreenOverlay, { topLeft: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(TopToolbarDefault, { closeMainOverlay: closeMainOverlay }), (0, jsx_runtime_1.jsx)(Icons_1.CompassIcon, {})] }), topCenter: (0, jsx_runtime_1.jsxs)(components_1.AnnotatedTabs, { chosenTab: tabIndex, onClick: index => setTabIndex(index), levelName: 'Level 2: Second floor', children: [(0, jsx_runtime_1.jsx)(components_1.Tab, { label: '2D' }), (0, jsx_runtime_1.jsx)(components_1.Tab, { label: '3D' }), isTouchScreen === false && ((0, jsx_runtime_1.jsx)(components_1.Tab, { label: (0, jsx_runtime_1.jsx)(Icons_1.PersonWalkingIcon, { color: theme_1.theme.palette.text.secondary }) }))] }), topRight: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(components_1.Box, { row: true, justify: 'flex-end', gap: 10, children: [(0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'share', state: 'default', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'gear', state: showFloatingMenu === 'settings' ? 'active' : 'default', onClick: () => setShowFloatingMenu(e => e !== 'none' ? 'none' : 'settings') })] }), (0, jsx_runtime_1.jsxs)(components_1.Box, { row: true, justify: 'flex-end', gap: styles_2.mainScreenOverlayTopRightMenuGap, children: [showDrawToolbar === true && ((0, jsx_runtime_1.jsx)(components_1.PopUpToolbar, { mode: 'static', orientation: 'vertical', items: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'straightLine', onClick: noop_1.noop }), isTouchScreen === true ? null : ((0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'multipleStraightLines', onClick: noop_1.noop })), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'rectangle', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'hexagon', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'curvedLine', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'brokenCurvedLine', onClick: noop_1.noop })] }), expandableItems: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'wall', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'floor', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'roofOnly', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.ToolbarButton, { icon: 'ceiling', onClick: noop_1.noop })] }) })), showFloatingMenu !== 'none' && ((0, jsx_runtime_1.jsx)(components_1.FloatingMenuContainer, { children: (0, jsx_runtime_1.jsx)(components_1.FloatingMenu, { title: floatingMenuContent[showFloatingMenu].title, onClose: () => setShowFloatingMenu('none'), children: floatingMenuContent[showFloatingMenu].comp }) })), (0, jsx_runtime_1.jsxs)(components_1.IconMenuContainer, { children: [(0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'layout', state: showDrawToolbar === true ? 'active' : 'default', onClick: () => setShowDrawToolbar(negate_1.negate) }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'pointer', state: showFeatureMap === true ? 'active' : 'default', onClick: () => setShowFeatureMap(negate_1.negate) }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'layers', state: isTouchScreen === true ? 'active' : 'default', onClick: () => setIsTouchScreen(negate_1.negate) }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'eye', state: showFloatingMenu === 'visibility' ? 'active' : 'default', onClick: () => setShowFloatingMenu(s => s === 'visibility' ? 'none' : 'visibility') }), (0, jsx_runtime_1.jsx)(ImageAssetsPopup, { onClick: () => setShowImageAssetsMenu(true) }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'stars', variant: 'default', state: 'active', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'plus', variant: 'outlined', state: showFloatingMenu === '3d-catalog' ? 'active' : 'default', onClick: () => setShowFloatingMenu(s => s === '3d-catalog' ? 'none' : '3d-catalog') })] })] })] }), bottomLeft: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'undo', ...stateProps }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'redo', ...stateProps })] }), bottomCenter: (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'circleAroundDot', onClick: () => setShowBottom('priority') }), bottomRight: (0, jsx_runtime_1.jsx)(components_1.AnchorTo, { xDirection: 'left', yDirection: 'top', yOffset: 'calc(100% + 10px)', anchored: showBottom !== 'infopanel'
                        ? null
                        : ((0, jsx_runtime_1.jsx)(components_1.InfoPanel, { title: 'Draw Mode: Line Drawing', description: 'Draw lines to complete a room/space. Switch to 3D view to see the space in 3D.', onClose: () => setShowBottom(null), onPrevious: noop_1.noop, onNext: noop_1.noop, onStartQuickTour: () => window.alert('open tutorials'), onOpenTutorials: () => window.alert('start quick tour') })), children: (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'hint', variant: 'text', 
                        // variant='default'
                        // state='active'
                        // pulseGlow={1}
                        // borderRadius='circle'
                        iconColors: {
                            default: theme_1.theme.palette.primary.main,
                        }, onClick: () => setShowBottom(e => e === 'infopanel' ? null : 'infopanel') }) }), bottomCenterPriority: showBottom !== 'priority'
                    ? null
                    : ((0, jsx_runtime_1.jsxs)(components_1.MenuItem, { paddingLeft: true, children: [(0, jsx_runtime_1.jsxs)(components_1.RowBackdrop, { children: [(0, jsx_runtime_1.jsx)(components_1.MeasurementInputRow, { label: 'Length:', firstInput: {
                                            variant: 'light',
                                            name: '2d-asset-length-primary-unit',
                                            value: '0',
                                            onChange: noop_1.noop,
                                            min: 0,
                                            adornment: '′',
                                        }, secondInput: {
                                            variant: 'light',
                                            name: '2d-asset-length-sub-unit',
                                            value: '0',
                                            onChange: noop_1.noop,
                                            min: 0,
                                            adornment: '″',
                                        } }), (0, jsx_runtime_1.jsx)(components_1.SecondaryButton, { text: 'Apply', onClick: () => alert('apply') })] }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'close', size: 'md-mobile', variant: 'text', onClick: () => setShowBottom(null) })] })) })] }));
});
const TemplateScreenDemo = (0, react_1.memo)(({ closeTemplateScreen }) => ((0, jsx_runtime_1.jsx)(Base, { children: (0, jsx_runtime_1.jsx)(Hub_1.TemplateScreen, { title: 'Choose a Template', tabs: [
            {
                title: 'Room',
                state: 'active',
                onClick: noop_1.noop,
                items: [
                    {
                        title: 'Create New',
                        image: 'blank',
                        onClick: noop_1.noop,
                    },
                    {
                        title: 'Rectangular',
                        image: 'rectangular',
                        onClick: noop_1.noop,
                    },
                    {
                        title: 'T-shape',
                        image: 'TShape',
                        onClick: noop_1.noop,
                    },
                    {
                        title: 'L-shape',
                        image: 'LShape',
                        onClick: noop_1.noop,
                    },
                    {
                        title: 'Custom',
                        image: 'https://placehold.co/100',
                        onClick: noop_1.noop,
                    },
                ],
            },
            {
                title: 'House',
                state: 'disabled',
                onClick: noop_1.noop,
                items: [],
            },
            {
                title: 'Close',
                state: 'default',
                onClick: closeTemplateScreen,
                items: [],
            },
        ] }) })));
const PagesDemo = (0, react_1.memo)(({ closePages }) => {
    const [pageContent, setPageContent] = (0, react_1.useState)('Projects');
    const [editProjectNameId, setEditProjectNameId] = (0, react_1.useState)();
    const [projectName, setProjectName] = (0, react_1.useState)('My Home');
    const [openSnackbarWithSuccess, setOpenSnackbarWithSuccess] = (0, react_1.useState)(false);
    const user = {
        name: 'John Smith',
        email: 'johnsmith@gmail.com',
        avatar: null,
        passwordLess: false,
    };
    const menuOptions = {
        accountOptions: (user === null ? [
            { title: 'Sign Up', icon: 'person', onClick: () => alert('sign up') },
        ] : [
            {
                title: 'Account',
                icon: 'person',
                onClick: () => setPageContent('Account'),
                state: pageContent === 'Account' ? 'active' : 'default',
            },
            { title: 'Log Out', icon: 'logout', onClick: closePages },
        ]),
        categoryOptions: [
            {
                title: 'My Projects',
                icon: 'projects',
                onClick: () => setPageContent('Projects'),
                state: pageContent === 'Projects' ? 'active' : 'default',
            },
            {
                title: 'My Team',
                icon: 'team',
                onClick: () => setPageContent('Team'),
                state: pageContent === 'Team' ? 'active' : 'default',
            },
            {
                title: 'Billing',
                icon: 'coin',
                onClick: () => setPageContent('Billing'),
                state: pageContent === 'Billing' ? 'active' : 'default',
            },
            {
                title: 'Support',
                icon: 'questionMark',
                onClick: () => setPageContent('Support'),
                state: pageContent === 'Support' ? 'active' : 'default',
            },
        ],
    };
    const titles = {
        Projects: 'My Projects',
        Team: 'My Team',
        Billing: 'Billing',
        Support: 'Support',
        Account: 'Account',
    };
    const subTitles = {
        Projects: null,
        Team: null,
        Billing: 'Manage your billing and payment details.',
        Support: null,
        Account: null,
    };
    const logInSuggestionProps = {
        logInSuggestionText: 'Sign In to Unlock More Features',
        logInButtonText: 'Log in',
        onLoginButtonClick: () => alert('login'),
    };
    const ComingSoonPageContentJSX = (0, jsx_runtime_1.jsx)(Hub_1.ComingSoonPageContent, {});
    const contents = {
        Projects: ((0, jsx_runtime_1.jsx)(Hub_1.ProjectsPageContent, { isGuestUser: user === null, templateSectionTitle: 'Start With a Template', templateSectionOptions: [
                {
                    title: 'Create New',
                    image: 'blank',
                    onClick: noop_1.noop,
                },
                {
                    title: 'Rectangular',
                    image: 'rectangular',
                    onClick: noop_1.noop,
                },
                {
                    title: 'L-shape',
                    image: 'LShape',
                    onClick: noop_1.noop,
                },
                {
                    title: 'T-shape',
                    image: 'TShape',
                    onClick: noop_1.noop,
                },
                {
                    title: 'Custom',
                    image: 'https://placehold.co/100',
                    onClick: noop_1.noop,
                },
            ], emptyProjectsSuggestionText: 'Create Your First Project', ...logInSuggestionProps, projectsSectionTitle: 'Recent Projects', projects: (Array.from({ length: 5 }, (_, idx) => ({
                name: projectName,
                href: `/${idx}`,
                image: `/project-review-image-${idx % 2 === 0 ? 1 : 2}.png`,
                nameEditMode: String(idx) === editProjectNameId,
                onNameEditModeExit: ({ action, value }) => {
                    if (action === 'save') {
                        setProjectName(value);
                    }
                    setEditProjectNameId(undefined);
                },
                options: [
                    { title: 'Edit Name', icon: 'pencil', onClick: () => setEditProjectNameId(String(idx)) },
                    { title: 'Delete', icon: 'bin', onClick: () => alert(`delete #${idx}`) },
                ],
            }))) })),
        Team: ComingSoonPageContentJSX,
        Billing: ((0, jsx_runtime_1.jsxs)(Hub_1.BillingContent, { children: [(0, jsx_runtime_1.jsxs)(Hub_1.BillingSection, { children: [(0, jsx_runtime_1.jsx)(Hub_1.BillingSectionTitle, { children: "Subscription Overview" }), (0, jsx_runtime_1.jsxs)(Hub_1.BillingIsles, { children: [(0, jsx_runtime_1.jsxs)(Hub_1.BillingIsle, { children: [(0, jsx_runtime_1.jsx)(Hub_1.BillingIsleTitle, { children: "Current Plan" }), (0, jsx_runtime_1.jsx)(Hub_1.BillingDividerBlock, {})] }), (0, jsx_runtime_1.jsxs)(Hub_1.BillingIsle, { children: [(0, jsx_runtime_1.jsx)(Hub_1.BillingIsleTitle, { children: "Usage Summary" }), (0, jsx_runtime_1.jsx)(Hub_1.BillingDividerBlock, {}), (0, jsx_runtime_1.jsxs)(Hub_1.BillingUsageSummaries, { children: [(0, jsx_runtime_1.jsx)(Hub_1.BillingUsageSummary, { used: '4.27 GB', total: '/8.0 GB', percentage: 78, label: 'Storage usage' }), (0, jsx_runtime_1.jsx)(Hub_1.BillingUsageSummary, { used: '5 credits', total: '/12 credits', percentage: 40, label: 'AI Capabilities' })] })] })] })] }), (0, jsx_runtime_1.jsxs)(Hub_1.BillingSection, { children: [(0, jsx_runtime_1.jsx)(Hub_1.BillingSectionTitle, { children: "Billing History" }), (0, jsx_runtime_1.jsx)(Hub_1.BillingIsle, { children: "..." })] }), (0, jsx_runtime_1.jsxs)(Hub_1.BillingSection, { children: [(0, jsx_runtime_1.jsx)(Hub_1.BillingSectionTitle, { children: "Payment Info" }), (0, jsx_runtime_1.jsx)(Hub_1.BillingIsles, { children: (0, jsx_runtime_1.jsxs)(Hub_1.BillingIsle, { children: [(0, jsx_runtime_1.jsxs)(components_1.Box, { column: true, gap: 6, children: [(0, jsx_runtime_1.jsxs)(Hub_1.BillingWithBadgeContainer, { children: [(0, jsx_runtime_1.jsx)(Hub_1.BillingIsleTitle, { children: "Payment Method" }), (0, jsx_runtime_1.jsx)(Hub_1.BillingBadge, { children: "Primary" })] }), (0, jsx_runtime_1.jsx)(Hub_1.BillingIsleSubTitle, { children: "Change how you pay for your plan" })] }), (0, jsx_runtime_1.jsx)(Hub_1.BillingDividerBlock, {}), (0, jsx_runtime_1.jsx)(Hub_1.BillingPaymentMethod, { last4: '4224', brand: 'mastercard2', expiry: 'Expiry 08/2027', Button: (0, jsx_runtime_1.jsx)(Hub_1.FormButton, { type: 'button', size: 'small', text: 'Change', onClick: () => { } }), address: {
                                            line1: '12 Maple Crescent',
                                            line2: '7 apt',
                                            city: 'Bristol',
                                            postalCode: 'BS3 4HT',
                                            country: 'UK',
                                        } })] }) })] })] })),
        Support: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.Snackbar, { type: 'success', text: 'Thank you for your message. It has been sent.', open: openSnackbarWithSuccess, handleClose: () => setOpenSnackbarWithSuccess(false) }), (0, jsx_runtime_1.jsx)(Hub_1.SupportPageContent, { isGuestUser: user === null, mainSectionTitle: 'How can we help you?', subjectFieldLabel: 'Subject', requestFieldLabel: 'How can we help you?', requiredErrorText: 'The field is required.', submitButtonText: 'Send', onSubmit: (data, resetForm) => {
                        console.info('support form data', data);
                        setOpenSnackbarWithSuccess(true);
                        resetForm();
                    }, ...logInSuggestionProps })] })),
        Account: ((0, jsx_runtime_1.jsx)(Hub_1.AccountPageContent, { user: user, templateSectionTitle: 'Account Settings', mainFormTexts: {
                fields: { fullName: 'Full name', email: 'Email' },
                buttons: {
                    changeName: 'Change Name',
                    changeEmail: 'Change Email',
                    changePassword: 'Change Password',
                },
            }, logoutTexts: {
                bottomLink: 'Log out',
                dialog: {
                    title: 'Do you want to log out?',
                    buttons: {
                        confirm: 'Confirm',
                        cancel: 'Cancel',
                    },
                },
            }, deleteAccountTexts: {
                bottomLink: 'Delete account',
                dialog: {
                    title: 'Do you want to delete your account?',
                    description: 'This action can not be reversed.',
                    description2: 'Enter password to confirm.',
                    passwordField: 'Password',
                    buttons: {
                        confirm: 'Confirm',
                        cancel: 'Cancel',
                        confirmSuccess: 'Confirm',
                    },
                    deleteSuccessMessage: 'Account was successfully deleted',
                    deleteErrorMessage: 'Error in deleting account',
                },
            }, changeNameDialogTexts: {
                title: 'Change Name',
                formTexts: {
                    formFields: { name: { text: 'New Name' } },
                    buttons: {
                        confirm: { text: 'Confirm' },
                        cancel: { text: 'Cancel' },
                    },
                },
            }, changeEmailDialogTexts: {
                title: 'Change Email',
                description: 'You will receive a confirmation code on your new email',
                formTexts: {
                    formFields: {
                        newEmailAddress: { text: 'New Email address' },
                        password: { text: 'Password' },
                    },
                    buttons: {
                        confirm: { text: 'Confirm' },
                        cancel: { text: 'Cancel' },
                    },
                },
            }, changePasswordDialogTexts: {
                title: 'Change Password',
                formTexts: {
                    formFields: {
                        oldPassword: { text: 'Old Password' },
                        newPassword: { text: 'New Password' },
                        newPasswordRepeat: { text: 'Repeat New Password' },
                    },
                    buttons: {
                        confirm: { text: 'Confirm' },
                        cancel: { text: 'Cancel' },
                    },
                },
            }, commonErrorTexts: commonErrorTexts, handlers: {
                logout: closePages,
                changeNameSubmit: data => {
                    if (data.name !== 'q') {
                        return Promise.resolve({
                            ok: false,
                            errors: { name: 'type "q" in this field to fix error' },
                        });
                    }
                    return Promise.resolve({ ok: true });
                },
                changeEmailSubmit: data => {
                    if (data.password !== 'q') {
                        return Promise.resolve({
                            ok: false,
                            errors: { password: 'type "q" in this field to fix error' },
                        });
                    }
                    return Promise.resolve({ ok: true });
                },
                deleteAccountSubmit: data => {
                    if (data.password !== 'q') {
                        return Promise.resolve({
                            ok: false,
                            errors: { password: 'type "q" in this field to fix error' },
                        });
                    }
                    return Promise.resolve({ ok: true });
                },
                changePasswordSubmit: data => {
                    if (data.oldPassword !== 'q') {
                        return Promise.resolve({
                            ok: false,
                            errors: { oldPassword: 'type "q" in this field to fix error' },
                        });
                    }
                    return Promise.resolve({ ok: true });
                },
                changeAvatar(file) {
                    console.info(file);
                },
            } })),
    };
    return ((0, jsx_runtime_1.jsx)(Base, { children: (0, jsx_runtime_1.jsx)(Hub_1.PageWithMenu, { pageTitle: titles[pageContent], pageSubTitle: subTitles[pageContent], appName: 'DrawHome', appLogoLink: 'https://dev.drawhome.com', user: user, planBadgeText: 'Free Plan', guestProfileText: 'Guest Profile', menuOptions: menuOptions, children: contents[pageContent] }) }));
});
const IconsPage = (0, react_1.memo)(({ close }) => ((0, jsx_runtime_1.jsx)(Base, { children: (0, jsx_runtime_1.jsx)(IconsDemo_1.IconsDemo, { close: close }) })));
const DialogDemo = (0, react_1.memo)(() => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', text: 'dialog', onClick: () => setOpen(true) }), (0, jsx_runtime_1.jsxs)(components_1.Dialog, { open: open, onClose: () => setOpen(false), title: 'Unlock with Premium!', icon: 'unlock', children: [(0, jsx_runtime_1.jsx)(components_1.DialogDescription, { text: 'Get access to additional features for even more precise and convenient space modeling.' }), (0, jsx_runtime_1.jsx)(components_1.DialogActions, { primaryActionText: 'Unlock all', onPrimaryAction: () => window.alert('primary action'), secondaryActionText: 'Try later', onSecondaryAction: () => window.alert('secondary action') })] })] }));
});
const ShareDemo = (0, react_1.memo)(() => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const [tabIndex, setTabIndex] = (0, react_1.useState)(0);
    const formats = ['PNG', 'GLTF', 'GLB'];
    const [format, setFormat] = (0, react_1.useState)('PNG');
    const tabs = [
        {
            title: 'Export the project',
            tab: 'Export',
            content: ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.ExportTabFormatPicker, { title: 'Format', chosenFormat: format, formats: formats, onChange: setFormat }), (0, jsx_runtime_1.jsx)(components_1.Divider, {}), (0, jsx_runtime_1.jsx)(components_1.DialogActions, { paddingHorizontal: true, primaryActionText: 'Export', onPrimaryAction: () => { }, secondaryActionText: 'Cancel', onSecondaryAction: () => { } })] })),
        },
        {
            title: 'Share the project',
            tab: 'Share',
            content: ((0, jsx_runtime_1.jsx)(components_1.PublicLink, { title: 'Public link', url: 'https://app.drawhome.com/?projectId=nJ97WmHQJF', buttonText: 'Copy link', copySuccessStatusText: 'Copied!' })),
        },
    ];
    const tab = tabs[tabIndex];
    (0, assert_1.default)(!(0, ts_utils_1.isUndefined)(tab), 'Unreachable. |0q5hvl|');
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', text: 'export/share', onClick: () => setOpen(true) }), (0, jsx_runtime_1.jsx)(components_1.PopUp, { open: open, onClose: () => setOpen(false), children: (0, jsx_runtime_1.jsxs)(components_1.ShareExportPopUpContentWrapper, { title: tab.title, onClose: () => setOpen(false), children: [(0, jsx_runtime_1.jsx)(components_1.Tabs, { chosenTab: tabIndex, onClick: setTabIndex, stretch: true, children: tabs.map(e => ((0, jsx_runtime_1.jsx)(components_1.Tab, { label: e.tab }, e.tab))) }), tab.content] }) })] }));
});
const HubDialogDemo = (0, react_1.memo)(() => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', text: 'hub dialog', onClick: () => setOpen(true) }), (0, jsx_runtime_1.jsx)(Hub_1.Dialog, { open: open, onClose: () => setOpen(false), title: 'Do you want to delete this project?', children: (0, jsx_runtime_1.jsx)(Hub_1.DialogActions, { primaryActionText: 'Confirm', onPrimaryAction: () => window.alert('primary action'), secondaryActionText: 'Cancel', onSecondaryAction: () => window.alert('secondary action') }) })] }));
});
const SnackbarSuccessDemo = (0, react_1.memo)(() => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: 'Success message' }), (0, jsx_runtime_1.jsx)(components_1.Snackbar, { text: 'Password was successfully changed', open: open, handleClose: () => setOpen(false), type: 'success' })] }));
});
const SnackbarWarningDemo = (0, react_1.memo)(() => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setOpen(negate_1.negate), text: 'Success message' }), (0, jsx_runtime_1.jsx)(components_1.Snackbar, { text: 'Password was successfully changed', open: open, handleClose: () => setOpen(false), type: 'warning' })] }));
});
const SlideUpMenuSection = (0, react_1.memo)(() => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Slide-up menus \u2B07" }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(MaterialsMenuDemo, {}), (0, jsx_runtime_1.jsx)(MiscMenuDemo, {}), (0, jsx_runtime_1.jsx)(InitMenuDemo, {}), (0, jsx_runtime_1.jsx)(StairsMenuDemo, {}), (0, jsx_runtime_1.jsx)(CatalogMenuDemo_1.CatalogMenuDemo, {}), (0, jsx_runtime_1.jsx)(LevelsMenuDemo, {}), (0, jsx_runtime_1.jsx)(NewLevelMenuDemo, {}), (0, jsx_runtime_1.jsx)(UploadModelMenuDemo, {}), (0, jsx_runtime_1.jsx)(VisibilityMenuDemo, {}), (0, jsx_runtime_1.jsx)(Asset2dMenuDemo, {}), (0, jsx_runtime_1.jsx)(ColorOverlayMenuDemo, {}), (0, jsx_runtime_1.jsx)(ReplaceElementMenuDemo, {}), (0, jsx_runtime_1.jsx)(AIToolsMenuDemo, {}), (0, jsx_runtime_1.jsx)(PaywallMenuDemo_1.PaywallMenuDemo, {}), (0, jsx_runtime_1.jsx)(PaywallFloatingMenuDemo_1.PaywallFloatingMenuDemo, {})] })] })));
const PopupsSection = (0, react_1.memo)(() => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Popups \u2B07" }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(DialogDemo, {}), (0, jsx_runtime_1.jsx)(HubDialogDemo, {}), (0, jsx_runtime_1.jsx)(ShareDemo, {}), (0, jsx_runtime_1.jsx)(SnackbarSuccessDemo, {}), (0, jsx_runtime_1.jsx)(SnackbarWarningDemo, {}), (0, jsx_runtime_1.jsx)(AllHotkeysDemo_1.AllHotkeysMenuDemo, {})] })] })));
const ButtonsSection = (0, react_1.memo)(() => {
    const [active, setActive] = (0, react_1.useState)(false);
    const stateProps = {
        state: active === true ? 'active' : 'default',
        onClick: () => setActive(negate_1.negate),
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: stateProps.onClick }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: stateProps.onClick, state: 'disabled' }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: stateProps.onClick, text: 'Render' }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: stateProps.onClick, state: 'disabled', text: 'Render' })] }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Cancel', variant: 'text', width: 'lg', height: 'md', onClick: stateProps.onClick }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { text: 'Create', width: 'lg', height: 'md', shadowless: true, onClick: stateProps.onClick })] }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'undo', ...stateProps }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'redo', ...stateProps, state: 'disabled' }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'close', size: 'sm', variant: 'text', onClick: stateProps.onClick }), (0, jsx_runtime_1.jsx)(components_1.IconButton, { icon: 'gear', variant: 'text', ...stateProps })] }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(components_1.AppearanceIconButton, { icon: 'download', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.AppearanceIconButton, { icon: 'stars', onClick: noop_1.noop })] }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(Hub_1.TabButton, { text: 'Name', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(Hub_1.TabButton, { state: 'active', text: 'Name', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(Hub_1.TabButton, { state: 'disabled', text: 'Name', onClick: noop_1.noop })] }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(components_1.SecondaryButton, { text: 'Done', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.SecondaryButton, { state: 'disabled', text: 'Done', onClick: noop_1.noop })] }), (0, jsx_runtime_1.jsx)(HorizontalSection, { children: (0, jsx_runtime_1.jsx)(Switch_1.Switch, { checked: active, onClick: stateProps.onClick }) }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(components_1.FieldButton, { icon: 'rotate', text: 'Rotate', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(components_1.FieldButton, { icon: 'flipHorizontal', text: 'Flip horizontal', onClick: noop_1.noop })] }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(Hub_1.ButtonLinkLike, { text: 'Account', icon: 'logout', onClick: noop_1.noop }), (0, jsx_runtime_1.jsx)(Hub_1.ButtonLinkLike, { text: 'Log out', icon: 'logout', onClick: noop_1.noop, state: 'active' }), (0, jsx_runtime_1.jsx)(Hub_1.ButtonLinkLike, { text: 'Smaller log out', icon: 'logout', onClick: noop_1.noop, state: 'active', version: 'smaller' }), (0, jsx_runtime_1.jsx)(Hub_1.ButtonLinkLike, { text: 'Delete', icon: 'delete', onClick: noop_1.noop, state: 'active', version: 'smaller' })] }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(Hub_1.FormButton, { text: 'Confirm', size: 'medium', variant: 'contained', onClick: () => { } }), (0, jsx_runtime_1.jsx)(Hub_1.FormButton, { text: 'Send again', size: 'medium', onClick: () => { } }), (0, jsx_runtime_1.jsx)(Hub_1.FormButton, { text: 'Disabled', size: 'small', disabled: true, onClick: () => { } })] })] }));
});
const ImageCompareSliderDemo = (0, react_1.memo)(() => ((0, jsx_runtime_1.jsx)(components_1.ImageCompareSlider, { imgOne: (0, jsx_runtime_1.jsx)(react_compare_slider_1.ReactCompareSliderImage, { src: 'https://placehold.co/190' }), imgTwo: (0, jsx_runtime_1.jsx)(react_compare_slider_1.ReactCompareSliderImage, { src: 'https://placehold.co/190/black/white' }) })));
const App = () => {
    const [tabIndex, setTabIndex] = (0, react_1.useState)(0);
    const [searchCatalogValue, setSearchCatalogValue] = (0, react_1.useState)('');
    const [showMainOverlay, setShowMainOverlay] = (0, react_1.useState)(false);
    const closeMainOverlay = (0, react_1.useCallback)(() => setShowMainOverlay(false), []);
    const [showPages, setShowPages] = (0, react_1.useState)(false);
    const [showIconsPage, setShowIconsPage] = (0, react_1.useState)(false);
    const closePages = (0, react_1.useCallback)(() => setShowPages(false), []);
    const [showTemplateScreen, setShowTemplateScreen] = (0, react_1.useState)(false);
    const closeTemplateScreen = (0, react_1.useCallback)(() => setShowTemplateScreen(false), []);
    const { isDnDSupported } = (0, hooks_1.useCheckDnDSupport)();
    // =====================================================
    if (showPages === true) {
        return (0, jsx_runtime_1.jsx)(PagesDemo, { closePages: closePages });
    }
    if (showMainOverlay === true) {
        return (0, jsx_runtime_1.jsx)(MainOverlayDemo, { closeMainOverlay: closeMainOverlay });
    }
    if (showTemplateScreen === true) {
        return (0, jsx_runtime_1.jsx)(TemplateScreenDemo, { closeTemplateScreen: closeTemplateScreen });
    }
    if (showIconsPage === true) {
        return (0, jsx_runtime_1.jsx)(IconsPage, { close: () => setShowIconsPage(false) });
    }
    return ((0, jsx_runtime_1.jsx)(Base, { children: (0, jsx_runtime_1.jsxs)(Container, { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Pages or overlays \u2B07" }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setShowMainOverlay(negate_1.negate), text: 'main overlay' }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setShowPages(negate_1.negate), text: 'pages' }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setShowTemplateScreen(negate_1.negate), text: 'template screen' }), (0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', onClick: () => setShowIconsPage(negate_1.negate), text: 'all icons' })] }), (0, jsx_runtime_1.jsx)(SlideUpMenuSection, {}), (0, jsx_runtime_1.jsx)(PopupsSection, {}), (0, jsx_runtime_1.jsx)("h4", { children: "End \u2B06" }), (0, jsx_runtime_1.jsx)(ButtonsSection, {}), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)(PopUpToolbarGeneric, {}), (0, jsx_runtime_1.jsx)(PopUpToolbarExpandable, {})] }), (0, jsx_runtime_1.jsx)(HorizontalSection, { children: (0, jsx_runtime_1.jsx)(components_1.Measurement, { text: '1.3 m' }) }), (0, jsx_runtime_1.jsx)(HorizontalSection, { children: (0, jsx_runtime_1.jsx)(components_1.Tag, { lines: [
                            'Room',
                            '10 m²',
                        ], onClick: () => console.info('tag clicked') }) }), (0, jsx_runtime_1.jsx)(HorizontalSection, { children: (0, jsx_runtime_1.jsxs)(components_1.Tabs, { chosenTab: tabIndex, onClick: index => setTabIndex(index), children: [(0, jsx_runtime_1.jsx)(components_1.Tab, { label: 'Build' }), (0, jsx_runtime_1.jsx)(components_1.Tab, { label: 'Design' })] }) }), (0, jsx_runtime_1.jsx)(HorizontalSection, { style: { width: 358 }, children: (0, jsx_runtime_1.jsx)(components_1.SearchInput, { placeholder: 'Search', value: searchCatalogValue, setValue: setSearchCatalogValue }) }), (0, jsx_runtime_1.jsxs)(HorizontalSection, { children: [(0, jsx_runtime_1.jsx)("div", { style: { width: '420px' }, children: (0, jsx_runtime_1.jsx)(Hub_1.FormInput, { startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.InformationIcon, {}), text: 'Full name', onChange: e => {
                                    console.info(e.target.value);
                                } }) }), (0, jsx_runtime_1.jsx)("div", { style: { width: '420px' }, children: (0, jsx_runtime_1.jsx)(Hub_1.FormInput, { startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.EnvelopeIcon, {}), text: 'Email Address', onChange: e => {
                                    console.info(e.target.value);
                                } }) }), (0, jsx_runtime_1.jsx)("div", { style: { width: '420px' }, children: (0, jsx_runtime_1.jsx)(Hub_1.FormInput, { startAdornment: (0, jsx_runtime_1.jsx)(Icons_1.LockIcon, {}), type: 'password', text: 'New password', onChange: e => {
                                    console.info(e.target.value);
                                } }) })] }), (0, jsx_runtime_1.jsx)(HorizontalSection, { style: { width: 360 }, children: (0, jsx_runtime_1.jsx)(components_1.FileUploadArea, { primaryText: isDnDSupported === true ? 'Drag or Upload Objects' : 'Upload Objects from Files', supportedFormatsText: 'Supported formats:', accept: '.glb,.jpg,.jpeg,.png', onFileSelect: file => {
                            window.alert(file.name);
                        }, onFileReject: ({ showDefaultRejectionEffect }) => {
                            showDefaultRejectionEffect();
                        } }) }), (0, jsx_runtime_1.jsx)(HorizontalSection, { children: (0, jsx_runtime_1.jsx)(ImageCompareSliderDemo, {}) }), (0, jsx_runtime_1.jsx)(HorizontalSection, { children: (0, jsx_runtime_1.jsx)(components_1.InfoPanel, { title: 'Draw Mode: Line Drawing', description: 'Draw lines to complete a room/space. Switch to 3D view to see the space in 3D.', onClose: noop_1.noop }) }), (0, jsx_runtime_1.jsx)(HorizontalSection, { children: (0, jsx_runtime_1.jsx)(HotkeysDemo_1.HotkeysDemo, {}) })] }) }));
};
exports.App = App;
//# sourceMappingURL=App.js.map