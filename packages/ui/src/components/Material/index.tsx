import { WithClassName } from '@draw-house/common/dist/utils';
import { CheckMarkIcon, DisabledMaterialIcon, DownArrowIcon } from '../Icons';
import {
  Button,
  ButtonWrap,
  Container,
  Image,
  Text,
} from './styles';

export type MaterialProps = {
  text: string;
  image: string;
  onClick: () => void;
  disabled?: boolean;
  withCheckmark?: boolean;
  withArrow?: boolean;
};

export const Material = ({
  className,
  image,
  text,
  onClick,
  disabled = false,
  withCheckmark = false,
  withArrow = false,
}: MaterialProps & WithClassName) => (
  <Container className={className}>
    <Text disabled={disabled}>{text}</Text>

    <ButtonWrap>
      {withCheckmark === true && <CheckMarkIcon />}

      <Button
        onClick={onClick}
        disabled={disabled}
      >
        {
          disabled === true
            ? <DisabledMaterialIcon />
            : (
              <Image src={image} draggable={false} />
            )
        }

        {withArrow === true && <DownArrowIcon rotate={-90} />}
      </Button>
    </ButtonWrap>
  </Container>
);
