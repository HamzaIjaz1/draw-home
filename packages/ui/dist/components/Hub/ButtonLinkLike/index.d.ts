import { WithClassName } from '@draw-house/common/dist/utils';
import { type Version } from './styles';
declare const icons: {
    person: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    logout: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    projects: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    team: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    coin: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    questionMark: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    delete: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
export type ButtonLinkLikeProps = {
    text: string;
    icon: keyof typeof icons;
    onClick: () => void;
    state?: 'default' | 'active';
    version?: Version;
};
export declare const ButtonLinkLike: ({ className, icon, text, onClick, state, version, }: ButtonLinkLikeProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map