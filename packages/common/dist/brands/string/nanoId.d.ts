import { Brand, WITNESS } from '@arthurka/ts-utils';
import { NonEmptyString } from './common';
export type NanoId = Brand<NonEmptyString, 'NanoId'>;
export declare const isNanoId: (e: unknown) => e is NanoId;
export declare const NanoId: (e: NanoId[WITNESS]) => NanoId;
export type ProjectId = Brand<NanoId, 'ProjectId'>;
export declare const isProjectId: (e: unknown) => e is ProjectId;
export declare const ProjectId: (e: ProjectId[WITNESS]) => ProjectId;
//# sourceMappingURL=nanoId.d.ts.map