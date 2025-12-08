import { create } from 'zustand';
import { isNull } from '@arthurka/ts-utils';
import { throttle } from 'throttle-debounce';
import { createHash } from '../utils/createHash';
import { createProjectDataForHash } from '../utils/createProjectData';
import { extendedJSON } from '../utils/safeJSONParse';
import { withComparingSetState } from '../utils/withComparingSetState';

export type ProjectHashStore = {
  projectHash: null | {
    initial: string;
    current: string;
  };
};

export const useProjectHash = create<ProjectHashStore>(() => ({
  projectHash: null,
}));

withComparingSetState(useProjectHash);

const common = async (withReset: boolean) => {
  const hash = await createHash(extendedJSON.stringify(createProjectDataForHash()));
  const { projectHash } = useProjectHash.getState();

  useProjectHash.setState({
    projectHash: {
      initial: withReset === true || isNull(projectHash) ? hash : projectHash.initial,
      current: hash,
    },
  });
};

export const createProjectHash = throttle(300, () => common(false));
export const createProjectHashWithReset = () => common(true);
