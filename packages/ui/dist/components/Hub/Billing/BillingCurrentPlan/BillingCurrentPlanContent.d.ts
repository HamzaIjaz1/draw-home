import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
export type BillingCurrentPlanContentProps = Union<{
    period: string;
    price: number;
    cancelButtonLabel: string;
    planButtonLabel: string;
    stripeCancelAtPeriodEnd: boolean;
    handleCancelSubscription: () => void;
    handleChangePlan: () => void;
} & ({
    isFreePlan: true;
} | {
    isFreePlan: false;
    label: string;
})>;
export declare const BillingCurrentPlanContent: React.FC<BillingCurrentPlanContentProps & WithClassName>;
//# sourceMappingURL=BillingCurrentPlanContent.d.ts.map