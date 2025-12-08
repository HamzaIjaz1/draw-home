import { isNull } from '@arthurka/ts-utils';
import { FloatingMenu, FloatingMenuContainer, FloatingMenuProps, SlideUpMenu, SlideUpMenuProps } from '@draw-house/ui/dist/components';
import { createPortal } from 'react-dom';
import { floatingMenuDOMNodeId } from '../constants';
import { Animations } from './animations';
import { useIsDesktopMenu } from '../zustand';

export const SlideUpAndFloatingMenusWrapper: React.FC<SlideUpMenuProps & FloatingMenuProps> = props => {
  const { isDesktopMenu } = useIsDesktopMenu();
  const floatingMenuDOMNode = document.querySelector(`#${floatingMenuDOMNodeId}`);

  return (
    isDesktopMenu === false
      ? <SlideUpMenu {...props} />
      : props.opened === true && !isNull(floatingMenuDOMNode) && (
        createPortal(
          (
            <FloatingMenuContainer>
              <Animations.floatingMenu>
                <FloatingMenu {...props} />
              </Animations.floatingMenu>
            </FloatingMenuContainer>
          ),
          floatingMenuDOMNode,
        )
      )
  );
};
