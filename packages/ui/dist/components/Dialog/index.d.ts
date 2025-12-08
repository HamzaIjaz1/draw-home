import { WithClassName } from '@draw-house/common/dist/utils';
declare const icons: {
    penAndWrenchCrossed: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    unlock: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
export type DialogProps = {
    open: boolean;
    onClose: () => void;
    onCloseTransitionEnd?: () => void;
    title: string;
    children: React.ReactNode;
    icon?: keyof typeof icons;
};
export declare const Dialog: ({ className, open, onClose, title, children, onCloseTransitionEnd, icon, }: DialogProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map