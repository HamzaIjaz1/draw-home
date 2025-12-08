import { useGlobalSettings, useViewMode } from '../zustand';

export const useIsFloorGridShown = () => {
  const withLandscapeTextures = useGlobalSettings(s => s.withLandscapeTextures);
  const { viewMode } = useViewMode();

  return {
    isFloorGridShown: withLandscapeTextures === false || viewMode === '2D',
  };
};
