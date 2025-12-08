import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { IconButton as BaseIconButton } from '../IconButton';
import { backgroundSecondary } from '../../theme';
import { BaseButton } from '../BaseButton';
import { BaseRow } from '../BaseRow';
import { createStyledOptions } from '../../utils/createStyledOptions';

export const Container = styled(BaseRow)`
  gap: 8px;
`;

export const Label = styled(Typography)(({ theme }) => css`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};

  max-width: 50%;
  overflow-wrap: break-word;
`);

export const Options = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const buttonActiveStyle = css`
  background-color: ${backgroundSecondary};
  :hover {
    background-color: ${backgroundSecondary};
  }
`;

type ButtonProps = {
  selected: boolean;
};
const ButtonOptions = createStyledOptions<ButtonProps>({
  selected: true,
});

export const IconButton = styled(BaseIconButton, ButtonOptions)<ButtonProps>(({ selected }) => css`
  border-radius: 8px;
  ${selected === true && buttonActiveStyle}
`);

export const TextButton = styled(BaseButton, ButtonOptions)<ButtonProps>(({ selected }) => css`
  border-radius: 8px;
  ${selected === true && buttonActiveStyle}
`);

export const Text = styled(Typography)(({ theme }) => css`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.primary};
`);
