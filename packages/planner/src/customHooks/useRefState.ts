import { useCallback, useRef, useState } from 'react';

export const useRefState = <T>(value: T) => {
  const [state, setState] = useState(value);
  const ref = useRef(state);
  ref.current = state;

  const setRefState = useCallback((e: T) => {
    setState(e);
    ref.current = e;
  }, []);

  return [ref, setRefState] as const;
};
