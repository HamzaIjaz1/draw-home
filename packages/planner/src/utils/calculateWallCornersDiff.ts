import { Vector2 } from 'three';
import { isArrayLength, isNull, isUndefined } from '@arthurka/ts-utils';
import { fixIEEE } from '@draw-house/common/dist/utils';
import { WallsStore } from '../zustand/useWalls/store';
import { getLinesCrossPoint } from './getLineSegmentsCrossPoint';
import { isColinear } from './helpers';

const hasMultipleWallConnections = (walls: WallsStore['walls'], point: Vector2) => {
  let foundFirstConnection = false;

  for(const wall of walls) {
    if(point.equals(wall.position.start) || point.equals(wall.position.end)) {
      if(foundFirstConnection === true) {
        return true;
      }

      foundFirstConnection = true;
    }
  }

  return false;
};

const getWallsConnectedToPoint = (walls: WallsStore['walls'], point: Vector2) => (
  walls.filter(wall => wall.position.start.equals(point) || wall.position.end.equals(point))
);

const getLeftAndRightNeighborWalls = (
  wall: WallsStore['walls'][number],
  connectedWalls: WallsStore['walls'],
  wallMode: 'start' | 'end',
) => {
  const sharedPoint = wall.position[wallMode];

  const targetWallVector = (
    wallMode === 'start'
      ? new Vector2().subVectors(wall.position.end, wall.position.start)
      : new Vector2().subVectors(wall.position.start, wall.position.end)
  );
  const sortedWalls = (
    connectedWalls
      .map(e => {
        const point = e.position.start.equals(sharedPoint) ? e.position.end : e.position.start;
        const vector = new Vector2().subVectors(point, sharedPoint);
        let angle = vector.angle() - targetWallVector.angle();
        if(angle < 0) {
          angle += Math.PI * 2;
        }
        return {
          wall: e,
          angle,
        };
      })
      .toSorted((a, b) => a.angle - b.angle)
  );

  const rightNeighborWall = sortedWalls[0];
  const leftNeighborWall = sortedWalls[sortedWalls.length - 1];

  return {
    rightNeighbor: isUndefined(rightNeighborWall) ? null : rightNeighborWall.wall,
    leftNeighbor: isUndefined(leftNeighborWall) ? null : leftNeighborWall.wall,
  };
};

const getWallConnectionMode = (wall: WallsStore['walls'][number], point: Vector2) => (
  point.equals(wall.position.start) ? 'start' : 'end'
);

const makeWallSides = ({ thickness, position: { start, end } }: WallsStore['walls'][number]) => {
  const wallDirection = new Vector2().subVectors(end, start);
  const lookDirection = new Vector2(-wallDirection.y, wallDirection.x).normalize().multiplyScalar(thickness / 2);

  const frontSide = {
    start: new Vector2().addVectors(start, lookDirection),
    end: new Vector2().addVectors(end, lookDirection),
  };
  const backSide = {
    start: new Vector2().addVectors(start, lookDirection.clone().negate()),
    end: new Vector2().addVectors(end, lookDirection.clone().negate()),
  };

  return [frontSide, backSide] as const;
};

const getWallSideDiff = (
  mode1: 'start' | 'end',
  wall1: WallsStore['walls'][number],
  walls: Array<{
    mode: 'start' | 'end';
    wall: WallsStore['walls'][number];
  }>,
): [number, number] => {
  if(!isArrayLength(walls, '>', 0)) {
    return [0, 0];
  }

  const { wall: wall2, mode: mode2 } = walls[0];

  const [frontSide1, backSide1] = makeWallSides(wall1);
  const [frontSide2, backSide2] = makeWallSides(wall2);

  const frontFront = getLinesCrossPoint(frontSide1, frontSide2);
  const frontBack = getLinesCrossPoint(frontSide1, backSide2);
  const backFront = getLinesCrossPoint(backSide1, frontSide2);
  const backBack = getLinesCrossPoint(backSide1, backSide2);

  if(isNull(frontFront) || isNull(frontBack) || isNull(backFront) || isNull(backBack)) {
    return [0, 0];
  }

  const wall1Center = new Vector2().addVectors(wall1.position.start, wall1.position.end).divideScalar(2);
  const sideCenter = new Vector2().subVectors(new Vector2().addVectors(frontSide1[mode1], backSide1[mode1]).divideScalar(2), wall1Center);

  const frontCrossPoint = mode1 === mode2 ? frontBack : frontFront;
  const backCrossPoint = mode1 === mode2 ? backFront : backBack;

  const diff1 = new Vector2().subVectors(frontCrossPoint, frontSide1[mode1]);
  const diff2 = new Vector2().subVectors(backCrossPoint, backSide1[mode1]);

  return [
    fixIEEE((isColinear(sideCenter, diff1) ? 1 : -1) * diff1.length()),
    fixIEEE((isColinear(sideCenter, diff2) ? 1 : -1) * diff2.length()),
  ];
};

