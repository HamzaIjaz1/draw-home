import { styled } from '@mui/material';
import Typography from '@mui/material/Typography';

export const Container = styled('div')`
  padding: 2px;
  cursor: pointer;
  overflow-wrap: anywhere;
`;

export const Text = styled(Typography)`
  width: 80px;
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  white-space: normal;
`;
