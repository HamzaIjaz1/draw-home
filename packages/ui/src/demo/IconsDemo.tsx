import { css, styled } from '@mui/material';
import { BaseButton } from '../components/BaseButton';
import { AlertIcon, AnnotationIcon, ArrowArchingLeftIcon, ArrowArchingRightIcon, ArrowBendingLeftIcon, ArrowBendingRightIcon, ArrowClockwiseIcon, ArrowRotateLeftIcon, ArrowRotateRightIcon, ArrowToHeartIcon, BackgroundLocationIcon, BidirectionalHorizontalArrowIcon, BidirectionalVerticalArrowIcon, BinIcon, BlankTemplateIcon, BrokenCurvedLineIcon, CameraIcon, CeilingIcon, CeilingWithCornersIcon, CenterWallAttachmentIcon, ChainIcon, CheckMarkIcon, CircleAroundDotIcon, CircumscribedPencilIcon, CloseIcon, CloseIconSmall, CoinIcon, ComingSoonIcon, CompassIcon, CreditCardIcon, CurvedLineIcon, DeleteIcon, DisabledMaterialIcon, DollhouseIcon, DoorIcon, DownArrowIcon, DownloadIcon, DrawHouseIcon, DropFileIcon, DuplicateIcon, EnvelopeIcon, ExpandArrowsIcon, EyeClosedIcon, EyeIcon, EyeOutlinedIcon, FavouriteFilledIcon, FireplaceIcon, FlatRoofIcon, FlipHorizontalIcon, FlipVerticalIcon, FloorHeightHintIcon, FloorIcon, FloorWithCornersIcon, FloppyDiskIcon, ForegroundLocationIcon, GableDormerIcon, GableRoofIcon, GearIcon, GeneralItemIcon, GlbIcon, GroupingIcon, HamburgerMenuIcon, HandPointerIcon, HandTappingIcon, HexagonIcon, HintIcon, HipDormerIcon, HipRoofIcon, HouseIcon, HouseWithChimneyIcon, InfoBookIcon, InformationFilledIcon, InformationIcon, InsideWallAttachmentIcon, JpgIcon, KeyboardAndMouseIcon, LandscapeIcon, LayersIcon, LayoutIcon, LessThenSignIcon, LevelElevationHintIcon, LockIcon, LogOutIcon, LShapedStairsIcon, LShapeTemplateIcon, MastercardIcon, MatchColorsIcon, MirroringIcon, MultipleStraightLinesIcon, MyAssetsIcon, NoRoofIcon, NoTransparencyIcon, OutsideWallAttachmentIcon, PaperPlaneIcon, PenAndWrenchCrossedIcon, PencilIcon, PersonIcon, PersonWalkingIcon, PlayCircledIcon, Plus2Icon, PlusCircledIcon, PlusIcon, PngIcon, ProjectsIcon, QuestionMarkCircledIcon, QuestionMarkIcon, RailingsIcon, RailingsLeftIcon, RailingsRightIcon, RectangleIcon, RectangularTemplateIcon, RemoveFloorIcon, ReplaceIcon, ReplaceModelIcon, ResetIcon, RoofIcon, RoofLegendIcon, RoofOnlyIcon, RoofsIcon, Rotate2Icon, Rotate45Icon, Rotate90Icon, RotateArrowCircleIcon, RotateIcon, SaveCopyIcon, ScaleUpIcon, SearchInputIcon, SelectSimilarIcon, ShareIcon, ShedDormerIcon, SkmIcon, SlantedRoofIcon, SpiralStairsIcon, StairsLegendIcon, StarsIcon, StraightLineIcon, StraightStairsIcon, StringerCenterIcon, StringerLeftIcon, StringerRightIcon, TapeMeasureIcon, TeamIcon, TextIcon, ThreeDotsIcon, ToolsIcon, TransparencyIcon, TShapeTemplateIcon, TwoArrowsClockwiseIcon, UniqueItemIcon, UnlockIcon, UploadIcon, UShapedStairsIcon, VisaIcon, WallIcon, WindowIcon, WraparoundRoofIcon } from '../components/Icons';
import { theme } from '../theme';
import { $Props, $props } from '../utils/$props';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const TextWrap = styled('div', $props())<$Props<{ $contain: boolean }>>(({ $contain }) => css`
  display: flex;
  align-items: center;
  gap: 20px;

  ${$contain === true && css`
    svg {
      width: 24px;
    }
  `}
`);

