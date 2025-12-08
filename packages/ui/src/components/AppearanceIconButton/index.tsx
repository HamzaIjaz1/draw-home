import { useMemo } from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { ArrowToHeartIcon, CloseIconSmall, ColorPickerIcon, DownloadIcon, Plus2Icon, RecentIcon, StarsIcon } from '../Icons';
import { IconButton } from './styles';

const icons = {
  download: DownloadIcon,
  stars: StarsIcon,
  plus: Plus2Icon,
  arrowToHeart: ArrowToHeartIcon,
  recent: RecentIcon,
  colorPicker: ColorPickerIcon,
  close: CloseIconSmall,
} satisfies Record<string, React.FC>;

type State = 'default' | 'disabled';

export type AppearanceIconButtonProps = {
  icon: keyof typeof icons;
  onClick: () => void;
  state?: State;
  isColorPicker?: boolean;
};

export const AppearanceIconButton = ({
  className,
  icon,
  onClick,
  state = 'default',
  isColorPicker = false,
}: AppearanceIconButtonProps & WithClassName) => {
  const theme = useTheme();
  const Icon = icons[icon];

  const iconColor = useMemo(() => {
    const colors: Record<State, string> = {
      default: theme.palette.primary.main,
      disabled: theme.palette.text.disabled,
    };

    return colors[state];
  }, [state, theme.palette.primary.main, theme.palette.text.disabled]);

  return (
    <IconButton
      className={className}
      onClick={onClick}
      disabled={state === 'disabled'}
      style={isColorPicker === true ? { height: '24px', width: '24px', padding: '0px 2px' } : {}}
    >
      <Icon color={iconColor} />
    </IconButton>
  );
};
