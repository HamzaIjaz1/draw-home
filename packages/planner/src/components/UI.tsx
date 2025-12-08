import styled from 'styled-components';
import { specialZIndexTop } from '@draw-house/common/dist/constants';
import { PopUpToolbar } from './PopUpToolbar';
import { SlideUpMenus } from './SlideUpMenus';
import { AppScreenOverlay } from './AppScreenOverlay';
import { QuickTourProvider, QuickTourWelcomeStepAnchor } from './QuickTourProvider';
import { FirstPersonViewInfo } from './FirstPersonViewInfo';
import { FeatureMapOverlay } from './FeatureMapOverlay';
import { HotkeysPopUp } from './HotkeysPopUp';
import { PaywallPopUp } from './PaywallPopUp';
import { LevelsRailOverlay } from './LevelRailsOverlay';
import { LandscapeTextureSpinner } from './LoadingSpinner';

const Wrapper = styled.div`
  position: relative;
  z-index: ${specialZIndexTop};
`;

export const UI: React.FC = () => (
  <>
    <QuickTourProvider>
      <Wrapper>
        <PaywallPopUp />
        <AppScreenOverlay />
        <PopUpToolbar />
        <SlideUpMenus />
        <LevelsRailOverlay />
        <QuickTourWelcomeStepAnchor />
        <FeatureMapOverlay />
        <HotkeysPopUp />
        <LandscapeTextureSpinner />
      </Wrapper>
    </QuickTourProvider>
    <FirstPersonViewInfo />
  </>
);
