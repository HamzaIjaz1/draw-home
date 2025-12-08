import { isNull, isUndefined } from '@arthurka/ts-utils';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { Animations } from './animations';

export type IdleCloseProps = {
  delay: number;
  getIsOpened: () => boolean;
  onClose: () => void;
  ignore?: () => boolean;
};

export const IdleClose: React.FCWithChildren<IdleCloseProps> = ({ delay, ignore, getIsOpened, onClose, children }) => {
  const closeTimeout = useRef<number | null>(null);
  const _onClose = useRef(onClose);

  const isIgnored = isUndefined(ignore) ? false : ignore();
  const setClosingTimeout = useCallback(() => {
    if(isIgnored === true) {
      return;
    }

    closeTimeout.current = window.setTimeout(() => {
      _onClose.current();
    }, delay);
  }, [isIgnored, delay]);
  const clearClosingTimeout = () => {
    if(!isNull(closeTimeout.current)) {
      window.clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  };

  const isMounted = getIsOpened();

  useEffect(() => {
    if(isMounted === false) {
      clearClosingTimeout();
      return;
    }

    setClosingTimeout();

    return () => {
      clearClosingTimeout();
    };
  }, [isMounted, setClosingTimeout]);

  return (
    <AnimatePresence>
      {
        isMounted === true && (
          <Animations.fade>
            <div onPointerEnter={clearClosingTimeout} onPointerLeave={setClosingTimeout}>
              {children}
            </div>
          </Animations.fade>
        )
      }
    </AnimatePresence>
  );
};
