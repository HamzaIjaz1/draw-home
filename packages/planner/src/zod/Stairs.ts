import { z } from 'zod/v4';
import { Quaternion, Vector3 } from 'three';
import { customLevelId, customNonNegative, customPositive, customStairId } from './customSchemas';

export const Stair = z.strictObject({
  id: customStairId,
  levelId: customLevelId,
  position: z.instanceof(Vector3),
  quaternion: z.instanceof(Quaternion),
  type: z.enum(['straight', 'l-shaped', 'u-shaped', 'spiral']),
  height: customPositive,
  width: customPositive,
  run: customPositive,
  rise: customPositive,
  supportType: z.enum(['stringer', 'beam', 'box', 'central-pole', 'none']),
  landingPosition: z.enum(['none', 'symmetric', 'custom']).optional(),
  numberOfLandings: z.number(),
  landingLength: z.number().optional(),
  landingType: z.enum(['landing', 'winders']),
  numberOfWinders: z.number(),
  mirror: z.boolean(),
  gapBetweenFlights: z.number(),
  stairConfiguration: z.enum(['two-flights', 'three-flights']),
  innerRadius: customNonNegative.optional(),
  outerRadius: customNonNegative.optional(),
  includeTopLanding: z.boolean(),
  topLandingRailingOrientation: z.enum(['outerLeft', 'middle', 'outerRight']),
  commentName: z.string(),
  commentStairs: z.string(),
  commentStringer: z.string(),
  commentRailings: z.string(),
  railingLocation: z.strictObject({
    left: z.boolean(),
    right: z.boolean(),
  }),
  stringerLocations: z.strictObject({
    left: z.boolean(),
    middle: z.boolean(),
    right: z.boolean(),
  }),
  landings: z.strictObject({
    stepsAfter: z.array(z.number()),
    lengths: z.array(z.number()),
  }).optional(),
  isFlippedHorizontal: z.boolean(),
  isMirrored: z.boolean(),
  isHidden: z.boolean(),
});
export type Stair = z.infer<typeof Stair>;

export const Stairs = z.array(Stair);
