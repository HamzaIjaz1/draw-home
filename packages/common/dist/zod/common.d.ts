import { z, ZodType } from 'zod/v4';
export declare const noTrailingSlashUrl: z.ZodURL;
export declare const numberInString: z.ZodPipe<z.ZodTransform<number, import("@arthurka/ts-reset/dist/utils").StringInsertable>, z.ZodNumber>;
export declare const dateOrDateLike: z.ZodUnion<readonly [z.ZodDate, z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>]>;
export declare const makeRouteResponse: <U1, V1, U2, V2>(error: ZodType<U1, V1>, data: ZodType<U2, V2>) => z.ZodUnion<readonly [z.ZodObject<{
    success: z.ZodLiteral<false>;
    data: z.ZodOptional<z.ZodUndefined>;
    error: z.ZodType<U1, V1, z.core.$ZodTypeInternals<U1, V1>>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<true>;
    error: z.ZodOptional<z.ZodUndefined>;
    data: z.ZodType<U2, V2, z.core.$ZodTypeInternals<U2, V2>>;
}, z.core.$strip>]>;
//# sourceMappingURL=common.d.ts.map