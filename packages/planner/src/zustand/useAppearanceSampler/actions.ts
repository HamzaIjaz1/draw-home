import { ColorOverlay } from '../../utils';
import { useAppearanceSampler } from './store';
import type { AppearancePick, ApplyFns, PickMode } from './store';

export const startSampler = (mode: PickMode, apply: ApplyFns) => {
  useAppearanceSampler.setState({ isActive: true, mode, apply });
};

export const cancelSampler = () => {
  useAppearanceSampler.setState({ isActive: false, mode: null, apply: null });
};

export const takeOverlaySample = (overlay: ColorOverlay | null) => {
  const { isActive, mode, apply } = useAppearanceSampler.getState();

  const overlayFn = apply?.overlay;
  if(isActive === false || mode !== 'overlay' || overlayFn === undefined) {
    return;
  }

  overlayFn(overlay);
  useAppearanceSampler.setState({ isActive: false, mode: null, apply: null });
};

export const takeTextureSample = (appearance: AppearancePick | null) => {
  const { isActive, mode, apply } = useAppearanceSampler.getState();

  const appearanceFn = apply?.appearance;
  if(isActive === false || mode !== 'texture' || appearanceFn === undefined) {
    return;
  }

  appearanceFn(appearance);
  useAppearanceSampler.setState({ isActive: false, mode: null, apply: null });
};
