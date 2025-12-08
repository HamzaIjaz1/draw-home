import { z } from 'zod/v4';

export const StorageUsageRouteResponse = z.object({
  totalSizeKilobytes: z.number(),
});
export type StorageUsageRouteResponse = z.infer<typeof StorageUsageRouteResponse>;
