import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  width: var(--left-menu-width, 250px);
  gap: ${theme.spacing(15)};
  padding: ${theme.spacing(10, 9, 15)};
`);

export const MainHeading = styled(Typography)`
  font-size: 23px;
  font-weight: 500;
  line-height: 1em;
  text-align: left;
  vertical-align: middle;
  color: #222733;
  position: relative;
  top: -1.5px;
`;
