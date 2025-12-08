import assert from 'assert';
import { getFeatureTips } from '../../services';
import { isResolved } from '../../utils/isResolved';
import { useFeatureTips } from './store';

export const useFeatureTipsResolved = () => {
  const { featureTips } = useFeatureTips();
  assert(isResolved(featureTips), 'Something went wrong. |r3ni70|');

  return { featureTips };
};
useFeatureTipsResolved.getState = () => {
  const { featureTips } = useFeatureTips.getState();
  assert(isResolved(featureTips), 'Something went wrong. |30owy2|');

  return { featureTips };
};

export const requestToLoadFeatureTips = async () => {
  const { featureTips } = useFeatureTips.getState();
  if(featureTips !== 'idle') {
    return;
  }

  useFeatureTips.setState({ featureTips: 'loading' });

  useFeatureTips.setState({
    featureTips: await getFeatureTips(),
  });
};
