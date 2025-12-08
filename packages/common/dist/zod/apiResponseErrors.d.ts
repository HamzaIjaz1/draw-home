import { z } from 'zod/v4';
export declare const UnexpectedServerError: z.ZodObject<{
    type: z.ZodLiteral<"UnexpectedServerError">;
}, z.core.$strip>;
export type UnexpectedServerError = z.infer<typeof UnexpectedServerError>;
export declare const WrongQueryParams: z.ZodObject<{
    type: z.ZodLiteral<"WrongQueryParams">;
    __WARNING_DO_NOT_USE__zodIssues: z.ZodCustom<z.core.$ZodIssue[], z.core.$ZodIssue[]>;
}, z.core.$strip>;
export declare const FileDownloadError: z.ZodObject<{
    type: z.ZodLiteral<"FileDownloadError">;
}, z.core.$strip>;
export declare const FloorPlanRecognitionTimeoutReached: z.ZodObject<{
    type: z.ZodLiteral<"FloorPlanRecognitionTimeoutReached">;
}, z.core.$strip>;
export declare const FloorPlanRecognitionFail: z.ZodObject<{
    type: z.ZodLiteral<"FloorPlanRecognitionFail">;
}, z.core.$strip>;
export declare const ClassificationFailed: z.ZodObject<{
    type: z.ZodLiteral<"ClassificationFailed">;
}, z.core.$strip>;
export declare const ClassificationParsingFailed: z.ZodObject<{
    type: z.ZodLiteral<"ClassificationParsingFailed">;
}, z.core.$strip>;
export declare const NoDoorsFound: z.ZodObject<{
    type: z.ZodLiteral<"NoDoorsFound">;
}, z.core.$strip>;
export declare const AutoscaleCalculationFail: z.ZodObject<{
    type: z.ZodLiteral<"AutoscaleCalculationFail">;
}, z.core.$strip>;
//# sourceMappingURL=apiResponseErrors.d.ts.map