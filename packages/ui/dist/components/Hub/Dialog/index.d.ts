import { WithClassName } from '@draw-house/common/dist/utils';
export type DialogProps = {
    open: boolean;
    onClose: () => void;
    onCloseTransitionEnd?: () => void;
    title: string;
    children: React.ReactNode;
};
export declare const Dialog: ({ className, open, onClose, title, children, onCloseTransitionEnd, }: DialogProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map