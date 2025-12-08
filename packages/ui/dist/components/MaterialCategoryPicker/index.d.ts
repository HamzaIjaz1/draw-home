import { WithClassName } from '@draw-house/common/dist/utils';
type Option<T extends number> = {
    id: T;
    name: string;
    image: string;
};
export type MaterialCategoryPickerProps<T extends number> = {
    options: Array<Option<T>>;
    chosenOption?: Option<NoInfer<T>>['id'];
    onClick: (id: Option<NoInfer<T>>['id']) => void;
    squareImages?: boolean;
    wrap?: boolean;
    highlightVariant?: 'outline' | 'background';
    size?: 'sm' | 'md';
};
export declare function MaterialCategoryPicker<T extends number>({ className, options, onClick, chosenOption, squareImages, wrap, highlightVariant, size, }: MaterialCategoryPickerProps<T> & WithClassName): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map