import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
declare const icons: {
    flatRoof: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    gableRoof: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    hipRoof: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    slantedRoof: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    wraparoundRoof: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    noRoof: ({ className }: WithClassName) => import("react/jsx-runtime").JSX.Element;
    floor: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    roof: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    ceiling: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    straightStairs: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    UShapedStairs: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    spiralStairs: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    LShapedStairs: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
type IconType = keyof typeof icons;
type IconProps = {
    icon: IconType;
    color?: string;
    size: 'md' | 'lg';
};
type Item<T> = Union<{
    icon: IconType;
    variant?: 'default' | 'highlight-on-active';
    size?: IconProps['size'];
    label?: string;
} & ({
    state: 'disabled';
} | {
    id: T;
    state: 'default' | 'active';
})>;
export type IconPickerRowProps<T> = {
    items: Array<Item<T>>;
    onClick: (index: NoInfer<T>, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export declare function IconPickerRow<T extends string | number>({ className, items, onClick, }: IconPickerRowProps<T> & WithClassName): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map