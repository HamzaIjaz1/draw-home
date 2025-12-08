import { WithClassName } from '@draw-house/common/dist/utils';
import Paper from '@mui/material/Paper';
import { css, styled } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import { createStyledOptions } from '../../utils/createStyledOptions';

type FrameProps = {
  corners: NonNullable<MenuFrameProps['corners']>;
};

const opts = createStyledOptions<FrameProps>({
  corners: true,
});

const getBorderRadius = (corners: FrameProps['corners']): string => {
  const top = corners.top === 'angular' ? '0 0' : '16px 16px';
  const down = corners.down === 'angular' ? '0 0' : '16px 16px';

  return `${top} ${down}`;
};

const Frame = styled(Paper, opts)<FrameProps>(({ corners }) => css`
  width: fit-content;
  padding: 5px 0 10px 0;
  box-shadow: 0px 0px 5px 0px #0000004d;
  border-radius: ${getBorderRadius(corners)};
  z-index: 3;
`);

export type MenuFrameProps = {
  children: React.ReactNode;
  corners?: Partial<Record<'top' | 'down', 'rounded' | 'angular'>>;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
};

export const MenuFrame = forwardRef(({
  className,
  children,
  corners = {},
  onPointerEnter,
  onPointerLeave,
}: MenuFrameProps & WithClassName, ref: ForwardedRef<HTMLDivElement>) => (
  <Frame
    ref={ref}
    className={className}
    corners={corners}
    onPointerEnter={onPointerEnter}
    onPointerLeave={onPointerLeave}
  >
    {children}
  </Frame>
));
