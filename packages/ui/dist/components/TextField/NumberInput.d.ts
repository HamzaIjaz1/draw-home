import { WithClassName } from '@draw-house/common/dist/utils';
import { CommonInputProps, InputVariant } from './types';
export type NumberInputProps = {
    id: CommonInputProps['id'];
    name: CommonInputProps['name'];
    size: CommonInputProps['size'];
    onChange: CommonInputProps['onChange'];
    value: CommonInputProps['value'];
    disabled?: CommonInputProps['disabled'];
    min?: number;
    max?: number;
    allowNegative?: boolean;
    adornment?: JSX.Element;
    variant?: InputVariant;
};
export declare const NumberInput: ({ className, value: externalValue, onChange, adornment, size, id, name, min, max, allowNegative, variant, disabled, }: NumberInputProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=NumberInput.d.ts.map