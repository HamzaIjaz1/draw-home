import { WithClassName } from '@draw-house/common/dist/utils';
import {
  Container,
  Image,
  MaterialButton,
  Text,
} from './styles';

type Option<T extends number> = {
  id: T;
  name: string;
  image: string;
};

export type MaterialCategoryPickerProps<T extends number> = {
  options: Array<Option<T>>;
  chosenOption?: Option<NoInfer<T>>['id'];
  onClick: (id: Option<NoInfer<T>>['id']) => void;
  squareImages?: boolean;
  wrap?: boolean;
  highlightVariant?: 'outline' | 'background';
  size?: 'sm' | 'md';
};

export function MaterialCategoryPicker<T extends number>({
  className,
  options,
  onClick,
  chosenOption,
  squareImages = false,
  wrap = false,
  highlightVariant = 'outline',
  size = 'md',
}: MaterialCategoryPickerProps<T> & WithClassName) {
  return (
    <Container className={className} wrap={wrap}>
      {options.map(({ id, image, name }) => (
        <MaterialButton
          key={id}
          onClick={() => onClick(id)}
          size={size}
        >
          <Image
            src={image}
            active={id === chosenOption}
            squareImages={squareImages}
            highlightVariant={highlightVariant}
            size={size}
            draggable={false}
          />
          <Text>{name}</Text>
        </MaterialButton>
      ))}
    </Container>
  );
}
