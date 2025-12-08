export type CommonInputProps = {
  value: string;
  onChange: (v: string) => void;
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
  adornment?: string;
  name?: string;
  id: string;
  disabled?: boolean;
};

export type InputVariant = 'dark' | 'light';
