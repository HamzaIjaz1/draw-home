import { WithClassName } from '@draw-house/common/dist/utils';
type Option = {
    value: string;
    label: string;
    disabled?: boolean;
};
export type RadioGroupProps = {
    name?: string;
    options: readonly Option[];
    value: string;
    onChange: (value: string) => void;
    direction: 'column' | 'row';
};
export declare const RadioGroup: ({ className, name: _name, options, value, onChange, direction, }: RadioGroupProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map