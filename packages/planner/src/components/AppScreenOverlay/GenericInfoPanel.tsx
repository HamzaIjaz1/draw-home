import { InfoPanel, InfoPanelProps } from '@draw-house/ui/dist/components';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { MouseEvent, useMemo, useState } from 'react';
import { FeatureTipsStore } from '../../zustand/useFeatureTips';
import { detectActiveInfoPanelFeature } from '../../utils';
import { Resolved } from '../../utils/isResolved';
import { lang } from '../../lang';
import { infoPanelFeatures } from '../../constants';
import { useStrapiAppConfigResolved } from '../../zustand/useStrapiAppConfig';

const placeholderTip: Pick<InfoPanelProps, 'title' | 'description'> = {
  title: lang.infoPanel.placeholderTip.title,
  description: lang.infoPanel.placeholderTip.description,
};

export type GenericInfoPanelProps = {
  featureTips: Resolved<FeatureTipsStore['featureTips']>;
  onClose: (e: MouseEvent<HTMLButtonElement>) => void;
  onOpenQuickTour: (e: MouseEvent<HTMLButtonElement>) => void;
};

export const GenericInfoPanel: React.FC<GenericInfoPanelProps> = ({ featureTips, onOpenQuickTour, onClose }) => {
  const { strapiAppConfig: { tutorialsURL } } = useStrapiAppConfigResolved();

  const activeFeature = useMemo(detectActiveInfoPanelFeature, []);
  const tips = (
    featureTips
      .filter(e => infoPanelFeatures[e.feature].onboarding === false)
      .toSorted((a, b) => a.order - b.order)
  );

  const relevantTip = isNull(activeFeature) ? null : featureTips.find(e => e.feature === activeFeature);
  const someTip = tips[0];
  const tip = isNull(relevantTip) ? someTip : relevantTip;

  const index = isUndefined(tip) ? null : (() => {
    const index = tips.findIndex(e => e.id === tip.id);
    assert(index !== -1, 'This should never happen. |k19hwb|');

    return index;
  })();

  const [offset, setOffset] = useState(0);
  const chosenTip = isNull(index) ? null : (() => {
    const tip = tips.at((index + offset) % tips.length);
    assert(!isUndefined(tip), 'This should never happen. |jzy4nq|');

    return tip;
  })();

  const content: Pick<InfoPanelProps, 'title' | 'description'> = (
    isNull(chosenTip)
      ? placeholderTip
      : {
        title: chosenTip.title,
        description: chosenTip.description,
      }
  );

  return (
    <InfoPanel
      title={content.title}
      description={content.description}
      onClose={onClose}
      {
        ...tips.length > 1 && !isNull(chosenTip) && {
          onPrevious(e) {
            e.stopPropagation();

            setOffset(e => e - 1);
          },
          onNext(e) {
            e.stopPropagation();

            setOffset(e => e + 1);
          },
        } satisfies Partial<InfoPanelProps>
      }
      onStartQuickTour={onOpenQuickTour}
      onOpenTutorials={
        isNull(tutorialsURL) || tutorialsURL === ''
          ? undefined
          : () => window.open(tutorialsURL, '_blank')
      }
    />
  );
};
