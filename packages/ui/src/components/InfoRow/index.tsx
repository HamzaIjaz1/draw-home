import { WithClassName } from '@draw-house/common/dist/utils';
import { BaseRow } from '../BaseRow';
import { Title, Value } from './styles';

export type InfoRowProps = {
  title: string;
  value: string;
};

export const InfoRow = ({
  className,
  title,
  value,
}: InfoRowProps & WithClassName) => (
  <BaseRow className={className}>
    <Title>{title}</Title>
    <Value>{value}</Value>
  </BaseRow>
);
