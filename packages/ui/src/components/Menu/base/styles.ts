import { css, styled } from '@mui/material';
import { isUndefined } from '@arthurka/ts-utils';
import { $Props, $props } from '../../../utils/$props';
import { absoluteDividerCss } from '../../../utils/styles';

export const headerSpacing = {
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
} satisfies Record<string, `${number}px`>;

export const FixedContent = styled('div', $props())<$Props<{
  $noDivider: boolean;
  $bottomSpacing?: keyof typeof headerSpacing;
  $noStableScrollbarGutter: boolean;
}>>(({
  $noDivider,
  $bottomSpacing,
  $noStableScrollbarGutter,
}) => css`
  overflow-y: auto;
  flex: 0 0 auto;
  scrollbar-gutter: ${$noStableScrollbarGutter === true ? 'auto' : 'stable'};
  min-height: 48px;
  position: relative;

  ${$noDivider === true ? '' : absoluteDividerCss}

  ${!isUndefined($bottomSpacing) && css`
    padding-bottom: ${headerSpacing[$bottomSpacing]};
  `}
`);

export const ScrollableContent = styled('div', $props())<$Props<{
  $noStableScrollbarGutter: boolean;
}>>(({ $noStableScrollbarGutter }) => css`
  flex: 1 1 auto;
  overflow-y: auto;
  scrollbar-gutter: ${$noStableScrollbarGutter === true ? 'auto' : 'stable'};
`);
