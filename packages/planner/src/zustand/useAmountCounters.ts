import { NonNegativeInteger, PositiveInteger } from '@draw-house/common/dist/brands';
import { create } from 'zustand';

type Store = {
  space: NonNegativeInteger;
  roof: NonNegativeInteger;
  wall: NonNegativeInteger;
  ceiling: NonNegativeInteger;
  stair: NonNegativeInteger;
};

export const useAmountCounters = create<Store>(() => ({
  space: NonNegativeInteger(0),
  roof: NonNegativeInteger(0),
  wall: NonNegativeInteger(0),
  ceiling: NonNegativeInteger(0),
  stair: NonNegativeInteger(0),
}));

export const getAndIncreaseAmountCounter = (type: keyof Store) => {
  const amountCounters = useAmountCounters.getState();
  const newValue = PositiveInteger(amountCounters[type] + 1);

  useAmountCounters.setState({ [type]: newValue });

  return newValue;
};
