import { styled } from '@mui/system';
import { ViewModes } from './ViewModes';
import { WallModes } from './WallModes';
import { FeatureTipButton } from './FeatureTipButton';
import { DrawTools } from './DrawTools';
import { AutoGenerationTools } from './AutoGenerationTools';

const Overlay = styled('div')`
  position: fixed;
  z-index: 4;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export type FeatureMapOverlayProps = {
  isTouchScreen: boolean;
  viewModesText: string;
  wallModesText: string;
  drawToolsText: string;
  autoGenerationToolsText: string;
  featureTipButtonText: string;
};

export const FeatureMapOverlay = ({
  isTouchScreen,
  viewModesText,
  wallModesText,
  drawToolsText,
  autoGenerationToolsText,
  featureTipButtonText,
}: FeatureMapOverlayProps) => (
  <Overlay>
    <ViewModes
      isTouchScreen={isTouchScreen}
      text={viewModesText}
    />
    <WallModes
      isTouchScreen={isTouchScreen}
      text={wallModesText}
    />
    <DrawTools
      isTouchScreen={isTouchScreen}
      text={drawToolsText}
    />
    <AutoGenerationTools
      isTouchScreen={isTouchScreen}
      text={autoGenerationToolsText}
    />
    <FeatureTipButton
      text={featureTipButtonText}
    />
  </Overlay>
);
