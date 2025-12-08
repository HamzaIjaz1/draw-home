import { css, styled } from '@mui/material';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { identity } from '../../utils/identity';

export const Title = styled(Typography)(({ theme }) => css`
  font-weight: 700;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};

  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`);
Title.defaultProps = identity<TypographyProps>({ component: 'span' });
