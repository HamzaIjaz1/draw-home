import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { getLineSegmentsCrossPoint } from './getLineSegmentsCrossPoint';
import type { WallsStore } from '../zustand';
import { getVector2Distance } from './helpers';

export const crossLineSegmentsForOneWall = (
  targetWall: WallsStore['walls'][number]['position'],
  lineSegments: Array<WallsStore['walls'][number]['position']>,
): Array<WallsStore['walls'][number]['position']> => {
  const targetLineSegments = [targetWall];

  fromStart: while(true) {
    for(let i = 0; i < targetLineSegments.length; i++) {
      const e1 = getNotUndefined(targetLineSegments[i], 'This should never happen. |f7gd80|');

      for(const e2 of lineSegments) {
        const crossPoint = getLineSegmentsCrossPoint(e1, e2);

        if(!isNull(crossPoint)) {
          const newSegments = (
            [e1.start, e1.end]
              .filter(e => !crossPoint.equals(e))
              .map(e => ({
                start: e,
                end: crossPoint,
              }))
          );

          if(newSegments.length > 1) {
            targetLineSegments.splice(i, 1);
            targetLineSegments.push(...newSegments);
            continue fromStart;
          }
        }
      }
    }

    break;
  }

  return targetLineSegments.filter(({ start, end }) => getVector2Distance(start, end) > 0.0001);
};
