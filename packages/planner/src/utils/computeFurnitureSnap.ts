import { isNull } from '@arthurka/ts-utils';
import { Box3, BufferGeometry, Material, Mesh, Object3D, SkinnedMesh, Vector3 } from 'three';
import { isParallelToAllowedAxes, isPointOnPlane, isVerticalOrHorizontal } from './helpers';

type SnapGuide = { from: Vector3; to: Vector3 };
type SnapResult = { offset: Vector3 | null; guides: SnapGuide[] };
type SnapPlane = { normal: Vector3; point: Vector3 } | null;
type Anchors = { x: number[]; y: number[]; z: number[]; center: Vector3; box: Box3 };

/**
 * Helper to check snapping along a single axis.
 *
 * @param curAnchors    Anchors of the current box for this axis
 * @param othAnchors    Anchors of the other box for this axis
 * @param makePoints    Function that creates guide points (p1, p2) from axis values
 * @param snapTolerance Allowed tolerance for snapping
 * @param snapPlane     Optional plane constraint
 * @param snapAxes      Optional allowed snap axes
 * @returns Updated best candidate for this axis
 */
const checkSnapAxis = (
  curAnchors: number[],
  othAnchors: number[],
  makePoints: (c: number, o: number) => [Vector3, Vector3],
  snapTolerance: number,
  snapPlane: SnapPlane,
  snapAxes: Vector3[] | null,
): Array<{ delta: number; from: Vector3; to: Vector3 }> => {
  const candidates: Array<{ delta: number; from: Vector3; to: Vector3 }> = [];

  // Decide whether to use only boundary anchors (min/max) or include center as well
  const useBoundaryOnly = !isNull(snapPlane) && Array.isArray(snapAxes) && snapAxes.length > 0;

  // Build anchor lists with strict filtering to satisfy TS (no possibly-undefined)
  const curCandidates: number[] = useBoundaryOnly ? [curAnchors[0], curAnchors[curAnchors.length - 1]].filter(
    (v): v is number => typeof v === 'number',
  ) : curAnchors;

  const othCandidates: number[] = useBoundaryOnly ? [othAnchors[0], othAnchors[othAnchors.length - 1]].filter(
    (v): v is number => typeof v === 'number',
  ) : othAnchors;

  for(const c of curCandidates) {
    for(const o of othCandidates) {
      const delta = o - c;
      if(Math.abs(delta) > snapTolerance) {
        continue;
      }

      const [p1, p2] = makePoints(c, o);

      // Both points must lie on snapPlane if it is defined
      if(!isNull(snapPlane) && (!isPointOnPlane(p1, snapPlane) || !isPointOnPlane(p2, snapPlane))) {
        continue;
      }

      // Direction must be parallel to allowed axes if provided
      if(Array.isArray(snapAxes) && snapAxes.length > 0) {
        const dir = new Vector3().subVectors(p2, p1);
        if(!isParallelToAllowedAxes(dir, snapAxes)) {
          continue;
        }
      }

      candidates.push({ delta, from: p1, to: p2 });
    }
  }

  return candidates;
};

const pickBest = (
  candidates: Array<{ delta: number; from: Vector3; to: Vector3 }>,
): { delta: number; from: Vector3; to: Vector3 } | null => {
  if(candidates.length === 0) {
    return null;
  }
  return candidates.reduce((best, cur) => (Math.abs(cur.delta) < Math.abs(best.delta) ? cur : best));
};

type MeshLike = Mesh<BufferGeometry, Material | Material[]> | SkinnedMesh;

const isMeshLike = (e: Object3D): e is MeshLike => e instanceof Mesh || e instanceof SkinnedMesh;

/**
 * Getting anchor-points (min/center/max по X/Y/Z) counting rotation of object.
 */
const getAnchorsFromObject = (obj: Object3D): Anchors | null => {
  obj.updateWorldMatrix(true, true);

  let accBox: Box3 | null = null;

  obj.traverse(child => {
    if(!isMeshLike(child)) {
      return;
    }

    const geom = child.geometry;
    if(!(geom instanceof BufferGeometry)) {
      return;
    }

    if(isNull(geom.boundingBox)) {
      geom.computeBoundingBox();
    }
    if(isNull(geom.boundingBox)) {
      return;
    }

    const worldBB = geom.boundingBox.clone().applyMatrix4(child.matrixWorld);
    accBox = !isNull(accBox) ? accBox.union(worldBB) : worldBB.clone();
  });

  if(accBox === null) {
    return null;
  }

  const box: Box3 = accBox;

  const cx = (box.min.x + box.max.x) / 2;
  const cy = (box.min.y + box.max.y) / 2;
  const cz = (box.min.z + box.max.z) / 2;

  return {
    x: [box.min.x, cx, box.max.x],
    y: [box.min.y, cy, box.max.y],
    z: [box.min.z, cz, box.max.z],
    center: box.getCenter(new Vector3()),
    box: box.clone(),
  };
};

