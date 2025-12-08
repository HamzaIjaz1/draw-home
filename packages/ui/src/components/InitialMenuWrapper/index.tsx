import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: 100vh;
  margin: 0 auto;
  z-index: 9999999999;
`;

export type InitialMenuWrapperProps = {
  children: React.ReactElement;
};

export const InitialMenuWrapper = ({
  className,
  children,
}: InitialMenuWrapperProps & WithClassName) => (
  <Container className={className}>
    {children}
  </Container>
);
