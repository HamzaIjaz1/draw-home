import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { getLineSegmentsCrossPoint } from './getLineSegmentsCrossPoint';
import type { WallsStore } from '../zustand';

export const crossLineSegments = ([...lineSegments]: Array<WallsStore['walls'][number]['position']>): typeof lineSegments => {
  fromStart: while(true) {
    for(let i = 0; i < lineSegments.length - 1; i++) {
      const e1 = getNotUndefined(lineSegments[i], 'This should never happen. |8462r5|');

      for(let j = i + 1; j < lineSegments.length; j++) {
        const e2 = getNotUndefined(lineSegments[j], 'This should never happen. |a9j4yz|');

        const crossPoint = getLineSegmentsCrossPoint(e1, e2);

        if(!isNull(crossPoint)) {
          lineSegments.splice(j, 1);
          lineSegments.splice(i, 1);
          lineSegments.push(
            ...[e1.start, e1.end, e2.start, e2.end]
              .filter(e => !crossPoint.equals(e))
              .map(e => ({
                start: e,
                end: crossPoint,
              })),
          );

          continue fromStart;
        }
      }
    }

    break;
  }

  return lineSegments;
};
