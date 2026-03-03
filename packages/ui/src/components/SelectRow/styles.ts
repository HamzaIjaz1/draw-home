import { css, styled } from '@mui/material';
import MuiInputLabel from '@mui/material/InputLabel';
import { menuRowPadding } from '../../utils/styles';

export const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${menuRowPadding()}
`;

export const InputLabel = styled(MuiInputLabel)(({ theme }) => css`
  flex: 1;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};
  cursor: pointer;
`);
