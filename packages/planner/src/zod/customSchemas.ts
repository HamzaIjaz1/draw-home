import { typeOf } from '@arthurka/ts-utils';
import { z } from 'zod/v4';
import { isCustomModelId, isDefaultTextureId, isFeatureTipId, isLevelId, isNonNegative, isNonNegativeInteger, isPositive, isProjectId, isRoofDormerId, isRoofId, isSpaceId, isStairId, isStrapiAppConfigId, isStrapiComponentId, isStrapiCustomModelCategoryId, isStrapiCustomModelId, isStrapiMediaId, isStrapiProjectId, isTextureAssetCategoryId, isTextureAssetId, isUUID, isWallFurnitureId, isWallId } from '@draw-house/common/dist/brands';

const makeCustomErrorMessage = (name: string) => ({
  error({ input }: { input: unknown }) {
    return `${JSON.stringify(input)} of type ${typeOf(input)} is not valid ${name}`;
  },
});

export const customPositive = z.custom(isPositive, makeCustomErrorMessage('Positive'));
export const customNonNegative = z.custom(isNonNegative, makeCustomErrorMessage('NonNegative'));
export const customNonNegativeInteger = z.custom(isNonNegativeInteger, makeCustomErrorMessage('NonNegativeInteger'));

export const customStrapiMediaId = z.custom(isStrapiMediaId, makeCustomErrorMessage('StrapiMediaId'));
export const customStrapiProjectId = z.custom(isStrapiProjectId, makeCustomErrorMessage('StrapiProjectId'));
export const customStrapiComponentId = z.custom(isStrapiComponentId, makeCustomErrorMessage('StrapiComponentId'));
export const customDefaultTextureId = z.custom(isDefaultTextureId, makeCustomErrorMessage('DefaultTextureId'));

export const customTextureAssetId = z.custom(isTextureAssetId, makeCustomErrorMessage('TextureAssetId'));
export const customTextureAssetCategoryId = z.custom(isTextureAssetCategoryId, makeCustomErrorMessage('TextureAssetCategoryId'));
export const customStrapiAppConfigId = z.custom(isStrapiAppConfigId, makeCustomErrorMessage('StrapiAppConfigId'));
export const customFeatureTipId = z.custom(isFeatureTipId, makeCustomErrorMessage('FeatureTipId'));

export const customStrapiCustomModelId = z.custom(isStrapiCustomModelId, makeCustomErrorMessage('StrapiCustomModelId'));
export const customStrapiCustomModelCategoryId = z.custom(isStrapiCustomModelCategoryId, makeCustomErrorMessage('StrapiCustomModelCategoryId'));

export const customUUID = z.custom(isUUID, makeCustomErrorMessage('UUID'));
export const customProjectId = z.custom(isProjectId, makeCustomErrorMessage('ProjectId'));
export const customWallId = z.custom(isWallId, makeCustomErrorMessage('WallId'));
export const customWallFurnitureId = z.custom(isWallFurnitureId, makeCustomErrorMessage('WallFurnitureId'));
export const customCustomModelId = z.custom(isCustomModelId, makeCustomErrorMessage('CustomModelId'));
export const customLevelId = z.custom(isLevelId, makeCustomErrorMessage('LevelId'));
export const customSpaceId = z.custom(isSpaceId, makeCustomErrorMessage('SpaceId'));
export const customRoofId = z.custom(isRoofId, makeCustomErrorMessage('RoofId'));

export const customStairId = z.custom(isStairId, makeCustomErrorMessage('StairId'));
export const customRoofDormerId = z.custom(isRoofDormerId, makeCustomErrorMessage('RoofDormerId'));
