import { WithClassName } from '@draw-house/common/dist/utils';
export type SelectProps<T extends string | number> = {
    id?: string;
    value: '' | NoInfer<T>;
    options: ReadonlyArray<{
        label: string;
        value: T;
    }>;
    onChange: (v: NoInfer<T>) => void;
};
export declare function Select<T extends string | number>({ className, id, value, options, onChange, }: SelectProps<T> & WithClassName): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map