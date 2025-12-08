import { WithClassName } from '@draw-house/common/dist/utils';
export declare const menuFrameWidth: number;
export type FloatingMenuProps = {
    title: string;
    onClose: () => void;
    onBack?: () => void;
    children: React.ReactNode;
    noDivider?: boolean;
    header?: React.ReactNode;
    noStableScrollbarGutter?: boolean;
    width?: 'fixed' | 'fit-content';
};
export declare const floatingMenuClassName = "floating-menu";
export declare const FloatingMenu: ({ className, title, onClose, onBack, children, header, noDivider, noStableScrollbarGutter, width, }: FloatingMenuProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map