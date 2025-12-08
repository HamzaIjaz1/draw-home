import { WithClassName } from '@draw-house/common/dist/utils';
export type MaterialPickerProps<T extends string | number = string | number> = {
    shape: 'round' | 'square';
    onClick: (id: NoInfer<T>) => void;
    chosenOption?: NoInfer<T>;
    options: Array<{
        id: T;
        name: string;
        image: string;
        noBorder?: boolean;
        textColor?: string;
    }>;
};
export declare function MaterialPicker<T extends string | number>({ className, options, onClick, chosenOption, shape, }: MaterialPickerProps<T> & WithClassName): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map