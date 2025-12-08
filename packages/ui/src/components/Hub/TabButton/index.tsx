import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { BaseButton } from '../../BaseButton';

const StyledButton = styled(BaseButton)(({ theme, variant }) => css`
  padding: ${theme.spacing(2.5, 5)};
  border-radius: ${theme.spacing(2)};

  ${variant === 'contained' && css`
    :hover {
      background-color: ${theme.palette.secondary.main};
    }
  `}
`);

const Text = styled(Typography)`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
`;

export type TabButtonProps = {
  state?: 'default' | 'active' | 'disabled';
  text: string;
  onClick: () => void;
};

export const TabButton = ({
  className,
  onClick,
  text,
  state = 'default',
}: TabButtonProps & WithClassName) => (
  <StyledButton
    className={className}
    variant={state === 'active' ? 'contained' : 'outlined'}
    color='secondary'
    disabled={state === 'disabled'}
    onClick={onClick}
  >
    <Text>{text}</Text>
  </StyledButton>
);
