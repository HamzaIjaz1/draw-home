import { z } from 'zod/v4';
import { customProjectId } from '../customSchemas';
import { zData } from '../common';

const UpdateProject = (
  z
    .object({
      attributes: z.object({
        projectId: customProjectId,
        name: z.string(),
      }),
    })
    .transform(({ attributes }) => attributes)
);
export type UpdateProject = z.infer<typeof UpdateProject>;

export const UpdateProjectRouteResponse = zData(UpdateProject);
