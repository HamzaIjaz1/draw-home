import { RoofDormerId } from '@draw-house/common/dist/brands';
import { BufferGeometry } from 'three';
import { useDormerRoofsWallSubtraction } from './store';

export const setDormerRoofWallSubtraction = (dormerRoofId: RoofDormerId, geometry: BufferGeometry) => {
  const { dormerRoofsWallSubtraction } = useDormerRoofsWallSubtraction.getState();

  useDormerRoofsWallSubtraction.setState({
    dormerRoofsWallSubtraction: {
      ...dormerRoofsWallSubtraction,
      [dormerRoofId]: geometry,
    },
  });
};

export const clearDormerRoofWallSubtraction = (dormerRoofId: RoofDormerId) => {
  const { dormerRoofsWallSubtraction } = useDormerRoofsWallSubtraction.getState();

  const newDormerRoofsWallSubtraction = { ...dormerRoofsWallSubtraction };
  delete newDormerRoofsWallSubtraction[dormerRoofId];

  useDormerRoofsWallSubtraction.setState({ dormerRoofsWallSubtraction: newDormerRoofsWallSubtraction });
};
