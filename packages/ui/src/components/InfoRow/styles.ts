import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { textOverflowEllipsis } from '../../utils/styles';

const BaseText = styled(Typography)(({ theme }) => css`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${theme.palette.text.secondary};
`);

export const Title = BaseText;

export const Value = styled(BaseText)`
  width: 150px;
  text-align: right;
  ${textOverflowEllipsis}
`;
