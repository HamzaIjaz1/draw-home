import { DistributiveSafeOmit, WithClassName } from '@draw-house/common/dist/utils';
import { ForwardedRef, forwardRef } from 'react';
import { IconButton, IconButtonProps } from '.';

export type ToolbarButtonProps = DistributiveSafeOmit<IconButtonProps, 'variant' | 'size'>;

export const ToolbarButton = forwardRef((
  props: ToolbarButtonProps & WithClassName,
  ref: ForwardedRef<HTMLButtonElement>,
) => (
  <IconButton
    {...props}
    ref={ref}
    variant='text'
    size='sm-mobile'
  />
));
