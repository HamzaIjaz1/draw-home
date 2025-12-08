import { CircularProgress } from '@mui/material';
import { CenterBlurryWrapperFullViewport } from '@draw-house/ui/dist/components';
import { useIsLandscapeTextureLoading } from '../zustand/useIsLandscapeTextureLoading';

export const LandscapeTextureSpinner = () => {
  const { isLandscapeTextureLoading } = useIsLandscapeTextureLoading();

  return isLandscapeTextureLoading === true && (
    <CenterBlurryWrapperFullViewport>
      <CircularProgress size={80} />
    </CenterBlurryWrapperFullViewport>
  );
};
