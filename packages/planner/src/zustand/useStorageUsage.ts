import { create } from 'zustand';
import { StorageUsageRouteResponse } from '../zod/StorageUsage';
import { getStorageUsage } from '../services/fetch/getStorageUsage';

export type StorageUsageStore = {
  storageUsage: 'idle' | 'loading' | StorageUsageRouteResponse;
};

export const useStorageUsage = create<StorageUsageStore>(() => ({
  storageUsage: 'idle',
}));

export const requestToLoadStorageUsage = async (forceRefresh = false) => {
  const { storageUsage } = useStorageUsage.getState();

  if(forceRefresh === false) {
    if(storageUsage !== 'idle') {
      return;
    }

    useStorageUsage.setState({ storageUsage: 'loading' });
  }

  useStorageUsage.setState({
    storageUsage: await getStorageUsage(),
  });
};
