import { FormInputControlled as BaseFormInputControlled } from '../Form/Input';
export declare const Form: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, {}>;
export declare const PencilIcon: import("@emotion/styled").StyledComponent<import("@draw-house/common/dist/utils").WithClassName & import("../../Icons").IconProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const FormInputControlled: typeof BaseFormInputControlled;
export declare const FormButton: import("@emotion/styled").StyledComponent<(({
    size: "small" | "medium" | "large" | "extraLarge";
    text: string;
    onClick: () => void;
    disabled?: boolean | undefined;
    variant?: import("@mui/types").OverridableStringUnion<"text" | "outlined" | "contained", import("@mui/material").ButtonPropsVariantOverrides> | undefined;
    type?: "button" | "reset" | undefined;
    startIcon?: import("react").ReactNode;
    isBilling?: boolean | undefined;
} | {
    size: "small" | "medium" | "large" | "extraLarge";
    text: string;
    type: "submit";
    disabled?: boolean | undefined;
    onClick?: (() => void) | undefined;
    variant?: import("@mui/types").OverridableStringUnion<"text" | "outlined" | "contained", import("@mui/material").ButtonPropsVariantOverrides> | undefined;
    startIcon?: import("react").ReactNode;
    isBilling?: boolean | undefined;
}) & import("@draw-house/common/dist/utils").WithClassName) & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
//# sourceMappingURL=styles.d.ts.map