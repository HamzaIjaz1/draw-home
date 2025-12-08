import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
export type DialogActionsProps = Union<{
    primaryActionText: string;
} & ({
    onPrimaryAction: () => void;
    primaryButtonType?: 'button' | 'reset';
} | {
    onPrimaryAction?: () => void;
    primaryButtonType: 'submit';
}) & ({} | {
    secondaryActionText: string;
    onSecondaryAction: () => void;
    secondaryActionDisabled?: boolean;
})>;
export declare const DialogActions: ({ className, primaryActionText, onPrimaryAction, primaryButtonType, secondaryActionText, onSecondaryAction, secondaryActionDisabled, }: DialogActionsProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map