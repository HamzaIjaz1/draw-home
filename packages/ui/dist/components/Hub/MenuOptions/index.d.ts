import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
import { LinkProps } from '../Link';
type Option = Union<({
    title: string;
    icon: LinkProps['icon'];
    state?: 'default' | 'active';
} & ({
    href: string;
} | {
    onClick: () => void;
}))>;
export type MenuOptionsProps = {
    options: Option[];
    closeMenu: () => void;
};
export declare const MenuOptions: ({ className, options, closeMenu, }: MenuOptionsProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map