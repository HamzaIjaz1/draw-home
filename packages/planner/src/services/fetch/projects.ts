import { ProjectId, StrapiProjectId } from '@draw-house/common/dist/brands';
import { apiUrls } from '../apiUrls';
import { CreateProjectRouteResponse, DeleteProjectRouteResponse, Project, ProjectWithoutData, ProjectWithoutDataRouteResponse, UpdateProject, UpdateProjectRouteResponse } from '../../zod';
import { fetchHelper } from './fetchHelper';
import { createProjectDataForSave } from '../../utils/createProjectData';

export const createProject = async (saveData: Awaited<ReturnType<typeof createProjectDataForSave>>) => {
  const res = await fetchHelper.post(apiUrls.projects.create, {
    data: saveData,
  });

  const { success, data, error } = CreateProjectRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|w718ra|', error.issues);
    throw error;
  }

  if(data.success === false) {
    const statuses = {
      402: 'paymentRequired',
    } as const satisfies Record<typeof data.error.status, string>;

    return {
      success: false,
      error: statuses[data.error.status],
    } as const;
  }

  return {
    success: true,
    projectId: data.data.projectId,
  } as const;
};

export const getProject = async (id: ProjectId) => {
  const res = await fetchHelper.get(apiUrls.projects.get(id));

  const { success, data, error } = Project.safeParse(res);
  if(success === false) {
    console.error('|ok5n5n|', error.issues);
    throw error;
  }

  return {
    id: data.id,
    projectName: data.name,
    projectData: data.data.projectData,
  };
};

export const getMyProjects = async (): Promise<ProjectWithoutData[]> => {
  const res = await fetchHelper.get(apiUrls.projects.my);

  const { success, data, error } = ProjectWithoutDataRouteResponse.safeParse(res);
  if(success === false) {
    console.error('|op34rq|', error.issues);
    throw error;
  }

  return data;
};

export const deleteMyProject = async (id: StrapiProjectId): Promise<null | ProjectId> => {
  const res = await fetchHelper.delete(apiUrls.projects.delete(id));

  const { success, data } = DeleteProjectRouteResponse.safeParse(res);
  if(success === false) {
    return null;
  }

  return data.attributes.projectId;
};

export const updateMyProject = async (
  id: StrapiProjectId,
  project: Pick<Project, 'name'> | Pick<Project, 'name' | 'data'>,
): Promise<null | UpdateProject> => {
  const res = await fetchHelper.put(apiUrls.projects.update(id), {
    data: project,
  });

  const { success, data } = UpdateProjectRouteResponse.safeParse(res);
  if(success === false) {
    return null;
  }

  return data;
};
