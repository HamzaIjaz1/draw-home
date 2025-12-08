import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { Vector3 } from 'three';
import { floorSquareSize } from '../../constants';
import { getClampedViewportPointPlaneIntersection } from '../../components/PlacementAreaPreview';
import { useR3FDataResolved } from '../useR3FData';
import { useLevels } from '../useLevels';
import { createStair } from './actions';
import { useSelectedItem } from '../useSelectedItem';

export const placeStairs = () => {
  const { camera } = useR3FDataResolved.getState();
  const { levels } = useLevels.getState();

  const { elevation, id, height } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |n6kd7z|');
  const placementAreaPosition = getClampedViewportPointPlaneIntersection(
    camera,
    elevation,
    floorSquareSize,
  );

  const position = (
    isNull(placementAreaPosition)
      ? new Vector3(0, elevation, 0)
      : new Vector3(placementAreaPosition.x, elevation, placementAreaPosition.z)
  );

  const stairId = createStair(position, height, id);

  useSelectedItem.setState({
    selectedItem: {
      type: 'stair',
      id: stairId,
      mode: 'selected',
    },
  });
};
