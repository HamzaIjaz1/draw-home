import { WithClassName } from '@draw-house/common/dist/utils';
export type ExportTabFormatPickerProps<T> = {
    title: string;
    chosenFormat: NoInfer<T>;
    formats: readonly T[];
    onChange: (v: NoInfer<T>) => void;
};
export declare function ExportTabFormatPicker<T extends string>({ className, title, formats, chosenFormat, onChange, }: ExportTabFormatPickerProps<T> & WithClassName): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map