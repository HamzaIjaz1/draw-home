import { Brand, WITNESS } from '@arthurka/ts-utils';
import { validate } from 'uuid';
import { initializeByTypeGuard } from '../utils';
import { isNonEmptyString, NonEmptyString } from './common';

export type UUID = Brand<NonEmptyString, 'UUID'>;
export const isUUID = (e: unknown): e is UUID => (
  true
    && isNonEmptyString(e)
    && validate(e)
);
export const UUID = (e: UUID[WITNESS]): UUID => (
  initializeByTypeGuard(e, isUUID, 'UUID')
);

export type WallId = Brand<UUID, 'WallId'>;
export const isWallId = (e: unknown): e is WallId => isUUID(e);
export const WallId = (e: WallId[WITNESS]): WallId => (
  initializeByTypeGuard(e, isWallId, 'WallId')
);

export type WallFurnitureId = Brand<UUID, 'WallFurnitureId'>;
export const isWallFurnitureId = (e: unknown): e is WallFurnitureId => isUUID(e);
export const WallFurnitureId = (e: WallFurnitureId[WITNESS]): WallFurnitureId => (
  initializeByTypeGuard(e, isWallFurnitureId, 'WallFurnitureId')
);

export type CustomModelId = Brand<UUID, 'CustomModelId'>;
export const isCustomModelId = (e: unknown): e is CustomModelId => isUUID(e);
export const CustomModelId = (e: CustomModelId[WITNESS]): CustomModelId => (
  initializeByTypeGuard(e, isCustomModelId, 'CustomModelId')
);

export type LevelId = Brand<UUID, 'LevelId'>;
export const isLevelId = (e: unknown): e is LevelId => isUUID(e);
export const LevelId = (e: LevelId[WITNESS]): LevelId => (
  initializeByTypeGuard(e, isLevelId, 'LevelId')
);

export type SpaceId = Brand<UUID, 'SpaceId'>;
export const isSpaceId = (e: unknown): e is SpaceId => isUUID(e);
export const SpaceId = (e: SpaceId[WITNESS]): SpaceId => (
  initializeByTypeGuard(e, isSpaceId, 'SpaceId')
);

export type StairId = Brand<UUID, 'StairId'>;
export const isStairId = (e: unknown): e is StairId => isUUID(e);
export const StairId = (e: StairId[WITNESS]): StairId => (
  initializeByTypeGuard(e, isStairId, 'StairId')
);

export type RoofId = Brand<UUID, 'RoofId'>;
export const isRoofId = (e: unknown): e is RoofId => isUUID(e);
export const RoofId = (e: RoofId[WITNESS]): RoofId => (
  initializeByTypeGuard(e, isRoofId, 'RoofId')
);

export type RoofDormerId = Brand<UUID, 'RoofDormerId'>;
export const isRoofDormerId = (e: unknown): e is RoofDormerId => isUUID(e);
export const RoofDormerId = (e: RoofDormerId[WITNESS]): RoofDormerId => (
  initializeByTypeGuard(e, isRoofDormerId, 'RoofDormerId')
);