export const calculateWallCornersDiff = (walls: WallsStore['walls']) => (
  walls
    .map(e => {
      const levelWalls = walls.filter(({ id, levelId }) => e.id !== id && e.levelId === levelId);

      return {
        wall: e,
        forStart: (
          levelWalls
            .filter(({ position: { start, end } }) => e.position.start.equals(start) || e.position.start.equals(end))
            .map(wall => ({
              wall,
              mode: e.position.start.equals(wall.position.start) ? 'start' as const : 'end' as const,
            }))
        ),
        forEnd: (
          levelWalls
            .filter(({ position: { start, end } }) => e.position.end.equals(start) || e.position.end.equals(end))
            .map(wall => ({
              wall,
              mode: e.position.end.equals(wall.position.start) ? 'start' as const : 'end' as const,
            }))
        ),
      };
    })
    .map(({ wall, forStart, forEnd }) => {
      let [frontStart, backStart] = getWallSideDiff('start', wall, forStart);
      let [frontEnd, backEnd] = getWallSideDiff('end', wall, forEnd);
      const filteredWalls = walls.filter(e => e.id !== wall.id && e.levelId === wall.levelId);

      if(hasMultipleWallConnections(filteredWalls, wall.position.start)) {
        const [frontSide, backSide] = makeWallSides(wall);
        const connectedWalls = getWallsConnectedToPoint(filteredWalls, wall.position.start);
        const { leftNeighbor, rightNeighbor } = getLeftAndRightNeighborWalls(wall, connectedWalls, 'start');

        if(!isNull(rightNeighbor)) {
          const [rightNeighborFrontSide, rightNeighborBackSide] = makeWallSides(rightNeighbor);
          const rightNeighborMode = getWallConnectionMode(rightNeighbor, wall.position.start);
          const rightIntersectionSide = rightNeighborMode === 'start' ? rightNeighborBackSide : rightNeighborFrontSide;
          const frontIntersectionPoint = getLinesCrossPoint(frontSide, rightIntersectionSide);

          if(!isNull(frontIntersectionPoint)) {
            const diff = new Vector2().subVectors(frontIntersectionPoint, frontSide.start);
            const wallOutwardVector = new Vector2().subVectors(wall.position.start, wall.position.end);
            const sign = Math.sign(wallOutwardVector.dot(diff));

            frontStart = fixIEEE(sign * diff.length());
          } else {
            frontStart = 0;
          }
        }

        if(!isNull(leftNeighbor)) {
          const [leftNeighborFrontSide, leftNeighborBackSide] = makeWallSides(leftNeighbor);
          const leftNeighborMode = getWallConnectionMode(leftNeighbor, wall.position.start);
          const leftIntersectionSide = leftNeighborMode === 'start' ? leftNeighborFrontSide : leftNeighborBackSide;
          const backIntersectionPoint = getLinesCrossPoint(backSide, leftIntersectionSide);

          if(!isNull(backIntersectionPoint)) {
            const diff = new Vector2().subVectors(backIntersectionPoint, backSide.start);
            const wallOutwardVector = new Vector2().subVectors(wall.position.start, wall.position.end);
            const sign = Math.sign(wallOutwardVector.dot(diff));

            backStart = fixIEEE(sign * diff.length());
          } else {
            backStart = 0;
          }
        }
      }

      if(hasMultipleWallConnections(filteredWalls, wall.position.end)) {
        const [frontSide, backSide] = makeWallSides(wall);
        const connectedWalls = getWallsConnectedToPoint(filteredWalls, wall.position.end);
        const { leftNeighbor, rightNeighbor } = getLeftAndRightNeighborWalls(wall, connectedWalls, 'end');

        if(!isNull(rightNeighbor)) {
          const [rightNeighborFrontSide, rightNeighborBackSide] = makeWallSides(rightNeighbor);
          const rightNeighborMode = getWallConnectionMode(rightNeighbor, wall.position.end);
          const rightIntersectionSide = rightNeighborMode === 'start' ? rightNeighborBackSide : rightNeighborFrontSide;
          const intersectionPoint = getLinesCrossPoint(backSide, rightIntersectionSide);

          if(!isNull(intersectionPoint)) {
            const diff = new Vector2().subVectors(intersectionPoint, backSide.end);
            const wallOutwardVector = new Vector2().subVectors(wall.position.end, wall.position.start);
            const sign = Math.sign(wallOutwardVector.dot(diff));

            backEnd = fixIEEE(sign * diff.length());
          } else {
            backEnd = 0;
          }
        }

        if(!isNull(leftNeighbor)) {
          const [leftNeighborFrontSide, leftNeighborBackSide] = makeWallSides(leftNeighbor);
          const leftNeighborMode = getWallConnectionMode(leftNeighbor, wall.position.end);
          const leftIntersectionSide = leftNeighborMode === 'start' ? leftNeighborFrontSide : leftNeighborBackSide;
          const intersectionPoint = getLinesCrossPoint(frontSide, leftIntersectionSide);

          if(!isNull(intersectionPoint)) {
            const diff = new Vector2().subVectors(intersectionPoint, frontSide.end);
            const wallOutwardVector = new Vector2().subVectors(wall.position.end, wall.position.start);
            const sign = Math.sign(wallOutwardVector.dot(diff));

            frontEnd = fixIEEE(sign * diff.length());
          } else {
            frontEnd = 0;
          }
        }
      }

      return {
        wallId: wall.id,
        cornersDiff: {
          frontStart,
          backStart,
          frontEnd,
          backEnd,
        },
      };
    })
);
