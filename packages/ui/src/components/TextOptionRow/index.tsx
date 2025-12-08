import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { BaseButton } from '../BaseButton';
import { Container, Label, RightArrowIcon, Value } from './styles';

export type TextOptionRowProps = {
  label: string;
  value: string;
  disabled?: boolean;
  onClick: () => void;
};

export const TextOptionRow = ({
  className,
  label,
  value,
  disabled = false,
  onClick,
}: TextOptionRowProps & WithClassName) => {
  const theme = useTheme();

  const iconColor = disabled === true
    ? theme.palette.text.disabled
    : theme.palette.secondary.main;

  return (
    <Container className={className}>
      <Label disabled={disabled}>{label}</Label>
      <BaseButton
        onClick={onClick}
        endIcon={<RightArrowIcon color={iconColor} />}
        disabled={disabled}
      >
        <Value disabled={disabled}>{value}</Value>
      </BaseButton>
    </Container>
  );
};
