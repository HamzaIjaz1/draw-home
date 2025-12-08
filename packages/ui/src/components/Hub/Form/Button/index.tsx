import { WithClassName } from '@draw-house/common/dist/utils';
import { ButtonOwnProps } from '@mui/material/Button';
import { Union } from '@arthurka/ts-utils';
import { StyledButton } from './styles';

const sizeToPx = {
  small: 130,
  medium: 160,
  large: 185,
  extraLarge: 200,
};

export type FormButtonProps = Union<
  & {
    text: string;
    size: keyof typeof sizeToPx;
    disabled?: boolean;
    variant?: ButtonOwnProps['variant'];
    startIcon?: React.ReactNode;
    isBilling?: boolean;
  }
  & (
    | {
      type?: 'button' | 'reset';
      onClick: () => void;
    }
    | {
      type: 'submit';
      onClick?: () => void;
    }
  )
>;

export const FormButton = ({
  className,
  onClick,
  text,
  disabled = false,
  size,
  variant = 'outlined',
  type,
  startIcon,
  isBilling = false,
}: FormButtonProps & WithClassName) => (
  <StyledButton
    className={className}
    variant={variant}
    onClick={onClick}
    disabled={disabled}
    style={isBilling === true ? { width: sizeToPx[size], height: 40 } : { width: sizeToPx[size] }}
    type={type}
    startIcon={startIcon}
  >
    {text}
  </StyledButton>
);
