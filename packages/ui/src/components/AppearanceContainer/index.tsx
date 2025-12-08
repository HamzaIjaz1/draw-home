import { WithClassName } from '@draw-house/common/dist/utils';
import { Container } from './styles';

export type AppearanceContainerProps = {
  children: React.ReactNode;
};

export const AppearanceContainer = ({
  className,
  children,
}: AppearanceContainerProps & WithClassName) => (
  <Container className={className}>
    {children}
  </Container>
);
