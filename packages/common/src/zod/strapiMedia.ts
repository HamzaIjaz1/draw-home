import { z } from 'zod/v4';
import { API_URL } from '../envVariables/public';

export const strapiAbsoluteUrl = z.union([
  z.url(),
  z.string().startsWith('/').min(2).transform(e => `${API_URL}${e}`),
]);
