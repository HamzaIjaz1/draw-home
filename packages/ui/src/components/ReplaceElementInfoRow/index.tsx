import { WithClassName } from '@draw-house/common/dist/utils';
import { Container, HighlightedText, Image, Text } from './styles';

export type ReplaceElementInfoRowProps = {
  img: string;
  text: string;
  highlightedText: string;
};

export const ReplaceElementInfoRow = ({
  className,
  img,
  text,
  highlightedText,
}: ReplaceElementInfoRowProps & WithClassName) => (
  <Container className={className}>
    <Image src={img} />
    <Text>{text}</Text>
    <HighlightedText>{highlightedText}</HighlightedText>
  </Container>
);
