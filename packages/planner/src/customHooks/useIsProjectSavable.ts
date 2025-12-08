import { isNull } from '@arthurka/ts-utils';
import { ProjectHashStore, useProjectHash } from '../zustand';

const get = (projectHash: ProjectHashStore['projectHash']) => (
  !(isNull(projectHash) || projectHash.initial === projectHash.current)
);

export const useIsProjectSavable = () => {
  const isProjectSavable = useProjectHash(s => get(s.projectHash));

  return {
    isProjectSavable,
  };
};

useIsProjectSavable.getState = () => {
  const { projectHash } = useProjectHash.getState();

  return {
    isProjectSavable: get(projectHash),
  };
};
