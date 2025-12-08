import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { Label, RightArrowIcon, StyledBaseButton } from './styles';
import { RailingsIcon, ReplaceIcon } from '../Icons';

const icons = {
  replace: ReplaceIcon,
  railings: RailingsIcon,
};

export type ButtonRowProps = {
  label: string;
  disabled?: boolean;
  startIcon: keyof typeof icons;
  onClick: () => void;
};

export const ButtonRow = ({
  className,
  label,
  disabled = false,
  onClick,
  startIcon,
}: ButtonRowProps & WithClassName) => {
  const theme = useTheme();

  const StartIcon = icons[startIcon];

  const startIconColor = disabled === true
    ? theme.palette.text.disabled
    : theme.palette.primary.main;

  const endIconColor = disabled === true
    ? theme.palette.text.disabled
    : theme.palette.secondary.main;

  return (
    <StyledBaseButton
      className={className}
      onClick={onClick}
      startIcon={<StartIcon color={startIconColor} />}
      endIcon={<RightArrowIcon color={endIconColor} />}
      disabled={disabled}
    >
      <Label disabled={disabled}>{label}</Label>
    </StyledBaseButton>
  );
};
