import { WithClassName } from '@draw-house/common/dist/utils';
import { MenuOptionsProps } from '../MenuOptions';
export type MenuAccountProps = {
    user: null | {
        name: string;
        email: string;
        avatar: string | null;
    };
    options: MenuOptionsProps['options'];
    planBadgeText: string;
    guestProfileText: string;
    closeMenu: () => void;
};
export declare const MenuAccount: ({ className, user, options, planBadgeText, guestProfileText, closeMenu, }: MenuAccountProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map