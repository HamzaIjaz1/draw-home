import { useEffect } from 'react';
import { useIsProjectSavable } from '../customHooks';

export const BeforeUnloadCheck: React.FC = () => {
  const { isProjectSavable } = useIsProjectSavable();

  useEffect(() => {
    if(isProjectSavable === false) {
      return;
    }

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handler);

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [isProjectSavable]);

  return null;
};
