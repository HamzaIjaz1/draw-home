import { MenuCategoriesProps } from '../MenuCategories';
import { MenuAccountProps } from '../MenuAccount';
export type SideMenuProps = {
    appName: MenuCategoriesProps['appName'];
    categoryOptions: MenuCategoriesProps['options'];
    accountOptions: MenuAccountProps['options'];
    planBadgeText: MenuAccountProps['planBadgeText'];
    user: MenuAccountProps['user'];
    guestProfileText: MenuAccountProps['guestProfileText'];
    openMobile: boolean;
    appLogoLink: string;
    setOpenMobile: (e: boolean) => void;
};
export declare const SideMenu: ({ appName, categoryOptions, accountOptions, planBadgeText, user, guestProfileText, openMobile, appLogoLink, setOpenMobile, }: SideMenuProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map