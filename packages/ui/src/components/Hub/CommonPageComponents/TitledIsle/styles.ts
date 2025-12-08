import { css, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import type { TitledIsleProps } from '.';

const desktopGapBetweenTitleAndChildren = 7.5;

export const DesktopContent = styled('div')(({ theme }) => css`
  width: 100%;
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    flex-direction: column;
  }
`);

export const MobileAccordion = styled(MuiAccordion)(({ theme }) => css`
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`);

type TypeProps = {
  type: TitledIsleProps['type'];
};
const TypeOptions: Parameters<typeof styled>[1] = {
  shouldForwardProp: e => !['type'].includes(e),
};
export const AccordionSummary = styled(MuiAccordionSummary, TypeOptions)<TypeProps>(({ type }) => css`
  border-radius: 4px;
  padding: 0;
  min-height: 24px;
  pointer-events: ${type === 'always-static' ? 'none' : 'auto'};

  .${accordionSummaryClasses.content} {
    margin: 0;
  }
`);

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => css`
  padding: ${theme.spacing(5, 0, 0, 0)};

  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(desktopGapBetweenTitleAndChildren, 0, 0, 0)};
  }
`);

export const Title = styled(Typography)(({ theme }) => css`
  font-size: 15px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${theme.palette.general.purpleGray};

  ${theme.breakpoints.up('md')} {
    margin-bottom: ${theme.spacing(desktopGapBetweenTitleAndChildren)};
  }
`);
