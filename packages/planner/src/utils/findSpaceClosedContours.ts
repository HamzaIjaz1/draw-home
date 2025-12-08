import { getNotUndefined } from '@arthurka/ts-utils';
import { Vector2 } from 'three';
import type { WallsStore } from '../zustand';
import { getSpaceWallSegmentsAndDiff } from './getSpaceWallSegmentsAndDiff';

const isSamePoint = (a: Vector2, b: Vector2) => Math.abs(a.x - b.x) < 0.0001 && Math.abs(a.y - b.y) < 0.0001;
const isConnected = (segment: [Vector2, Vector2], point: Vector2) => isSamePoint(segment[0], point) || isSamePoint(segment[1], point);

const findClosedContours = (segments: Array<[Vector2, Vector2]>) => {
  const contours = [];
  const remainingSegments = new Set(segments);

  while(remainingSegments.size > 0) {
    const segment = getNotUndefined([...remainingSegments][0], 'This should never happen. |ogs2uo|');
    remainingSegments.delete(segment);

    const contour = [...segment];
    let currentPoint = segment[1];

    while(true) {
      let foundNext = false;

      for(const seg of remainingSegments) {
        if(isConnected(seg, currentPoint)) {
          remainingSegments.delete(seg);
          currentPoint = isSamePoint(seg[0], currentPoint) ? seg[1] : seg[0];
          contour.push(currentPoint);
          foundNext = true;

          break;
        }
      }

      if(foundNext === false) {
        if(contour.length > 2 && isSamePoint(getNotUndefined(contour[0], 'Something went wrong. |yc89go|'), currentPoint)) {
          contours.push(contour);
        }

        break;
      }
    }
  }

  return contours;
};

export const findSpaceClosedContours = (spaceWalls: WallsStore['walls']) => {
  const { spaceWallSegments, spaceWallsCornerDiff } = getSpaceWallSegmentsAndDiff(spaceWalls);

  return {
    spaceWallsCornerDiff,
    contours: findClosedContours(spaceWallSegments.map(({ position }) => position)),
  };
};
