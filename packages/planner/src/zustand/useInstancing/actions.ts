import { isUndefined } from '@arthurka/ts-utils';
import { InstancingStore, PoolItem, useInstancing } from './store';

const updatePools = (mutate: (draft: InstancingStore['pools']) => void) => {
  const { pools, version } = useInstancing.getState();
  const next: InstancingStore['pools'] = new Map<string, Map<string, PoolItem[]>>(pools);
  mutate(next);
  useInstancing.setState({
    pools: next,
    version: version + 1,
  });
};
const ensureInnerMap = (root: InstancingStore['pools'], url: string): Map<string, PoolItem[]> => {
  const inner = root.get(url);
  if(!isUndefined(inner)) {
    return inner;
  }

  const created = new Map<string, PoolItem[]>();
  root.set(url, created);

  return created;
};

export const upsertInstance = (item: PoolItem) => {
  const { enabled } = useInstancing.getState();
  if(enabled === false) {
    return;
  }

  updatePools(draft => {
    const currentInner = ensureInnerMap(draft, item.url);
    const inner = new Map<string, PoolItem[]>(currentInner);
    draft.set(item.url, inner);

    const currentArr = inner.get(item.materialSig) ?? [];
    const arr = currentArr.slice();
    const idx = arr.findIndex(x => x.id === item.id);

    if(idx >= 0) {
      arr[idx] = item;
    } else {
      arr.push(item);
    }

    inner.set(item.materialSig, arr);
  });
};

export const removeInstance = (item: PoolItem) => {
  updatePools(draft => {
    const inner = draft.get(item.url);
    if(isUndefined(inner)) {
      return;
    }

    const currentArr = inner.get(item.materialSig);
    if(isUndefined(currentArr)) {
      return;
    }

    const arr = currentArr.slice();
    const idx = arr.findIndex(x => x.id === item.id);
    if(idx >= 0) {
      arr.splice(idx, 1);
    }

    if(arr.length === 0) {
      inner.delete(item.materialSig);
      if(inner.size === 0) {
        draft.delete(item.url);
      } else {
        draft.set(item.url, new Map(inner));
      }
    } else {
      inner.set(item.materialSig, arr);
      draft.set(item.url, new Map(inner));
    }
  });
};

export const clearInstancing = () => {
  const { version } = useInstancing.getState();

  useInstancing.setState({
    pools: new Map<string, Map<string, PoolItem[]>>(),
    version: version + 1,
  });
};

export const setInstancingEnabled = (value: boolean) => {
  useInstancing.setState({ enabled: value });
};

export const setInstancingHeadroom = (value: number) => {
  useInstancing.setState({ headroom: Math.max(0, Math.floor(value)) });
};
