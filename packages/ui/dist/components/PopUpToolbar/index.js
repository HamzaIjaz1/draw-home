"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopUpToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("@draw-house/common/dist/utils");
const ts_utils_1 = require("@arthurka/ts-utils");
const material_1 = require("@mui/material");
const react_1 = require("react");
const assert_1 = __importDefault(require("assert"));
const styles_1 = require("./styles");
const variants_1 = require("../IconButton/variants");
const AnimatedExpandableItemsContainer = ({ expand, children }) => {
    const animation = (expand === true
        ? {
            height: 'auto',
            opacity: 1,
            visibility: 'visible',
        }
        : {
            height: 0,
            opacity: 0,
            visibility: 'hidden',
        });
    return ((0, jsx_runtime_1.jsx)(styles_1.ExpandableItemsContainer, { initial: animation, animate: animation, children: children }));
};
const toolbarCellWidth = 38;
const toolbarRowHeight = 40;
const toolbarScreenSafeZoneOffset = 50;
const PopUpToolbar = ({ className, items, expandableItems, defaultCollapsed = false, mode = 'floating', x: _x = 0, y: _y = 0, orientation = 'horizontal', }) => {
    const theme = (0, material_1.useTheme)();
    const [expand, setExpand] = (0, react_1.useState)(defaultCollapsed === false);
    const [toolbarItemsAmount, setToolbarItemsAmount] = (0, react_1.useState)(0);
    const [moveXY, setMoveXY] = (0, react_1.useState)(null);
    const [moveOffset, setMoveOffset] = (0, react_1.useState)({ offsetX: 0, offsetY: 0 });
    const itemsContainerRef = (0, react_1.useRef)(null);
    (0, react_1.useLayoutEffect)(() => {
        (0, assert_1.default)(!(0, ts_utils_1.isNull)(itemsContainerRef.current), 'This should never happen. |ld2t3i|');
        setToolbarItemsAmount(itemsContainerRef.current.childNodes.length);
    }, [items]);
    const safeZoneWidth = window.innerWidth - toolbarScreenSafeZoneOffset - toolbarItemsAmount * toolbarCellWidth;
    const x = (0, utils_1.clamp)(0, !(0, ts_utils_1.isNull)(moveXY) ? moveXY.x : _x, safeZoneWidth);
    const y = (0, utils_1.clamp)(toolbarScreenSafeZoneOffset, !(0, ts_utils_1.isNull)(moveXY) ? moveXY.y : _y - toolbarRowHeight, window.innerHeight - toolbarScreenSafeZoneOffset - toolbarRowHeight);
    const maxWidth = (mode === 'floating' && safeZoneWidth < 0
        ? (toolbarItemsAmount - Math.ceil(-safeZoneWidth / toolbarCellWidth)) * toolbarCellWidth
        : null);
    const toolbarJSX = ((0, jsx_runtime_1.jsxs)(styles_1.Container, { ref: itemsContainerRef, className: mode === 'static' ? className : undefined, mode: mode, orientation: orientation, sx: {
            ...(0, ts_utils_1.isNull)(maxWidth) ? {} : { maxWidth },
        }, children: [items, !(0, ts_utils_1.isUndefined)(expandableItems) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(variants_1.ToolbarButton, { icon: 'downArrow', rotate: expand === true ? -180 : 0, transitionDurationMs: 200, iconColors: {
                            default: theme.palette.text.disabled,
                        }, onClick: () => {
                            setExpand(!expand);
                        } }), (0, jsx_runtime_1.jsx)(AnimatedExpandableItemsContainer, { expand: expand, children: expandableItems })] }))] }));
    return mode === 'static' ? toolbarJSX : ((0, jsx_runtime_1.jsx)(styles_1.Anchor, { className: className, draggable: true, onDragStart: e => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMoveOffset({
                offsetX: e.clientX - rect.left,
                offsetY: e.clientY - rect.top,
            });
        }, onDragEnd: e => {
            setMoveXY({
                x: e.clientX - moveOffset.offsetX,
                y: e.clientY - moveOffset.offsetY,
            });
        }, onTouchStart: e => {
            const touch = (0, ts_utils_1.getNotUndefined)(e.touches[0], 'This should never happen. |wg477u|');
            const rect = e.currentTarget.getBoundingClientRect();
            setMoveOffset({
                offsetX: touch.clientX - rect.left,
                offsetY: touch.clientY - rect.top,
            });
        }, onTouchMove: e => {
            const touch = (0, ts_utils_1.getNotUndefined)(e.touches[0], 'This should never happen. |5mmz9m|');
            setMoveXY({
                x: touch.clientX - moveOffset.offsetX,
                y: touch.clientY - moveOffset.offsetY,
            });
        }, style: {
            left: x,
            top: y,
        }, children: toolbarJSX }));
};
exports.PopUpToolbar = PopUpToolbar;
//# sourceMappingURL=index.js.map