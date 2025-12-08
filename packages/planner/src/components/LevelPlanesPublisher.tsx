import { useEffect, useRef } from 'react';
import { Group, Quaternion, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { isNull, isUndefined, tuple } from '@arthurka/ts-utils';
import { LevelsStore, useLevels } from '../zustand/useLevels';
import { useSlideUpMenuLvl1, useViewMode } from '../zustand';
import { FloorGroupUserData } from './Floor';
import { setAllLevelPlanesForLabelsInPlace } from '../zustand/useLevelPlanesForLabels';

export const hasFloorUserData = <T extends { userData: unknown }>(obj: T): obj is T & { userData: FloorGroupUserData } => (
  true
    && typeof obj.userData === 'object'
    && !isNull(obj.userData)
    && 'levelId' in obj.userData
    && 'floorCoords' in obj.userData
    && 'spaceId' in obj.userData
);

export const normalizePolys = (data: unknown): Array<Array<[number, number]>> => {
  const out: Array<Array<[number, number]>> = [];
  if(!Array.isArray(data) || data.length === 0) {
    return out;
  }

  if(Array.isArray(data[0]) && Array.isArray(data[0][0]) === false) {
    const poly: Array<[number, number]> = [];
    for(const p of data) {
      if(!Array.isArray(p) || p.length !== 2) {
        return out;
      }
      const [x, z] = p;
      if(typeof x !== 'number' || typeof z !== 'number') {
        return out;
      }
      poly.push(tuple(x, z));
    }
    if(poly.length >= 3) {
      out.push(poly);
    }
    return out;
  }

  for(const candidate of data) {
    if(!Array.isArray(candidate) || candidate.length === 0) {
      continue;
    }
    const poly: Array<[number, number]> = [];
    let ok = true;
    for(const p of candidate) {
      if(!Array.isArray(p) || p.length !== 2) {
        ok = false;
        break;
      }
      const [x, z] = p;
      if(typeof x !== 'number' || typeof z !== 'number') {
        ok = false;
        break;
      }
      poly.push(tuple(x, z));
    }
    if(ok === true && poly.length >= 3) {
      out.push(poly);
    }
  }

  return out;
};

export type SimpleWall = {
  thickness: number;
  start: { x: number; y: number };
  end: { x: number; y: number };
};

const getUnitDirectionForEdge = (
  start: [number, number],
  end: [number, number],
) => {
  const deltaX = end[0] - start[0];
  const deltaZ = end[1] - start[1];
  const length = Math.hypot(deltaX, deltaZ);

  return {
    edgeUnitX: deltaX / length,
    edgeUnitZ: deltaZ / length,
  };
};

const getSegmentMidpoint = (a: [number, number], b: [number, number]) => [
  (a[0] + b[0]) * 0.5,
  (a[1] + b[1]) * 0.5,
] as const;

const getDistanceFromPointToSegment = (
  pointX: number,
  pointZ: number,
  segStartX: number,
  segStartZ: number,
  segEndX: number,
  segEndZ: number,
) => {
  const segmentVectorX = segEndX - segStartX;
  const segmentVectorZ = segEndZ - segStartZ;

  const pointVectorX = pointX - segStartX;
  const pointVectorZ = pointZ - segStartZ;

  const projectionLength = segmentVectorX * pointVectorX + segmentVectorZ * pointVectorZ;

  if(projectionLength <= 0) {
    return Math.hypot(pointX - segStartX, pointZ - segStartZ);
  }

  const segmentLengthSquared = segmentVectorX * segmentVectorX + segmentVectorZ * segmentVectorZ;
  if(projectionLength >= segmentLengthSquared) {
    return Math.hypot(pointX - segEndX, pointZ - segEndZ);
  }

  const projectionFactor = projectionLength / segmentLengthSquared;

  const projectedPointX = segStartX + projectionFactor * segmentVectorX;
  const projectedPointZ = segStartZ + projectionFactor * segmentVectorZ;

  return Math.hypot(pointX - projectedPointX, pointZ - projectedPointZ);
};

const getOutwardUnitNormalForEdge = (
  vertexA: [number, number],
  vertexB: [number, number],
  centroid: [number, number],
) => {
  const { edgeUnitX, edgeUnitZ } = getUnitDirectionForEdge(vertexA, vertexB);

  let normalX = -edgeUnitZ;
  let normalZ = edgeUnitX;

  const midpointX = (vertexA[0] + vertexB[0]) * 0.5;
  const midpointZ = (vertexA[1] + vertexB[1]) * 0.5;

  const fromCentroidToMidX = midpointX - centroid[0];
  const fromCentroidToMidZ = midpointZ - centroid[1];

  const dot = normalX * fromCentroidToMidX + normalZ * fromCentroidToMidZ;

  if(dot < 0) {
    normalX = -normalX;
    normalZ = -normalZ;
  }

  const normalLength = Math.hypot(normalX, normalZ);
  return {
    normalUnitX: normalX / normalLength,
    normalUnitZ: normalZ / normalLength,
  };
};

const OFFSET_MULTIPLIER = 1.5;

export const offsetPolyByWalls = (polygon: Array<[number, number]>, walls: SimpleWall[]) => {
  if(polygon.length < 3 || walls.length === 0) {
    return polygon;
  }

  let sumX = 0;
  let sumZ = 0;

  for(const [x, z] of polygon) {
    sumX += x;
    sumZ += z;
  }
  const centroid = tuple(sumX / polygon.length, sumZ / polygon.length);

  const vertexCount = polygon.length;
  const edgeNormals: Array<{ normalUnitX: number; normalUnitZ: number } | undefined> = Array.from({ length: vertexCount });
  const edgeOffsets = Array.from({ length: vertexCount }, () => 0);

  for(let edgeIndex = 0; edgeIndex < vertexCount; edgeIndex++) {
    const nextIndex = (edgeIndex + 1) % vertexCount;

    const vertexA = polygon[edgeIndex];
    const vertexB = polygon[nextIndex];

    if(isUndefined(vertexA) || isUndefined(vertexB)) {
      edgeNormals[edgeIndex] = undefined;
      edgeOffsets[edgeIndex] = 0;
      continue;
    }

    edgeNormals[edgeIndex] = getOutwardUnitNormalForEdge(vertexA, vertexB, centroid);

    const midpoint = getSegmentMidpoint(vertexA, vertexB);
    const { edgeUnitX, edgeUnitZ } = getUnitDirectionForEdge(vertexA, vertexB);

    let maxEdgeOffset = 0;

    for(const wall of walls) {
      const wallStartX = wall.start.x;
      const wallStartZ = wall.start.y;
      const wallEndX = wall.end.x;
      const wallEndZ = wall.end.y;

      const { edgeUnitX: wallUnitX, edgeUnitZ: wallUnitZ } = getUnitDirectionForEdge([wallStartX, wallStartZ], [wallEndX, wallEndZ]);

      const parallelDot = edgeUnitX * wallUnitX + edgeUnitZ * wallUnitZ;
      if(Math.abs(parallelDot) < 0.98) {
        continue;
      }

      const distance = getDistanceFromPointToSegment(midpoint[0], midpoint[1], wallStartX, wallStartZ, wallEndX, wallEndZ);

      if(distance > wall.thickness * 1.5) {
        continue;
      }

      const offsetFromThisWall = wall.thickness * 0.5 * OFFSET_MULTIPLIER;

      if(offsetFromThisWall > maxEdgeOffset) {
        maxEdgeOffset = offsetFromThisWall;
      }
    }

    edgeOffsets[edgeIndex] = maxEdgeOffset;
  }

  const result: Array<[number, number]> = [];

  for(let vertexIndex = 0; vertexIndex < vertexCount; vertexIndex++) {
    const vertex = polygon[vertexIndex];

    if(isUndefined(vertex)) {
      continue;
    }

    const prevEdgeIndex = (vertexIndex - 1 + vertexCount) % vertexCount;

    const prevNormal = edgeNormals[prevEdgeIndex];
    const currentNormal = edgeNormals[vertexIndex];

    const prevOffset = edgeOffsets[prevEdgeIndex] ?? 0;
    const currentOffset = edgeOffsets[vertexIndex] ?? 0;

    if(isUndefined(prevNormal) || isUndefined(currentNormal) || (prevOffset === 0 && currentOffset === 0)
    ) {
      result.push(vertex);
      continue;
    }

    const combinedShiftX = prevNormal.normalUnitX * prevOffset + currentNormal.normalUnitX * currentOffset;

    const combinedShiftZ = prevNormal.normalUnitZ * prevOffset + currentNormal.normalUnitZ * currentOffset;

    const shiftVectorLength = Math.hypot(combinedShiftX, combinedShiftZ);
    const finalShiftMagnitude = Math.max(prevOffset, currentOffset);

    const finalShiftX = (combinedShiftX / shiftVectorLength) * finalShiftMagnitude;
    const finalShiftZ = (combinedShiftZ / shiftVectorLength) * finalShiftMagnitude;

    result.push([vertex[0] + finalShiftX, vertex[1] + finalShiftZ,
    ]);
  }

  return result;
};

export type LevelPlanesPublisherProps = {
  levelTargetGroupRef: React.RefObject<Group>;
};

export const LevelPlanesPublisher: React.FC<LevelPlanesPublisherProps> = ({ levelTargetGroupRef }) => {
  const sampleHz = 1;
  const commitHz = 30;
  const pixelDeadband = 0.75;

  const { levels } = useLevels();
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1();
  const { viewMode } = useViewMode();
  const { camera, size } = useThree();

  const tmpVecRef = useRef(new Vector3());
  const lastPos = useRef(new Vector3());
  const lastQuat = useRef(new Quaternion());
  const lastProj = useRef(0);

  const roundPx = (x: number) => Math.round(x * window.devicePixelRatio) / window.devicePixelRatio;

  const visible = (
    true
      && viewMode === '3D'
      && slideUpMenuLvl1.type === 'levels'
      && slideUpMenuLvl1.isOpened === true
  );
  const levelPolysRef = useRef<Record<string, Array<Array<[number, number]>>>>({});

  const project = (x: number, y: number, z: number) => {
    const tmp = tmpVecRef.current;
    tmp.set(x, y, z).project(camera);

    return {
      sx: (tmp.x + 1) * 0.5 * size.width,
      sy: (1 - (tmp.y + 1) * 0.5) * size.height,
    };
  };

  useEffect(() => {
    if(visible === false) {
      setAllLevelPlanesForLabelsInPlace([]);
      return;
    }

    let raf = 0;
    const interval = Math.max(1000 / Math.max(1, sampleHz), 200);
    let last = 0;

    const step = (e: number) => {
      if(e - last >= interval) {
        last = e;

        const root = levelTargetGroupRef.current;
        const acc: Record<string, Array<Array<[number, number]>>> = {};

        if(!isNull(root)) {
          root.updateMatrixWorld(true);
          root.traverse(obj => {
            if(!hasFloorUserData(obj) || obj.visible === false) {
              return;
            }

            const { levelId, floorCoords } = obj.userData;
            const polysLocal = normalizePolys(floorCoords);
            if(polysLocal.length === 0) {
              return;
            }

            const tmp = tmpVecRef.current;
            const polysWorld = polysLocal.map(poly => {
              const acc: Array<[number, number]> = [];
              for(const pair of poly) {
                const x = pair[0];
                const z = pair[1];
                tmp.set(x, 0, z).applyMatrix4(obj.matrixWorld);
                acc.push([tmp.x, tmp.z]);
              }

              return acc;
            });

            if(isUndefined(acc[levelId])) {
              acc[levelId] = [];
            }
            acc[levelId].push(...polysWorld);
          });
        }

        levelPolysRef.current = acc;
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [visible, sampleHz, levelTargetGroupRef]);

  const isCameraChanged = (): boolean => {
    const p = camera.position;
    const q = camera.quaternion;
    const pm = camera.projectionMatrix.elements;

    const pm0 = pm[0] ?? 0;
    const pm5 = pm[5] ?? 0;
    const pk = pm0 + pm5;

    const eps = 1e-3;
    if(
      false
        || Math.abs(p.x - lastPos.current.x) > eps
        || Math.abs(p.y - lastPos.current.y) > eps
        || Math.abs(p.z - lastPos.current.z) > eps
        || Math.abs(q.x - lastQuat.current.x) > eps
        || Math.abs(q.y - lastQuat.current.y) > eps
        || Math.abs(q.z - lastQuat.current.z) > eps
        || Math.abs(q.w - lastQuat.current.w) > eps
        || Math.abs(pk - lastProj.current) > 1e-6
    ) {
      lastPos.current.copy(p);
      lastQuat.current.copy(q);
      lastProj.current = pk;
      return true;
    }

    return false;
  };

  type Item = {
    levelId: LevelsStore['levels'][number]['id'];
    name: string;
    screenY: number;
    screenXRight: number;
    worldY: number;
    active: boolean;
  };

  const lastCommittedRef = useRef<Item[] | null>(null);
  const lastCommitTimeRef = useRef(0);

  const shouldCommit = (next: Item[]): boolean => {
    const now = performance.now();
    const minDt = 1000 / Math.max(1, commitHz);
    if(now - lastCommitTimeRef.current < minDt) {
      return false;
    }

    const prev = lastCommittedRef.current;
    if(isNull(prev) || prev.length !== next.length) {
      lastCommittedRef.current = next;
      lastCommitTimeRef.current = now;
      return true;
    }

    for(let i = 0; i < next.length; i++) {
      const a = prev[i];
      const b = next[i];

      if(isUndefined(a) || isUndefined(b)) {
        lastCommittedRef.current = next;
        lastCommitTimeRef.current = now;
        return true;
      }

      if(a.levelId !== b.levelId || a.active !== b.active || a.worldY !== b.worldY || a.name !== b.name) {
        lastCommittedRef.current = next;
        lastCommitTimeRef.current = now;
        return true;
      }

      if(Math.abs(a.screenY - b.screenY) > pixelDeadband || Math.abs(a.screenXRight - b.screenXRight) > pixelDeadband) {
        lastCommittedRef.current = next;
        lastCommitTimeRef.current = now;
        return true;
      }
    }

    return false;
  };

  useFrame(() => {
    if(visible === false || !isCameraChanged()) {
      return;
    }

    const items: Item[] = [];
    for(const lvl of levels) {
      const polys = levelPolysRef.current[lvl.id];
      if(isUndefined(polys) || polys.length === 0) {
        continue;
      }

      const elevation = typeof lvl.elevation === 'number' ? lvl.elevation : 0;
      const height = lvl.height;
      const y = elevation + height;

      let sxRight = -Infinity;
      let sumX = 0;
      let sumZ = 0;
      let count = 0;

      for(const poly of polys) {
        for(const pair of poly) {
          const x = pair[0];
          const z = pair[1];
          const p2 = project(x, y, z);
          if(Number.isFinite(p2.sx) && p2.sx > sxRight) {
            sxRight = p2.sx;
          }
          sumX += x;
          sumZ += z;
          count++;
        }
      }

      const denom = count > 0 ? count : 1;
      const cx = sumX / denom;
      const cz = sumZ / denom;
      const { sy } = project(cx, y, cz);

      if(!Number.isFinite(sxRight)) {
        sxRight = 0.5 * window.innerWidth;
      }

      items.push({
        levelId: lvl.id,
        name: lvl.name,
        screenY: roundPx(sy),
        screenXRight: roundPx(sxRight),
        worldY: y,
        active: lvl.isActive,
      });
    }

    if(items.length === 0) {
      if(!isNull(lastCommittedRef.current) && lastCommittedRef.current.length > 0) {
        lastCommittedRef.current = [];
        setAllLevelPlanesForLabelsInPlace([]);
      }
      return;
    }

    if(shouldCommit(items)) {
      setAllLevelPlanesForLabelsInPlace(items);
    }
  });

  return null;
};
