import { isResolved } from '../../utils/isResolved';
import { useOnboardingJourneyEvents } from '../useOnboardingJourneyEvents';
import { useFeatureTips } from './store';

useFeatureTips.subscribe(({ featureTips }) => {
  if(!isResolved(featureTips)) {
    return;
  }

  const { onboardingJourneyEvents } = useOnboardingJourneyEvents.getState();

  const presentEvents = onboardingJourneyEvents.filter(e => (
    featureTips.some(tip => tip.feature === e)
  ));

  if(onboardingJourneyEvents.length !== presentEvents.length) {
    useOnboardingJourneyEvents.setState({
      onboardingJourneyEvents: presentEvents,
    });
  }
});
