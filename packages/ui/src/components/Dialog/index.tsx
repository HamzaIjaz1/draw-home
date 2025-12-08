import { WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined } from '@arthurka/ts-utils';
import { PenAndWrenchCrossedIcon, UnlockIcon } from '../Icons';
import {
  CloseButton,
  Container,
  Content,
  IconContainer,
  Title,
} from './styles';

const icons = {
  penAndWrenchCrossed: PenAndWrenchCrossedIcon,
  unlock: UnlockIcon,
};

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  onCloseTransitionEnd?: () => void;
  title: string;
  children: React.ReactNode;
  icon?: keyof typeof icons;
};

export const Dialog = ({
  className,
  open,
  onClose,
  title,
  children,
  onCloseTransitionEnd,
  icon,
}: DialogProps & WithClassName) => {
  const Icon = isUndefined(icon) ? undefined : icons[icon];

  return (
    <Container
      className={className}
      open={open}
      onClose={onClose}
      onCloseTransitionEnd={onCloseTransitionEnd}
    >
      {!isUndefined(Icon) && (
        <IconContainer>
          <Icon />
        </IconContainer>
      )}
      <CloseButton
        icon='close'
        size='sm'
        variant='text'
        onClick={onClose}
      />
      <Title withMarginTop={isUndefined(Icon)}>{title}</Title>
      <Content>
        {children}
      </Content>
    </Container>
  );
};
