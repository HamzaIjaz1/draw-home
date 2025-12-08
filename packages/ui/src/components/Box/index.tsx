import { Union } from '@arthurka/ts-utils';
import { WithClassName } from '@draw-house/common/dist/utils';
import { CSSProperties } from 'react';

type OtherCssProps = Omit<
  CSSProperties,
  'justifyContent' | 'alignItems' | 'flexWrap' | 'gap'
>;

export type BoxProps = (
  & OtherCssProps
  & Union<
    & (
      | { column: true }
      | { row?: true }
    )
    & {
      justify?: CSSProperties['justifyContent'];
      align?: CSSProperties['alignItems'];
      wrap?: boolean;
      gap?: CSSProperties['gap'];
      children?: React.ReactNode;
    }
  >
);

export const Box = ({
  className,
  children,
  row: _row,
  column,
  justify,
  align,
  gap,
  wrap = false,
  ...rest
}: BoxProps & WithClassName) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: column === true ? 'column' : 'row',
      justifyContent: justify,
      alignItems: align,
      flexWrap: wrap === true ? 'wrap' : 'nowrap',
      gap,
      ...rest,
    }}
  >
    {children}
  </div>
);