/**
 * Computes the snapping offset and guide lines for aligning the current object
 * relative to other objects.
 *
 * Algorithm:
 *  - Extracts anchor points from the current object's bounding box
 *    (min / center / max along X, Y, Z).
 *  - Compares them with anchors of other bounding boxes.
 *  - If the difference is within snapTolerance, a snap guide and potential offset are created.
 *  - If a snapPlane is provided, only anchors that lie within (or close to) this plane are considered.
 *
 * @param curObj        Current furniture object
 * @param others        Other furniture objects
 * @param snapTolerance Allowed distance (in world units) for snapping to occur
 * @param snapPlane     Optional plane constraint ({ normal, point }).
 *                      If provided, only snap candidates lying in this plane are considered.
 *                      If null/undefined, snapping is checked in all directions (X, Y, Z).
 * @param snapAxes      Optional allowed snap axes (local, wall related allowed axes) can be any axes,
*                        computation will be toward snapPlane
 *
 * @returns { offset, guides }
 *   offset: Vector3 | null — The translation to apply to the current object
 *                            in order to snap it (null if no snapping is possible).
 *   guides: Array of { from, to } vectors representing visual snap guide lines.
 */
export const computeFurnitureSnap = (
  curObj: Object3D,
  others: Object3D[],
  snapTolerance: number,
  snapPlane: { normal: Vector3; point: Vector3 } | null,
  snapAxes: Vector3[] | null,
): SnapResult => {
  const curAnchors = getAnchorsFromObject(curObj);
  if(isNull(curAnchors)) {
    return { offset: null, guides: [] };
  }

  // collect candidates per axis
  const allX: Array<{ delta: number; from: Vector3; to: Vector3 }> = [];
  const allY: Array<{ delta: number; from: Vector3; to: Vector3 }> = [];
  const allZ: Array<{ delta: number; from: Vector3; to: Vector3 }> = [];

  for(const other of others) {
    const othAnchors = getAnchorsFromObject(other);
    if(isNull(othAnchors)) {
      continue;
    }

    // X-axis candidates
    allX.push(
      ...checkSnapAxis(
        curAnchors.x,
        othAnchors.x,
        (cx, ox) => [
          new Vector3(cx, curAnchors.center.y, curAnchors.center.z),
          new Vector3(ox, othAnchors.center.y, othAnchors.center.z),
        ],
        snapTolerance,
        snapPlane,
        snapAxes,
      ),
    );

    // center - center X
    if(Math.abs(curAnchors.center.x - othAnchors.center.x) <= snapTolerance) {
      allX.push({
        delta: othAnchors.center.x - curAnchors.center.x,
        from: curAnchors.center.clone(),
        to: othAnchors.center.clone(),
      });
    }

    // Y-axis candidates
    allY.push(
      ...checkSnapAxis(
        curAnchors.y,
        othAnchors.y,
        (cy, oy) => [
          new Vector3(curAnchors.center.x, cy, curAnchors.center.z),
          new Vector3(othAnchors.center.x, oy, othAnchors.center.z),
        ],
        snapTolerance,
        snapPlane,
        snapAxes,
      ),
    );

    // center - center Y
    if(Math.abs(curAnchors.center.y - othAnchors.center.y) <= snapTolerance) {
      allY.push({
        delta: othAnchors.center.y - curAnchors.center.y,
        from: curAnchors.center.clone(),
        to: othAnchors.center.clone(),
      });
    }

    // Z-axis candidates
    allZ.push(
      ...checkSnapAxis(
        curAnchors.z,
        othAnchors.z,
        (cz, oz) => [
          new Vector3(curAnchors.center.x, curAnchors.center.y, cz),
          new Vector3(othAnchors.center.x, othAnchors.center.y, oz),
        ],
        snapTolerance,
        snapPlane,
        snapAxes,
      ),
    );

    // center - center Z
    if(Math.abs(curAnchors.center.z - othAnchors.center.z) <= snapTolerance) {
      allZ.push({
        delta: othAnchors.center.z - curAnchors.center.z,
        from: curAnchors.center.clone(),
        to: othAnchors.center.clone(),
      });
    }
  }

  // pick one best per axis (minimal |delta|)
  const guides: SnapGuide[] = [
    ...allX.map(e => ({ from: e.from, to: e.to })),
    ...allY.map(e => ({ from: e.from, to: e.to })),
    ...allZ.map(e => ({ from: e.from, to: e.to })),
  ];

  const filteredGuides = guides.filter(g => isVerticalOrHorizontal(g.from, g.to, 1e-3));

  const winX = pickBest(allX);
  const winY = pickBest(allY);
  const winZ = pickBest(allZ);

  // offset matches exactly what we visualize
  const offset =
    winX || winY || winZ
      ? new Vector3(winX ? winX.delta : 0, winY ? winY.delta : 0, winZ ? winZ.delta : 0)
      : null;

  return { offset, guides: filteredGuides };
};
