import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { IconButton as BaseIconButton } from '../IconButton';
import { backgroundSecondary } from '../../theme';
import { BaseButton } from '../BaseButton';
import { BaseRow } from '../BaseRow';
import { createStyledOptions } from '../../utils/createStyledOptions';

export const Container = styled(BaseRow)`
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const Label = styled(Typography)(({ theme }) => css`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: break-word;
`);

export const Options = styled('div')`
  display: flex;
  flex-direction: row;
  gap: 2px;
  flex-shrink: 0;
  background-color: #f4f4f5;
  border-radius: 6px;
  padding: 2px;
`;

const buttonActiveStyle = css`
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  :hover {
    background-color: #ffffff;
  }
`;

type ButtonProps = {
  selected: boolean;
};
const ButtonOptions = createStyledOptions<ButtonProps>({
  selected: true,
});

export const IconButton = styled(BaseIconButton, ButtonOptions)<ButtonProps>(({ selected }) => css`
  border-radius: 4px;
  min-width: 32px;
  min-height: 28px;
  ${selected === true && buttonActiveStyle}
`);

export const TextButton = styled(BaseButton, ButtonOptions)<ButtonProps>(({ selected }) => css`
  border-radius: 4px;
  padding: 4px 10px;
  min-height: 28px;
  ${selected === true && buttonActiveStyle}
`);

export const Text = styled(Typography)(({ theme }) => css`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: ${theme.palette.text.primary};
`);
