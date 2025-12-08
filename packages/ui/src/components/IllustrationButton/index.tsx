import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import {
  ArrowArchingLeftIcon,
  ArrowArchingRightIcon,
  GeneralItemIcon,
  UniqueItemIcon,
} from '../Icons';
import { ArrowContainer, Button, ItemContainer, Text } from './styles';

export type IllustrationButtonProps = {
  state: 'general' | 'unique';
  generalLabel: string;
  uniqueLabel: string;
  onClick: () => void;
};

export const IllustrationButton = ({
  className,
  state,
  generalLabel,
  uniqueLabel,
  onClick,
}: IllustrationButtonProps & WithClassName) => {
  const theme = useTheme();

  const arrows = {
    general: ArrowArchingRightIcon,
    unique: ArrowArchingLeftIcon,
  } satisfies Record<typeof state, unknown>;

  const ArrowIcon = arrows[state];

  const activeColor = theme.palette.primary.main;
  const inactiveColor = theme.palette.action.disabled;

  const colors = {
    general: state === 'general' ? activeColor : inactiveColor,
    unique: state === 'unique' ? activeColor : inactiveColor,
  } satisfies Record<typeof state, unknown>;

  return (
    <Button
      className={className}
      variant='text'
      onClick={onClick}
    >
      <ItemContainer>
        <GeneralItemIcon color={colors.general} />
        <Text>{generalLabel}</Text>
      </ItemContainer>

      <ArrowContainer>
        <ArrowIcon />
      </ArrowContainer>

      <ItemContainer>
        <UniqueItemIcon color={colors.unique} />
        <Text>{uniqueLabel}</Text>
      </ItemContainer>
    </Button>
  );
};
