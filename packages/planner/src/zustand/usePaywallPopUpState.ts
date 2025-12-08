import { create } from 'zustand';

type Store = {
  paywallPopUpState: (
    | null
    | {
      type: 'paywall';
    }
    | {
      type: 'checkout';
      productId: string;
    }
  );
};

export const usePaywallPopUpState = create<Store>(() => ({
  paywallPopUpState: null,
}));
