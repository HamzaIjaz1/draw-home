import { getNotUndefined, isNull, isNullish, isUndefined, Unionize, ValueOf } from '@arthurka/ts-utils';
import { CustomModelId, LevelId, Positive } from '@draw-house/common/dist/brands';
import { generateUUID } from '@draw-house/common/dist/utils';
import { Group, Mesh, Object3DEventMap, Quaternion, Vector3 } from 'three';
import assert from 'assert';
import { CustomModelsStore, useCustomModels } from './store';
import { NewCustomModelStore, useNewCustomModel } from '../useNewCustomModel';
import { useCatalogDataResolved } from '../useCatalogData';
import { getFlipHorizontalMirrorNextStep } from '../../utils/helpers';
import { compositeOperations } from '../../constants';
import type { SlideUpMenuLvl2Store } from '../slideUpMenus';
import { useSelectedItem } from '../useSelectedItem';
import { DEFAULT_TEXTURE_TRANSFORM } from '../../zod/TextureTransform';

const updateCustomModels = (makeNewCustomModels: (walls: CustomModelsStore['customModels']) => CustomModelsStore['customModels']) => {
  const { customModels } = useCustomModels.getState();

  useCustomModels.setState({
    customModels: makeNewCustomModels(customModels),
  });
};

export const addCustomModel = ({
  id,
  url,
  position,
  levelId,
  scene,
  isColumn,
  width,
  height,
  depth,
  quaternion,
  overrideMaterials,
  isFlippedHorizontal,
  isMirrored,
  commentName,
  isHidden,
  appearanceOptionsShown,
  appearanceOptionsExceptionTextureNames,
}: {
  url: CustomModelsStore['customModels'][number]['url'];
  position: Vector3;
  levelId: LevelId;
  scene: Group<Object3DEventMap>;
  isColumn: boolean;
  id: NonNullable<NewCustomModelStore['newCustomModel']>['id'];
  width: NonNullable<NewCustomModelStore['newCustomModel']>['width'];
  height: NonNullable<NewCustomModelStore['newCustomModel']>['height'];
  depth: NonNullable<NewCustomModelStore['newCustomModel']>['depth'];
  quaternion: NonNullable<NewCustomModelStore['newCustomModel']>['quaternion'];
  overrideMaterials: NonNullable<NewCustomModelStore['newCustomModel']>['overrideMaterials'];
  isFlippedHorizontal: NonNullable<NewCustomModelStore['newCustomModel']>['isFlippedHorizontal'];
  isMirrored: NonNullable<NewCustomModelStore['newCustomModel']>['isMirrored'];
  commentName: NonNullable<NewCustomModelStore['newCustomModel']>['commentName'];
  isHidden: NonNullable<NewCustomModelStore['newCustomModel']>['isHidden'];
  appearanceOptionsShown: NonNullable<NewCustomModelStore['newCustomModel']>['appearanceOptionsShown'];
  appearanceOptionsExceptionTextureNames: NonNullable<NewCustomModelStore['newCustomModel']>['appearanceOptionsExceptionTextureNames'];
}) => {
  updateCustomModels(customModels => {
    scene.traverse(e => {
      if(!(e instanceof Mesh)) {
        return;
      }

      const materialArray = Array.isArray(e.material) ? e.material : [e.material];
      const newMaterials = materialArray.map(e => {
        const material = e.clone();
        material.needsUpdate = true;

        return material;
      });

      e.material = Array.isArray(e.material) ? newMaterials : newMaterials[0];
    });

    return [
      ...customModels,
      {
        id,
        type: isColumn === true ? 'column' : 'regular',
        url,
        position,
        quaternion,
        width,
        height,
        depth,
        overrideMaterials,
        levelId,
        isFlippedHorizontal,
        isMirrored,
        commentName,
        isHidden,
        appearanceOptionsShown,
        appearanceOptionsExceptionTextureNames,
      },
    ];
  });
};

export const addAndSelectAsset2D = ({ url, position, levelId, commentName, tilt }: {
  url: CustomModelsStore['customModels'][number]['url'];
  position: Vector3;
  levelId: LevelId;
  commentName: string;
  tilt: number;
}) => {
  const id = CustomModelId(generateUUID());

  updateCustomModels(customModels => [
    ...customModels,
    {
      id,
      type: 'asset-2d',
      url,
      position,
      quaternion: new Quaternion(),
      scale: Positive(1),
      levelId,
      commentName,
      transparency: 1,
      tilt,
      location: 'background',
    },
  ]);

  useSelectedItem.setState({
    selectedItem: {
      type: 'asset2D',
      id,
      mode: 'selected',
      measuredDistanceWorld: null,
    },
  });
};

export const setCustomModelParams = (
  id: CustomModelsStore['customModels'][number]['id'],
  params: Unionize<Pick<Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>, 'position' | 'quaternion' | 'width' | 'height' | 'depth' | 'levelId' | 'overrideMaterials' | 'url' | 'commentName' | 'isHidden' | 'appearanceOptionsShown' | 'appearanceOptionsExceptionTextureNames'>>,
) => {
  updateCustomModels(customModels => (
    customModels.map(e => {
      if(e.id !== id) {
        return e;
      }
      assert(e.type === 'regular' || e.type === 'column', 'This should never happen. |3zo1gl|');

      return {
        ...e,
        ...params,
      };
    })
  ));
};

