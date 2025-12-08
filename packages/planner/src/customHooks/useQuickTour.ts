import { useTour } from '@reactour/tour';
import { useCallback, useEffect } from 'react';
import { LocalStorageService } from '../services/LocalStorageService';
import { onClose, onOpen } from '../components/QuickTourProvider';

export const useQuickTour = () => {
  const { isOpen, setIsOpen, setCurrentStep } = useTour();

  const isCompleted = LocalStorageService.quickTour.isCompleted.get();

  const state = (
    isCompleted === true
      ? 'completed' as const
      : isOpen === true
        ? 'in-progress' as const
        : 'not-started' as const
  );

  const open = useCallback(() => {
    setIsOpen(true);
    setCurrentStep(0);
    onOpen();
    LocalStorageService.quickTour.isCompleted.set(false);
  }, [setCurrentStep, setIsOpen]);

  useEffect(() => {
    if(state === 'not-started') {
      open();
    }
  }, [open, state]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if(e.code === 'Escape') {
        onClose();
      }
    };

    if(isOpen === true) {
      document.addEventListener('keydown', handler);
    } else {
      document.removeEventListener('keydown', handler);
    }

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [isOpen]);

  return {
    quickTourState: state,
    openQuickTour: open,
  };
};
