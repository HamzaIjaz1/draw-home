import { WithClassName } from '@draw-house/common/dist/utils';
import { Container } from './styles';
import { HorizontalScrollWrapper } from '../HorizontalScrollWrapper';

export type AppearanceTabsProps = {
  children: React.ReactNode;
};

export const AppearanceTabs = ({ className, children }: AppearanceTabsProps & WithClassName) => (
  <HorizontalScrollWrapper className={className}>
    <Container>
      {children}
    </Container>
  </HorizontalScrollWrapper>
);
