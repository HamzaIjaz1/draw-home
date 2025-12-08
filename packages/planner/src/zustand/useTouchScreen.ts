import { create } from 'zustand';
import { withComparingSetState } from '../utils/withComparingSetState';

type Store = {
  isTouchScreen: boolean;
};

export const useTouchScreen = create<Store>(() => ({
  isTouchScreen: window.matchMedia('(pointer: coarse)').matches,
}));

withComparingSetState(useTouchScreen);

window.addEventListener('resize', () => {
  useTouchScreen.setState({
    isTouchScreen: window.matchMedia('(pointer: coarse)').matches,
  });
});

document.addEventListener('touchstart', () => {
  useTouchScreen.setState({ isTouchScreen: true });
});
