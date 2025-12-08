import { z } from 'zod/v4';

export const UnexpectedServerError = z.object({
  type: z.literal('UnexpectedServerError'),
});
export type UnexpectedServerError = z.infer<typeof UnexpectedServerError>;

export const WrongQueryParams = z.object({
  type: z.literal('WrongQueryParams'),
  __WARNING_DO_NOT_USE__zodIssues: z.custom((e): e is z.core.$ZodIssue[] => true),
});

export const FileDownloadError = z.object({
  type: z.literal('FileDownloadError'),
});
export const FloorPlanRecognitionTimeoutReached = z.object({
  type: z.literal('FloorPlanRecognitionTimeoutReached'),
});
export const FloorPlanRecognitionFail = z.object({
  type: z.literal('FloorPlanRecognitionFail'),
});

export const ClassificationFailed = z.object({
  type: z.literal('ClassificationFailed'),
});
export const ClassificationParsingFailed = z.object({
  type: z.literal('ClassificationParsingFailed'),
});
export const NoDoorsFound = z.object({
  type: z.literal('NoDoorsFound'),
});
export const AutoscaleCalculationFail = z.object({
  type: z.literal('AutoscaleCalculationFail'),
});
