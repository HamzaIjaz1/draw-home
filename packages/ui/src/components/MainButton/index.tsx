import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { useMemo } from 'react';
import {
  BinIcon,
  ChainIcon,
  EyeOutlinedIcon,
  PlusCircledIcon,
  ResetIcon,
  SaveCopyIcon,
} from '../Icons';
import {
  Mode,
  PlusIcon,
  StyledButton,
  Text,
} from './styles';
import { useOnClickWithLoading } from '../../hooks/useOnClickWithLoading';

const icons = {
  plus: PlusIcon,
  plusCircled: PlusCircledIcon,
  bin: BinIcon,
  saveCopy: SaveCopyIcon,
  eyeOutlined: EyeOutlinedIcon,
  reset: ResetIcon,
  chain: ChainIcon,
};

type State = 'default' | 'disabled';

export type MainButtonProps = Union<
  & {
    onClick: () => void | Promise<void>;
    state?: State;
    height?: 'md' | 'lg';
    iconColors?: Partial<Record<State, string>>;
    textColors?: Partial<Record<State, string>>;
    backgroundColors?: Partial<Record<State, string>>;
    padding?: 'sm' | 'md' | 'row 1/4';
    rounded?: 'sm' | 'md';
  }
  & (
    | {
      variant?: 'contained';
      shadowless?: boolean;
    }
    | { variant: 'text' }
  )
  & (
    | {
      icon: keyof typeof icons;
      text?: string;
    }
    | {
      icon?: keyof typeof icons;
      text: string;
      width?: 'xl' | 'lg' | 'md' | 'fit-content' | 'fill';
    }
  )
>;

export const MainButton = ({
  className,
  icon,
  onClick,
  state = 'default',
  text,
  width,
  height = 'lg',
  shadowless = false,
  variant = 'contained',
  iconColors = {},
  textColors = {},
  backgroundColors = {},
  padding = 'md',
  rounded = 'sm',
}: MainButtonProps & WithClassName) => {
  const theme = useTheme();

  const mode: Mode = (
    isUndefined(icon)
      ? 'text'
      : isUndefined(text)
        ? 'icon'
        : 'icon-text'
  );

  const stateToColor: Record<typeof state, string> = useMemo(() => {
    const byVariant: Record<typeof variant, typeof stateToColor> = {
      contained: {
        default: theme.palette.background.paper,
        disabled: theme.palette.background.paper,
      },
      text: {
        default: theme.palette.secondary.main,
        disabled: theme.palette.text.disabled,
      },
    };

    return byVariant[variant];
  }, [
    variant,
    theme.palette.background.paper,
    theme.palette.secondary.main,
    theme.palette.text.disabled,
  ]);

  const customIconColor = iconColors[state];

  const IconJSX = useMemo(() => {
    if(isUndefined(icon)) {
      return null;
    }

    const Icon = icons[icon];
    const color = !isUndefined(customIconColor) ? customIconColor : stateToColor[state];

    return <Icon color={color} />;
  }, [customIconColor, icon, state, stateToColor]);

  const { isOnClickLoading, onCLickWithLoading } = useOnClickWithLoading(onClick);

  return (
    <StyledButton
      className={className}
      variant={variant}
      disabled={state === 'disabled'}
      $isLoading={isOnClickLoading}
      onClick={onCLickWithLoading}
      $mode={mode}
      $textWidth={width}
      $height={height}
      $shadowless={shadowless}
      $padding={padding}
      $rounded={rounded}
      $backgroundColor={backgroundColors[state]}
    >
      {IconJSX}
      {!!text && (
        <Text style={{ color: textColors[state] ?? stateToColor[state] }}>
          {text}
        </Text>
      )}
    </StyledButton>
  );
};
