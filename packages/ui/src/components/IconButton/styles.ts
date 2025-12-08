import { alpha, css, keyframes, styled, Theme } from '@mui/material';
import { buttonClasses } from '@mui/material/Button';
import { isUndefined } from '@arthurka/ts-utils';
import { BaseButton } from '../BaseButton';
import {
  ArrowRotateLeftIcon as BaseArrowRotateLeftIcon,
  ArrowRotateRightIcon as BaseArrowRotateRightIcon,
  BinIcon as BaseBinIcon,
  CenterWallAttachmentIcon as BaseCenterWallAttachmentIcon,
  CircleAroundDotIcon as BaseCircleAroundDotIcon,
  CloseIcon as BaseCloseIcon,
  DoorIcon as BaseDoorIcon,
  DuplicateIcon as BaseDuplicateIcon,
  ExpandArrowsIcon as BaseExpandArrowsIcon,
  EyeClosedIcon as BaseEyeClosedIcon,
  EyeIcon as BaseEyeIcon,
  FireplaceIcon as BaseFireplaceIcon,
  FloppyDiskIcon as BaseFloppyDiskIcon,
  GearIcon as BaseGearIcon,
  HamburgerMenuIcon as BaseHamburgerMenuIcon,
  HandPointerIcon as BaseHandPointerIcon,
  HouseIcon as BaseHouseIcon,
  InsideWallAttachmentIcon as BaseInsideWallAttachmentIcon,
  LayersIcon as BaseLayersIcon,
  LessThenSignIcon as BaseLessThenSignIcon,
  OutsideWallAttachmentIcon as BaseOutsideWallAttachmentIcon,
  RoofIcon as BaseRoofIcon,
  TextIcon as BaseTextIcon,
  ToolsIcon as BaseToolsIcon,
  UploadIcon as BaseUploadIcon,
  WindowIcon as BaseWindowIcon,
} from '../Icons';
import { createStyledOptions } from '../../utils/createStyledOptions';
import type { IconButtonProps, State } from '.';
import { makeLoaderStyles } from '../../utils/makeLoaderStyles';
import { theme } from '../../theme';

export type StyledButtonProps = {
  borderRadius: NonNullable<IconButtonProps['borderRadius']>;
  size: NonNullable<IconButtonProps['size']>;
  state: State;
  userVariant: NonNullable<IconButtonProps['variant']>;
  isLoading: boolean;
  pulseGlow: IconButtonProps['pulseGlow'];
};

const StyledButtonOptions = createStyledOptions<StyledButtonProps>({
  borderRadius: true,
  size: true,
  state: true,
  userVariant: true,
  isLoading: true,
  pulseGlow: true,
});

export const sizeMdDesktop = 52;

type SizeStyles = {
  [K in StyledButtonProps['size']]: (t: Theme) => ReturnType<typeof css>;
};
const sizeStyles: SizeStyles = {
  xs: theme => css`
    width: 28px;
    height: 28px;
    padding: 2px;

    ${theme.breakpoints.up('md')} {
      width: 32px;
      height: 32px;
    }
  `,
  'xs-mobile': () => css`
    width: 28px;
    height: 28px;
    padding: 2px;
  `,
  sm: theme => css`
    width: 32px;
    height: 32px;
    padding: 4px;

    ${theme.breakpoints.up('md')} {
      width: 40px;
      height: 40px;
    }
  `,
  'sm-mobile': () => css`
    width: 32px;
    height: 32px;
    padding: 4px;
  `,
  md: theme => css`
    width: 44px;
    height: 44px;
    padding: 6px 8px;

    ${theme.breakpoints.up('md')} {
      width: ${sizeMdDesktop}px;
      height: ${sizeMdDesktop}px;
    }
  `,
  'md-mobile': () => css`
    width: 44px;
    height: 44px;
    padding: 6px 8px;
  `,
};

const borderRadiusStyles: Record<StyledButtonProps['borderRadius'], ReturnType<typeof css>> = {
  default: css`
    border-radius: 10px;
  `,
  circle: css`
    border-radius: 50%;
  `,
};

const pulseGlowKeyframes = {
  1: keyframes`
  0%, 100% {
    box-shadow: 0px 0px 4px 1px ${alpha(theme.palette.primary.main, 0.6)};
  }
  50% {
    box-shadow: 0px 0px 10px 4px ${theme.palette.primary.main};
  }
`,
  2: keyframes`
  0%, 100% {
    box-shadow: 0px 0px 4px 1px ${alpha(theme.palette.primary.main, 0.6)};
  }
  50% {
    box-shadow: 0px 0px 10px 6px ${theme.palette.primary.main};
  }
`,
};

