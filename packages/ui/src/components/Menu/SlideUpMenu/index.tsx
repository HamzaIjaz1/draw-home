import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
import { FixedContent, headerSpacing, ScrollableContent } from '../base/styles';
import { MenuFrame, MenuHeader } from './styles';

export type SlideUpMenuProps = Union<
  & {
    title: string;
    opened: boolean;
    onClose: () => void;
    onBack?: () => void;
    children: React.ReactNode;
    noDivider?: boolean;
    noHeightLimit?: boolean;
  }
  & (
    | {}
    | {
      header: React.ReactNode;
      headerSpacing?: Partial<Record<'top' | 'bottom', keyof typeof headerSpacing>>;
    }
  )
>;

export const SlideUpMenu = ({
  className,
  title,
  opened,
  onClose,
  onBack,
  children,
  header,
  noDivider = false,
  headerSpacing,
  noHeightLimit = false,
}: SlideUpMenuProps & WithClassName) => (
  <MenuFrame
    className={className}
    corners={{ down: 'angular' }}
    $opened={opened}
    $noHeightLimit={noHeightLimit}
  >
    <FixedContent
      $noDivider={noDivider}
      $bottomSpacing={headerSpacing?.bottom}
      $noStableScrollbarGutter={false}
    >
      <MenuHeader
        text={title}
        onBack={onBack}
        onClose={onClose}
        $bottomSpacing={headerSpacing?.top}
      />
      {header}
    </FixedContent>

    <ScrollableContent $noStableScrollbarGutter={false}>
      {children}
    </ScrollableContent>
  </MenuFrame>
);
