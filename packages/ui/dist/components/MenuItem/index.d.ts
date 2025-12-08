import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
export type MenuItemProps = Union<{
    children: React.ReactNode;
    divider?: boolean;
    grow?: boolean;
    minHeight?: 'unset' | 'half-row' | 'full-row';
    gap?: number;
} & ({
    center?: false;
    spaceBetween?: true;
} | {
    center?: true;
    spaceBetween?: false;
}) & ({
    paddingVertical?: 'md' | 'ml' | 'lg';
} | {
    paddingTop?: 'md' | 'ml' | 'lg';
    paddingBottom?: 'md' | 'ml' | 'lg';
}) & ({
    paddingHorizontal?: boolean | 'sm' | 'row 3/4';
} | {
    paddingLeft?: boolean | 'row 3/4';
    paddingRight?: boolean | 'row 3/4';
})>;
export declare const MenuItem: ({ className, children, divider, spaceBetween, center, paddingVertical, paddingTop, paddingBottom, paddingHorizontal, paddingLeft, paddingRight, grow, minHeight, gap, }: MenuItemProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map