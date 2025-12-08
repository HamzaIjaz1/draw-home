import { fixIEEE } from '@draw-house/common/dist/utils';
import { Vector2 } from 'three';

// Algorithm is copied from the Internet, black box tested, seems to be working just fine
export const getPolygonArea = (coords: Vector2[]): number => {
  const x = coords.map(e => e.x);
  const y = coords.map(e => e.y);
  let square = 0;

  for(let i = 0; i < coords.length - 1; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    square += x[i]! * y[i + 1]! - y[i]! * x[i + 1]!;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  square += x[coords.length - 1]! * y[0]! - y[coords.length - 1]! * x[0]!;
  square /= 2;
  square = Math.abs(square);

  return fixIEEE(square);
};
