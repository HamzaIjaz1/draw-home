import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { menuHorizontalGutterWidth, textOverflowEllipsis } from '../../utils/styles';

export const Container = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 12px;
  padding: 12px;
  margin: 0 ${menuHorizontalGutterWidth}px;
  min-height: 64px;
  border: 1px solid ${theme.palette.primary.main};
  border-radius: 10px;
`);

export const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 6px;
`;

export const Name = styled(Typography)`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  max-width: 260px;
  ${textOverflowEllipsis}
`;

export const Size = styled(Typography)(({ theme }) => css`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: left;
  color: ${theme.palette.text.disabled};
`);
