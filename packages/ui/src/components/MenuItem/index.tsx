import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { absoluteDividerCss, CssVariable, getCssVar, menuHorizontalGutterWidth, setCssVarInline } from '../../utils/styles';
import { $Props, $props } from '../../utils/$props';

type ItemProps = {
  $divider: boolean;
  $spaceBetween: boolean;
  $center: boolean;
  $paddingVertical: MenuItemProps['paddingVertical'];
  $paddingTop: MenuItemProps['paddingTop'];
  $paddingBottom: MenuItemProps['paddingBottom'];
  $paddingHorizontal: NonNullable<MenuItemProps['paddingHorizontal']>;
  $paddingLeft: NonNullable<MenuItemProps['paddingLeft']>;
  $paddingRight: NonNullable<MenuItemProps['paddingRight']>;
  $minHeight: NonNullable<MenuItemProps['minHeight']>;
  $grow: boolean;
};

const cssVar = {
  gap: '--menu-item-gap',
} satisfies Record<string, CssVariable>;

const verticalPaddings: Record<NonNullable<ItemProps['$paddingVertical']>, `${number}px`> = {
  md: '10px',
  ml: '16px',
  lg: '24px',
};

const minHeights: Record<ItemProps['$minHeight'], string> = {
  unset: 'unset',
  'full-row': '48px',
  'half-row': '24px',
};

const paddingHorizontalCss = {
  false: '',
  true: css`
    padding-left: ${menuHorizontalGutterWidth}px;
    padding-right: ${menuHorizontalGutterWidth}px;
  `,
  sm: css`
    padding-left: ${menuHorizontalGutterWidth / 2}px;
    padding-right: ${menuHorizontalGutterWidth / 2}px;
  `,
  'row 3/4': css`
    padding-left: ${menuHorizontalGutterWidth / 4 * 3}px;
    padding-right: ${menuHorizontalGutterWidth / 4 * 3}px;
  `,
} satisfies Record<`${NonNullable<MenuItemProps['paddingHorizontal']>}`, unknown>;

const paddingLeftCss = {
  false: '',
  true: css`
    padding-left: ${menuHorizontalGutterWidth}px;
  `,
  'row 3/4': css`
    padding-left: ${menuHorizontalGutterWidth / 4 * 3}px;
  `,
} satisfies Record<`${NonNullable<MenuItemProps['paddingLeft']>}`, unknown>;

const paddingRightCss = {
  false: '',
  true: css`
    padding-right: ${menuHorizontalGutterWidth}px;
  `,
  'row 3/4': css`
    padding-right: ${menuHorizontalGutterWidth / 4 * 3}px;
  `,
} satisfies Record<`${NonNullable<MenuItemProps['paddingRight']>}`, unknown>;

const Item = styled('div', $props())<$Props<ItemProps>>(({
  $divider,
  $spaceBetween,
  $center,
  $paddingVertical,
  $paddingTop,
  $paddingBottom,
  $paddingHorizontal,
  $paddingLeft,
  $paddingRight,
  $grow,
  $minHeight,
}) => css`
  display: flex;
  align-items: center;
  position: relative;
  min-height: ${minHeights[$minHeight]};
  gap: ${getCssVar(cssVar.gap)};

  ${isUndefined($paddingVertical) ? '' : css`
    padding-top: ${verticalPaddings[$paddingVertical]};
    padding-bottom: ${verticalPaddings[$paddingVertical]};
  `}
  ${isUndefined($paddingTop) ? '' : css`
    padding-top: ${verticalPaddings[$paddingTop]};
  `}
  ${isUndefined($paddingBottom) ? '' : css`
    padding-bottom: ${verticalPaddings[$paddingBottom]};
  `}
  ${$grow === true && css`
    flex: 1;
  `}
  ${paddingHorizontalCss[String($paddingHorizontal)]}
  ${paddingLeftCss[String($paddingLeft)]}
  ${paddingRightCss[String($paddingRight)]}
  ${$spaceBetween === true && css`
    justify-content: space-between;
  `}
  ${$center === true && css`
    justify-content: center;
  `}
  ${$divider === true && absoluteDividerCss}
`);

export type MenuItemProps = Union<
  & {
    children: React.ReactNode;
    divider?: boolean;
    grow?: boolean;
    minHeight?: 'unset' | 'half-row' | 'full-row';
    gap?: number;
  }
  & (
    | {
      center?: false;
      spaceBetween?: true;
    }
    | {
       center?: true;
       spaceBetween?: false;
    }
  )
  & (
    | {
      paddingVertical?: 'md' | 'ml' | 'lg';
    }
    | {
      paddingTop?: 'md' | 'ml' | 'lg';
      paddingBottom?: 'md' | 'ml' | 'lg';
    }
  )
  & (
    | {
      paddingHorizontal?: boolean | 'sm' | 'row 3/4';
    }
    | {
      paddingLeft?: boolean | 'row 3/4';
      paddingRight?: boolean | 'row 3/4';
    }
  )
>;

export const MenuItem = ({
  className,
  children,
  divider = false,
  spaceBetween = false,
  center = false,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingHorizontal = false,
  paddingLeft = false,
  paddingRight = false,
  grow = false,
  minHeight = 'full-row',
  gap,
}: MenuItemProps & WithClassName) => (
  <Item
    className={className}
    style={{
      ...!isUndefined(gap) && setCssVarInline(cssVar.gap, `${gap}px`),
    }}
    $divider={divider}
    $spaceBetween={spaceBetween}
    $center={center}
    $paddingVertical={paddingVertical}
    $paddingTop={paddingTop}
    $paddingBottom={paddingBottom}
    $paddingHorizontal={paddingHorizontal}
    $paddingLeft={paddingLeft}
    $paddingRight={paddingRight}
    $grow={grow}
    $minHeight={minHeight}
  >
    {children}
  </Item>
);
