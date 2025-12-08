import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
import { MainButtonProps } from '../MainButton';
export type DialogActionsProps = Union<{
    primaryActionText: string;
    onPrimaryAction: () => void;
    primaryActionState?: MainButtonProps['state'];
    paddingHorizontal?: boolean;
} & ({} | {
    secondaryActionText: string;
    onSecondaryAction: () => void;
    secondaryActionDisabled?: boolean;
})>;
export declare const DialogActions: ({ className, primaryActionText, onPrimaryAction, primaryActionState, secondaryActionText, onSecondaryAction, secondaryActionDisabled, paddingHorizontal, }: DialogActionsProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map