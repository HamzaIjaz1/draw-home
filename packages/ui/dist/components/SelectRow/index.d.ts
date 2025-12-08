import { WithClassName } from '@draw-house/common/dist/utils';
export type SelectRowProps<T extends string | number> = {
    label: string;
    value: '' | NoInfer<T>;
    options: Array<{
        label: string;
        value: T;
    }>;
    onChange: (v: NoInfer<T>) => void;
};
export declare const SelectRow: <T extends string | number>({ className, label, value, options, onChange, }: SelectRowProps<T> & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map