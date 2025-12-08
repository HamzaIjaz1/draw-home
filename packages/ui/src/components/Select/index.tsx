import { WithClassName } from '@draw-house/common/dist/utils';
import { ArrowIcon, Container, DropdownSelect, Option } from './styles';

export type SelectProps<T extends string | number> = {
  id?: string;
  value: '' | NoInfer<T>;
  options: ReadonlyArray<{ label: string; value: T }>;
  onChange: (v: NoInfer<T>) => void;
};

export function Select<T extends string | number>({
  className,
  id,
  value,
  options,
  onChange,
}: SelectProps<T> & WithClassName) {
  return (
    <Container className={className}>
      <DropdownSelect
        className={className}
        id={id}
        value={value}
        onChange={e => onChange(e.target.value as T)}
      >
        {options.map(({ label, value }) => (
          <Option key={value} value={value}>{label}</Option>
        ))}
      </DropdownSelect>

      <ArrowIcon />
    </Container>
  );
}
