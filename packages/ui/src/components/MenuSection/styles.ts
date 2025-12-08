import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { alpha, css, styled } from '@mui/material';
import { IconButton as IconButtonBase } from '../IconButton';
import type { MenuSectionProps } from '.';
import { absoluteDividerCss, CssVariable, getAbsoluteDividerCss, getCssVar, menuRowHorizontalPadding } from '../../utils/styles';
import { $Props, $props } from '../../utils/$props';
import { lookup } from '../../utils/lookup';

export const cssVars = {
  rootPaddingBottom: '--menu-section-root-padding-bottom',
} satisfies Record<string, CssVariable>;

export const Accordion = styled(MuiAccordion, $props())<$Props<{
  $divider: boolean;
}>>(({ $divider }) => css`
  display: flex;
  flex-direction: column;
  ::before {
    display: none;
  }

  ${$divider === true && absoluteDividerCss}

  padding-bottom: ${getCssVar(cssVars.rootPaddingBottom)};
`);

const typeToPointerEvents: Record<MenuSectionProps['type'], 'none' | 'auto'> = {
  buttonlike: 'auto',
  collapsible: 'auto',
  static: 'none',
};

export const AccordionSummary = styled(MuiAccordionSummary, $props())<$Props<{
  $type: MenuSectionProps['type'];
  $divider: boolean;
  $withIconButton: boolean;
}>>(({
  theme,
  $type,
  $divider,
  $withIconButton,
}) => css`
  border-radius: 4px;
  pointer-events: ${typeToPointerEvents[$type]};
  ${menuRowHorizontalPadding()}

  ${$type === 'buttonlike' && css`
    :hover {
      background-color: ${alpha(theme.palette.action.hover, theme.palette.action.hoverOpacity)};
    }
  `}

  ${$divider === true && getAbsoluteDividerCss(css`
    bottom: 1px;
  `)}

  .${accordionSummaryClasses.content} {
    align-items: center;
    gap: ${$withIconButton === true ? '4px' : '8px'};
    margin: 0;
  }
`);

export const AccordionDetails = styled(MuiAccordionDetails)`
  padding: 0;
`;

export const Text = styled(Typography, $props())<$Props<{
  $titleVariant: NonNullable<MenuSectionProps['titleVariant']>;
  $titleSize: string | undefined;
}>>(({
  theme,
  $titleVariant,
  $titleSize = '17px',
}) => css`
  font-size: ${$titleSize};
  line-height: 1;
  white-space: normal;

  ${lookup($titleVariant, {
    'primary-600': css`
      font-weight: 600;
      color: ${theme.palette.text.primary};
    `,
    'primary-500': css`
      font-weight: 500;
      color: ${theme.palette.text.primary};
    `,
    'primary-400': css`
      font-weight: 400;
      color: ${theme.palette.text.primary};
    `,
    pale: css`
      font-weight: 400;
      color: ${theme.palette.text.secondary};
    `,
  })}
`);

export const Image = styled('img')`
  object-fit: contain;
`;

export const iconCss = css`
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
`;

export const IconButton = styled(IconButtonBase)`
  pointer-events: auto;
`;
