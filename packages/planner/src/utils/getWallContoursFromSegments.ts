import { getNotUndefined } from '@arthurka/ts-utils';
import { WallId } from '@draw-house/common/dist/brands';
import { Vector2 } from 'three';

export type WallSegment = {
  wallId: WallId;
  sideType: 'front' | 'back' | 'front-cap' | 'back-cap';
  position: [Vector2, Vector2];
};

const isSamePoint = (a: Vector2, b: Vector2) => Math.abs(a.x - b.x) < 0.0001 && Math.abs(a.y - b.y) < 0.0001;

export const getWallContoursFromSegments = (segments: WallSegment[]) => {
  const contours: Array<{ vertices: Vector2[]; segments: WallSegment[] }> = [];
  const remainingSegments = new Set(segments);

  while(remainingSegments.size > 0) {
    const startSegment = getNotUndefined([...remainingSegments][0], 'This should never happen. |91fn6t|');
    remainingSegments.delete(startSegment);

    const contourSegments = [startSegment];
    const vertices = [...startSegment.position];

    const startPoint = startSegment.position[0];
    let currentPoint = startSegment.position[1];

    while(true) {
      let foundNext = false;

      for(const nextSeg of remainingSegments) {
        const [p1, p2] = nextSeg.position;

        if(isSamePoint(p1, currentPoint) || isSamePoint(p2, currentPoint)) {
          remainingSegments.delete(nextSeg);

          currentPoint = isSamePoint(p1, currentPoint) ? p2 : p1;

          vertices.push(currentPoint);
          contourSegments.push(nextSeg);

          foundNext = true;
          break;
        }
      }

      if(foundNext === false) {
        if(vertices.length > 2 && isSamePoint(startPoint, currentPoint)) {
          vertices.pop();

          contours.push({ vertices, segments: contourSegments });
        }

        break;
      }
    }
  }

  return contours;
};
