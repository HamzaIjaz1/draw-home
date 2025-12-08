import type { WallsStore } from '../zustand';
import { getUniquePoints } from './helpers';

export const makeGraphNodes = (lineSegments: Array<WallsStore['walls'][number]['position']>) => (
  getUniquePoints(lineSegments.flatMap(e => [e.start, e.end]))
    .map((e, i) => ({
      id: i.toString(),
      vector: e,
    }))
);
