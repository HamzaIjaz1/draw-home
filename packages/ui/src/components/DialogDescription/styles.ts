import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';

export const Text = styled(Typography)(({ theme }) => css`
  color: ${theme.palette.text.disabled};
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  margin-bottom: 16px;
`);
