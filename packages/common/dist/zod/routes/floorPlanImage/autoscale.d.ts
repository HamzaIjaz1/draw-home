import { z } from 'zod/v4';
export declare const ReqQuery: z.ZodObject<{
    url: z.ZodURL;
    confidence: z.ZodPipe<z.ZodTransform<number, import("@arthurka/ts-reset/dist/utils").StringInsertable>, z.ZodNumber>;
}, z.core.$strip>;
export type ReqQuery = z.infer<typeof ReqQuery>;
export declare const RouteResponse: z.ZodUnion<readonly [z.ZodObject<{
    success: z.ZodLiteral<false>;
    data: z.ZodOptional<z.ZodUndefined>;
    error: z.ZodType<{
        type: "UnexpectedServerError";
    } | {
        type: "WrongQueryParams";
        __WARNING_DO_NOT_USE__zodIssues: z.core.$ZodIssue[];
    } | {
        type: "FileDownloadError";
    } | {
        type: "ClassificationFailed";
    } | {
        type: "ClassificationParsingFailed";
    } | {
        type: "NoDoorsFound";
    } | {
        type: "AutoscaleCalculationFail";
    }, {
        type: "UnexpectedServerError";
    } | {
        type: "WrongQueryParams";
        __WARNING_DO_NOT_USE__zodIssues: z.core.$ZodIssue[];
    } | {
        type: "FileDownloadError";
    } | {
        type: "ClassificationFailed";
    } | {
        type: "ClassificationParsingFailed";
    } | {
        type: "NoDoorsFound";
    } | {
        type: "AutoscaleCalculationFail";
    }, z.core.$ZodTypeInternals<{
        type: "UnexpectedServerError";
    } | {
        type: "WrongQueryParams";
        __WARNING_DO_NOT_USE__zodIssues: z.core.$ZodIssue[];
    } | {
        type: "FileDownloadError";
    } | {
        type: "ClassificationFailed";
    } | {
        type: "ClassificationParsingFailed";
    } | {
        type: "NoDoorsFound";
    } | {
        type: "AutoscaleCalculationFail";
    }, {
        type: "UnexpectedServerError";
    } | {
        type: "WrongQueryParams";
        __WARNING_DO_NOT_USE__zodIssues: z.core.$ZodIssue[];
    } | {
        type: "FileDownloadError";
    } | {
        type: "ClassificationFailed";
    } | {
        type: "ClassificationParsingFailed";
    } | {
        type: "NoDoorsFound";
    } | {
        type: "AutoscaleCalculationFail";
    }>>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<true>;
    error: z.ZodOptional<z.ZodUndefined>;
    data: z.ZodType<{
        scaleRatio: number;
        smallestDoorWidth: number;
        totalDoorsFound: number;
    }, {
        scaleRatio: number;
        smallestDoorWidth: number;
        totalDoorsFound: number;
    }, z.core.$ZodTypeInternals<{
        scaleRatio: number;
        smallestDoorWidth: number;
        totalDoorsFound: number;
    }, {
        scaleRatio: number;
        smallestDoorWidth: number;
        totalDoorsFound: number;
    }>>;
}, z.core.$strip>]>;
export type RouteResponse = z.infer<typeof RouteResponse>;
//# sourceMappingURL=autoscale.d.ts.map