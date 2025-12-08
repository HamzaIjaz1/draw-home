import { Brand, WITNESS } from '@arthurka/ts-utils';
import { isNonEmptyString, NonEmptyString } from './common';
import { initializeByTypeGuard } from '../utils';

export type NanoId = Brand<NonEmptyString, 'NanoId'>;
export const isNanoId = (e: unknown): e is NanoId => isNonEmptyString(e);
export const NanoId = (e: NanoId[WITNESS]): NanoId => (
  initializeByTypeGuard(e, isNanoId, 'NanoId')
);

export type ProjectId = Brand<NanoId, 'ProjectId'>;
export const isProjectId = (e: unknown): e is ProjectId => isNanoId(e);
export const ProjectId = (e: ProjectId[WITNESS]): ProjectId => (
  initializeByTypeGuard(e, isProjectId, 'ProjectId')
);
