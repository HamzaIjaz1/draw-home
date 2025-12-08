import { DistributiveSafeOmit, WithClassName } from '@draw-house/common/dist/utils';
import { memo } from 'react';
import { ClassNames } from '@emotion/react';
import { useTheme } from '@mui/material';
import { isUndefined, isUndefinedSimple, Union } from '@arthurka/ts-utils';
import { Container, IconButton, Text, WithText } from './styles';
import {
  CeilingIcon,
  FlatRoofIcon,
  FloorIcon,
  GableRoofIcon,
  HipRoofIcon,
  LShapedStairsIcon,
  NoRoofIcon,
  RoofOnlyIcon,
  SlantedRoofIcon,
  SpiralStairsIcon,
  StraightStairsIcon,
  UShapedStairsIcon,
  WraparoundRoofIcon,
} from '../Icons';

const icons = {
  flatRoof: FlatRoofIcon,
  gableRoof: GableRoofIcon,
  hipRoof: HipRoofIcon,
  slantedRoof: SlantedRoofIcon,
  wraparoundRoof: WraparoundRoofIcon,
  noRoof: NoRoofIcon,
  floor: FloorIcon,
  roof: RoofOnlyIcon,
  ceiling: CeilingIcon,
  straightStairs: StraightStairsIcon,
  UShapedStairs: UShapedStairsIcon,
  spiralStairs: SpiralStairsIcon,
  LShapedStairs: LShapedStairsIcon,
};

type IconType = keyof typeof icons;

type IconProps = {
  icon: IconType;
  color?: string;
  size: 'md' | 'lg';
};

const iconSizes: Record<IconProps['size'], number> = {
  md: 36,
  lg: 56,
};

const Icon = memo(({ icon, color, size }: IconProps) => {
  const Icon = icons[icon];
  const s = iconSizes[size];

  return (
    <ClassNames>
      {({ css }) => (
        <Icon
          className={css({ width: s, height: s })}
          color={color}
        />
      )}
    </ClassNames>
  );
});

type Item<T> = Union<
  & {
    icon: IconType;
    variant?: 'default' | 'highlight-on-active';
    size?: IconProps['size'];
    label?: string;
  }
  & (
    | {
      state: 'disabled';
    }
    | {
      id: T;
      state: 'default' | 'active';
    }
  )
>;

type ItemCompProps<T extends string | number> = (
  & DistributiveSafeOmit<Item<T>, 'label'>
  & {
    onClick: (index: T, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }
);

const ItemComp = <T extends string | number>({
  onClick,
  icon,
  state,
  id,
  size = 'md',
  variant = 'default',
}: ItemCompProps<T>) => {
  const theme = useTheme();

  return (
    <IconButton
      variant='text'
      state={state}
      disabled={state === 'disabled'}
      onClick={e => {
        if(!isUndefinedSimple(id)) {
          onClick(id, e);
        }
      }}
    >
      <Icon
        icon={icon}
        size={size}
        {...variant === 'highlight-on-active' && {
          color: state === 'active'
            ? theme.palette.primary.main
            : theme.palette.secondary.main,
        }}
      />
    </IconButton>
  );
};

export type IconPickerRowProps<T> = {
  items: Array<Item<T>>;
  onClick: (index: NoInfer<T>, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function IconPickerRow<T extends string | number>({
  className,
  items,
  onClick,
}: IconPickerRowProps<T> & WithClassName) {
  return (
    <Container
      className={className}
      onClick={e => {
        if(e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
    >
      {
        items.map(({ label, ...rest }) => {
          const key = isUndefinedSimple(rest.id) ? rest.icon : rest.id;

          return (
            isUndefined(label)
              ? <ItemComp key={key} onClick={onClick} {...rest} />
              : (
                <WithText key={key}>
                  <ItemComp onClick={onClick} {...rest} />
                  <Text
                    onClick={e => {
                      if(e.target === e.currentTarget) {
                        e.stopPropagation();
                      }
                    }}
                  >
                    {label}
                  </Text>
                </WithText>
              )
          );
        })
      }
    </Container>
  );
}
