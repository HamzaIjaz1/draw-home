import { SafeOmit } from '@draw-house/common/dist/utils';
import { useMemo, useState } from 'react';

type UseSetActions<T> = {
  add: (value: T) => void;
  remove: (value: T) => void;
  toggle: (value: T) => void;
  clear: () => void;
};
type UseSetReturn<T> = [
  SafeOmit<Set<T>, 'add' | 'clear' | 'delete'>,
  UseSetActions<T>,
];

export const useSet = <T>(initialState: Iterable<T>): UseSetReturn<T> => {
  const [set, setSet] = useState(new Set(initialState));

  const actions: UseSetActions<T> = useMemo(() => ({
    add(value) {
      setSet(prev => {
        const copy = new Set(prev);

        copy.add(value);

        return copy;
      });
    },
    remove(value) {
      setSet(prev => {
        const copy = new Set(prev);

        copy.delete(value);

        return copy;
      });
    },
    toggle(value) {
      setSet(prev => {
        const copy = new Set(prev);

        if(copy.has(value)) {
          copy.delete(value);
        } else {
          copy.add(value);
        }

        return copy;
      });
    },
    clear() {
      setSet(new Set());
    },
  }), []);

  return [set, actions];
};
