import { z } from 'zod/v4';

export const TextureTransformSchema = z.object({
  wScale: z.number().nonnegative().gte(0.01).default(1),
  lScale: z.number().nonnegative().gte(0.01).default(1),
  rotateDeg: z.number().default(0),
});

export type TextureTransform = z.infer<typeof TextureTransformSchema>;

export const DEFAULT_TEXTURE_TRANSFORM: TextureTransform = Object.freeze(
  TextureTransformSchema.parse({}),
);
