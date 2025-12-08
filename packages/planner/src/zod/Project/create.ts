import { z } from 'zod/v4';
import { customProjectId } from '../customSchemas';
import { zDataError, zDataSuccess } from '../common';

const CreateProject = (
  z
    .object({
      attributes: z.object({
        projectId: customProjectId,
      }),
    })
    .transform(({ attributes }) => attributes)
);
export type CreateProject = z.infer<typeof CreateProject>;

export const CreateProjectRouteResponse = z.union([
  zDataSuccess(CreateProject),
  zDataError(
    z.object({
      status: z.literal(402),
    }),
  ),
]);
