import { Box3, Object3D, Scene, Vector2, Vector3 } from 'three';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { WallFurnitureId } from '@draw-house/common/dist/brands';
import { dirOf, dotAbs, pointToLineDistance, projectScalarOnAxis, toVector3, toVector3Project2D } from './helpers';
import { WallsStore } from '../zustand';
import { computeBoundsOnlyMeshes } from '../customHooks/useModelBounds';

type Wall = {
  id: string;
  position: { start: Vector2; end: Vector2 };
};

const TOL_PARALLEL = 1e-4; // ≈0.006° tolerance
const TOL_COLINEAR = 1e-3; // 1 mm off-line distance tolerance in world units

export const getGlobalWallChainEndsHorizontal = (
  walls: Wall[],
  targetWallId: string,
): { A: Vector3; B: Vector3; tangent: Vector3 } | null => {
  const base = walls.find(e => e.id === targetWallId);
  if(isUndefined(base)) {
    return null;
  }

  const a0 = toVector3(base.position.start);
  const b0 = toVector3(base.position.end);
  const tangent = dirOf(a0, b0);
  const origin = a0;

  let hasAny = false;
  let minT = Infinity;
  let maxT = -Infinity;

  for(const w of walls) {
    const a = toVector3(w.position.start);
    const b = toVector3(w.position.end);
    const ui = dirOf(a, b);

    // parallel check (both directions allowed)
    if(dotAbs(tangent, ui) < 1 - TOL_PARALLEL) {
      continue;
    }

    // colinear check: both endpoints are close to the base line
    const da = pointToLineDistance(a, origin, tangent);
    const db = pointToLineDistance(b, origin, tangent);
    if(da > TOL_COLINEAR || db > TOL_COLINEAR) {
      continue;
    }

    // project endpoints to scalars and update global range
    const ta = projectScalarOnAxis(a, origin, tangent);
    const tb = projectScalarOnAxis(b, origin, tangent);

    hasAny = true;
    if(ta < minT) {
      minT = ta;
    }
    if(tb < minT) {
      minT = tb;
    }
    if(ta > maxT) {
      maxT = ta;
    }
    if(tb > maxT) {
      maxT = tb;
    }
  }

  if(hasAny === false) {
    return null;
  }

  const A = origin.clone().add(tangent.clone().multiplyScalar(minT));
  const B = origin.clone().add(tangent.clone().multiplyScalar(maxT));
  return { A, B, tangent: tangent.normalize() };
};

export const getWallMidAndDir = (startPoint: Vector3, endPoint: Vector3): { mid: Vector3; dir: Vector3; length: number } => {
  const dir = endPoint.clone().sub(startPoint);
  const len = dir.length();
  const mid = startPoint.clone().add(dir.clone().multiplyScalar(0.5));
  return { mid, dir: len > 0 ? dir.divideScalar(len) : new Vector3(1, 0, 0), length: len };
};

export const furnitureWorldOnWall = (startPoint: Vector3, endPoint: Vector3, onWallCoordinateX: number, onWallCoordinateY: number): Vector3 => {
  const { mid, dir } = getWallMidAndDir(startPoint, endPoint);
  // furniture X is relative to wall mid along dir
  return mid.clone().add(dir.clone().multiplyScalar(onWallCoordinateX)).setY(onWallCoordinateY);
};

export const onWallFromWorldPoint = (
  wall: WallsStore['walls'][number]['position'],
  worldPoint: Vector3,
) => {
  const A = wall.start;
  const B = wall.end;
  const P2 = new Vector2(worldPoint.x, worldPoint.z);

  const U = B.clone().sub(A);
  const len = U.length();

  const Uu = U.clone().divideScalar(len);
  let along = P2.clone().sub(A).dot(Uu);

  if(along < 0) {
    along = 0;
  } else if(along > len) {
    along = len;
  }

  const xCenter = along - len / 2;

  return xCenter;
};

