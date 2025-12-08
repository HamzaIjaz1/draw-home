import { CustomModelId, StrapiCustomModelId } from '@draw-house/common/dist/brands';
import { create } from 'zustand';
import { Quaternion, Vector3 } from 'three';
import { isNull } from '@arthurka/ts-utils';
import { CustomModelsStore } from './useCustomModels/store';

export type NewCustomModelStore = {
  newCustomModel: null | {
    strapiId: StrapiCustomModelId;
    id: CustomModelId;
    needToStopAfterFirstSet: boolean;
    isSelectedFromCatalog: boolean;
    width: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['width'];
    height: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['height'];
    depth: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['depth'];
    quaternion: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['quaternion'];
    overrideMaterials: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['overrideMaterials'];
    isFlippedHorizontal: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['isFlippedHorizontal'];
    isMirrored: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['isMirrored'];
    commentName: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['commentName'];
    isHidden: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['isHidden'];
    appearanceOptionsShown: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['appearanceOptionsShown'];
    appearanceOptionsExceptionTextureNames: Extract<CustomModelsStore['customModels'][number], { type: 'regular' | 'column' }>['appearanceOptionsExceptionTextureNames'];
    lastCopiedModelId: CustomModelId | null;
  };
};

export const useNewCustomModel = create<NewCustomModelStore>(() => ({
  newCustomModel: null,
}));

export const rotateNewCustomModel = (angleDeg: number) => {
  const { newCustomModel } = useNewCustomModel.getState();
  if(isNull(newCustomModel)) {
    return;
  }

  const quaternion = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), angleDeg * Math.PI / 180);

  useNewCustomModel.setState({
    newCustomModel: {
      ...newCustomModel,
      quaternion: newCustomModel.quaternion.clone().multiply(quaternion),
    },
  });
};
