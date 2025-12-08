import type { MenuSectionProps } from '.';
export declare const cssVars: {
    rootPaddingBottom: "--menu-section-root-padding-bottom";
};
export declare const Accordion: import("@emotion/styled").StyledComponent<{
    children: NonNullable<import("react").ReactNode>;
    classes?: Partial<import("@mui/material").AccordionClasses>;
    defaultExpanded?: boolean;
    disabled?: boolean;
    disableGutters?: boolean;
    expanded?: boolean;
    onChange?: (event: import("react").SyntheticEvent, expanded: boolean) => void;
    sx?: import("@mui/material").SxProps<import("@mui/material").Theme>;
    TransitionComponent?: import("react").JSXElementConstructor<import("@mui/material/transitions").TransitionProps & {
        children?: import("react").ReactElement<any, any>;
    }>;
    TransitionProps?: import("@mui/material/transitions").TransitionProps;
} & import("@mui/material").AccordionSlotsAndSlotProps & Omit<import("@mui/material").PaperOwnProps, "classes" | "onChange"> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "disabled" | "children" | "expanded" | "square" | keyof import("@mui/material/OverridableComponent").CommonProps | "onChange" | "elevation" | "sx" | "variant" | "defaultExpanded" | "disableGutters" | "TransitionComponent" | "TransitionProps" | keyof import("@mui/material").AccordionSlotsAndSlotProps> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    $divider: boolean;
}, {}, {}>;
export declare const AccordionSummary: import("@emotion/styled").StyledComponent<import("@mui/material").AccordionSummaryOwnProps & Omit<import("@mui/material").ButtonBaseOwnProps, "classes"> & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "disabled" | "children" | "className" | "style" | "classes" | "tabIndex" | "sx" | "action" | "centerRipple" | "disableRipple" | "disableTouchRipple" | "focusRipple" | "focusVisibleClassName" | "LinkComponent" | "onFocusVisible" | "TouchRippleProps" | "touchRippleRef" | "expandIcon"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    $type: MenuSectionProps["type"];
    $divider: boolean;
    $withIconButton: boolean;
}, {}, {}>;
export declare const AccordionDetails: import("@emotion/styled").StyledComponent<import("@mui/material").AccordionDetailsProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const Text: import("@emotion/styled").StyledComponent<import("@mui/material").TypographyOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & {
    ref?: ((instance: HTMLSpanElement | null) => void) | import("react").RefObject<HTMLSpanElement> | null | undefined;
}, "zIndex" | "typography" | "fontFamily" | "fontSize" | "justifyContent" | "alignItems" | "flexWrap" | "gap" | "alignContent" | "alignSelf" | "bottom" | "boxShadow" | "boxSizing" | "color" | "columnGap" | "display" | "flexBasis" | "flexDirection" | "flexGrow" | "flexShrink" | "fontStyle" | "fontWeight" | "gridAutoColumns" | "gridAutoFlow" | "gridAutoRows" | "gridTemplateAreas" | "gridTemplateColumns" | "gridTemplateRows" | "height" | "justifyItems" | "justifySelf" | "left" | "letterSpacing" | "lineHeight" | "marginBlockEnd" | "marginBlockStart" | "marginBottom" | "marginInlineEnd" | "marginInlineStart" | "marginLeft" | "marginRight" | "marginTop" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "order" | "paddingBlockEnd" | "paddingBlockStart" | "paddingBottom" | "paddingInlineEnd" | "paddingInlineStart" | "paddingLeft" | "paddingRight" | "paddingTop" | "position" | "right" | "rowGap" | "textAlign" | "textOverflow" | "textTransform" | "top" | "visibility" | "whiteSpace" | "width" | "border" | "borderBottom" | "borderColor" | "borderLeft" | "borderRadius" | "borderRight" | "borderTop" | "flex" | "gridArea" | "gridColumn" | "gridRow" | "margin" | "marginBlock" | "marginInline" | "overflow" | "padding" | "paddingBlock" | "paddingInline" | "align" | "children" | "className" | "style" | "p" | "classes" | "sx" | "variant" | "bgcolor" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "marginX" | "my" | "marginY" | "pt" | "pr" | "pb" | "pl" | "px" | "paddingX" | "py" | "paddingY" | "displayPrint" | "gutterBottom" | "noWrap" | "paragraph" | "variantMapping"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    $titleVariant: NonNullable<MenuSectionProps["titleVariant"]>;
    $titleSize: string | undefined;
}, {}, {}>;
export declare const Image: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, {}>;
export declare const iconCss: import("@emotion/utils").SerializedStyles;
export declare const IconButton: import("@emotion/styled").StyledComponent<((({
    icon: "rotate" | "replace" | "layout" | "pointer" | "text" | "annotation" | "stars" | "plus" | "close" | "wall" | "layers" | "undo" | "redo" | "closeNoBackground" | "gear" | "house" | "back" | "hamburger" | "save" | "circleAroundDot" | "tools" | "duplicate" | "eye" | "eyeClosed" | "bin" | "door" | "window" | "fireplace" | "roof" | "roofOnly" | "centerWallAttachment" | "outsideWallAttachment" | "insideWallAttachment" | "upload" | "expandArrows" | "straightLine" | "multipleStraightLines" | "rectangle" | "hexagon" | "curvedLine" | "brokenCurvedLine" | "downArrow" | "floor" | "roofs" | "ceiling" | "arrowRotateLeft" | "arrowRotateRight" | "hint" | "transparency" | "noTransparency" | "removeFloor" | "grouping" | "matchColors" | "selectSimilar" | "stringerLeft" | "stringerCenter" | "stringerRight" | "railingsLeft" | "railingsRight" | "mirroring" | "questionMarkCircled" | "scaleUp" | "twoArrowsClockwise" | "favouriteFilled" | "replaceModel" | "tapeMeasure" | "rotateArrowCircle" | "infoBook" | "playCircled" | "share" | "landscape" | "handTapping" | "gableDormer" | "hipDormer" | "shedDormer" | "rotate45" | "rotate90";
    onClick: (e: import("react").MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    rotate?: number | undefined;
    borderRadius?: "default" | "circle" | undefined;
    size?: "xs" | "sm" | "md" | "xs-mobile" | "sm-mobile" | "md-mobile" | undefined;
    variant?: "default" | "text" | "outlined" | undefined;
    transitionDurationMs?: number | undefined;
    state?: import("../IconButton").State | undefined;
    pulseGlow?: 1 | 2 | undefined;
    iconColors?: Partial<Record<import("../IconButton").State, string>> | undefined;
    image?: undefined;
} | {
    image: string;
    onClick: (e: import("react").MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    borderRadius?: "default" | "circle" | undefined;
    size?: "xs" | "sm" | "md" | "xs-mobile" | "sm-mobile" | "md-mobile" | undefined;
    variant?: "default" | "text" | "outlined" | undefined;
    state?: import("../IconButton").State | undefined;
    pulseGlow?: 1 | 2 | undefined;
    rotate?: undefined;
    icon?: undefined;
    transitionDurationMs?: undefined;
    iconColors?: undefined;
}) & import("@draw-house/common/dist/utils").WithClassName) & import("react").RefAttributes<HTMLButtonElement>) & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
//# sourceMappingURL=styles.d.ts.map