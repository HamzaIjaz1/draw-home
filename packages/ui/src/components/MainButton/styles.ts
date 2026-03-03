import { css, darken, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { isUndefined } from '@arthurka/ts-utils';
import { BaseButton } from '../BaseButton';
import { PlusIcon as BasePlusIcon } from '../Icons';
import type { MainButtonProps } from '.';
import { $props, $Props } from '../../utils/$props';
import { makeLoaderStyles } from '../../utils/makeLoaderStyles';
import { lookup } from '../../utils/lookup';

export type Mode = 'icon' | 'text' | 'icon-text';

type StyledButtonProps = $Props<{
  $mode: Mode;
  $height: NonNullable<MainButtonProps['height']>;
  $textWidth: MainButtonProps['width'];
  $shadowless: boolean;
  $padding: NonNullable<MainButtonProps['padding']>;
  $isLoading: boolean;
  $rounded: 'sm' | 'md';
  $backgroundColor: string | undefined;
}>;

const textWidths = {
  xl: '230px',
  lg: '174px',
  md: '152px',
  'fit-content': 'fit-content',
  fill: '100%',
} as const satisfies Record<NonNullable<StyledButtonProps['$textWidth']>, string>;

const heights: Record<StyledButtonProps['$height'], `${number}px`> = {
  md: '44px',
  lg: '56px',
};

const getWidth = (mode: Mode, textWidth: StyledButtonProps['$textWidth']): string => {
  switch(mode) {
    case 'icon':
      return '52px';
    case 'text':
    case 'icon-text':
      return textWidths[textWidth ?? 'fit-content'];
    default:
      ((e: never) => e)(mode);
      throw new Error('Should be unreachable. |cvx92c|');
  }
};

const getPaddingMultiplier = (padding: StyledButtonProps['$padding']) => {
  const x: Record<typeof padding, number> = {
    'row 1/4': 0.25,
    sm: 0.5,
    md: 1,
  };

  const y: Record<typeof padding, number> = {
    ...x,
    'row 1/4': 0,
  };

  return { x: x[padding], y: y[padding] };
};

export const StyledButton = styled(
  BaseButton,
  $props(),
) <StyledButtonProps>(({
  theme,
  $mode,
  $textWidth,
  $height,
  $shadowless,
  $padding,
  $isLoading,
  $rounded,
  $backgroundColor,
}) => {
  const paddingValue = ((): string => {
    const { x, y } = getPaddingMultiplier($padding);

    switch($mode) {
      case 'text':
      case 'icon-text': return `${8 * y}px ${16 * x}px`;
      case 'icon': return `${6 * y}px ${8 * x}px`;
      default:
        ((e: never) => e)($mode);
        throw new Error('This should never happen. |97qr2u|');
    }
  })();

  return css`
    display: flex;
    gap: 8px;

    width: ${getWidth($mode, $textWidth)};
    height: ${heights[$height]};
    padding: ${paddingValue};

    ${$shadowless === true && css`
      box-shadow: none;
      :hover, :active, :focus-within {
        box-shadow: none;
      }
    `}

    border-radius: ${lookup($rounded, { sm: '10px', md: '100px' })};

    ${!isUndefined($backgroundColor) && css`
      background-color: ${$backgroundColor};
      :hover {
        background-color: ${darken($backgroundColor, 0.1)};
      }
    `}

    ${makeLoaderStyles('::before', $isLoading, theme.palette.background.paper)}
  `;
});

export const PlusIcon = styled(BasePlusIcon)`
  width: 25px;
  height: 25px;
`;

export const Text = styled(Typography)`
  font-size: 17px;
  font-weight: 500;
  line-height: 20px;
`;
