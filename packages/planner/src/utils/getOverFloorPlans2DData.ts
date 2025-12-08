import { getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import { useTexture } from '@react-three/drei';
import { Quaternion, Vector3 } from 'three';
import { assets2DDefaultSize } from '../constants';
import { useCustomModels, WallsStore } from '../zustand';
import { useCatalogDataResolved } from '../zustand/useCatalogData';
import { isPointInsidePolygon } from './isPointInsideSpaceWalls';
import { toVector2 } from './helpers';

export const useFloorPlans2D = () => {
  const { catalogData } = useCatalogDataResolved();
  const { customModels } = useCustomModels();

  const targetModels = (
    customModels
      .filter(e => e.type === 'asset-2d')
      .map(e => {
        const catalogModel = catalogData.models.find(({ url }) => url === e.url);

        return isUndefined(catalogModel) ? null : {
          customModel: e,
          catalogModel,
        };
      })
      .map(e => {
        if(isNull(e)) {
          return null;
        }

        const catalogCategory = catalogData.categories.find(({ id }) => id === e.catalogModel.category.id);

        return isUndefined(catalogCategory) || catalogCategory.is2DFloorplan === false ? null : {
          ...e,
          catalogCategory,
        };
      })
      .filter(e => !isNull(e))
  );

  const textures = useTexture(targetModels.map(e => e.customModel.url));

  return targetModels.map((e, i) => ({
    ...e,
    texture: getNotUndefined(textures[i], 'Something went wrong. |pzf9cm|'),
  }));
};

const getRectangleCorners = (position: Vector3, quaternion: Quaternion, width: number, height: number) => {
  const x = width / 2;
  const z = height / 2;

  const corners = [
    new Vector3(-x, 0, -z),
    new Vector3(x, 0, -z),
    new Vector3(x, 0, z),
    new Vector3(-x, 0, z),
  ];

  return corners.map(e => e.clone().applyQuaternion(quaternion).add(position));
};

export const getOverFloorPlans2DData = (walls: WallsStore['walls'], floorPlans2D: ReturnType<typeof useFloorPlans2D>) => {
  const contours = floorPlans2D.map(e => {
    const textureRatio = e.texture.image.width / e.texture.image.height;

    return getRectangleCorners(
      e.customModel.position,
      e.customModel.quaternion,
      assets2DDefaultSize * e.customModel.scale,
      assets2DDefaultSize * e.customModel.scale / textureRatio,
    ).map(toVector2);
  });

  return walls.filter(({ position: { start, end } }) => (
    contours.some(e => (
      false
        || isPointInsidePolygon(start, e)
        || isPointInsidePolygon(end, e)
    ))
  ));
};
