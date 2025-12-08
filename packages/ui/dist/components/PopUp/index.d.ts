import { WithClassName } from '@draw-house/common/dist/utils';
export { cssVars as PopUpCssVars } from './styles';
export type PopUpProps = {
    open: boolean;
    children: React.ReactNode;
    onClose: () => void;
    onCloseTransitionEnd?: () => void;
};
export declare const PopUp: ({ className, open, children, onClose, onCloseTransitionEnd, }: PopUpProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map