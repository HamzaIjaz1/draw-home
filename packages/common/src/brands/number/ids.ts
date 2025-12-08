import { Brand, WITNESS } from '@arthurka/ts-utils';
import { initializeByTypeGuard } from '../utils';
import { isPositiveInteger, PositiveInteger } from './common';

export type StrapiId = Brand<PositiveInteger, 'StrapiId'>;
export const isStrapiId = (e: unknown): e is StrapiId => isPositiveInteger(e);
export const StrapiId = (e: StrapiId[WITNESS]): StrapiId => (
  initializeByTypeGuard(e, isStrapiId, 'StrapiId')
);

export type StrapiMediaId = Brand<StrapiId, 'StrapiMediaId'>;
export const isStrapiMediaId = (e: unknown): e is StrapiMediaId => isStrapiId(e);
export const StrapiMediaId = (e: StrapiMediaId[WITNESS]): StrapiMediaId => (
  initializeByTypeGuard(e, isStrapiMediaId, 'StrapiMediaId')
);

export type StrapiProjectId = Brand<StrapiId, 'StrapiProjectId'>;
export const isStrapiProjectId = (e: unknown): e is StrapiProjectId => isStrapiId(e);
export const StrapiProjectId = (e: StrapiProjectId[WITNESS]): StrapiProjectId => (
  initializeByTypeGuard(e, isStrapiProjectId, 'StrapiProjectId')
);

export type StrapiComponentId = Brand<StrapiId, 'StrapiComponentId'>;
export const isStrapiComponentId = (e: unknown): e is StrapiComponentId => isStrapiId(e);
export const StrapiComponentId = (e: StrapiComponentId[WITNESS]): StrapiComponentId => (
  initializeByTypeGuard(e, isStrapiComponentId, 'StrapiComponentId')
);

export type StrapiCustomModelId = Brand<StrapiId, 'StrapiCustomModelId'>;
export const isStrapiCustomModelId = (e: unknown): e is StrapiCustomModelId => isStrapiId(e);
export const StrapiCustomModelId = (e: StrapiCustomModelId[WITNESS]): StrapiCustomModelId => (
  initializeByTypeGuard(e, isStrapiCustomModelId, 'StrapiCustomModelId')
);

export type StrapiCustomModelCategoryId = Brand<StrapiId, 'StrapiCustomModelCategoryId'>;
export const isStrapiCustomModelCategoryId = (e: unknown): e is StrapiCustomModelCategoryId => isStrapiId(e);
export const StrapiCustomModelCategoryId = (e: StrapiCustomModelCategoryId[WITNESS]): StrapiCustomModelCategoryId => (
  initializeByTypeGuard(e, isStrapiCustomModelCategoryId, 'StrapiCustomModelCategoryId')
);

export type DefaultTextureId = Brand<StrapiId, 'DefaultTextureId'>;
export const isDefaultTextureId = (e: unknown): e is DefaultTextureId => isStrapiId(e);
export const DefaultTextureId = (e: DefaultTextureId[WITNESS]): DefaultTextureId => (
  initializeByTypeGuard(e, isDefaultTextureId, 'DefaultTextureId')
);

export type TextureAssetCategoryId = Brand<StrapiId, 'TextureAssetCategoryId'>;
export const isTextureAssetCategoryId = (e: unknown): e is TextureAssetCategoryId => isStrapiId(e);
export const TextureAssetCategoryId = (e: TextureAssetCategoryId[WITNESS]): TextureAssetCategoryId => (
  initializeByTypeGuard(e, isTextureAssetCategoryId, 'TextureAssetCategoryId')
);

export type StrapiAppConfigId = Brand<StrapiId, 'StrapiAppConfigId'>;
export const isStrapiAppConfigId = (e: unknown): e is StrapiAppConfigId => isStrapiId(e);
export const StrapiAppConfigId = (e: StrapiAppConfigId[WITNESS]): StrapiAppConfigId => (
  initializeByTypeGuard(e, isStrapiAppConfigId, 'StrapiAppConfigId')
);

export type TextureAssetId = Brand<StrapiId, 'TextureAssetId'>;
export const isTextureAssetId = (e: unknown): e is TextureAssetId => isStrapiId(e);
export const TextureAssetId = (e: TextureAssetId[WITNESS]): TextureAssetId => (
  initializeByTypeGuard(e, isTextureAssetId, 'TextureAssetId')
);

export type FeatureTipId = Brand<StrapiId, 'FeatureTipId'>;
export const isFeatureTipId = (e: unknown): e is FeatureTipId => isStrapiId(e);
export const FeatureTipId = (e: FeatureTipId[WITNESS]): FeatureTipId => (
  initializeByTypeGuard(e, isFeatureTipId, 'FeatureTipId')
);
