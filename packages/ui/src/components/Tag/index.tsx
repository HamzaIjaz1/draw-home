import { WithClassName } from '@draw-house/common/dist/utils';
import { MouseEvent } from 'react';
import { Container, Text } from './styles';

export type TagProps = {
  lines: string[];
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
};

export const Tag = ({
  className,
  lines,
  onClick,
}: TagProps & WithClassName) => (
  <Container
    className={className}
    onClick={onClick}
  >
    {lines.map((line, i) => (
      <Text key={i}>{line}</Text>
    ))}
  </Container>
);
