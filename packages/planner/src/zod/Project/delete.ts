import { z } from 'zod/v4';
import { customProjectId } from '../customSchemas';
import { zData } from '../common';

const DeleteProject = z.object({
  attributes: z.object({
    projectId: customProjectId,
  }),
});
export type DeleteProject = z.infer<typeof DeleteProject>;

export const DeleteProjectRouteResponse = zData(DeleteProject);