const Label = styled('span')`
  font-size: 12px;
`;

const Labeled: React.FCWithChildren<{ label: string; contain?: boolean }> = ({ children, label, contain = false }) => (
  <TextWrap $contain={contain}>
    {children}
    <Label>{label}</Label>
  </TextWrap>
);

const color = theme.palette.primary.main;

export const IconsDemo = ({ close }: { close: () => void }) => (
  <Container>
    <BaseButton variant='contained' onClick={close}>Close</BaseButton>

    <Labeled label='Wall'><WallIcon /></Labeled>
    <Labeled label='HandPointer'><HandPointerIcon /></Labeled>
    <Labeled label='Layout'><LayoutIcon /></Labeled>
    <Labeled label='Text'><TextIcon /></Labeled>
    <Labeled label='Layers'><LayersIcon /></Labeled>
    <Labeled label='ArrowBendingLeft'><ArrowBendingLeftIcon /></Labeled>
    <Labeled label='ArrowBendingRight'><ArrowBendingRightIcon /></Labeled>
    <Labeled label='Plus'><PlusIcon color={color} /></Labeled>
    <Labeled label='Plus2'><Plus2Icon color={color} /></Labeled>
    <Labeled label='ArrowToHeart'><ArrowToHeartIcon color={color} /></Labeled>
    <Labeled label='Close'><CloseIcon /></Labeled>
    <Labeled label='CloseIcon'><CloseIconSmall /></Labeled>
    <Labeled label='Gear'><GearIcon /></Labeled>
    <Labeled label='House'><HouseIcon /></Labeled>
    <Labeled label='LessThenSign'><LessThenSignIcon /></Labeled>
    <Labeled label='HamburgerMenu'><HamburgerMenuIcon /></Labeled>
    <Labeled label='FloppyDisk'><FloppyDiskIcon /></Labeled>
    <Labeled label='CircleAroundDot'><CircleAroundDotIcon /></Labeled>
    <Labeled label='Tools'><ToolsIcon /></Labeled>
    <Labeled label='Door'><DoorIcon /></Labeled>
    <Labeled label='Window'><WindowIcon /></Labeled>
    <Labeled label='Roof'><RoofIcon /></Labeled>
    <Labeled label='Roofs'><RoofsIcon /></Labeled>
    <Labeled label='Ceiling'><CeilingIcon /></Labeled>
    <Labeled label='Hint'><HintIcon /></Labeled>
    <Labeled label='NoTransparency'><NoTransparencyIcon /></Labeled>
    <Labeled label='Transparency'><TransparencyIcon /></Labeled>
    <Labeled label='Fireplace'><FireplaceIcon /></Labeled>
    <Labeled label='Duplicate'><DuplicateIcon /></Labeled>
    <Labeled label='Bin'><BinIcon /></Labeled>
    <Labeled label='Pencil'><PencilIcon /></Labeled>
    <Labeled label='Eye'><EyeIcon /></Labeled>
    <Labeled label='EyeClosed'><EyeClosedIcon /></Labeled>
    <Labeled label='Lock'><LockIcon /></Labeled>
    <Labeled label='Rotate'><RotateIcon /></Labeled>
    <Labeled label='FlipHorizontal'><FlipHorizontalIcon /></Labeled>
    <Labeled label='FlipVertical'><FlipVerticalIcon /></Labeled>
    <Labeled label='CenterWallAttachment'><CenterWallAttachmentIcon /></Labeled>
    <Labeled label='OutsideWallAttachment'><OutsideWallAttachmentIcon /></Labeled>
    <Labeled label='InsideWallAttachment'><InsideWallAttachmentIcon /></Labeled>
    <Labeled label='DisabledMaterial'><DisabledMaterialIcon /></Labeled>
    <Labeled label='BlankTemplate'><BlankTemplateIcon /></Labeled>
    <Labeled label='RectangularTemplate'><RectangularTemplateIcon /></Labeled>
    <Labeled label='TShapeTemplate'><TShapeTemplateIcon /></Labeled>
    <Labeled label='LShapeTemplate'><LShapeTemplateIcon /></Labeled>
    <Labeled label='DownArrow'><DownArrowIcon /></Labeled>
    <Labeled label='RoofLegend'><RoofLegendIcon /></Labeled>
    <Labeled label='StairsLegend'><StairsLegendIcon /></Labeled>
    <Labeled label='DrawHouse'><DrawHouseIcon /></Labeled>
    <Labeled label='FlatRoof'><FlatRoofIcon /></Labeled>
    <Labeled label='GableRoof'><GableRoofIcon /></Labeled>
    <Labeled label='WraparoundRoof'><WraparoundRoofIcon /></Labeled>
    <Labeled label='HipRoof'><HipRoofIcon /></Labeled>
    <Labeled label='SlantedRoof'><SlantedRoofIcon /></Labeled>
    <Labeled label='NoRoof'><NoRoofIcon /></Labeled>
    <Labeled label='StraightStairs'><StraightStairsIcon /></Labeled>
    <Labeled label='UShapedStairs'><UShapedStairsIcon /></Labeled>
    <Labeled label='SpiralStairs'><SpiralStairsIcon /></Labeled>
    <Labeled label='LShapedStairs'><LShapedStairsIcon /></Labeled>
    <Labeled label='ArrowRotateLeft'><ArrowRotateLeftIcon /></Labeled>
    <Labeled label='ArrowRotateRight'><ArrowRotateRightIcon /></Labeled>
    <Labeled label='Person'><PersonIcon /></Labeled>
    <Labeled label='LogOut'><LogOutIcon /></Labeled>
    <Labeled label='Projects'><ProjectsIcon /></Labeled>
    <Labeled label='Team'><TeamIcon /></Labeled>
    <Labeled label='Coin'><CoinIcon /></Labeled>
    <Labeled label='QuestionMark'><QuestionMarkIcon /></Labeled>
    <Labeled label='Information'><InformationIcon /></Labeled>
    <Labeled label='InformationFilled'><InformationFilledIcon /></Labeled>
    <Labeled label='Envelope'><EnvelopeIcon /></Labeled>
    <Labeled label='Delete'><DeleteIcon /></Labeled>
    <Labeled label='ThreeDots'><ThreeDotsIcon /></Labeled>
    <Labeled label='PaperPlane'><PaperPlaneIcon color={color} /></Labeled>
    <Labeled label='ComingSoon'><ComingSoonIcon /></Labeled>
    <Labeled label='Upload'><UploadIcon color={color} /></Labeled>
    <Labeled label='SaveCopy'><SaveCopyIcon /></Labeled>
    <Labeled label='ExpandArrows'><ExpandArrowsIcon /></Labeled>
    <Labeled label='PlusCircled'><PlusCircledIcon /></Labeled>
    <Labeled label='LevelElevationHint'><LevelElevationHintIcon /></Labeled>
    <Labeled label='FloorHeightHint'><FloorHeightHintIcon /></Labeled>
    <Labeled label='StraightLine'><StraightLineIcon /></Labeled>
    <Labeled label='MultipleStraightLines'><MultipleStraightLinesIcon /></Labeled>
    <Labeled label='Rectangle'><RectangleIcon /></Labeled>
    <Labeled label='Hexagon'><HexagonIcon /></Labeled>
    <Labeled label='CurvedLine'><CurvedLineIcon /></Labeled>
    <Labeled label='BrokenCurvedLine'><BrokenCurvedLineIcon /></Labeled>
    <Labeled label='Floor'><FloorIcon /></Labeled>
    <Labeled label='Compass'><CompassIcon /></Labeled>
    <Labeled label='Annotation'><AnnotationIcon /></Labeled>
    <Labeled label='RoofOnly'><RoofOnlyIcon /></Labeled>
    <Labeled label='FloorWithCorners'><FloorWithCornersIcon /></Labeled>
    <Labeled label='CeilingWithCorners'><CeilingWithCornersIcon /></Labeled>
    <Labeled label='SearchInput'><SearchInputIcon /></Labeled>
    <Labeled label='DropFile'><DropFileIcon /></Labeled>
    <Labeled label='Glb'><GlbIcon /></Labeled>
    <Labeled label='Jpg'><JpgIcon /></Labeled>
    <Labeled label='Png'><PngIcon /></Labeled>
    <Labeled label='Skm'><SkmIcon /></Labeled>
    <Labeled label='Replace'><ReplaceIcon /></Labeled>
    <Labeled label='Railings'><RailingsIcon /></Labeled>
    <Labeled label='StringerLeft'><StringerLeftIcon /></Labeled>
    <Labeled label='StringerCenter'><StringerCenterIcon /></Labeled>
    <Labeled label='StringerRight'><StringerRightIcon /></Labeled>
    <Labeled label='RailingsLeft'><RailingsLeftIcon /></Labeled>
    <Labeled label='RailingsRight'><RailingsRightIcon /></Labeled>
    <Labeled label='GeneralItem'><GeneralItemIcon /></Labeled>
    <Labeled label='UniqueItem'><UniqueItemIcon /></Labeled>
    <Labeled label='BackgroundLocation'><BackgroundLocationIcon /></Labeled>
    <Labeled label='ForegroundLocation'><ForegroundLocationIcon /></Labeled>
    <Labeled label='ArrowArchingRight'><ArrowArchingRightIcon /></Labeled>
    <Labeled label='ArrowArchingLeft'><ArrowArchingLeftIcon /></Labeled>
    <Labeled label='SelectSimilar'><SelectSimilarIcon /></Labeled>
    <Labeled label='MatchColors'><MatchColorsIcon /></Labeled>
    <Labeled label='Grouping'><GroupingIcon /></Labeled>
    <Labeled label='RemoveFloor'><RemoveFloorIcon /></Labeled>
    <Labeled label='Rotate2'><Rotate2Icon /></Labeled>
    <Labeled label='EyeOutlined'><EyeOutlinedIcon /></Labeled>
    <Labeled label='PenAndWrenchCrossed'><PenAndWrenchCrossedIcon /></Labeled>
    <Labeled label='Unlock'><UnlockIcon /></Labeled>
    <Labeled label='Reset'><ResetIcon /></Labeled>
    <Labeled label='PersonWalking'><PersonWalkingIcon /></Labeled>
    <Labeled label='Mirroring'><MirroringIcon /></Labeled>
    <Labeled label='QuestionMarkCircled'><QuestionMarkCircledIcon /></Labeled>
    <Labeled label='ScaleUp'><ScaleUpIcon /></Labeled>
    <Labeled label='BidirectionalHorizontalArrow'><BidirectionalHorizontalArrowIcon /></Labeled>
    <Labeled label='BidirectionalVerticalArrow'><BidirectionalVerticalArrowIcon /></Labeled>
    <Labeled label='ArrowClockwise'><ArrowClockwiseIcon /></Labeled>
    <Labeled label='TwoArrowsClockwise'><TwoArrowsClockwiseIcon /></Labeled>
    <Labeled label='Download'><DownloadIcon /></Labeled>
    <Labeled label='Stars'><StarsIcon /></Labeled>
    <Labeled label='FavouriteFilled'><FavouriteFilledIcon /></Labeled>
    <Labeled label='ReplaceModel'><ReplaceModelIcon /></Labeled>
    <Labeled label='TapeMeasure'><TapeMeasureIcon /></Labeled>
    <Labeled label='RotateArrowCircle'><RotateArrowCircleIcon /></Labeled>
    <Labeled label='PlayCircled'><PlayCircledIcon /></Labeled>
    <Labeled label='InfoBook'><InfoBookIcon /></Labeled>
    <Labeled label='Chain'><ChainIcon /></Labeled>
    <Labeled label='Share'><ShareIcon /></Labeled>
    <Labeled label='Landscape'><LandscapeIcon /></Labeled>
    <Labeled label='MyAssets'><MyAssetsIcon /></Labeled>
    <Labeled label='HandTapping'><HandTappingIcon /></Labeled>
    <Labeled label='CheckMark'><CheckMarkIcon /></Labeled>
    <Labeled label='Alert'><AlertIcon /></Labeled>
    <Labeled label='KeyboardAndMouse'><KeyboardAndMouseIcon /></Labeled>
    <Labeled label='HouseWithChimney'><HouseWithChimneyIcon /></Labeled>
    <Labeled label='Camera'><CameraIcon /></Labeled>
    <Labeled label='CircumscribedPencil'><CircumscribedPencilIcon /></Labeled>
    <Labeled label='Dollhouse'><DollhouseIcon /></Labeled>
    <Labeled label='GableDormer'><GableDormerIcon /></Labeled>
    <Labeled label='HipDormer'><HipDormerIcon /></Labeled>
    <Labeled label='ShedDormer'><ShedDormerIcon /></Labeled>
    <Labeled label='Rotate90'><Rotate90Icon /></Labeled>
    <Labeled label='Rotate45'><Rotate45Icon /></Labeled>
    <Labeled label='Mastercard' contain><MastercardIcon /></Labeled>
    <Labeled label='Visa' contain><VisaIcon /></Labeled>
    <Labeled label='CreditCard' contain><CreditCardIcon /></Labeled>
  </Container>
);
