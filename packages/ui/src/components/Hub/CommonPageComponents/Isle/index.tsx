import { WithClassName } from '@draw-house/common/dist/utils';
import { Container } from './styles';

export type IsleProps = {
  children: React.ReactNode;
};

export const Isle = ({
  className,
  children,
}: IsleProps & WithClassName) => (
  <Container className={className}>
    {children}
  </Container>
);
