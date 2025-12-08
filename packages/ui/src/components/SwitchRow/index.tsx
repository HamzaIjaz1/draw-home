import { WithClassName } from '@draw-house/common/dist/utils';
import { BaseRow } from '../BaseRow';
import { Switch } from '../Switch';
import { Title } from './styles';

export type SwitchRowProps = {
  title: string;
  checked: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export const SwitchRow = ({
  className,
  title,
  checked,
  disabled = false,
  onClick,
}: SwitchRowProps & WithClassName) => (
  <BaseRow className={className}>
    <Title disabled={disabled}>{title}</Title>
    <Switch
      checked={checked}
      disabled={disabled}
      onClick={onClick}
    />
  </BaseRow>
);
