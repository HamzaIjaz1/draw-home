import { WithClassName } from '@draw-house/common/dist/utils';
import { styled, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseButton } from '../BaseButton';
import {
  ArrowRotateLeftIcon,
  ArrowRotateRightIcon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  RotateIcon,
} from '../Icons';
import { backgroundSecondary } from '../../theme';

const StyledButton = styled(BaseButton)`
  width: 174px;
  height: 32px;
  padding: 4px 8px;
  border-radius: 8px;
  gap: 6px;
  background-color: ${backgroundSecondary};

  :hover {
    background-color: ${backgroundSecondary};
    box-shadow: 0px 1px 1px 0px #00000040;
  }
`;

const Text = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const icons = {
  rotate: RotateIcon,
  flipHorizontal: FlipHorizontalIcon,
  flipVertical: FlipVerticalIcon,
  arrowRotateLeft: ArrowRotateLeftIcon,
  arrowRotateRight: ArrowRotateRightIcon,
};

export type FieldButtonProps = {
  state?: 'default' | 'disabled';
  text: string;
  onClick: () => void;
  icon: keyof typeof icons;
};

export const FieldButton = ({
  className,
  onClick,
  text,
  icon,
  state = 'default',
}: FieldButtonProps & WithClassName) => {
  const theme = useTheme();
  const Icon = icons[icon];

  return (
    <StyledButton
      className={className}
      variant='text'
      disabled={state === 'disabled'}
      onClick={onClick}
    >
      <Text>{text}</Text>
      <Icon color={theme.palette.secondary.main} />
    </StyledButton>
  );
};
