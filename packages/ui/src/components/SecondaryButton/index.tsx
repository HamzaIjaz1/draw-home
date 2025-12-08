import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseButton } from '../BaseButton';

const StyledButton = styled(BaseButton)(({ theme, variant }) => css`
  padding: 6px 16px;
  border-radius: 8px;

  ${variant === 'contained' && css`
    :hover {
      background-color: ${theme.palette.secondary.main};
    }
  `}
`);

const Text = styled(Typography)`
  font-size: 17px;
  line-height: 20px;
  font-weight: 400;
  color: #fff;
`;

export type SecondaryButtonProps = {
  state?: 'default' | 'disabled';
  text: string;
  onClick: () => void;
};

export const SecondaryButton = ({
  className,
  onClick,
  text,
  state = 'default',
}: SecondaryButtonProps & WithClassName) => (
  <StyledButton
    className={className}
    variant='contained'
    color='secondary'
    disabled={state === 'disabled'}
    onClick={onClick}
  >
    <Text>{text}</Text>
  </StyledButton>
);
