import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';

export const Container = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing(4)};

  ${theme.breakpoints.up(1000)} {
    flex-direction: row;
    justify-content: space-evenly;
    gap: 0;

    width: 100%;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }
`);

export const SuggestionText = styled(Typography)(({ theme }) => css`
  font-size: 24px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  color: ${theme.palette.common.black};
`);
