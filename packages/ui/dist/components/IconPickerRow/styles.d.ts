export declare const Container: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
type ButtonProps = {
    state: 'default' | 'active' | 'disabled';
};
export declare const IconButton: import("@emotion/styled").StyledComponent<{
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
} & import("@draw-house/common/dist/utils").WithClassName & import("react").RefAttributes<HTMLButtonElement> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & ButtonProps, {}, {}>;
export declare const WithText: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const Text: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export {};
//# sourceMappingURL=styles.d.ts.map