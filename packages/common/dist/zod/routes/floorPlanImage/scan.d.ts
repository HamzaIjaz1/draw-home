import { z } from 'zod/v4';
export declare const ReqQuery: z.ZodObject<{
    url: z.ZodURL;
    wallThreshold: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    wallFurnitureThreshold: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
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
        type: "FloorPlanRecognitionTimeoutReached";
    } | {
        type: "FloorPlanRecognitionFail";
    }, {
        type: "UnexpectedServerError";
    } | {
        type: "WrongQueryParams";
        __WARNING_DO_NOT_USE__zodIssues: z.core.$ZodIssue[];
    } | {
        type: "FileDownloadError";
    } | {
        type: "FloorPlanRecognitionTimeoutReached";
    } | {
        type: "FloorPlanRecognitionFail";
    }, z.core.$ZodTypeInternals<{
        type: "UnexpectedServerError";
    } | {
        type: "WrongQueryParams";
        __WARNING_DO_NOT_USE__zodIssues: z.core.$ZodIssue[];
    } | {
        type: "FileDownloadError";
    } | {
        type: "FloorPlanRecognitionTimeoutReached";
    } | {
        type: "FloorPlanRecognitionFail";
    }, {
        type: "UnexpectedServerError";
    } | {
        type: "WrongQueryParams";
        __WARNING_DO_NOT_USE__zodIssues: z.core.$ZodIssue[];
    } | {
        type: "FileDownloadError";
    } | {
        type: "FloorPlanRecognitionTimeoutReached";
    } | {
        type: "FloorPlanRecognitionFail";
    }>>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<true>;
    error: z.ZodOptional<z.ZodUndefined>;
    data: z.ZodType<{
        aspectRatio: number;
        wallsData: {
            position: {
                start: {
                    x: number;
                    y: number;
                };
                end: {
                    x: number;
                    y: number;
                };
            };
            wallFurnitures: {
                type: "door" | "window";
                position: number;
                width: number;
            }[];
        }[];
    }, {
        aspectRatio: number;
        wallsData: {
            position: {
                start: {
                    x: number;
                    y: number;
                };
                end: {
                    x: number;
                    y: number;
                };
            };
            wallFurnitures: {
                type: "door" | "window";
                position: number;
                width: number;
            }[];
        }[];
    }, z.core.$ZodTypeInternals<{
        aspectRatio: number;
        wallsData: {
            position: {
                start: {
                    x: number;
                    y: number;
                };
                end: {
                    x: number;
                    y: number;
                };
            };
            wallFurnitures: {
                type: "door" | "window";
                position: number;
                width: number;
            }[];
        }[];
    }, {
        aspectRatio: number;
        wallsData: {
            position: {
                start: {
                    x: number;
                    y: number;
                };
                end: {
                    x: number;
                    y: number;
                };
            };
            wallFurnitures: {
                type: "door" | "window";
                position: number;
                width: number;
            }[];
        }[];
    }>>;
}, z.core.$strip>]>;
export type RouteResponse = z.infer<typeof RouteResponse>;
//# sourceMappingURL=scan.d.ts.map