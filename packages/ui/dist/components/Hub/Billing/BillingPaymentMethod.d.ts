import { WithClassName } from '@draw-house/common/dist/utils';
export type BillingPaymentMethodProps = {
    last4: string;
    expiry: string;
    brand: string;
    Button: React.ReactNode;
    address: {
        line1: string | null;
        line2: string | null;
        city: string | null;
        postalCode: string | null;
        country: string | null;
    };
};
export declare const BillingPaymentMethod: ({ className, last4, expiry, brand, Button, address, }: WithClassName & BillingPaymentMethodProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=BillingPaymentMethod.d.ts.map