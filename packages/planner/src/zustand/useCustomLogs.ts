import { create } from 'zustand';

type Store = {
  customLogs: unknown[][];
};

export const useCustomLogs = create<Store>(() => ({
  customLogs: [],
}));

export const customLog = (...params: unknown[]) => {
  window.setTimeout(() => {
    const { customLogs } = useCustomLogs.getState();

    useCustomLogs.setState({
      customLogs: [
        ...customLogs,
        params,
      ],
    });
  }, 0);
};
