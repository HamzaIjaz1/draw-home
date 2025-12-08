import { Theme } from '@mui/material';
import type { TextFieldProps } from '.';
import { InputVariant } from './types';
type FormControlProps = {
    labeled: boolean;
};
export declare const FormControl: import("@emotion/styled").StyledComponent<import("@mui/material").FormControlOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "disabled" | "color" | "margin" | "children" | "className" | "style" | "size" | "classes" | "sx" | "variant" | "fullWidth" | "error" | "required" | "focused" | "hiddenLabel"> & import("@mui/system").MUIStyledCommonProps<Theme> & FormControlProps, {}, {}>;
type InputProps = {
    _size: TextFieldProps['size'];
    _variant: InputVariant;
};
export declare const StyledInput: import("@emotion/styled").StyledComponent<import("@mui/material").FilledInputProps & import("@mui/system").MUIStyledCommonProps<Theme> & InputProps, {}, {}>;
type AdornmentProps = {
    inputVariant: 'dark' | 'light';
};
export declare const InputAdornment: import("@emotion/styled").StyledComponent<import("@mui/material").InputAdornmentOwnProps & import("@mui/material/OverridableComponent").CommonProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "position" | "children" | "className" | "style" | "classes" | "sx" | "variant" | "disablePointerEvents" | "disableTypography"> & import("@mui/system").MUIStyledCommonProps<Theme> & AdornmentProps, {}, {}>;
export declare const Label: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<Theme>, import("react").DetailedHTMLProps<import("react").LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>, {}>;
export {};
//# sourceMappingURL=styles.d.ts.map