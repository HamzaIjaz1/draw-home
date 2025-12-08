import { getNotUndefined } from '@arthurka/ts-utils';
import { Vector2, Vector3 } from 'three';
import { toVector3 } from './helpers';

export const calculateCoplanarPolygonArea = (polygon: Vector3[] | Vector2[]) => {
  if(polygon.length < 3) {
    return 0;
  }

  const points3D = polygon.map(e => e instanceof Vector2 ? toVector3(e) : e);
  const normal = new Vector3();

  for(let i = 0; i < points3D.length; i++) {
    const current = getNotUndefined(points3D[i], 'Something went wrong. |to6x19|.');
    const next = getNotUndefined(points3D[(i + 1) % points3D.length], 'Something went wrong. |6oki0r|.');

    normal.x += (current.y - next.y) * (current.z + next.z);
    normal.y += (current.z - next.z) * (current.x + next.x);
    normal.z += (current.x - next.x) * (current.y + next.y);
  }

  return normal.length() / 2;
};

export const getAreaOfSmallestContour = (contours: Vector2[][]) => {
  if(contours.length === 0) {
    return 0;
  }

  return Math.min(...contours.map(calculateCoplanarPolygonArea));
};
