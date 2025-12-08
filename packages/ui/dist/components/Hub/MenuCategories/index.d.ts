import { WithClassName } from '@draw-house/common/dist/utils';
import { MenuOptionsProps } from '../MenuOptions';
export type MenuCategoriesProps = {
    appName: string;
    options: MenuOptionsProps['options'];
    appLogoLink: string;
    closeMenu: () => void;
};
export declare const MenuCategories: ({ className, appName, options, appLogoLink, closeMenu, }: MenuCategoriesProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map