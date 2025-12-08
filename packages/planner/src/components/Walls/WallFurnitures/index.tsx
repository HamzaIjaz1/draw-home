import { Positive } from '@draw-house/common/dist/brands';
import { useGlobalSettings, WallsStore } from '../../../zustand';
import { WallFurniture } from './WallFurniture';

export type WallFurnituresProps = {
  furnitures: WallsStore['walls'][number]['furnitures'];
  w: number;
  wallHeight: Positive;
  wallThickness: Positive;
  isOverFloorPlan: boolean;
  levelId: WallsStore['walls'][number]['levelId'];
};

export const WallFurnitures: React.FC<WallFurnituresProps> = ({ furnitures, w, wallHeight, wallThickness, isOverFloorPlan, levelId }) => {
  const isDoorsShown = useGlobalSettings(s => s.isDoorsShown);
  const isWindowsShown = useGlobalSettings(s => s.isWindowsShown);

  return (
    furnitures
      .filter(e => isDoorsShown === true ? true : e.type !== 'door')
      .filter(e => isWindowsShown === true ? true : e.type !== 'window')
      .filter(e => e.isHidden === false)
      .map(e => (
        <WallFurniture
          key={e.id}
          wallHeight={wallHeight}
          wallThickness={wallThickness}
          wallLength={w}
          furniture={e}
          isOverFloorPlan={isOverFloorPlan}
          levelId={levelId}
        />
      ))
  );
};
