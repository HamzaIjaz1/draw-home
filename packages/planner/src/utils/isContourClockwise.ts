import { getNotUndefined } from '@arthurka/ts-utils';
import { Vector2 } from 'three';

export const isContourClockwise = (arr: Vector2[]): boolean => {
  const sum = arr.reduce((acc, e2, i, arr) => {
    const e1 = getNotUndefined(arr.at(i - 1), 'This should never happen. |6h04ym|');

    return acc + (e2.x - e1.x) * (e2.y + e1.y);
  }, 0);

  return sum < 0;
};
