import type { StrapiError, StrapiUser } from './common';

export const url = '/api/users/me';

export type Resp = StrapiUser | StrapiError;
