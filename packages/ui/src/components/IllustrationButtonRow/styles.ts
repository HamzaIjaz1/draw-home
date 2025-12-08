import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { menuRowPadding } from '../../utils/styles';

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${menuRowPadding()}
`;

export const Text = styled(Typography)(({ theme }) => css`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.palette.text.disabled};
  overflow-wrap: anywhere;

  margin-top: 4px;
  margin-bottom: 12px;
`);
