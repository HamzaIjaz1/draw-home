export declare const StyledBaseButton: import("@emotion/styled").StyledComponent<{
    disabled?: boolean;
    color?: import("@mui/types").OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", import("@mui/material").ButtonPropsColorOverrides>;
    children?: import("react").ReactNode;
    style?: import("react").CSSProperties;
    title?: string | undefined;
    tabIndex?: NonNullable<import("react").HTMLAttributes<any>["tabIndex"]>;
    role?: import("react").AriaRole | undefined;
    onClick?: import("react").MouseEventHandler<HTMLButtonElement> | undefined;
    variant?: import("@mui/types").OverridableStringUnion<"text" | "outlined" | "contained", import("@mui/material").ButtonPropsVariantOverrides>;
    disableRipple?: boolean;
    disableTouchRipple?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
    endIcon?: import("react").ReactNode;
    startIcon?: import("react").ReactNode;
    component?: import("react").ElementType;
} & import("@draw-house/common/dist/utils").WithClassName & import("react").RefAttributes<HTMLButtonElement> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
type TextProps = {
    disabled: boolean;
};
export declare const Label: import("@emotion/styled").StyledComponent<import("@mui/material").TypographyOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, "ref"> & {
    ref?: ((instance: HTMLSpanElement | null) => void) | import("react").RefObject<HTMLSpanElement> | null | undefined;
}, "zIndex" | "typography" | "fontFamily" | "fontSize" | "justifyContent" | "alignItems" | "flexWrap" | "gap" | "alignContent" | "alignSelf" | "bottom" | "boxShadow" | "boxSizing" | "color" | "columnGap" | "display" | "flexBasis" | "flexDirection" | "flexGrow" | "flexShrink" | "fontStyle" | "fontWeight" | "gridAutoColumns" | "gridAutoFlow" | "gridAutoRows" | "gridTemplateAreas" | "gridTemplateColumns" | "gridTemplateRows" | "height" | "justifyItems" | "justifySelf" | "left" | "letterSpacing" | "lineHeight" | "marginBlockEnd" | "marginBlockStart" | "marginBottom" | "marginInlineEnd" | "marginInlineStart" | "marginLeft" | "marginRight" | "marginTop" | "maxHeight" | "maxWidth" | "minHeight" | "minWidth" | "order" | "paddingBlockEnd" | "paddingBlockStart" | "paddingBottom" | "paddingInlineEnd" | "paddingInlineStart" | "paddingLeft" | "paddingRight" | "paddingTop" | "position" | "right" | "rowGap" | "textAlign" | "textOverflow" | "textTransform" | "top" | "visibility" | "whiteSpace" | "width" | "border" | "borderBottom" | "borderColor" | "borderLeft" | "borderRadius" | "borderRight" | "borderTop" | "flex" | "gridArea" | "gridColumn" | "gridRow" | "margin" | "marginBlock" | "marginInline" | "overflow" | "padding" | "paddingBlock" | "paddingInline" | "align" | "children" | "className" | "style" | "p" | "classes" | "sx" | "variant" | "bgcolor" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "marginX" | "my" | "marginY" | "pt" | "pr" | "pb" | "pl" | "px" | "paddingX" | "py" | "paddingY" | "displayPrint" | "gutterBottom" | "noWrap" | "paragraph" | "variantMapping"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & TextProps, {}, {}>;
export declare const RightArrowIcon: import("@emotion/styled").StyledComponent<import("@draw-house/common/dist/utils").WithClassName & import("../Icons").IconProps & {
    transitionDurationMs?: number;
} & {
    rotate?: number;
} & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export {};
//# sourceMappingURL=styles.d.ts.map