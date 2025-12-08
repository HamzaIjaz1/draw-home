import { wait } from '@arthurka/ts-utils';
import { isPromiseSettled } from '@draw-house/common/dist/utils';
import { useRef, useState } from 'react';

export const useOnClickWithLoading = <T>(onClick: (e: T) => void | Promise<void>) => {
  const [isOnClickLoading, setIsOnClickLoading] = useState(false);
  const isClickable = useRef(true);

  return {
    isOnClickLoading,
    async onCLickWithLoading(e: T) {
      if(isClickable.current === false) {
        return;
      }

      const promiseOrNot = onClick(e);

      if(promiseOrNot instanceof Promise) {
        try {
        // eslint-disable-next-line no-param-reassign
          isClickable.current = false;

          await wait(0.3);
          if(await isPromiseSettled(promiseOrNot)) {
            return;
          }

          setIsOnClickLoading(true);

          try {
            await promiseOrNot;
          } finally {
            setIsOnClickLoading(false);
          }
        } finally {
        // eslint-disable-next-line no-param-reassign
          isClickable.current = true;
        }
      }
    },
  };
};
