import { create } from 'zustand';

type Store = {
  isCancelSubscriptionPopUpOpened: boolean;
};

export const useIsCancelSubscriptionPopUpOpened = create<Store>(() => ({
  isCancelSubscriptionPopUpOpened: false,
}));
