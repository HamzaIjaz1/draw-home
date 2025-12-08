import { WithClassName } from '@draw-house/common/dist/utils';
import { Container } from './styles';

export type AppearanceTabsProps = {
  children: React.ReactNode;
};

export const AppearanceTabs = ({ className, children }: AppearanceTabsProps & WithClassName) => (
  <Container className={className}>
    {children}
  </Container>
);
