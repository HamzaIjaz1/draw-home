import { DistributiveSafeOmit, WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
import { CommonInputProps, InputVariant } from './types';
export type InputProps = Union<CommonInputProps & ({
    type: 'text';
} | {
    type: 'number';
    min?: number;
    max?: number;
    allowNegative?: boolean;
    variant?: InputVariant;
})>;
export declare const Input: ({ className, type, value, onChange, adornment, size, id, name, min, max, allowNegative, variant, disabled, }: InputProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export type TextFieldProps = (DistributiveSafeOmit<InputProps, 'id'> & {
    label?: string | React.ReactElement;
});
export declare const TextField: ({ className, label, ...rest }: TextFieldProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map