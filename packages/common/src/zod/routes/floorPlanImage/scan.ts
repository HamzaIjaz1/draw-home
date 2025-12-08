import { z } from 'zod/v4';
import { makeRouteResponse } from '../../common';
import { FileDownloadError, FloorPlanRecognitionFail, FloorPlanRecognitionTimeoutReached, UnexpectedServerError, WrongQueryParams } from '../../apiResponseErrors';

export const ReqQuery = z.object({
  url: z.url(),
  wallThreshold: z.string().transform(e => +e).refine(e => z.number().int().min(1).max(1000).parse(e)),
  wallFurnitureThreshold: z.string().transform(e => +e).refine(e => z.number().int().min(1).max(1000).parse(e)),
});
export type ReqQuery = z.infer<typeof ReqQuery>;

export const RouteResponse = makeRouteResponse(
  z.union([UnexpectedServerError, WrongQueryParams, FileDownloadError, FloorPlanRecognitionTimeoutReached, FloorPlanRecognitionFail]),
  z.object({
    aspectRatio: z.number(),
    wallsData: z.array(
      z.object({
        position: z.object({
          start: z.object({
            x: z.number(),
            y: z.number(),
          }),
          end: z.object({
            x: z.number(),
            y: z.number(),
          }),
        }),
        wallFurnitures: z.array(
          z.object({
            type: z.enum(['door', 'window']),
            position: z.number(),
            width: z.number(),
          }),
        ),
      }),
    ),
  }),
);
export type RouteResponse = z.infer<typeof RouteResponse>;
