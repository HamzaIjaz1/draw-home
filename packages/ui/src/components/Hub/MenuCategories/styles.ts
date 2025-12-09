import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  width: var(--left-menu-width, 200px);
  gap: ${theme.spacing(15)};
  padding: ${theme.spacing(5, 8, 8)};
`);

export const MainHeading = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  line-height: 1em;
  text-align: left;
  vertical-align: middle;
  color: #222733;
  position: relative;
  top: -5.5px;
`;

export const LogoImage = styled('img')`
  height: 40px;
  width: auto;
  display: block;
`;
