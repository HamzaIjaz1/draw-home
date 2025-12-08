import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { BaseButton, BaseButtonProps } from '../BaseButton';
import { $Props, $props } from '../../utils/$props';
import { lookup } from '../../utils/lookup';

const Button = styled(BaseButton, $props())<$Props<{
  $state: OptionButtonProps['state'];
}>>(({ theme, $state }) => css`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  border-radius: 8px;

  ${lookup($state, {
    default: css`
      color: #727272;
    `,
    active: css`
      color: ${theme.palette.primary.main};
      background: #f9f9f9;
    `,
  })}

  > * {
    flex: 0 0 auto;
  }
`);

export type OptionButtonProps = {
  children: React.ReactNode;
  state: 'default' | 'active';
  onClick: NonNullable<BaseButtonProps['onClick']>;
};

export const OptionButton = ({
  className,
  children,
  state,
  onClick,
}: OptionButtonProps & WithClassName) => (
  <Button
    className={className}
    variant='text'
    onClick={onClick}
    $state={state}
  >
    {children}
  </Button>
);
