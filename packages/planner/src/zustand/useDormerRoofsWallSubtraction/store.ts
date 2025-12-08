import { BufferGeometry } from 'three';
import { create } from 'zustand';
import { RoofDormerId } from '@draw-house/common/dist/brands';
import { withComparingSetState } from '../../utils/withComparingSetState';

type Store = {
  dormerRoofsWallSubtraction: Record<RoofDormerId, BufferGeometry>;
};

export const useDormerRoofsWallSubtraction = create<Store>(() => ({
  dormerRoofsWallSubtraction: {},
}));

withComparingSetState(useDormerRoofsWallSubtraction);
