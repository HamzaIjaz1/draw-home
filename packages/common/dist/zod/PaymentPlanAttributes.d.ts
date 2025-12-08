import { z } from 'zod/v4';
export declare const PaymentPlanAttributes: z.ZodPipe<z.ZodObject<{
    type: z.ZodEnum<{
        professional: "professional";
        team: "team";
    }>;
    label: z.ZodString;
    monthlyPriceInCents: z.ZodNumber;
    yearlyPriceInCents: z.ZodNumber;
    monthlyProductId: z.ZodNullable<z.ZodString>;
    yearlyProductId: z.ZodNullable<z.ZodString>;
}, z.core.$strip>, z.ZodTransform<{
    monthlyProductId: string | null;
    yearlyProductId: string | null;
    type: "professional" | "team";
    label: string;
    monthlyPriceInCents: number;
    yearlyPriceInCents: number;
}, {
    type: "professional" | "team";
    label: string;
    monthlyPriceInCents: number;
    yearlyPriceInCents: number;
    monthlyProductId: string | null;
    yearlyProductId: string | null;
}>>;
//# sourceMappingURL=PaymentPlanAttributes.d.ts.map