export const findFurnitureGroup = (obj: Object3D | null): Object3D | null => {
  let cur: Object3D | null = obj;
  while(!isNull(cur)) {
    const id: WallsStore['walls'][number]['furnitures'][number] | undefined = cur.userData.furnitureId;
    if(!isUndefined(id)) {
      return cur;
    }
    cur = cur.parent;
  }
  return null;
};

export const findFurnituresWithFurnitureIdInScene = (scene: Scene): Object3D[] => {
  const result = new Map<string | number, Object3D>();

  scene.traverse(obj => {
    const group = findFurnitureGroup(obj);

    if(!isNull(group)) {
      result.set(group.userData.furnitureId, group);
    }
  });

  return [...result.values()];
};

const endpointsAlongLineForObject = (
  obj: Object3D,
  baseDir: Vector3, // should be normalized
  origin: Vector3, // endA of line
  projectTo2D = false,
): [Vector3, Vector3] => {
  const n = baseDir.clone().normalize();

  const { box } = computeBoundsOnlyMeshes(obj);
  if(box.isEmpty()) {
    return [origin.clone(), origin.clone()];
  }

  const { min, max } = box;

  const corners: Vector3[] = [];
  for(const x of [min.x, max.x]) {
    for(const y of [min.y, max.y]) {
      for(const z of [min.z, max.z]) {
        corners.push(new Vector3(x, y, z));
      }
    }
  }

  const O = projectTo2D ? toVector3Project2D(origin) : origin;

  let minT = Infinity;
  let maxT = -Infinity;

  for(let c of corners) {
    if(projectTo2D) {
      c = toVector3Project2D(c);
    }
    const t = c.sub(O).dot(n); // Origin projection
    if(t < minT) {
      minT = t;
    }
    if(t > maxT) {
      maxT = t;
    }
  }

  const A = O.clone().add(n.clone().multiplyScalar(minT));
  const B = O.clone().add(n.clone().multiplyScalar(maxT));
  return [A, B];
};

export type BethInterval = {
  id: string;
  from: Vector3;
  to: Vector3;
  isFurnitureInterval: boolean;
};

export const buildFurnitureIntervals = (
  fromPoint: Vector3, // tempFurniture point
  toPoint: Vector3, // wallEnd point
  furnitures: Object3D[],
  projectTo2D = false,
): BethInterval[] => {
  const from = projectTo2D ? toVector3Project2D(fromPoint) : fromPoint;
  const to = projectTo2D ? toVector3Project2D(toPoint) : toPoint;

  const baseDir = new Vector3().subVectors(to, from).normalize();
  const segLength = from.distanceTo(to);

  const intersects: Array<{ object: Object3D; distance: number }> = [];
  const tVec = new Vector3();

  furnitures.forEach(obj => {
    const bounds = computeBoundsOnlyMeshes(obj);
    const center = projectTo2D ? toVector3Project2D(bounds.center) : bounds.center;
    const t = tVec.subVectors(center, from).dot(baseDir); // scalar along segment
    if(t < 0 || t > segLength) {
      return;
    }

    const closest = from.clone().addScaledVector(baseDir, t);
    const dist = center.distanceTo(closest);

    // if furniture center is closed to wall line then add
    const radius = projectTo2D ? Math.max(bounds.size.x, bounds.size.z) * 0.5 : bounds.size.y * 0.5;

    if(dist <= radius) {
      intersects.push({ object: obj, distance: t });
    }
  });

  // sort by distance
  intersects.sort((a, b) => a.distance - b.distance);

  const furnitureHits = [...new Map(
    intersects
      .map(hit => {
        const group = findFurnitureGroup(hit.object);

        return isNull(group) ? null : [WallFurnitureId(group.userData.furnitureId), { ...hit, object: group }] as const;
      })
      .filter(x => !isNull(x)),
  ).values()];

  const intervals: BethInterval[] = [];
  let startedPoint = fromPoint.clone();

  furnitureHits.forEach((hit, index) => {
    const hitBounds = computeBoundsOnlyMeshes(hit.object);

    const [hitBoundingPointA, hitBoundingPointB] = endpointsAlongLineForObject(
      hit.object,
      baseDir,
      from,
      projectTo2D,
    );

    const distA = hitBoundingPointA.distanceTo(startedPoint);
    const distB = hitBoundingPointB.distanceTo(startedPoint);

    const [first, second] = distA < distB ? [hitBoundingPointA, hitBoundingPointB] : [hitBoundingPointB, hitBoundingPointA];

    // Interval to the furniture
    intervals.push({
      id: `interval-${index}`,
      from: startedPoint,
      to: first.clone().setY(fromPoint.y),
      isFurnitureInterval: false,
    });

    // Furniture label interval
    intervals.push({
      id: `furniture-${index}`,
      from: first.clone().setY(hitBounds.box.max.y),
      to: second.clone().setY(hitBounds.box.max.y),
      isFurnitureInterval: true,
    });

    startedPoint = second.setY(fromPoint.y);
  });

  // last Interval to end of wall
  intervals.push({
    id: 'lastWallIntervalSideB',
    from: startedPoint,
    to: toPoint,
    isFurnitureInterval: false,
  });

  return intervals;
};

