import { WithClassName } from '@draw-house/common/dist/utils';
declare const icons: {
    blank: ({ className, color }: WithClassName & import("../../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    rectangular: ({ className }: WithClassName) => import("react/jsx-runtime").JSX.Element;
    TShape: ({ className }: WithClassName) => import("react/jsx-runtime").JSX.Element;
    LShape: ({ className }: WithClassName) => import("react/jsx-runtime").JSX.Element;
};
export type TemplateButtonProps = {
    onClick: () => void;
    text: string;
    image: keyof typeof icons | string & {};
};
export declare const TemplateButton: ({ className, image, onClick, text, }: TemplateButtonProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map