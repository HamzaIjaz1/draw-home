import { WithClassName } from '@draw-house/common/dist/utils';
declare const icons: {
    replace: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    railings: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
export type ButtonRowProps = {
    label: string;
    disabled?: boolean;
    startIcon: keyof typeof icons;
    onClick: () => void;
};
export declare const ButtonRow: ({ className, label, disabled, onClick, startIcon, }: ButtonRowProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map