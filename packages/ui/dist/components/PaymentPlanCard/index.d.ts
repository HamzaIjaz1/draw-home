import { WithClassName } from '@draw-house/common/dist/utils';
export type PaymentPlanCardProps = {
    title: string;
    description: string;
    priceBold: string;
    pricePrevious: null | string;
    priceGray: string[];
    discountBadge: null | string;
    actionElement: React.JSX.Element;
    featuresTitle: string;
    features: readonly string[];
    highlight?: boolean;
};
export declare const PaymentPlanCard: ({ className, title, description, priceBold, pricePrevious, priceGray, discountBadge, actionElement, featuresTitle, features, highlight, }: PaymentPlanCardProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map