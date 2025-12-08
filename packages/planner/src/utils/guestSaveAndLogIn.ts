import { LANDING_PAGE_URL, NODE_ENV, PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { loginSearchParam, tempProjectQueryParam } from '@draw-house/common/dist/constants';
import assert from 'assert';
import { queryParams } from '../services';
import { createProjectHashWithReset } from '../zustand';
import { saveProject } from './project';

export const guestSaveAndLogIn = async () => {
  const { success, projectId } = await saveProject();
  assert(success === true, 'This should never happen. |rgr042|');

  await createProjectHashWithReset();

  queryParams.projectId.set(projectId);

  window.location.href = `${NODE_ENV === 'production' ? PLANNER_URL : LANDING_PAGE_URL}/login?${loginSearchParam}&${tempProjectQueryParam}=${projectId}`;
};
