import { WithClassName } from '@draw-house/common/dist/utils';
import { Container } from './styles';

export type PageBodyProps = {
  children: React.ReactNode;
};

export const PageBody = ({
  className,
  children,
}: PageBodyProps & WithClassName) => (
  <Container className={className}>
    {children}
  </Container>
);
