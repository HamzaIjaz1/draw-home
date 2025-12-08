import { useOnboardingJourneyEvents } from '../zustand/useOnboardingJourneyEvents';
import { LocalStorageService } from '../services/LocalStorageService';
import { infoPanelFeatures } from '../constants';
import { useFeatureTips } from '../zustand/useFeatureTips';
import { isResolved } from './isResolved';

export const dispatchInfoPanelEvent = (event: keyof typeof infoPanelFeatures) => {
  const onboarding = LocalStorageService.infoPanel.onboarding.get();
  if(onboarding === 'finished') {
    return;
  }

  const seenFeatureTips = LocalStorageService.infoPanel.seenFeatureTips.get();
  if(seenFeatureTips.includes(event)) {
    return;
  }

  const { onboardingJourneyEvents } = useOnboardingJourneyEvents.getState();
  if(onboardingJourneyEvents.includes(event)) {
    return;
  }

  const { featureTips } = useFeatureTips.getState();
  if(isResolved(featureTips) && !featureTips.some(e => e.feature === event)) {
    return;
  }

  useOnboardingJourneyEvents.setState({
    onboardingJourneyEvents: [...onboardingJourneyEvents, event],
  });
};
