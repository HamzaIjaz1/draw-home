import { NonNegative, WallFurnitureId, WallId } from '@draw-house/common/dist/brands';
import { cutOffLastLetter, generateUUID } from '@draw-house/common/dist/utils';
import { useCreationMode, useTempWallFurniture } from '../../zustand';

export const wallFurnitureCatalogHandler = (childrenType: 'doors' | 'windows', url: string) => {
  useCreationMode.setState({ creationMode: childrenType });
  useTempWallFurniture.setState({
    tempWallFurniture: {
      targetWallId: WallId(generateUUID()),
      needToStopAfterFirstSet: true,
      isSelectedFromCatalog: true,
      isOnWall: false,
      furniture: {
        id: WallFurnitureId(generateUUID()),
        isFlippedHorizontal: false,
        isMirrored: false,
        isHidden: false,
        onWallCoordinateX: 0,
        onWallCoordinateY: NonNegative(0),
        type: cutOffLastLetter(childrenType),
        url,
        width: null,
        height: null,
        depth: null,
        overrideMaterials: null,
      },
      startOnWallCoordinateX: null,
      startOnWallCoordinateY: null,
    },
  });
};
