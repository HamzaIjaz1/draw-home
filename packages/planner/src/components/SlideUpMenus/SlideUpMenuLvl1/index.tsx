import { useSlideUpMenuLvl1 } from '../../../zustand';
import { WallSettings } from './WallSettings';
import { WallFurnitureSettings } from './WallFurnitureSettings';
import { FloorSettings } from './FloorSettings';
import { GlobalSettings } from './GlobalSettings';
import { RoofSettings } from './RoofSettings';
import { RoofDormerSettings } from './RoofDormerSettings';
import { LevelsSettings } from './LevelsSettings';
import { VisibilitySettings } from './VisibilitySettings';
import { Catalog } from './Catalog';
import { SpaceSettings } from './SpaceSettings';
import { CustomModelSettings } from './CustomModelSettings';
import { StairSettings } from './StairSettings';
import { CeilingSettings } from './CeilingSettings';
import { ReplaceElementCatalog } from './ReplaceElementCatalog';
import { Asset2DSettings } from './Asset2DSettings';
import { AiTools } from './AiTools';
import { ImageAssetCatalog } from './ImageAssetCatalog';
import { AssociatedObjects } from './AssociatedObjects';
import { SlideUpMenuResetStateDummy } from '../SlideUpMenuResetStateDummy';

export const SlideUpMenuLvl1: React.FC = () => {
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1();

  switch(slideUpMenuLvl1.type) {
    case '__RESET_STATE_DUMMY__':
      return <SlideUpMenuResetStateDummy />;
    case 'wall':
      return <WallSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'door':
    case 'window':
      return <WallFurnitureSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'floor':
      return <FloorSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'ceiling':
      return <CeilingSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'roof':
      return <RoofSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'globalSettings':
      return <GlobalSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'levels':
      return <LevelsSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'visibilitySettings':
      return <VisibilitySettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'catalog':
      return <Catalog slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'space':
      return <SpaceSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'customModel':
      return <CustomModelSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'stairSettings':
      return <StairSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'roofDormer':
      return <RoofDormerSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'replaceElementCatalog':
      return <ReplaceElementCatalog slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'asset2DSettings':
      return <Asset2DSettings slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'aiTools':
      return <AiTools slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'imageAssetCatalog':
      return <ImageAssetCatalog slideUpMenuLvl1={slideUpMenuLvl1} />;
    case 'associatedObjects':
      return <AssociatedObjects slideUpMenuLvl1={slideUpMenuLvl1} />;
    default:
      ((e: never) => e)(slideUpMenuLvl1);
      throw new Error('This should never happen. |2udi7c|');
  }
};
