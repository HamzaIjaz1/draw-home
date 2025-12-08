import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

const Container = styled('div')`
  width: 137px;
`;

export type AppearanceInputsContainerProps = {
  children: React.ReactNode;
};

export const AppearanceInputsContainer = ({
  className,
  children,
}: AppearanceInputsContainerProps & WithClassName) => (
  <Container className={className}>
    {children}
  </Container>
);
