import { z } from 'zod/v4';
import { makeRouteResponse, numberInString } from '../../common';
import { AutoscaleCalculationFail, ClassificationFailed, ClassificationParsingFailed, FileDownloadError, NoDoorsFound, UnexpectedServerError, WrongQueryParams } from '../../apiResponseErrors';

export const ReqQuery = z.object({
  url: z.url(),
  confidence: numberInString,
});
export type ReqQuery = z.infer<typeof ReqQuery>;

export const RouteResponse = makeRouteResponse(
  z.union([
    UnexpectedServerError,
    WrongQueryParams,
    FileDownloadError,
    ClassificationFailed,
    ClassificationParsingFailed,
    NoDoorsFound,
    AutoscaleCalculationFail,
  ]),
  z.object({
    scaleRatio: z.number(),
    smallestDoorWidth: z.number(),
    totalDoorsFound: z.number(),
  }),
);
export type RouteResponse = z.infer<typeof RouteResponse>;
