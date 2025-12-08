import { WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined } from '@arthurka/ts-utils';
import { Container, Text, TextHighlighted } from './styles';

export type DialogDescriptionProps = {
  text: string;
  textHighlighted?: string;
};

export const DialogDescription = ({
  className,
  text,
  textHighlighted,
}: DialogDescriptionProps & WithClassName) => (
  <Container className={className}>
    <Text>
      {text}
    </Text>
    {!isUndefined(textHighlighted) && (
      <TextHighlighted>
        {' '}
        {textHighlighted}
      </TextHighlighted>
    )}
  </Container>
);
