import { StrictExtract } from '@draw-house/common/dist/utils';
import { CreationModeStore, useCreationMode } from '../zustand';

type TrackedCreationMode = StrictExtract<CreationModeStore['creationMode'], 'pointer' | 'walls'>;
const isTrackedMode = (e: CreationModeStore['creationMode'] | null): e is TrackedCreationMode => e === 'pointer' || e === 'walls';

let nextPointerIsUser = false;
const listeners = new Set<(prev: TrackedCreationMode) => void>();
let installed = false;
let prevTracked: TrackedCreationMode | null = null;

export const clickPointerModeButton = () => {
  nextPointerIsUser = true;
  useCreationMode.setState({ creationMode: 'pointer' });
};

export const onAutoSwitchToPointer = (cb: (prev: CreationModeStore['creationMode'] | null) => void): () => void => {
  listeners.add(cb);

  if(installed === false) {
    installed = true;

    useCreationMode.subscribe(({ creationMode }) => {
      if(!isTrackedMode(creationMode)) {
        return;
      }

      const prev = prevTracked;
      if(prev === creationMode) {
        return;
      }

      if(creationMode === 'pointer' && prev === 'walls') {
        const isUser = nextPointerIsUser;
        nextPointerIsUser = false;
        if(isUser === false) {
          listeners.forEach(fn => fn(prev));
        }
      }

      prevTracked = creationMode;
    });
  }

  return () => {
    listeners.delete(cb);
  };
};
