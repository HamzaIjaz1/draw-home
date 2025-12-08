import { WithClassName } from '@draw-house/common/dist/utils';
import { useTheme } from '@mui/material';
import { ForwardedRef, forwardRef, MouseEvent, useMemo } from 'react';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { BaseButtonProps } from '../BaseButton';
import {
  AnnotationIcon,
  ArrowBendingLeftIcon,
  ArrowBendingRightIcon,
  BrokenCurvedLineIcon,
  CeilingIcon,
  CurvedLineIcon,
  DownArrowIcon,
  FavouriteFilledIcon,
  FloorIcon,
  GableDormerIcon,
  GroupingIcon,
  HandTappingIcon,
  HexagonIcon,
  HintIcon,
  HipDormerIcon,
  IconProps,
  InfoBookIcon,
  LandscapeIcon,
  LayoutIcon,
  MatchColorsIcon,
  MirroringIcon,
  MultipleStraightLinesIcon,
  NoTransparencyIcon,
  PlayCircledIcon,
  PlusIcon,
  QuestionMarkCircledIcon,
  RailingsLeftIcon,
  RailingsRightIcon,
  RectangleIcon,
  RemoveFloorIcon,
  ReplaceIcon,
  ReplaceModelIcon,
  RoofOnlyIcon,
  RoofsIcon,
  Rotate2Icon,
  Rotate45Icon,
  Rotate90Icon,
  RotateArrowCircleIcon,
  ScaleUpIcon,
  SelectSimilarIcon,
  ShareIcon,
  ShedDormerIcon,
  StarsIcon,
  StraightLineIcon,
  StringerCenterIcon,
  StringerLeftIcon,
  StringerRightIcon,
  TapeMeasureIcon,
  TransparencyIcon,
  TwoArrowsClockwiseIcon,
  WallIcon,
} from '../Icons';
import {
  ArrowRotateLeftIcon,
  ArrowRotateRightIcon,
  BinIcon,
  CenterWallAttachmentIcon,
  CircleAroundDotIcon,
  CloseIcon,
  DoorIcon,
  DuplicateIcon,
  ExpandArrowsIcon,
  EyeClosedIcon,
  EyeIcon,
  FireplaceIcon,
  FloppyDiskIcon,
  GearIcon,
  HamburgerMenuIcon,
  HandPointerIcon,
  HouseIcon,
  Image,
  InsideWallAttachmentIcon,
  LayersIcon,
  LessThenSignIcon,
  OutsideWallAttachmentIcon,
  RoofIcon,
  StyledButton,
  StyledButtonProps,
  TextIcon,
  ToolsIcon,
  UploadIcon,
  WindowIcon,
} from './styles';
import { useOnClickWithLoading } from '../../hooks/useOnClickWithLoading';

const icons = {
  wall: WallIcon,
  pointer: HandPointerIcon,
  text: TextIcon,
  layers: LayersIcon,
  undo: ArrowBendingLeftIcon,
  redo: ArrowBendingRightIcon,
  close: CloseIcon,
  closeNoBackground: (props: IconProps & WithClassName) => <CloseIcon {...props} noBackground />,
  gear: GearIcon,
  house: HouseIcon,
  back: LessThenSignIcon,
  hamburger: HamburgerMenuIcon,
  save: FloppyDiskIcon,
  circleAroundDot: CircleAroundDotIcon,
  tools: ToolsIcon,
  plus: PlusIcon,
  duplicate: DuplicateIcon,
  eye: EyeIcon,
  eyeClosed: EyeClosedIcon,
  bin: BinIcon,
  door: DoorIcon,
  window: WindowIcon,
  fireplace: FireplaceIcon,
  roof: RoofIcon,
  roofOnly: RoofOnlyIcon,
  centerWallAttachment: CenterWallAttachmentIcon,
  outsideWallAttachment: OutsideWallAttachmentIcon,
  insideWallAttachment: InsideWallAttachmentIcon,
  upload: UploadIcon,
  expandArrows: ExpandArrowsIcon,
  straightLine: StraightLineIcon,
  multipleStraightLines: MultipleStraightLinesIcon,
  rectangle: RectangleIcon,
  hexagon: HexagonIcon,
  curvedLine: CurvedLineIcon,
  brokenCurvedLine: BrokenCurvedLineIcon,
  downArrow: DownArrowIcon,
  floor: FloorIcon,
  roofs: RoofsIcon,
  ceiling: CeilingIcon,
  arrowRotateLeft: ArrowRotateLeftIcon,
  arrowRotateRight: ArrowRotateRightIcon,
  layout: LayoutIcon,
  annotation: AnnotationIcon,
  hint: HintIcon,
  transparency: TransparencyIcon,
  noTransparency: NoTransparencyIcon,
  replace: ReplaceIcon,
  rotate: Rotate2Icon,
  removeFloor: RemoveFloorIcon,
  grouping: GroupingIcon,
  matchColors: MatchColorsIcon,
  selectSimilar: SelectSimilarIcon,
  stringerLeft: StringerLeftIcon,
  stringerCenter: StringerCenterIcon,
  stringerRight: StringerRightIcon,
  railingsLeft: RailingsLeftIcon,
  railingsRight: RailingsRightIcon,
  mirroring: MirroringIcon,
  questionMarkCircled: QuestionMarkCircledIcon,
  scaleUp: ScaleUpIcon,
  twoArrowsClockwise: TwoArrowsClockwiseIcon,
  favouriteFilled: FavouriteFilledIcon,
  replaceModel: ReplaceModelIcon,
  stars: StarsIcon,
  tapeMeasure: TapeMeasureIcon,
  rotateArrowCircle: RotateArrowCircleIcon,
  infoBook: InfoBookIcon,
  playCircled: PlayCircledIcon,
  share: ShareIcon,
  landscape: LandscapeIcon,
  handTapping: HandTappingIcon,
  gableDormer: GableDormerIcon,
  hipDormer: HipDormerIcon,
  shedDormer: ShedDormerIcon,
  rotate45: Rotate45Icon,
  rotate90: Rotate90Icon,
};

