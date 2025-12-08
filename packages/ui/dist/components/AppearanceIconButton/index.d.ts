import { WithClassName } from '@draw-house/common/dist/utils';
declare const icons: {
    download: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    stars: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    plus: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    arrowToHeart: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    recent: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    colorPicker: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    close: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
type State = 'default' | 'disabled';
export type AppearanceIconButtonProps = {
    icon: keyof typeof icons;
    onClick: () => void;
    state?: State;
    isColorPicker?: boolean;
};
export declare const AppearanceIconButton: ({ className, icon, onClick, state, isColorPicker, }: AppearanceIconButtonProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map