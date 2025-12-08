import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { Positive } from '@draw-house/common/dist/brands';
import { useCatalogDataResolved } from '../zustand/useCatalogData';
import { useLevels } from '../zustand';
import { useNewCustomModelPosition } from '../zustand/useNewCustomModelPosition';
import { NewCustomModelStore, useNewCustomModel } from '../zustand/useNewCustomModel';
import { CustomModel } from './CustomModels';
import { Asset2D } from './Asset2D';
import { ghostOpacity } from '../constants';
import { useTouchScreen } from '../zustand/useTouchScreen';

const _NewCustomModelGhost: React.FC<{ newCustomModel: NonNullable<NewCustomModelStore['newCustomModel']> }> = ({ newCustomModel }) => {
  const { models } = useCatalogDataResolved().catalogData;
  const { newCustomModelPosition } = useNewCustomModelPosition();
  const { url, category } = getNotUndefined(models.find(e => e.id === newCustomModel?.strapiId), 'This should never happen. |612squ|');
  const { levels } = useLevels();

  const activeLevel = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |2x4jz0|');

  return (
    category.childrenType === 'assets-2d'
      ? (
        <Asset2D
          id={newCustomModel.id}
          url={url}
          quaternion={newCustomModel.quaternion}
          position={newCustomModelPosition}
          type='asset-2d'
          commentName=''
          levelId={activeLevel.id}
          location='foreground'
          scale={Positive(1)}
          transparency={ghostOpacity}
          tilt={category.tilt}
        />
      )
      : (
        <CustomModel
          isSemiTransparent
          id={newCustomModel.id}
          width={newCustomModel.width}
          height={newCustomModel.height}
          depth={newCustomModel.depth}
          quaternion={newCustomModel.quaternion}
          overrideMaterials={newCustomModel.overrideMaterials}
          isFlippedHorizontal={newCustomModel.isFlippedHorizontal}
          isMirrored={newCustomModel.isMirrored}
          commentName={newCustomModel.commentName}
          levelId={activeLevel.id}
          url={url}
          position={newCustomModelPosition}
          type={category.childrenType === 'columns' ? 'column' : 'regular'}
          isHidden={newCustomModel.isHidden}
          appearanceOptionsShown={newCustomModel.appearanceOptionsShown}
          appearanceOptionsExceptionTextureNames={newCustomModel.appearanceOptionsExceptionTextureNames}
        />
      )
  );
};

export const NewCustomModelGhost: React.FC = () => {
  const { newCustomModel } = useNewCustomModel();
  const { isTouchScreen } = useTouchScreen();

  return !isNull(newCustomModel) && isTouchScreen === false && (
    <_NewCustomModelGhost newCustomModel={newCustomModel} />
  );
};