type InlineIconProps = (
  & Icon
  & {
    state: State;
    muiVariant: NonNullable<BaseButtonProps['variant']>;
  }
);

const InlineIcon = ({
  icon,
  rotate,
  transitionDurationMs,
  iconColors,
  state,
  muiVariant,
}: InlineIconProps) => {
  const theme = useTheme();

  const baseStateToIconColor: Record<State, string> = useMemo(() => {
    const byVariant: Record<typeof muiVariant, typeof baseStateToIconColor> = {
      contained: {
        active: theme.palette.background.paper,
        default: theme.palette.primary.main,
        disabled: theme.palette.background.paper,
      },
      text: {
        active: theme.palette.primary.main,
        default: theme.palette.secondary.main,
        disabled: theme.palette.text.disabled,
      },
      outlined: {
        active: theme.palette.primary.main,
        default: theme.palette.primary.main,
        disabled: theme.palette.text.disabled,
      },
    };

    return byVariant[muiVariant];
  }, [
    muiVariant,
    theme.palette.background.paper,
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.text.disabled,
  ]);

  const stateToIconColor: Record<typeof state, string> = {
    ...baseStateToIconColor,
    ...iconColors,
  };

  const Icon = icons[icon];

  return (
    <Icon
      color={stateToIconColor[state]}
      rotate={rotate}
      transitionDurationMs={transitionDurationMs}
    />
  );
};

export type State = 'default' | 'active' | 'disabled';

type Icon = {
  icon: keyof typeof icons;
  rotate?: number;
  transitionDurationMs?: number;
  iconColors?: Partial<Record<State, string>>;
};

export type IconButtonProps = Union<
  & {
    variant?: 'default' | 'text' | 'outlined';
    borderRadius?: 'default' | 'circle';
    size?: 'xs' | 'xs-mobile' | 'sm' | 'sm-mobile' | 'md' | 'md-mobile';
    state?: State;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    pulseGlow?: 1 | 2;
  }
  & (
    | Icon
    | {
      image: string;
    }
  )
>;

export const IconButton = forwardRef(({
  className,
  icon,
  rotate,
  transitionDurationMs,
  image,
  onClick,
  state: _state,
  variant: userVariant = 'default',
  borderRadius = 'default',
  size = 'md',
  iconColors = {},
  pulseGlow,
}: IconButtonProps & WithClassName, ref: ForwardedRef<HTMLButtonElement>) => {
  const userVariantToMuiVariant: Record<typeof userVariant, NonNullable<BaseButtonProps['variant']>> = {
    default: _state === 'active' ? 'contained' : 'outlined',
    outlined: _state === 'active' ? 'contained' : 'outlined',
    text: 'text',
  };

  const variant = userVariantToMuiVariant[userVariant];

  const defaultState = 'default' satisfies State;
  const { isOnClickLoading, onCLickWithLoading } = useOnClickWithLoading(onClick);

  const state = isUndefined(_state) ? defaultState : _state;

  const baseButtonProps: StyledButtonProps & BaseButtonProps & WithClassName = {
    className,
    variant,
    userVariant,
    borderRadius,
    size,
    state,
    isLoading: isOnClickLoading,
    pulseGlow,
  };

  return (
    <StyledButton
      {...baseButtonProps}
      ref={ref}
      disabled={state === 'disabled'}
      onClick={onCLickWithLoading}
    >
      {!isUndefined(image) && (
        <Image src={image} />
      )}

      {!isUndefined(icon) && (
        <InlineIcon
          icon={icon}
          iconColors={iconColors}
          rotate={rotate}
          transitionDurationMs={transitionDurationMs}
          state={state}
          muiVariant={variant}
        />
      )}
    </StyledButton>
  );
});
