import assert from 'assert';
import { getModelTextureOverlays } from '../../services';
import { useModelTextureOverlays } from './store';
import { isResolved } from '../../utils/isResolved';

export const useModelTextureOverlaysResolved = () => {
  const { modelTextureOverlays } = useModelTextureOverlays();
  assert(isResolved(modelTextureOverlays), 'Something went wrong. |cj1sv5|');

  return { modelTextureOverlays };
};
useModelTextureOverlaysResolved.getState = () => {
  const { modelTextureOverlays } = useModelTextureOverlays.getState();
  assert(isResolved(modelTextureOverlays), 'Something went wrong. |rkp8mz|');

  return { modelTextureOverlays };
};

export const requestToLoadModelTextureOverlays = async () => {
  const { modelTextureOverlays } = useModelTextureOverlays.getState();
  if(modelTextureOverlays !== 'idle') {
    return;
  }

  useModelTextureOverlays.setState({ modelTextureOverlays: 'loading' });
  useModelTextureOverlays.setState({
    modelTextureOverlays: await getModelTextureOverlays(),
  });
};
