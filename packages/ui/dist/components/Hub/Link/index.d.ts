import { WithClassName } from '@draw-house/common/dist/utils';
declare const icons: {
    person: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    logout: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    projects: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    team: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    coin: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    questionMark: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
export type LinkProps = {
    href: string;
    text: string;
    icon: keyof typeof icons;
    state?: 'default' | 'active';
};
export declare const Link: ({ className, href, icon, text, state, }: LinkProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map