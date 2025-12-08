import { WithClassName } from '@draw-house/common/dist/utils';
import { DesktopTitle } from './styles';

export type DesktopPageTitleProps = {
  children: string;
};

export const DesktopPageTitle = ({
  className,
  children,
}: DesktopPageTitleProps & WithClassName) => (
  <DesktopTitle
    className={className}
    variant='h1'
  >
    {children}
  </DesktopTitle>
);
