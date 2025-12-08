import { WithClassName } from '@draw-house/common/dist/utils';
import { Container, Text } from './styles';

export type MeasurementProps = {
  text: string;
};

export const Measurement = ({
  className,
  text,
}: MeasurementProps & WithClassName) => (
  <Container className={className}>
    <Text>{text}</Text>
  </Container>
);
