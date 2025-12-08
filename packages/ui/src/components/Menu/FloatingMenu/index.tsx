import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { MenuHeader } from '../../MenuHeader';
import { MenuFrame as BaseMenuFrame } from '../../MenuFrame';
import { clsx } from '../../../utils/clsx';
import { $Props, $props } from '../../../utils/$props';
import { lookup } from '../../../utils/lookup';
import {
  menuContainerWidth,
  scrollbarWidth,
} from '../../../utils/styles';
import {
  FixedContent,
  ScrollableContent,
} from '../base/styles';

export const menuFrameWidth = menuContainerWidth + scrollbarWidth;

const MenuFrame = styled(BaseMenuFrame, $props())<$Props<{
  $width: 'fixed' | 'fit-content';
}>>(({ $width }) => css`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: ${lookup($width, { fixed: `${menuFrameWidth}px`, 'fit-content': 'fit-content' })};
  max-width: 95svw;
  max-height: 100%;
`);

export type FloatingMenuProps = {
  title: string;
  onClose: () => void;
  onBack?: () => void;
  children: React.ReactNode;
  noDivider?: boolean;
  header?: React.ReactNode;
  noStableScrollbarGutter?: boolean;
  width?: 'fixed' | 'fit-content';
};

export const floatingMenuClassName = 'floating-menu';

export const FloatingMenu = ({
  className,
  title,
  onClose,
  onBack,
  children,
  header,
  noDivider = false,
  noStableScrollbarGutter = false,
  width = 'fixed',
}: FloatingMenuProps & WithClassName) => (
  <MenuFrame
    className={clsx([className, floatingMenuClassName])}
    $width={width}
  >
    <FixedContent
      $noDivider={noDivider}
      $noStableScrollbarGutter={noStableScrollbarGutter}
    >
      <MenuHeader
        text={title}
        onBack={onBack}
        onClose={onClose}
      />
      {header}
    </FixedContent>

    <ScrollableContent $noStableScrollbarGutter={noStableScrollbarGutter}>
      {children}
    </ScrollableContent>
  </MenuFrame>
);
