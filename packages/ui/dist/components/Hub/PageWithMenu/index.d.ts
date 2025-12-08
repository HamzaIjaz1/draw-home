import { WithClassName } from '@draw-house/common/dist/utils';
import { SideMenuProps } from '../SideMenu';
export type PageWithMenuProps = {
    pageTitle: string;
    pageSubTitle: null | string;
    user: SideMenuProps['user'];
    planBadgeText: SideMenuProps['planBadgeText'];
    guestProfileText: SideMenuProps['guestProfileText'];
    appName: SideMenuProps['appName'];
    appLogoLink: SideMenuProps['appLogoLink'];
    menuOptions: {
        accountOptions: SideMenuProps['accountOptions'];
        categoryOptions: SideMenuProps['categoryOptions'];
    };
    children: React.ReactNode;
};
export declare const PageWithMenu: ({ className, pageTitle, pageSubTitle, appName, appLogoLink, menuOptions, planBadgeText, guestProfileText, user, children, }: PageWithMenuProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map