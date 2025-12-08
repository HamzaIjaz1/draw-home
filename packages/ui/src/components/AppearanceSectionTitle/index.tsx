import { WithClassName } from '@draw-house/common/dist/utils';
import { Title } from './styles';

export type AppearanceSectionTitleProps = {
  children: string;
};

export const AppearanceSectionTitle = ({
  className,
  children,
}: AppearanceSectionTitleProps & WithClassName) => (
  <Title className={className}>{children}</Title>
);
