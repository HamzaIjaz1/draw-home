import { alpha, css, lighten, styled } from '@mui/material';
import Typography from '@mui/material/Typography';

export const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const PrimaryText = styled(Typography)`
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
`;

export const SecondaryText = styled(Typography)(({ theme }) => css`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  text-align: center;
  color: ${theme.palette.text.disabled};
`);

type LabelProps = {
  isDraggingOver: boolean;
  reject: boolean;
};
const LabelOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['isDraggingOver', 'reject'].includes(e),
};
export const Label = styled('label', LabelOptions)<LabelProps>(({
  theme,
  isDraggingOver,
  reject,
}) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 10px;
  padding: 16px;
  cursor: pointer;

  border-radius: 10px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23FF5B4AFF' stroke-width='2' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");

  :hover, :focus-within {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='10' ry='10' stroke='%23fd4431' stroke-width='3' stroke-dasharray='6' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
  }

  transition: background-color 100ms ease-out;

  ${isDraggingOver === true && css`
    background-color: ${lighten(theme.palette.primary.main, 0.92)};
  `}

  ${reject === true && css`
    background-color: ${alpha(theme.palette.error.main, 0.6)};
  `}
`);
