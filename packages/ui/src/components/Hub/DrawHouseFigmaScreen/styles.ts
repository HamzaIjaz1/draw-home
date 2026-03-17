import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';

/**
 * Styles for Draw House Figma screen (node-id=21963-71468).
 * Replace placeholder values with pixel-perfect specs from Figma get_design_context
 * when file access is available.
 */
export const Root = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  /* Padding/gap: update from Figma layout */
  padding: ${theme.spacing(4)};
  gap: ${theme.spacing(4)};

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(5)};
    gap: ${theme.spacing(5)};
  }

  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(7)};
    gap: ${theme.spacing(7)};
  }
`);

export const Title = styled(Typography)(({ theme }) => css`
  font-size: 32px;
  font-weight: 600;
  line-height: 1.17;
  color: ${theme.palette.text.primary};
  /* Update typography from Figma (font, size, weight, letter-spacing) */
`);

export const Content = styled('div')(({ theme }) => css`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: ${theme.spacing(3)};
  /* Replace with exact layout (flex/grid, spacing) from Figma */
`);
