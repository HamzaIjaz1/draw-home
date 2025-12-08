import { create } from 'zustand';
import { withComparingSetState } from '../utils/withComparingSetState';

type Store = {
  isImageAssetsPopupButtonOpened: boolean;
};

export const useIsImageAssetsPopupButtonOpened = create<Store>(() => ({
  isImageAssetsPopupButtonOpened: false,
}));

withComparingSetState(useIsImageAssetsPopupButtonOpened);

export const toggleIsImageAssetsPopupButtonOpened = () => {
  const { isImageAssetsPopupButtonOpened } = useIsImageAssetsPopupButtonOpened.getState();

  useIsImageAssetsPopupButtonOpened.setState({
    isImageAssetsPopupButtonOpened: isImageAssetsPopupButtonOpened === false,
  });
};
