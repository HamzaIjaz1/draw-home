import { WithClassName } from '@draw-house/common/dist/utils';
import {
  Container,
  Content,
  IconButton,
  Title,
} from './styles';

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  onCloseTransitionEnd?: () => void;
  title: string;
  children: React.ReactNode;
};

export const Dialog = ({
  className,
  open,
  onClose,
  title,
  children,
  onCloseTransitionEnd,
}: DialogProps & WithClassName) => (
  <Container
    className={className}
    open={open}
    onClose={onClose}
    aria-modal='true'
    TransitionProps={{ onExited: onCloseTransitionEnd }}
  >
    <IconButton
      icon='close'
      size='md'
      variant='text'
      onClick={onClose}
    />
    <Title>{title}</Title>
    <Content>
      {children}
    </Content>
  </Container>
);
