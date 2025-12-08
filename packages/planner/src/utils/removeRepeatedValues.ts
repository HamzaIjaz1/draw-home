import { isUndefined, ObjEntries } from '@arthurka/ts-utils';

export const removeRepeatedValues = <T>(arr: T[]) => {
  const map = new Map<T, number>();

  for(const e of arr) {
    const value = map.get(e);

    map.set(e, isUndefined(value) ? 1 : value + 1);
  }

  return ObjEntries(map).filter(e => e[1] === 1).map(e => e[0]);
};
