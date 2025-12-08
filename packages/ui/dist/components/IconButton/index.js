"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const ts_utils_1 = require("@arthurka/ts-utils");
const Icons_1 = require("../Icons");
const styles_1 = require("./styles");
const useOnClickWithLoading_1 = require("../../hooks/useOnClickWithLoading");
const icons = {
    wall: Icons_1.WallIcon,
    pointer: styles_1.HandPointerIcon,
    text: styles_1.TextIcon,
    layers: styles_1.LayersIcon,
    undo: Icons_1.ArrowBendingLeftIcon,
    redo: Icons_1.ArrowBendingRightIcon,
    close: styles_1.CloseIcon,
    closeNoBackground: (props) => (0, jsx_runtime_1.jsx)(styles_1.CloseIcon, { ...props, noBackground: true }),
    gear: styles_1.GearIcon,
    house: styles_1.HouseIcon,
    back: styles_1.LessThenSignIcon,
    hamburger: styles_1.HamburgerMenuIcon,
    save: styles_1.FloppyDiskIcon,
    circleAroundDot: styles_1.CircleAroundDotIcon,
    tools: styles_1.ToolsIcon,
    plus: Icons_1.PlusIcon,
    duplicate: styles_1.DuplicateIcon,
    eye: styles_1.EyeIcon,
    eyeClosed: styles_1.EyeClosedIcon,
    bin: styles_1.BinIcon,
    door: styles_1.DoorIcon,
    window: styles_1.WindowIcon,
    fireplace: styles_1.FireplaceIcon,
    roof: styles_1.RoofIcon,
    roofOnly: Icons_1.RoofOnlyIcon,
    centerWallAttachment: styles_1.CenterWallAttachmentIcon,
    outsideWallAttachment: styles_1.OutsideWallAttachmentIcon,
    insideWallAttachment: styles_1.InsideWallAttachmentIcon,
    upload: styles_1.UploadIcon,
    expandArrows: styles_1.ExpandArrowsIcon,
    straightLine: Icons_1.StraightLineIcon,
    multipleStraightLines: Icons_1.MultipleStraightLinesIcon,
    rectangle: Icons_1.RectangleIcon,
    hexagon: Icons_1.HexagonIcon,
    curvedLine: Icons_1.CurvedLineIcon,
    brokenCurvedLine: Icons_1.BrokenCurvedLineIcon,
    downArrow: Icons_1.DownArrowIcon,
    floor: Icons_1.FloorIcon,
    roofs: Icons_1.RoofsIcon,
    ceiling: Icons_1.CeilingIcon,
    arrowRotateLeft: styles_1.ArrowRotateLeftIcon,
    arrowRotateRight: styles_1.ArrowRotateRightIcon,
    layout: Icons_1.LayoutIcon,
    annotation: Icons_1.AnnotationIcon,
    hint: Icons_1.HintIcon,
    transparency: Icons_1.TransparencyIcon,
    noTransparency: Icons_1.NoTransparencyIcon,
    replace: Icons_1.ReplaceIcon,
    rotate: Icons_1.Rotate2Icon,
    removeFloor: Icons_1.RemoveFloorIcon,
    grouping: Icons_1.GroupingIcon,
    matchColors: Icons_1.MatchColorsIcon,
    selectSimilar: Icons_1.SelectSimilarIcon,
    stringerLeft: Icons_1.StringerLeftIcon,
    stringerCenter: Icons_1.StringerCenterIcon,
    stringerRight: Icons_1.StringerRightIcon,
    railingsLeft: Icons_1.RailingsLeftIcon,
    railingsRight: Icons_1.RailingsRightIcon,
    mirroring: Icons_1.MirroringIcon,
    questionMarkCircled: Icons_1.QuestionMarkCircledIcon,
    scaleUp: Icons_1.ScaleUpIcon,
    twoArrowsClockwise: Icons_1.TwoArrowsClockwiseIcon,
    favouriteFilled: Icons_1.FavouriteFilledIcon,
    replaceModel: Icons_1.ReplaceModelIcon,
    stars: Icons_1.StarsIcon,
    tapeMeasure: Icons_1.TapeMeasureIcon,
    rotateArrowCircle: Icons_1.RotateArrowCircleIcon,
    infoBook: Icons_1.InfoBookIcon,
    playCircled: Icons_1.PlayCircledIcon,
    share: Icons_1.ShareIcon,
    landscape: Icons_1.LandscapeIcon,
    handTapping: Icons_1.HandTappingIcon,
    gableDormer: Icons_1.GableDormerIcon,
    hipDormer: Icons_1.HipDormerIcon,
    shedDormer: Icons_1.ShedDormerIcon,
    rotate45: Icons_1.Rotate45Icon,
    rotate90: Icons_1.Rotate90Icon,
};
const InlineIcon = ({ icon, rotate, transitionDurationMs, iconColors, state, muiVariant, }) => {
    const theme = (0, material_1.useTheme)();
    const baseStateToIconColor = (0, react_1.useMemo)(() => {
        const byVariant = {
            contained: {
                active: theme.palette.background.paper,
                default: theme.palette.primary.main,
                disabled: theme.palette.background.paper,
            },
            text: {
                active: theme.palette.primary.main,
                default: theme.palette.secondary.main,
                disabled: theme.palette.text.disabled,
            },
            outlined: {
                active: theme.palette.primary.main,
                default: theme.palette.primary.main,
                disabled: theme.palette.text.disabled,
            },
        };
        return byVariant[muiVariant];
    }, [
        muiVariant,
        theme.palette.background.paper,
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.text.disabled,
    ]);
    const stateToIconColor = {
        ...baseStateToIconColor,
        ...iconColors,
    };
    const Icon = icons[icon];
    return ((0, jsx_runtime_1.jsx)(Icon, { color: stateToIconColor[state], rotate: rotate, transitionDurationMs: transitionDurationMs }));
};
exports.IconButton = (0, react_1.forwardRef)(({ className, icon, rotate, transitionDurationMs, image, onClick, state: _state, variant: userVariant = 'default', borderRadius = 'default', size = 'md', iconColors = {}, pulseGlow, }, ref) => {
    const userVariantToMuiVariant = {
        default: _state === 'active' ? 'contained' : 'outlined',
        outlined: _state === 'active' ? 'contained' : 'outlined',
        text: 'text',
    };
    const variant = userVariantToMuiVariant[userVariant];
    const defaultState = 'default';
    const { isOnClickLoading, onCLickWithLoading } = (0, useOnClickWithLoading_1.useOnClickWithLoading)(onClick);
    const state = (0, ts_utils_1.isUndefined)(_state) ? defaultState : _state;
    const baseButtonProps = {
        className,
        variant,
        userVariant,
        borderRadius,
        size,
        state,
        isLoading: isOnClickLoading,
        pulseGlow,
    };
    return ((0, jsx_runtime_1.jsxs)(styles_1.StyledButton, { ...baseButtonProps, ref: ref, disabled: state === 'disabled', onClick: onCLickWithLoading, children: [!(0, ts_utils_1.isUndefined)(image) && ((0, jsx_runtime_1.jsx)(styles_1.Image, { src: image })), !(0, ts_utils_1.isUndefined)(icon) && ((0, jsx_runtime_1.jsx)(InlineIcon, { icon: icon, iconColors: iconColors, rotate: rotate, transitionDurationMs: transitionDurationMs, state: state, muiVariant: variant }))] }));
});
//# sourceMappingURL=index.js.map