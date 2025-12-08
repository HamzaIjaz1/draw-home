import { useSlideUpMenuLvl2 } from '../../../zustand';
import { WallAppearance } from './WallAppearance';
import { FloorAppearance } from './FloorAppearance';
import { RoofAppearance } from './RoofAppearance';
import { LevelSettings } from './LevelSettings';
import { NewLevelSettings } from './NewLevel';
import { SnapSettings } from './SnapSettings';
import { NewCustomModelCategoryPicker } from './NewCustomModelCategoryPicker';
import { CustomModelAppearance } from './CustomModelAppearance';
import { CeilingAppearance } from './CeilingAppearance';
import { WallFurnitureAppearance } from './WallFurnitureAppearance';
import { ImageUpload } from './ImageUpload';
import { MyAssets } from './MyAssets';
import { SlideUpMenuResetStateDummy } from '../SlideUpMenuResetStateDummy';
import { useSamplerCursor } from '../../../utils/useSamplerCursor';
import { LandTextures } from './LandTextures';

export const SlideUpMenuLvl2: React.FC = () => {
  const { slideUpMenuLvl2 } = useSlideUpMenuLvl2();
  useSamplerCursor();

  switch(slideUpMenuLvl2.type) {
    case '__RESET_STATE_DUMMY__':
      return <SlideUpMenuResetStateDummy />;
    case 'wallAppearance':
      return <WallAppearance key={`${slideUpMenuLvl2.wallId} ${slideUpMenuLvl2.textureType}`} slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'floorAppearance':
      return <FloorAppearance key={`${slideUpMenuLvl2.spaceId} ${slideUpMenuLvl2.textureType}`} slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'ceilingAppearance':
      return <CeilingAppearance key={`${slideUpMenuLvl2.spaceId} ${slideUpMenuLvl2.textureType}`} slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'roofAppearance':
      return <RoofAppearance key={`${slideUpMenuLvl2.wallId} ${slideUpMenuLvl2.textureType}`} slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'levelSettings':
      return <LevelSettings slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'newLevel':
      return <NewLevelSettings slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'snapSettings':
      return <SnapSettings slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'newCustomModelCategoryPicker':
      return <NewCustomModelCategoryPicker slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'customModelAppearance':
      return <CustomModelAppearance key={`${slideUpMenuLvl2.customModelId} ${slideUpMenuLvl2.overrideMaterialName}`} slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'wallFurnitureAppearance':
      return <WallFurnitureAppearance key={`${slideUpMenuLvl2.wallFurnitureId} ${slideUpMenuLvl2.overrideMaterialName}`} slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'imageUpload':
      return <ImageUpload slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'myAssets':
      return <MyAssets slideUpMenuLvl2={slideUpMenuLvl2} />;
    case 'landTextures':
      return <LandTextures slideUpMenuLvl2={slideUpMenuLvl2} />;
    default:
      ((e: never) => e)(slideUpMenuLvl2);
      throw new Error('This should never happen. |chq2dq|');
  }
};
