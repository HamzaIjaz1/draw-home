import { semiTransparentElementsOpacity } from '../constants';
import { useCreationMode, useViewMode } from '../zustand';

export const useInteractivePresence = () => {
  const { viewMode } = useViewMode();
  const { creationMode } = useCreationMode();

  return {
    getInteractivePresence(isActive: boolean) {
      const opacity = viewMode === '2D' && isActive === false ? semiTransparentElementsOpacity : 1;

      return {
        opacity,
        isRendered: opacity === 1 || creationMode !== 'walls',
      };
    },
  };
};
