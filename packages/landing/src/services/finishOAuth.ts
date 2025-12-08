import type { StrapiError, StrapiUser } from './common';

export const url = (strapiOAuthLocation: string) => `/api/auth/google/callback?${strapiOAuthLocation}`;

export type Resp = (
  | StrapiError
  | {
    user: StrapiUser;
    jwt: string;
  }
);
