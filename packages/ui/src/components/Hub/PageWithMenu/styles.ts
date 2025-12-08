import { css, styled } from '@mui/material';

export const Container = styled('div')`
  display: flex;
  width: 100%;
`;

export const DesktopTitles = styled('div')(({ theme }) => css`
  display: none;
  ${theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`);

export const DesktopPageSubTitle = styled('h4')`
  all: unset;
  font-weight: 400;
  font-size: 13px;
  line-height: 1.5;
  letter-spacing: 0.01em;
  vertical-align: middle;
  color: #7a7e83;
  overflow-wrap: anywhere;
`;
