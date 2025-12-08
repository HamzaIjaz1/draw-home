import assert from 'assert';
import { create } from 'zustand';
import { getQuickTourData } from '../services';
import { QuickTourRouteResponse } from '../zod';
import { isResolved } from '../utils/isResolved';

export type QuickTourDataStore = {
  quickTourData: 'idle' | 'loading' | QuickTourRouteResponse;
};

export const useQuickTourData = create<QuickTourDataStore>(() => ({
  quickTourData: 'idle',
}));

export const useQuickTourDataResolved = () => {
  const { quickTourData } = useQuickTourData();
  assert(isResolved(quickTourData), 'Something went wrong. |ied2rg|');

  return { quickTourData };
};
useQuickTourDataResolved.getState = () => {
  const { quickTourData } = useQuickTourData.getState();
  assert(isResolved(quickTourData), 'Something went wrong. |xvq8af|');

  return { quickTourData };
};

export const requestToLoadQuickTourData = async () => {
  const { quickTourData } = useQuickTourData.getState();
  if(quickTourData !== 'idle') {
    return;
  }

  useQuickTourData.setState({ quickTourData: 'loading' });

  useQuickTourData.setState({
    quickTourData: await getQuickTourData(),
  });
};
