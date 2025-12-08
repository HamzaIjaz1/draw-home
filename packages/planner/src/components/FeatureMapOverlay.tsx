import { FeatureMapOverlay as UIFeatureMapOverlay } from '@draw-house/ui/dist/components';
import { useEffect } from 'react';
import { useFeatureMapState } from '../zustand';
import { lang } from '../lang';
import { useTouchScreen } from '../zustand/useTouchScreen';

export const FeatureMapOverlay: React.FC = () => {
  const { isTouchScreen } = useTouchScreen();
  const { featureMapState } = useFeatureMapState();

  useEffect(() => {
    if(featureMapState !== 'show') {
      return;
    }

    const handler = () => {
      useFeatureMapState.setState({ featureMapState: 'hide' });

      document.removeEventListener('keydown', handler);
      document.removeEventListener('pointerdown', handler);
    };

    const timeout = window.setTimeout(() => {
      document.addEventListener('keydown', handler);
      document.addEventListener('pointerdown', handler);
    }, 100);

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener('keydown', handler);
      document.removeEventListener('pointerdown', handler);
    };
  }, [featureMapState]);

  return featureMapState === 'show' && (
    <UIFeatureMapOverlay
      isTouchScreen={isTouchScreen}
      viewModesText={lang.featureMap.viewModesText}
      wallModesText={lang.featureMap.wallModesText}
      drawToolsText={lang.featureMap.drawToolsText}
      autoGenerationToolsText={lang.featureMap.autoGenerationToolsText}
      featureTipButtonText={lang.featureMap.featureTipButtonText}
    />
  );
};
