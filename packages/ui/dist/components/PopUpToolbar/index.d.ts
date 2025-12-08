import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
type Items = JSX.Element;
export type PopUpToolbarProps = Union<{
    items: Items;
} & ({
    orientation?: 'horizontal';
} | ({
    orientation: 'vertical';
} & ({} | {
    expandableItems: Items;
    defaultCollapsed?: boolean;
}))) & ({
    mode?: 'floating';
    x: number;
    y: number;
} | {
    mode: 'static';
})>;
export declare const PopUpToolbar: ({ className, items, expandableItems, defaultCollapsed, mode, x: _x, y: _y, orientation, }: PopUpToolbarProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map