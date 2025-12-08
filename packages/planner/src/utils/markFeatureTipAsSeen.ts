import { isSubset } from '@draw-house/common/dist/utils';
import { useFeatureTipsResolved } from '../zustand/useFeatureTips';
import { LocalStorageService } from '../services/LocalStorageService';
import { infoPanelFeatures } from '../constants';

export const markFeatureTipAsSeen = (feature: keyof typeof infoPanelFeatures) => {
  const seenFeatureTips = LocalStorageService.infoPanel.seenFeatureTips.get();
  if(seenFeatureTips.includes(feature)) {
    return;
  }

  const newSeen = [...seenFeatureTips, feature];
  const { featureTips } = useFeatureTipsResolved.getState();
  const allOnboardingFeatures = (
    featureTips
      .filter(e => infoPanelFeatures[e.feature].onboarding === true)
      .map(e => e.feature)
  );

  LocalStorageService.infoPanel.seenFeatureTips.set(newSeen);
  if(isSubset(newSeen, allOnboardingFeatures)) {
    LocalStorageService.infoPanel.onboarding.set('finished');
  }
};
