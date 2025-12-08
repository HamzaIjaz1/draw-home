import { useId } from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import { BaseButton } from '../BaseButton';
import { BackgroundLocationIcon, ForegroundLocationIcon } from '../Icons';
import { Container, Label } from './styles';

const icons = {
  background: BackgroundLocationIcon,
  foreground: ForegroundLocationIcon,
};

const transitions: Record<keyof typeof icons, keyof typeof icons> = {
  background: 'foreground',
  foreground: 'background',
};

export type LocationButtonRowProps = {
  label: string;
  value: keyof typeof icons;
  onChange: (value: keyof typeof icons) => void;
};

export const LocationButtonRow = ({
  className,
  label,
  value,
  onChange,
}: LocationButtonRowProps & WithClassName) => {
  const id = useId();
  const Icon = icons[value];

  return (
    <Container className={className}>
      <Label id={id}>{label}</Label>

      <BaseButton onClick={() => onChange(transitions[value])}>
        <Icon />
      </BaseButton>
    </Container>
  );
};
