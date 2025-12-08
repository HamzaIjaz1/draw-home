import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(5)};

  width: 100%;
  height: 100%;
  padding: ${theme.spacing(4)};

  ${theme.breakpoints.up(640)} {
    padding: ${theme.spacing(5)};
  }
  ${theme.breakpoints.up(1024)} {
    padding: ${theme.spacing(7)};
  }
  ${theme.breakpoints.up(1440)} {
    gap: ${theme.spacing(7)};
  }
  ${theme.breakpoints.up(1920)} {
    padding: ${theme.spacing(10)};
  }
`);

export const Title = styled(Typography)`
  font-size: 32px;
  font-weight: 600;
  line-height: 37.5px;
`;

export const Tabs = styled('div')(({ theme }) => css`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing(2.5)};

  ${theme.breakpoints.up(1440)} {
    gap: ${theme.spacing(4)};
  }
`);

export const Buttons = styled('div')(({ theme }) => css`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing(5)};
  justify-items: center;
`);
