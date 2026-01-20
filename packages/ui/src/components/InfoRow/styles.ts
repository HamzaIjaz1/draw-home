import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { textOverflowEllipsis } from '../../utils/styles';

const BaseText = styled(Typography)(({ theme }) => css`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: ${theme.palette.text.secondary};
`);

export const Title = styled(Typography)(({ theme }) => css`
  font-size: 11px;
  font-weight: 500;
  line-height: 14px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: ${theme.palette.text.secondary};
`);

export const Value = styled(BaseText)(({ theme }) => css`
  width: 100px;
  text-align: right;
  color: ${theme.palette.text.primary};
  ${textOverflowEllipsis}
`);
