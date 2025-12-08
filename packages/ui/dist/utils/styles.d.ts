import { css } from '@mui/material';
export declare const textOverflowEllipsis: import("@emotion/utils").SerializedStyles;
export declare const VisuallyHiddenInput: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, {}>;
export declare const menuRowVerticalPadding: () => import("@emotion/utils").SerializedStyles;
export declare const menuHorizontalGutterWidth = 16;
export declare const menuRowHorizontalPadding: () => import("@emotion/utils").SerializedStyles;
export declare const menuRowPadding: () => import("@emotion/utils").SerializedStyles;
/** Requires "position: relative" from a parent container */
export declare const getAbsoluteDividerCss: (styles?: ReturnType<typeof css>) => import("@emotion/utils").SerializedStyles;
export declare const absoluteDividerCss: import("@emotion/utils").SerializedStyles;
export declare const scrollbarWidth = 17;
export declare const menuContainerWidth = 390;
export type CssVariable = `--${string}`;
export declare const setCssVarInline: (name: CssVariable, value: string) => {
    [x: string]: string;
};
export declare const setCssVar: (name: CssVariable, value: string) => import("@emotion/utils").SerializedStyles;
export declare const getCssVar: (name: CssVariable, fallback?: string) => string;
//# sourceMappingURL=styles.d.ts.map