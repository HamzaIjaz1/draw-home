import { WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined } from '@arthurka/ts-utils';
import {
  BackButton,
  CloseButton,
  Header,
  Text,
} from './styles';

export type MenuHeaderProps = {
  text: string;
  onBack?: () => void;
  onClose?: () => void;
  noHeight?: boolean;
};

export const MenuHeader = ({
  className,
  text,
  onBack,
  onClose,
  noHeight = false,
}: MenuHeaderProps & WithClassName) => (
  <Header className={className} $noHeight={noHeight}>
    {
      !isUndefined(onBack) && (
        <BackButton
          icon='back'
          size='sm'
          variant='text'
          onClick={onBack}
        />
      )
    }
    <Text>{text}</Text>
    {
      !isUndefined(onClose) && (
        <CloseButton
          icon='close'
          size='sm'
          variant='text'
          onClick={onClose}
        />
      )
    }
  </Header>
);
