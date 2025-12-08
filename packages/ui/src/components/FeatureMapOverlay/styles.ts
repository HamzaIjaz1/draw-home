import { css, Theme } from '@mui/material';

export const textStyles = (theme: Theme, opts?: 'omitSize') => css`
  font-family: Caveat;
  font-weight: 700;
  line-height: 1em;
  letter-spacing: 0.5px;
  text-align: center;
  color: #999;
  user-select: none;

  ${opts === 'omitSize' ? '' : css`
    font-size: 15px;
    ${theme.breakpoints.up('md')} {
      font-size: 24px;
    }
  `}
`;
