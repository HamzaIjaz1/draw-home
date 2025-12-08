import { WithClassName } from '@draw-house/common/dist/utils';
type RecentOption<T extends number> = {
    id: T;
    name: string;
    image: string;
    wScale: number;
    lScale: number;
    rotateDeg: number;
    color: string;
};
export type RecentTexturePickerProps<T extends number> = {
    options: Array<RecentOption<T>>;
    chosenOption?: RecentOption<NoInfer<T>>['id'];
    onClick: (id: RecentOption<NoInfer<T>>['id']) => void;
    squareImages?: boolean;
    wrap?: boolean;
    highlightVariant?: 'outline' | 'background';
    size?: 'sm' | 'md';
};
export declare function RecentTexturePicker<T extends number>({ className, options, onClick, chosenOption, squareImages, wrap, highlightVariant, size, }: RecentTexturePickerProps<T> & WithClassName): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map