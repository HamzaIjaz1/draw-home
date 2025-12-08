"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllHotkeysMenuDemo = exports.AllHotkeysDemo = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const components_1 = require("../components");
const negate_1 = require("../utils/negate");
const Icons_1 = require("../components/Icons");
exports.AllHotkeysDemo = (0, react_1.memo)(() => {
    const theme = (0, material_1.useTheme)();
    const globalKeys = {
        title: 'Global Keys',
        icon: (0, jsx_runtime_1.jsx)(Icons_1.KeyboardAndMouseIcon, { color: theme.palette.text.secondary }),
        lines: [
            'Alt = Show Hotkeys, Help',
            'Del = Delete selected object',
            'Esc = Abandon current action',
            'Ctrl + C = Copy Ctrl + V = Paste',
            'Tab = Switch between 2D/3D',
            'M = Tape Measure',
            'Shift while drawing = Ignore snap rules',
            'Shift + Click = Group',
            'Pg Up = Move up one level',
            'Pg DN = Move down one level',
        ],
    };
    const quickAccessKeys = {
        title: 'Quick Access Objects',
        icon: (0, jsx_runtime_1.jsx)(Icons_1.HouseWithChimneyIcon, { color: theme.palette.text.secondary }),
        lines: [
            'Shift + D = Door',
            'Shift + W = Window',
            'Shift + C = Column',
            'Shift + S = Stairs',
        ],
    };
    const cameraKeys = {
        title: 'Camera Controls',
        icon: (0, jsx_runtime_1.jsx)(Icons_1.CameraIcon, { color: theme.palette.text.secondary }),
        lines: [
            'Left click + Drag = Rotate',
            'Right click + Drag = Pan',
            'Scroll wheel = Zoom',
            'R = Reset camera',
            'Hold R = Rotate camera',
            'Arrows = Pan',
            'Z, Ctrl + = Zoom in',
            'Shift Z, Ctrl - = Zoom out',
        ],
    };
    const walkKeys = {
        title: 'Walk Controls',
        icon: (0, jsx_runtime_1.jsx)(Icons_1.PersonWalkingIcon, { color: theme.palette.text.secondary }),
        lines: [
            'WASD = Walk',
            'Pg Up = Up',
            'Pg Down = Down',
            'Mouse, Arrows = Look',
        ],
    };
    const otherKeys = {
        title: 'Other Tools',
        icon: (0, jsx_runtime_1.jsx)(Icons_1.CircumscribedPencilIcon, { color: theme.palette.text.secondary }),
        lines: [
            '/ = Comment',
            'B = Paintbrush',
            'T = Terrain',
        ],
    };
    return ((0, jsx_runtime_1.jsxs)(components_1.AllHotkeysLegend.Root, { children: [(0, jsx_runtime_1.jsx)(components_1.AllHotkeysLegend.Block, { ...globalKeys }), (0, jsx_runtime_1.jsx)(components_1.AllHotkeysLegend.Block, { ...quickAccessKeys }), (0, jsx_runtime_1.jsx)(components_1.AllHotkeysLegend.Block, { ...cameraKeys }), (0, jsx_runtime_1.jsxs)(components_1.AllHotkeysLegend.Combine, { children: [(0, jsx_runtime_1.jsx)(components_1.AllHotkeysLegend.Block, { ...walkKeys }), (0, jsx_runtime_1.jsx)(components_1.AllHotkeysLegend.Block, { ...otherKeys })] })] }));
});
exports.AllHotkeysMenuDemo = (0, react_1.memo)(() => {
    const [open, setOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(components_1.MainButton, { icon: 'plus', text: 'All Hotkeys Legend', onClick: () => setOpen(negate_1.negate) }), open === true && (0, jsx_runtime_1.jsx)(exports.AllHotkeysDemo, {})] }));
});
//# sourceMappingURL=AllHotkeysDemo.js.map