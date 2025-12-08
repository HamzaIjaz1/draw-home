import { RoofId } from '@draw-house/common/dist/brands';
import { create } from 'zustand';

type Store = {
  hipRoofTempGableIndicesData: Map<RoofId, number[]>;
};

export const useHipRoofTempGableIndicesData = create<Store>(() => ({
  hipRoofTempGableIndicesData: new Map<RoofId, number[]>(),
}));

export const addHipRoofTempGableIndicesData = (roofId: RoofId, indices: number[]) => {
  const { hipRoofTempGableIndicesData } = useHipRoofTempGableIndicesData.getState();

  useHipRoofTempGableIndicesData.setState({
    hipRoofTempGableIndicesData: new Map(hipRoofTempGableIndicesData).set(roofId, indices),
  });
};
