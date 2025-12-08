import { create } from 'zustand';

type Store = {
  isCameraResetTriggered: boolean;
};

export const useCurrentCameraReset = create<Store>(() => ({
  isCameraResetTriggered: false,
}));

export const resetCurrentCamera = () => {
  useCurrentCameraReset.setState({
    isCameraResetTriggered: true,
  });
};
