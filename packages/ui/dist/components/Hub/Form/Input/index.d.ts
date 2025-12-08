import { ChangeEventHandler, FocusEventHandler } from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Union } from '@arthurka/ts-utils';
export type FormInputProps = Union<({
    onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    disabled?: boolean;
    text?: string;
    startAdornment?: JSX.Element;
    value?: string | null;
    helperText?: string | null;
    error?: boolean;
} & ({
    multiline?: true;
    type?: 'text';
} | {
    multiline?: false;
    type?: 'password' | 'text';
}))>;
export declare const FormInput: ({ className, onFocus, onChange, onBlur, disabled, text, startAdornment, value: predefinedValue, type: predefinedType, helperText, error, multiline, }: FormInputProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
type FormInputControlledProps<T extends FieldValues> = (FormInputProps & {
    name: Path<T>;
    control: Control<T>;
    serverError?: string;
});
export declare function FormInputControlled<T extends FieldValues>({ name, control, serverError, ...props }: FormInputControlledProps<T> & WithClassName): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map