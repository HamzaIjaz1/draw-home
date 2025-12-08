import { WithClassName } from '@draw-house/common/dist/utils';
declare const icons: {
    background: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    foreground: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
export type LocationButtonRowProps = {
    label: string;
    value: keyof typeof icons;
    onChange: (value: keyof typeof icons) => void;
};
export declare const LocationButtonRow: ({ className, label, value, onChange, }: LocationButtonRowProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map