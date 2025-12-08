import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => css`
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
  height: 50px;
  padding: ${theme.spacing(0, 1)};
`);

export const RightControls = styled('div')`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 24px;
`;

export const Titles = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
  flex: 1;
`);

export const Title = styled(Typography)(({ theme }) => css`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: ${theme.palette.text.primary};

  max-width: 155px;
  ${theme.breakpoints.up(390)} {
    max-width: 220px;
  }
  ${theme.breakpoints.up('sm')} {
    max-width: 230px;
  }
`);

export const SubTitle = styled(Typography)(({ theme }) => css`
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: left;
  color: #777;

  max-width: 155px;
  ${theme.breakpoints.up(390)} {
    max-width: 220px;
  }
  ${theme.breakpoints.up('sm')} {
    max-width: 230px;
  }
`);