export const setAsset2DParams = (
  id: CustomModelsStore['customModels'][number]['id'],
  params: Unionize<Pick<Extract<CustomModelsStore['customModels'][number], { type: 'asset-2d' }>, 'position' | 'quaternion' | 'scale' | 'levelId' | 'commentName' | 'transparency' | 'location' | 'tilt'>>,
) => {
  updateCustomModels(customModels => (
    customModels.map(e => {
      if(e.id !== id) {
        return e;
      }
      assert(e.type === 'asset-2d', 'This should never happen. |qun8pd|');

      return {
        ...e,
        ...params,
      };
    })
  ));
};

export const removeCustomModel = (id: CustomModelsStore['customModels'][number]['id']) => {
  updateCustomModels(customModels => customModels.filter(e => e.id !== id));
};

export const removeLevelCustomModels = (levelId: CustomModelsStore['customModels'][number]['levelId']) => {
  updateCustomModels(customModels => customModels.filter(e => e.levelId !== levelId));
};

export const copyCustomModel = (
  customModelId: CustomModelsStore['customModels'][number]['id'],
  needToStopAfterFirstSet: boolean,
  { customModels } = {
    customModels: useCustomModels.getState().customModels,
  },
) => {
  const { models } = useCatalogDataResolved.getState().catalogData;

  const {
    type,
    url,
    width,
    height,
    depth,
    quaternion,
    overrideMaterials,
    isFlippedHorizontal,
    isMirrored,
    commentName,
    isHidden,
    appearanceOptionsShown,
    appearanceOptionsExceptionTextureNames,
  } = getNotUndefined(customModels.find(e => e.id === customModelId), 'Something went wrong. |ea4ema|');
  assert(type === 'column' || type === 'regular', 'Something went wrong. |02b4k7|');

  const { id } = getNotUndefined(models.find(e => e.url === url), 'Something went wrong. |8q2cuj|');
  const modelId = CustomModelId(generateUUID());

  useNewCustomModel.setState({
    newCustomModel: {
      id: modelId,
      strapiId: id,
      needToStopAfterFirstSet,
      isSelectedFromCatalog: false,
      width,
      height,
      depth,
      quaternion,
      overrideMaterials,
      isFlippedHorizontal,
      isMirrored,
      commentName,
      isHidden,
      appearanceOptionsShown,
      appearanceOptionsExceptionTextureNames,
      lastCopiedModelId: customModelId,
    },
  });

  return modelId;
};

export const setCustomModelOverrideMaterialParams = (
  customModelId: CustomModelId,
  materialName: string,
  applyToAll: null | Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'customModelAppearance' }>['applyToAll'],
  params: Unionize<Pick<ValueOf<CustomModelsStore['customModels'][number]['overrideMaterials']>, 'texture' | 'compositeOperation' | 'commentTextureOverlayColor' | 'commentTextureAppearance' | 'textureTransform' | 'colorOverlay'>>,
) => {
  updateCustomModels(customModels => {
    const targetCustomModel = customModels.find(e => e.id === customModelId);
    if(isUndefined(targetCustomModel)) {
      return customModels;
    }

    const { url, levelId } = targetCustomModel;

    return (
      customModels.map(e => {
        if(e.type !== 'regular' && e.type !== 'column') {
          return e;
        }

        const isUpdate = (
          false
            || e.id === customModelId
            || !isNull(applyToAll) && applyToAll.isActive === true && e.url === url && (
              false
                || applyToAll.type === 'sameCustomModels'
                || applyToAll.type === 'sameLevelSameCustomModels' && e.levelId === levelId
            )
        );

        return isUpdate === false ? e : {
          ...e,
          overrideMaterials: (() => {
            const overrideMaterial = isNull(e.overrideMaterials) ? null : e.overrideMaterials[materialName];

            if(!isNullish(overrideMaterial)) {
              return {
                ...e.overrideMaterials,
                [materialName]: {
                  ...overrideMaterial,
                  ...params,
                },
              };
            }

            if(isUndefined(params)) {
              return e.overrideMaterials;
            }

            if('texture' in params) {
              return {
                ...e.overrideMaterials,
                [materialName]: {
                  colorOverlay: null,
                  compositeOperation: compositeOperations[0],
                  commentTextureAppearance: '',
                  commentTextureOverlayColor: '',
                  textureTransform: DEFAULT_TEXTURE_TRANSFORM,
                  ...params,
                },
              };
            }

            return e.overrideMaterials;
          })(),
        };
      })
    );
  });
};

export const flipHorizontalOrMirrorCustomModel = (customModelId: CustomModelId) => {
  updateCustomModels(customModels => (
    customModels.map(e => {
      if(e.id !== customModelId) {
        return e;
      }
      assert(e.type === 'regular' || e.type === 'column', 'Something went wrong. |wt9j8l|');

      const { isFlippedHorizontal, isMirrored } = getFlipHorizontalMirrorNextStep(e);

      return {
        ...e,
        isFlippedHorizontal,
        isMirrored,
      };
    })
  ));
};

export const rotateCustomModel = (id: CustomModelId, angleDeg: number) => {
  const { customModels } = useCustomModels.getState();

  const quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), angleDeg * Math.PI / 180);

  useCustomModels.setState({
    customModels: customModels.map(e => e.id !== id ? e : {
      ...e,
      quaternion: e.quaternion.clone().multiply(quaternion),
    }),
  });
};
