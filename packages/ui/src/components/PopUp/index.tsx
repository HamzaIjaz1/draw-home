import { WithClassName } from '@draw-house/common/dist/utils';
import { Container } from './styles';

export { cssVars as PopUpCssVars } from './styles';

export type PopUpProps = {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onCloseTransitionEnd?: () => void;
};

export const PopUp = ({
  className,
  open,
  children,
  onClose,
  onCloseTransitionEnd,
}: PopUpProps & WithClassName) => (
  <Container
    className={className}
    open={open}
    onClose={onClose}
    TransitionProps={{ onExited: onCloseTransitionEnd }}
  >
    {children}
  </Container>
);
