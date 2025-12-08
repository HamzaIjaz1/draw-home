import { WithClassName } from '@draw-house/common/dist/utils';
import { ButtonOwnProps } from '@mui/material/Button';
import { Union } from '@arthurka/ts-utils';
declare const sizeToPx: {
    small: number;
    medium: number;
    large: number;
    extraLarge: number;
};
export type FormButtonProps = Union<{
    text: string;
    size: keyof typeof sizeToPx;
    disabled?: boolean;
    variant?: ButtonOwnProps['variant'];
    startIcon?: React.ReactNode;
    isBilling?: boolean;
} & ({
    type?: 'button' | 'reset';
    onClick: () => void;
} | {
    type: 'submit';
    onClick?: () => void;
})>;
export declare const FormButton: ({ className, onClick, text, disabled, size, variant, type, startIcon, isBilling, }: FormButtonProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map