export const StyledButton = styled(BaseButton, StyledButtonOptions)<StyledButtonProps>(({
  theme,
  borderRadius,
  size,
  userVariant,
  state,
  isLoading,
  pulseGlow,
}) => css`
  ${sizeStyles[size](theme)}
  ${borderRadiusStyles[borderRadius]}
  flex-shrink: 0;

  ${makeLoaderStyles('::before', isLoading, theme.palette.primary.main)}

  ${(() => {
    switch(true) {
      case (userVariant === 'default' || userVariant === 'outlined') && state === 'active': return css`
        box-shadow: 2px 2px 10px 0px #0003;
        :hover {
          box-shadow: 4px 4px 12px 0px #0003;
        }
      `;
      case userVariant === 'default' && state !== 'active': return css`
        border: none;
        background-color: ${theme.palette.background.paper};
        box-shadow: 2px 2px 10px 0px #0003;
        :hover {
          border: none;
          background-color: ${theme.palette.background.paper};
          box-shadow: 4px 4px 12px 0px #0003;
        }
        &.${buttonClasses.disabled} {
          border: none;
        }
      `;
      case userVariant === 'outlined' && state !== 'active': return css`
        background-color: ${theme.palette.background.paper};
        box-shadow: 2px 2px 10px 0px #0003;
        border-width: 2px;
        :hover {
          background-color: ${theme.palette.background.paper};
          box-shadow: 4px 4px 12px 0px #0003;
          border-width: 2px;
        }
      `;
      case userVariant === 'text': return css`
        background: none;
        box-shadow: none;
      `;
      default: {
        return '';
      }
    }
  })()}

  ${!isUndefined(pulseGlow) && css`
    animation: ${pulseGlowKeyframes[pulseGlow]} 3s infinite ease-in-out;
  `}
`);

const commonIconSize = css`
  width: 24px;
  height: 24px;
`;

export const HandPointerIcon = styled(BaseHandPointerIcon)`
  width: 22px;
  height: 22px;
`;

export const TextIcon = styled(BaseTextIcon)`
  width: 22px;
  height: 22px;
`;

export const LayersIcon = styled(BaseLayersIcon)`
  ${commonIconSize}
`;

export const CloseIcon = styled(BaseCloseIcon)`
  ${commonIconSize}
`;

export const GearIcon = styled(BaseGearIcon)`
  ${commonIconSize}
`;

export const HouseIcon = styled(BaseHouseIcon)`
  width: 20px;
  height: 20px;
`;

export const FloppyDiskIcon = styled(BaseFloppyDiskIcon)`
  ${commonIconSize}
`;

export const HamburgerMenuIcon = styled(BaseHamburgerMenuIcon)`
  width: 22px;
  height: 22px;
`;

export const LessThenSignIcon = styled(BaseLessThenSignIcon)`
  ${commonIconSize}
`;

export const CircleAroundDotIcon = styled(BaseCircleAroundDotIcon)`
  ${commonIconSize}
`;

export const ToolsIcon = styled(BaseToolsIcon)`
  width: 22px;
  height: 22px;
`;

export const DuplicateIcon = styled(BaseDuplicateIcon)`
  ${commonIconSize}
`;

export const EyeIcon = styled(BaseEyeIcon)`
  ${commonIconSize}
`;

export const EyeClosedIcon = styled(BaseEyeClosedIcon)`
  ${commonIconSize}
`;

export const BinIcon = styled(BaseBinIcon)`
  width: 22px;
  height: 22px;
`;

export const DoorIcon = styled(BaseDoorIcon)`
  width: 22px;
  height: 22px;
`;

export const WindowIcon = styled(BaseWindowIcon)`
  width: 22px;
  height: 22px;
`;

export const FireplaceIcon = styled(BaseFireplaceIcon)`
  width: 22px;
  height: 22px;
`;

export const RoofIcon = styled(BaseRoofIcon)`
  width: 22px;
  height: 22px;
`;

export const CenterWallAttachmentIcon = styled(BaseCenterWallAttachmentIcon)`
  ${commonIconSize}
`;

export const OutsideWallAttachmentIcon = styled(BaseOutsideWallAttachmentIcon)`
  ${commonIconSize}
`;

export const InsideWallAttachmentIcon = styled(BaseInsideWallAttachmentIcon)`
  ${commonIconSize}
`;

export const UploadIcon = styled(BaseUploadIcon)`
  ${commonIconSize}
`;

export const ExpandArrowsIcon = styled(BaseExpandArrowsIcon)`
  width: 20px;
  height: 20px;
`;

export const ArrowRotateLeftIcon = styled(BaseArrowRotateLeftIcon)`
  width: 16px;
  height: 16px;
`;

export const ArrowRotateRightIcon = styled(BaseArrowRotateRightIcon)`
  width: 16px;
  height: 16px;
`;

export const Image = styled('img')`
  width: 24px;
  aspect-ratio: 1 / 1;
`;
