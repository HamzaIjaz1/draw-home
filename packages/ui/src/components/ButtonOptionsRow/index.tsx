import { WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { IconButtonProps } from '../IconButton';
import { Container, IconButton, Label, Options, Text, TextButton } from './styles';

type Option = Union<
  & {
    selected: boolean;
    onClick: () => void;
  }
  & (
    | {
      icon: IconButtonProps['icon'];
      state?: 'default' | 'active';
    }
    | { text: string }
  )
>;

export type ButtonOptionsRowProps = {
  label: string;
  options: Option[];
};

export const ButtonOptionsRow = ({
  className,
  label,
  options,
}: ButtonOptionsRowProps & WithClassName) => (
  <Container className={className}>
    <Label>{label}</Label>

    <Options>
      {options.map(({ icon, text, onClick, state, selected }, i) => (
        isUndefined(icon) ? (
          <TextButton
            key={i}
            selected={selected}
            onClick={onClick}
          >
            <Text>{text}</Text>
          </TextButton>
        ) : (
          <IconButton
            key={i}
            icon={icon}
            size='md'
            onClick={onClick}
            state={state ?? 'default'}
            selected={selected}
            variant='text'
          />
        )
      ))}
    </Options>
  </Container>
);
