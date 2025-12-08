import { z } from 'zod/v4';

export type StrapiUser = {
  'id': number;
  'username': string;
  'email': string;
  'provider': 'google';
  'confirmed': boolean;
  'blocked': boolean;
  'createdAt': string;
  'updatedAt': string;
};

export type StrapiError = {
  data: null;
  error: {
    'status': number;
    'name': string;
    'message': string;
    'details': Object;
  };
};

export const strapiErrorSchema = z.object({
  error: z.object({
    message: z.string(),
    details: z.object({
      errors: z.array(z.object({
        path: z.array(z.string()),
        message: z.string(),
        name: z.string(),
      })).optional(),
    }),
  }),
});
