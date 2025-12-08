import { WithClassName } from '@draw-house/common/dist/utils';
import { Container } from './styles';

export type ContentProps = {
  children: React.ReactNode;
};

export const Content = ({
  className,
  children,
}: ContentProps & WithClassName) => (
  <Container className={className}>
    {children}
  </Container>
);
