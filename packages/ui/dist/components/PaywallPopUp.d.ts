import { WithClassName } from '@draw-house/common/dist/utils';
export type PaywallPopUpProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    variant?: 'checkout';
};
export declare const PaywallPopUp: ({ className, open, onClose, children, variant, }: PaywallPopUpProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PaywallPopUp.d.ts.map