import { WithClassName } from '@draw-house/common/dist/utils';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { useTheme } from '@mui/material';
import { ClassNames } from '@emotion/react';
import { setCssVarInline } from '../../utils/styles';
import {
  DownArrowIcon,
  EyeIcon,
  HintIcon,
  RoofIcon,
} from '../Icons';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  cssVars,
  IconButton,
  iconCss,
  Image,
  Text,
} from './styles';

const icons = {
  roof: RoofIcon,
  hint: HintIcon,
  eye: EyeIcon,
};

const EmptyComponent = () => null;

const Icon = ({ icon, active }: { icon?: keyof typeof icons; active?: boolean }) => {
  const Icon = isUndefined(icon) ? EmptyComponent : icons[icon];
  const theme = useTheme();

  const color = (
    isUndefined(active)
      ? undefined
      : active === true ? theme.palette.primary.main : theme.palette.text.disabled
  );

  return (
    <ClassNames>
      {({ css }) => (
        <Icon className={css(iconCss)} color={color} />
      )}
    </ClassNames>
  );
};

export type Controls = (
  | {
    defaultExpanded?: boolean;
  }
  | {
    expanded: boolean;
    onChange: (expanded: boolean) => void;
  }
);

type IconOption = (
  | {}
  | {
    icon: keyof typeof icons;
    iconButton?: {
      onClick: () => void;
      state: 'active' | 'default';
    };
  }
);

type ImageOption = {
  image: string;
};

type IconOrImage = ImageOption | IconOption;

export type MenuSectionProps = Union<(
  & {
    title: string;
    titleVariant?: 'primary-600' | 'primary-500' | 'primary-400' | 'pale';
    titleSize?: string;
    divider?: 'summary' | 'content';
    paddingBottom?: `${number}px`;
  }
  & IconOrImage
  & (
    | {
      type: 'buttonlike';
      onClick: () => void;
      showArrowIcon?: boolean;
    }
    | {
      type: 'static';
      children?: React.ReactNode;
    }
    | (
      & {
        type: 'collapsible';
        children: React.ReactNode;
      }
      & Controls
    )
  )
)>;

export const MenuSection = ({
  className,
  title,
  children,
  type,
  expanded,
  defaultExpanded,
  onChange,
  onClick,
  iconButton,
  icon,
  image,
  paddingBottom,
  titleSize,
  titleVariant = 'primary-600',
  divider = 'summary',
  showArrowIcon = false,
}: MenuSectionProps & WithClassName) => {
  const theme = useTheme();

  const arrowColor: Record<typeof titleVariant, string> = {
    'primary-600': theme.palette.text.primary,
    'primary-500': theme.palette.text.primary,
    'primary-400': theme.palette.text.primary,
    pale: theme.palette.text.disabled,
  };

  const _expanded = {
    buttonlike: false,
    collapsible: expanded,
    static: true,
  } satisfies Record<typeof type, boolean | undefined>;

  const _expandIcon = {
    buttonlike: (
      showArrowIcon === true
        ? <DownArrowIcon color={arrowColor[titleVariant]} rotate={-90} />
        : undefined
    ),
    collapsible: <DownArrowIcon color={arrowColor[titleVariant]} />,
    static: undefined,
  } satisfies Record<typeof type, JSX.Element | undefined>;

  const _tabIndex = {
    buttonlike: 0,
    collapsible: 0,
    static: -1,
  } satisfies Record<typeof type, number>;

  return (
    <Accordion
      className={className}
      style={{
        ...!isUndefined(paddingBottom) && setCssVarInline(cssVars.rootPaddingBottom, paddingBottom),
      }}
      elevation={0}
      disableGutters
      defaultExpanded={defaultExpanded}
      expanded={_expanded[type]}
      onChange={(_, expanded) => onChange?.(expanded)}
      $divider={divider === 'content'}
    >
      <AccordionSummary
        $type={type}
        $divider={divider === 'summary'}
        $withIconButton={!isUndefined(iconButton)}
        expandIcon={_expandIcon[type]}
        tabIndex={_tabIndex[type]}
        onClick={onClick}
      >
        {!isUndefined(image) && (
          <Image src={image} width={24} height={24} />
        )}

        {!isUndefined(icon) && (
          isUndefined(iconButton)
            ? <Icon icon={icon} />
            : (
              <IconButton
                icon={icon}
                state={iconButton.state}
                size='xs'
                variant='text'
                iconColors={{ default: theme.palette.text.disabled }}
                onClick={e => {
                  e.stopPropagation();
                  iconButton.onClick();
                }}
              />
            )
        )}
        <Text
          $titleVariant={titleVariant}
          $titleSize={titleSize}
        >
          {title}
        </Text>
      </AccordionSummary>

      {!isUndefined(children) && (
        <AccordionDetails>
          {children}
        </AccordionDetails>
      )}
    </Accordion>
  );
};
