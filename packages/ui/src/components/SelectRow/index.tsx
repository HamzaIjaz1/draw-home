import { useId } from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import { Select } from '../Select';
import { Container, InputLabel } from './styles';

export type SelectRowProps<T extends string | number> = {
  label: string;
  value: '' | NoInfer<T>;
  options: Array<{ label: string; value: T }>;
  onChange: (v: NoInfer<T>) => void;
};

export const SelectRow = <T extends string | number>({
  className,
  label,
  value,
  options,
  onChange,
}: SelectRowProps<T> & WithClassName) => {
  const labelId = useId();

  return (
    <Container className={className}>
      <InputLabel htmlFor={labelId}>{label}</InputLabel>
      <Select
        id={labelId}
        value={value}
        options={options}
        onChange={onChange}
      />
    </Container>
  );
};
