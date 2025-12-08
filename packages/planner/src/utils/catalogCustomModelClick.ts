import { CustomModelId, StrapiCustomModelId } from '@draw-house/common/dist/brands';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { generateUUID } from 'three/src/math/MathUtils';
import { Quaternion } from 'three';
import { CatalogNode } from './makeCatalog';
import { useCreationMode, useTempWallFurniture } from '../zustand';
import { useNewCustomModel } from '../zustand/useNewCustomModel';
import { useNewStairsLastClickedStrapiModelData } from '../zustand/useNewStairsLastClickedStrapiModelData';
import { CustomModelCategory } from '../zod/CustomModelCategory';
import { wallFurnitureCatalogHandler } from './handlerHelpers/wallFurnitureCatalogHandler';
import { useCatalogDataResolved } from '../zustand/useCatalogData';
import { placeStairs } from '../zustand/useStairs/actions2';

export const catalogCustomModelClick = ({ id, targetModels, childrenType }: {
  id: StrapiCustomModelId;
  targetModels: CatalogNode['items'];
  childrenType: CustomModelCategory['childrenType'];
}) => {
  const { creationMode } = useCreationMode.getState();
  const { newCustomModel } = useNewCustomModel.getState();
  const { newStairsLastClickedStrapiModelData } = useNewStairsLastClickedStrapiModelData.getState();
  const { catalogData } = useCatalogDataResolved.getState();

  const targetModel = getNotUndefined(catalogData.models.find(e => e.id === id), 'Something went wrong. |0bk7yt|');

  if(isNull(childrenType)) {
    useCreationMode.setState({ creationMode: 'pointer' });
    useNewCustomModel.setState({
      newCustomModel: (
        !isNull(newCustomModel) && newCustomModel.strapiId === id
          ? null
          : {
            id: CustomModelId(generateUUID()),
            strapiId: id,
            needToStopAfterFirstSet: true,
            isSelectedFromCatalog: true,
            width: null,
            height: null,
            depth: null,
            quaternion: new Quaternion(),
            overrideMaterials: null,
            isFlippedHorizontal: false,
            isMirrored: false,
            commentName: '',
            isHidden: false,
            appearanceOptionsShown: targetModel.appearanceOptionsShown,
            appearanceOptionsExceptionTextureNames: targetModel.appearanceOptionsExceptionTextureNames,
            lastCopiedModelId: null,
          }
      ),
    });

    return;
  }

  switch(childrenType) {
    case 'doors':
    case 'windows': {
      const { url } = getNotUndefined(targetModels.find(e => e.id === id), 'This should never happen. |xx15k0|');
      const { tempWallFurniture } = useTempWallFurniture.getState();

      useNewCustomModel.setState(useNewCustomModel.getInitialState());

      if(!isNull(tempWallFurniture) && tempWallFurniture.furniture.url === url) {
        useCreationMode.setState({ creationMode: 'pointer' });
        useTempWallFurniture.setState(useTempWallFurniture.getInitialState());
      } else {
        wallFurnitureCatalogHandler(childrenType, url);
      }
      break;
    }
    case 'stairs':
      if(creationMode === 'stairs' && newStairsLastClickedStrapiModelData.id === id) {
        useCreationMode.setState({ creationMode: 'pointer' });
      } else {
        const { stairType } = getNotUndefined(targetModels.find(e => e.id === id), 'This should never happen. |500jh8|');

        if(isNull(stairType)) {
          break;
        }

        useCreationMode.setState({ creationMode: 'stairs' });
        useNewStairsLastClickedStrapiModelData.setState({
          newStairsLastClickedStrapiModelData: {
            id,
            type: stairType,
          },
        });
        placeStairs();
      }
      break;
    case 'assets-2d':
    case 'columns':
      useNewCustomModel.setState({
        newCustomModel: (
          !isNull(newCustomModel) && newCustomModel.strapiId === id
            ? null
            : {
              id: CustomModelId(generateUUID()),
              strapiId: id,
              needToStopAfterFirstSet: true,
              isSelectedFromCatalog: true,
              width: null,
              height: null,
              depth: null,
              quaternion: new Quaternion(),
              overrideMaterials: null,
              isFlippedHorizontal: false,
              isMirrored: false,
              commentName: '',
              isHidden: false,
              appearanceOptionsShown: targetModel.appearanceOptionsShown,
              appearanceOptionsExceptionTextureNames: targetModel.appearanceOptionsExceptionTextureNames,
              lastCopiedModelId: null,
            }
        ),
      });
      break;
    default:
      ((e: never) => e)(childrenType);
      throw new Error('This should never happen. |qw6yy5|');
  }
};
