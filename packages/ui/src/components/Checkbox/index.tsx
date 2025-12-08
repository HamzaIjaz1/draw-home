import { WithClassName } from '@draw-house/common/dist/utils';
import { CheckedIcon, Icon, Label, StyledCheckbox } from './styles';

export { cssVars as CheckboxCssVars } from './styles';

export type CheckboxProps = {
  text: string;
  checked: boolean;
  onClick?: () => void;
};

const iconJSX = <Icon />;
const checkedIconJSX = <CheckedIcon />;

export const Checkbox = ({
  className,
  text,
  checked,
  onClick,
}: CheckboxProps & WithClassName) => (
  <Label className={className}>
    <StyledCheckbox
      checked={checked}
      onChange={onClick}
      icon={iconJSX}
      checkedIcon={checkedIconJSX}
    />

    {text}
  </Label>
);
