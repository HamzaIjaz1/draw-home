import { WithClassName } from '@draw-house/common/dist/utils';
import { Container, Text } from './styles';

export type IllustrationButtonRowProps = {
  beforeText: React.ReactNode;
  afterText: React.ReactNode;
  text: string;
};

export const IllustrationButtonRow = ({
  className,
  beforeText,
  afterText,
  text,
}: IllustrationButtonRowProps & WithClassName) => (
  <Container className={className}>
    {beforeText}
    <Text>{text}</Text>
    {afterText}
  </Container>
);
