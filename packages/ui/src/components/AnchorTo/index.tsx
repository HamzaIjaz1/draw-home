import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

const Container = styled('div')`
  position: relative;
`;

export type AnchorToProps = {
  anchored: React.ReactNode;
  children: React.ReactNode;
  xDirection: 'right' | 'left';
  yDirection: 'top' | 'bottom';
  xOffset?: string;
  yOffset?: string;
};

export const AnchorTo = ({
  className,
  anchored,
  children,
  xDirection,
  yDirection,
  xOffset = '0px',
  yOffset = '0px',
}: AnchorToProps & WithClassName) => (
  <Container className={className}>
    {children}

    <div
      style={{
        position: 'absolute',
        [xDirection === 'right' ? 'left' : 'right']: xOffset,
        [yDirection === 'bottom' ? 'top' : 'bottom']: yOffset,
      }}
    >
      {anchored}
    </div>
  </Container>
);
