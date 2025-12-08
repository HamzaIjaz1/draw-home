import { WithClassName } from '@draw-house/common/dist/utils';
import {
  Container,
  Image,
  Material,
  Text,
} from './styles';

export type MaterialPickerProps<T extends string | number = string | number> = {
  shape: 'round' | 'square';
  onClick: (id: NoInfer<T>) => void;
  chosenOption?: NoInfer<T>;
  options: Array<{
    id: T;
    name: string;
    image: string;
    noBorder?: boolean;
    textColor?: string;
  }>;
};

export function MaterialPicker<T extends string | number>({
  className,
  options,
  onClick,
  chosenOption,
  shape,
}: MaterialPickerProps<T> & WithClassName) {
  return (
    <Container className={className}>
      {options.map(({ id, image, name, noBorder = false, textColor }) => (
        <Material key={id} onClick={() => onClick(id)}>
          <Image
            src={image}
            $active={id === chosenOption}
            $shape={shape}
            $showBorder={noBorder === false}
            draggable={false}
          />
          <Text style={{ color: textColor }}>{name}</Text>
        </Material>
      ))}
    </Container>
  );
}
