import { Vector2 } from 'three';
import { getNotUndefined } from '@arthurka/ts-utils';
import type { WallsStore } from '../zustand';

export const isPointInsideSpaceWalls = ({ x, y }: Vector2, walls: Array<Pick<WallsStore['walls'][number], 'position'>>) => {
  let isInside = false;

  for(const { position: { start: { x: x1, y: y1 }, end: { x: x2, y: y2 } } } of walls) {
    if(y2 > y !== y1 > y && x < ((x1 - x2) * (y - y2)) / (y1 - y2) + x2) {
      isInside = isInside === false;
    }
  }

  return isInside;
};

export const isPointInsidePolygon = (e: Vector2, arr: Vector2[]) => (
  isPointInsideSpaceWalls(e, arr.map((e2, i, arr) => {
    const e1 = getNotUndefined(arr.at(i - 1), 'This should never happen. |gs8oib|');

    return {
      position: {
        start: e2,
        end: e1,
      },
    };
  }))
);
