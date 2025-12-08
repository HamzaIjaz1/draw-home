import { InfoPanel } from '@draw-house/ui/dist/components';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { MouseEvent } from 'react';
import { OnboardingJourneyEventsStore } from '../../zustand/useOnboardingJourneyEvents';
import { FeatureTipsStore } from '../../zustand/useFeatureTips';
import { markFeatureTipAsSeen } from '../../utils';
import { Resolved } from '../../utils/isResolved';
import { useStrapiAppConfigResolved } from '../../zustand/useStrapiAppConfig';

type FeatureTip = Resolved<FeatureTipsStore['featureTips']>[number];

type OnboardingInfoPanelProps = {
  featureTips: [FeatureTip, ...FeatureTip[]];
  getOnboardingEvent: () => OnboardingJourneyEventsStore['onboardingJourneyEvents'][number];
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  onNext?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const OnboardingInfoPanel = ({
  getOnboardingEvent,
  featureTips,
  onClose,
  onNext,
}: OnboardingInfoPanelProps) => {
  const {
    strapiAppConfig: { tutorialsURL },
  } = useStrapiAppConfigResolved();

  const event = getOnboardingEvent();

  const tip = featureTips.find(e => e.feature === event);
  assert(!isUndefined(tip), 'This should never happen. |uv0e46|');

  markFeatureTipAsSeen(tip.feature);

  return (
    <InfoPanel
      title={tip.title}
      description={tip.description}
      onClose={onClose}
      onNext={onNext}
      onOpenTutorials={
        isNull(tutorialsURL) || tutorialsURL === ''
          ? undefined
          : () => window.open(tutorialsURL, '_blank')
      }
    />
  );
};
