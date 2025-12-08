import { useSlideUpMenuLvl3 } from '../../../zustand';
import { SlideUpMenuResetStateDummy } from '../SlideUpMenuResetStateDummy';
import { MyAssetsImport } from './MyAssetsImport';

export const SlideUpMenuLvl3: React.FC = () => {
  const { slideUpMenuLvl3 } = useSlideUpMenuLvl3();

  switch(slideUpMenuLvl3.type) {
    case '__RESET_STATE_DUMMY__':
      return <SlideUpMenuResetStateDummy />;
    case 'myAssetsImport':
      return <MyAssetsImport slideUpMenuLvl3={slideUpMenuLvl3} />;
    default:
      ((e: never) => e)(slideUpMenuLvl3);
      throw new Error('This should never happen. |880idy|');
  }
};
