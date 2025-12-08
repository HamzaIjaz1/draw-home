import { create } from 'zustand';
import { infoPanelFeatures } from '../constants';
import { LocalStorageService } from '../services/LocalStorageService';

export type OnboardingJourneyEventsStore = {
  onboardingJourneyEvents: Array<keyof typeof infoPanelFeatures>;
};

export const useOnboardingJourneyEvents = create<OnboardingJourneyEventsStore>(() => ({
  onboardingJourneyEvents: [],
}));

useOnboardingJourneyEvents.subscribe(({ onboardingJourneyEvents }) => {
  // We need to remove seen events when info panel
  // is open and user triggers some other feature
  const seenFeatureTips = LocalStorageService.infoPanel.seenFeatureTips.get();

  const notYetSeenEvents = onboardingJourneyEvents.filter(e => !seenFeatureTips.includes(e));

  if(onboardingJourneyEvents.length !== notYetSeenEvents.length) {
    useOnboardingJourneyEvents.setState({
      onboardingJourneyEvents: notYetSeenEvents,
    });
  }
});