const intersectSegments2D = (
  p1: Vector3,
  p2: Vector3,
  p3: Vector3,
  p4: Vector3,
): Vector3 | null => {
  const x1 = p1.x;
  const y1 = p1.z;
  const x2 = p2.x;
  const y2 = p2.z;
  const x3 = p3.x;
  const y3 = p3.z;
  const x4 = p4.x;
  const y4 = p4.z;

  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if(Math.abs(denom) < 1e-6) {
    return null;
  }

  const px = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
  const py = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;

  const within = (val: number, min: number, max: number) => val >= Math.min(min, max) - 1e-6 && val <= Math.max(min, max) + 1e-6;
  if(
    within(px, x1, x2) && within(py, y1, y2) &&
    within(px, x3, x4) && within(py, y3, y4)
  ) {
    return new Vector3(px, 0, py);
  }

  return null;
};

export const adjustWallEnd = (
  endA: Vector3,
  endB: Vector3,
  wallId: string,
  walls: Wall[],
): Vector3 => {
  const eps = 1e-3;

  const from = endA.clone().setY(0);
  const to = endB.clone().setY(0);

  const dir = to.clone().sub(from).normalize();
  let bestPoint: Vector3 | null = null;
  let bestDist = Infinity;

  for(const w of walls) {
    if(w.id === wallId) {
      continue;
    }

    const a = toVector3(w.position.start).setY(0);
    const b = toVector3(w.position.end).setY(0);

    const p = intersectSegments2D(from, to, a, b);
    if(isNull(p)) {
      continue;
    }

    // Check both endings of the wall
    for(const candidate of [a, b]) {
      const v = candidate.clone().sub(from);
      const t = v.dot(dir);

      if(t > eps) {
        const dist = v.length();
        if(dist < bestDist) {
          bestDist = dist;
          bestPoint = candidate.clone().setY(endA.y);
        }
      }
    }
  }

  return !isNull(bestPoint) ? bestPoint : endB;
};

export const filterFurnitureOnWallPlane = <T extends { box: Box3; center: Vector3 }> (
  furnitures: T[],
  wallsChain: { A: Vector3; B: Vector3; tangent: Vector3 },
  tol = 0.02,
) => {
  const origin = wallsChain.A.clone().setY(0);
  const tangent = wallsChain.tangent.clone().setY(0).normalize();

  return furnitures.filter(e => {
    const center = e.center.clone().setY(0);
    const dist = pointToLineDistance(center, origin, tangent);

    return dist <= tol;
  });
};
