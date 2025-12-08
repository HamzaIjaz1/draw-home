import assert from 'assert';
import { getMyProjects } from '../../services';
import { useMyProjects } from './store';
import { useUserResolved } from '../useUser';
import { isResolved } from '../../utils/isResolved';

export const useMyProjectsResolved = () => {
  const { myProjects } = useMyProjects();
  assert(isResolved(myProjects), 'Something went wrong. |p35q5j|');

  return { myProjects };
};
useMyProjectsResolved.getState = () => {
  const { myProjects } = useMyProjects.getState();
  assert(isResolved(myProjects), 'Something went wrong. |dyv5jr|');

  return { myProjects };
};

export const requestToLoadMyProjects = async () => {
  const { myProjects } = useMyProjects.getState();
  if(myProjects !== 'idle') {
    return;
  }

  if(useUserResolved.getState().user === 'guest') {
    useMyProjects.setState({ myProjects: [] });
    return;
  }

  useMyProjects.setState({ myProjects: 'loading' });
  useMyProjects.setState({
    myProjects: await getMyProjects(),
  });
};
