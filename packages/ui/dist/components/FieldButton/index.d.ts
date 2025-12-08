import { WithClassName } from '@draw-house/common/dist/utils';
declare const icons: {
    rotate: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    flipHorizontal: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    flipVertical: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    arrowRotateLeft: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    arrowRotateRight: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
export type FieldButtonProps = {
    state?: 'default' | 'disabled';
    text: string;
    onClick: () => void;
    icon: keyof typeof icons;
};
export declare const FieldButton: ({ className, onClick, text, icon, state, }: FieldButtonProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map