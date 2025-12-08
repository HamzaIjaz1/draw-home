import { Plane } from '@react-three/drei';
import { DoubleSide, Mesh, Vector2, Vector3 } from 'three';
import { NODE_ENV } from '@draw-house/common/dist/envVariables/public';
import { useEffect, useRef } from 'react';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { floorSquareSize } from '../constants';
import { moveTempWalls, setCursor, updateWallsFromWallMover, usePopUpToolbar, useWalls } from '../zustand';
import { snapPosition } from '../utils';
import { useCanMoveWall } from '../zustand/useCanMoveWall';

export const WallMoversPlane: React.FC<{ elevation: number }> = ({ elevation }) => {
  useEffect(() => {
    setCursor('grabbing');
  }, []);

  const ref = useRef<Mesh>(null);

  return (
    <Plane
      ref={ref}
      userData={{ isNotPartOfLevelObjects: true }}
      args={[floorSquareSize, floorSquareSize]}
      position-y={elevation + 0.02}
      rotation-x={-Math.PI / 2}
      renderOrder={2}
      onPointerMove={e => {
        e.stopPropagation();
        moveTempWalls(snapPosition(e.point));
      }}
      onPointerUp={e => {
        assert(!isNull(ref.current), 'This should never happen. |495bur|');

        e.stopPropagation();
        setCursor(null);

        const result = updateWallsFromWallMover();

        if(!isNull(result) && result.theSameCoordinates === true) {
          const { walls } = useWalls.getState();

          const wall = getNotUndefined(walls.find(e => e.id === result.wallId), 'Something went wrong. |w17x3z|');

          const wallLength = wall.position.start.distanceTo(wall.position.end);
          const wallStart = new Vector3(wall.position.start.x, 0, wall.position.start.y);
          const wallEnd = new Vector3(wall.position.end.x, 0, wall.position.end.y);
          const wallDirection = new Vector3().subVectors(wallEnd, wallStart).normalize();
          const wallCenter = new Vector3().addVectors(wallStart, wallEnd).multiplyScalar(0.5);

          const clickPoint = new Vector3(e.point.x, 0, e.point.z);
          const projectionLength = new Vector3().subVectors(clickPoint, wallCenter).dot(wallDirection);

          const onWallCoordinateX = Math.max(-wallLength / 2, Math.min(wallLength / 2, projectionLength));

          usePopUpToolbar.setState({
            popUpToolbar: {
              type: 'wall',
              id: result.wallId,
              subItem: null,
              coords: new Vector2(e.clientX, e.clientY),
              onWallCoordinateX,
            },
          });
        }
        useCanMoveWall.setState({ canMoveWall: false });
      }}
      onPointerLeave={e => {
        e.stopPropagation();
        setCursor(null);

        updateWallsFromWallMover();
      }}
    >
      <meshStandardMaterial
        transparent
        opacity={NODE_ENV === 'production' ? 0 : 0.1}
        color='green'
        side={DoubleSide}
      />
    </Plane>
  );
};
