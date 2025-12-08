import { WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { FormButton } from '../Form/Button';
import { Actions } from './styles';

export type DialogActionsProps = Union<
  & {
    primaryActionText: string;
  }
  & (
    | {
      onPrimaryAction: () => void;
      primaryButtonType?: 'button' | 'reset';
    }
    | {
      onPrimaryAction?: () => void;
      primaryButtonType: 'submit';
    }
  )
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
  primaryButtonType,
  secondaryActionText,
  onSecondaryAction,
  secondaryActionDisabled = false,
}: DialogActionsProps & WithClassName) => {
  const onlyPrimary = isUndefined(secondaryActionText) || isUndefined(onSecondaryAction);

  return (
    <Actions className={className} onlyPrimary={onlyPrimary}>
      {primaryButtonType === 'submit' ? (
        <FormButton
          text={primaryActionText}
          size='medium'
          variant='contained'
          type='submit'
          onClick={onPrimaryAction}
        />
      ) : (
        <FormButton
          text={primaryActionText}
          size='medium'
          variant='contained'
          type={primaryButtonType ?? 'button'}
          onClick={onPrimaryAction}
        />
      )}

      {onlyPrimary ? null : (
        <FormButton
          text={secondaryActionText}
          size='medium'
          variant='outlined'
          onClick={onSecondaryAction}
          disabled={secondaryActionDisabled}
        />
      )}
    </Actions>
  );
};
