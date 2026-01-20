import { css, styled } from '@mui/material';
import MuiInputLabel from '@mui/material/InputLabel';
import { menuRowPadding } from '../../utils/styles';

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
  ${menuRowPadding()}
`;

export const InputLabel = styled(MuiInputLabel)(({ theme }) => css`
  flex: 1;
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: ${theme.palette.text.secondary};
  cursor: pointer;
`);
