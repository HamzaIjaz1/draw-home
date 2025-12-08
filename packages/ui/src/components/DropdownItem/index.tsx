import { letIn, WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { MyAssetsIcon } from '../Icons';
import { Image, MenuItem, Text } from './styles';

const icons = {
  myAssets: MyAssetsIcon,
};

export type DropdownItemProps = Union<
  & {
    label: string;
    state?: 'default' | 'active';
    onClick: () => void;
  }
  & (
    | { icon: keyof typeof icons }
    | { image: string }
  )
>;

export const DropdownItem = ({
  className,
  label,
  image,
  icon,
  state = 'default',
  onClick,
}: DropdownItemProps & WithClassName) => (
  <MenuItem
    className={className}
    onClick={onClick}
    selected={state === 'active'}
    tabIndex={0}
  >
    <Text>{label}</Text>

    {!isUndefined(image) && (
      <Image src={image} />
    )}

    {!isUndefined(icon) && letIn(icons[icon], Icon => (
      <div>
        <Icon />
      </div>
    ))}
  </MenuItem>
);
