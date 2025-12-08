import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { MenuFrame } from '../MenuFrame';

export const Container = styled(MenuFrame)(() => css`
  padding: 1px 3px;
  border-radius: 100px;
  box-shadow: none;
  background: none;
`);

export const Text = styled(Typography)`
  font-size: 10px;
  font-weight: 400;
  line-height: 10px;
  text-align: center;
  white-space: nowrap;
  color: #a0a0a0;
`;
