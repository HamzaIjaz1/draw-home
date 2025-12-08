import { create } from 'zustand';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { useWalls } from './useWalls/store';
import { useCustomModels } from './useCustomModels/store';
import { useLevels } from './useLevels/store';
import { useSpaces } from './useSpaces/store';
import { useAmountCounters } from './useAmountCounters';
import { useStairs } from './useStairs/store';
import { useRoofs } from './useRoofs/store';
import { updateRoofsSubtractions } from './useRoofsWallSubtraction/actions';

type Store = {
  useStore: SubscribedStoreHook;
  store: SubscribedStore;
  timestamp: number;
};

type UndoRedoStore = {
  prevStore: Store[];
  nextStore: Store[];
};

export const useUndoRedo = create<UndoRedoStore>(() => ({
  prevStore: [],
  nextStore: [],
}));

const listener = {
  isActive: true,
  _timeout: ((e: number | null) => e)(null),
  enable() {
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.isActive = true;
    }, 100);
  },
  disable() {
    if(!isNull(this._timeout)) {
      window.clearTimeout(this._timeout);
      this._timeout = null;
    }
    this.isActive = false;
  },
};

const moveFromTo = (fromStoreKey: keyof UndoRedoStore, toStoreKey: keyof UndoRedoStore) => {
  const {
    [fromStoreKey]: fromStore,
    [toStoreKey]: toStore,
  } = useUndoRedo.getState();

  const cur = fromStore.at(-1);
  const next = fromStore.at(-2);
  if(isUndefined(cur)) {
    return {
      shouldBeBunched: false,
    };
  }

  const { store, useStore, timestamp } = cur;
  const curStore = useStore.getState();

  listener.disable();

  useStore.setState(store);
  useUndoRedo.setState({
    [fromStoreKey]: fromStore.slice(0, -1),
    [toStoreKey]: [
      ...toStore,
      {
        useStore,
        store: curStore,
        timestamp,
      },
    ],
  });

  listener.enable();

  return {
    shouldBeBunched: isUndefined(next) ? false : Math.abs(next.timestamp - timestamp) < 300,
  };
};

export const undo = () => {
  // eslint-disable-next-line curly
  while(moveFromTo('prevStore', 'nextStore').shouldBeBunched === true);
  updateRoofsSubtractions();
};

export const redo = () => {
  // eslint-disable-next-line curly
  while(moveFromTo('nextStore', 'prevStore').shouldBeBunched === true);
  updateRoofsSubtractions();
};

type SubscribedStore = Parameters<Parameters<SubscribedStoreHook['subscribe']>[0]>[0];

const addToUndoRedo = (useStore: SubscribedStoreHook, store: SubscribedStore) => {
  const { prevStore } = useUndoRedo.getState();

  useUndoRedo.setState({
    prevStore: [
      ...prevStore.slice(-1000),
      {
        useStore,
        store,
        timestamp: Date.now(),
      },
    ],
    nextStore: [],
  });
};

const subscribe = (useStore: SubscribedStoreHook) => {
  useStore.subscribe((store, prevState) => {
    if(listener.isActive === false) {
      return;
    }

    addToUndoRedo(useStore, prevState);
  });
};

type SubscribedStoreHook = (
  | typeof useWalls
  | typeof useCustomModels
  | typeof useLevels
  | typeof useSpaces
  | typeof useAmountCounters
  | typeof useStairs
  | typeof useRoofs
);

subscribe(useWalls);
subscribe(useCustomModels);
subscribe(useLevels);
subscribe(useSpaces);
subscribe(useAmountCounters);
subscribe(useStairs);
subscribe(useRoofs);
