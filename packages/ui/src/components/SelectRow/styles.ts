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
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: ${theme.palette.text.secondary};
  cursor: pointer;
`);
