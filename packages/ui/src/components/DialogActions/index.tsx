import { WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { MainButton, MainButtonProps } from '../MainButton';
import { Actions } from './styles';

export type DialogActionsProps = Union<
  & {
    primaryActionText: string;
    onPrimaryAction: () => void;
    primaryActionState?: MainButtonProps['state'];
    paddingHorizontal?: boolean;
  }
  & (
    | {}
    | {
      secondaryActionText: string;
      onSecondaryAction: () => void;
      secondaryActionDisabled?: boolean;
    }
  )
>;

export const DialogActions = ({
  className,
  primaryActionText,
  onPrimaryAction,
  primaryActionState,
  secondaryActionText,
  onSecondaryAction,
  secondaryActionDisabled = false,
  paddingHorizontal = false,
}: DialogActionsProps & WithClassName) => {
  const onlyPrimary = isUndefined(secondaryActionText) || isUndefined(onSecondaryAction);

  return (
    <Actions
      className={className}
      onlyPrimary={onlyPrimary}
      paddingHorizontal={paddingHorizontal}
    >
      {onlyPrimary === true ? null : (
        <MainButton
          text={secondaryActionText}
          onClick={onSecondaryAction}
          state={secondaryActionDisabled === true ? 'disabled' : 'default'}
          variant='text'
          width='md'
          height='md'
          padding='sm'
        />
      )}
      <MainButton
        text={primaryActionText}
        onClick={onPrimaryAction}
        state={primaryActionState}
        variant='contained'
        width={onlyPrimary === true ? 'xl' : 'md'}
        height='md'
        padding='sm'
      />
    </Actions>
  );
};
