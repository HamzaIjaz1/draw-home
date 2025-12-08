import { WithClassName } from '@draw-house/common/dist/utils';
import { ButtonProps } from '@mui/material/Button';
type AllowedMuiButtonProps = Pick<ButtonProps, 'children' | 'variant' | 'onClick' | 'type' | 'style' | 'disabled' | 'color' | 'title' | 'startIcon' | 'endIcon' | 'disableTouchRipple' | 'disableRipple' | 'component' | 'role' | 'tabIndex'>;
export type BaseButtonProps = AllowedMuiButtonProps;
export declare const BaseButton: import("react").ForwardRefExoticComponent<AllowedMuiButtonProps & WithClassName & import("react").RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=index.d.ts.map