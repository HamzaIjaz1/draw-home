import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { textOverflowEllipsis } from '../../utils/styles';

const BaseText = styled(Typography)(({ theme }) => css`
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: ${theme.palette.text.secondary};
`);

export const Title = BaseText;

export const Value = styled(BaseText)`
  width: 100px;
  text-align: right;
  ${textOverflowEllipsis}
`;
