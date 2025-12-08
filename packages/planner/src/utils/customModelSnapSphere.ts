import { isNull } from '@arthurka/ts-utils';
import { Box3, Object3D, Sphere, Vector3 } from 'three';

const BOX_SELF = new Box3();
const BOX_OTHER = new Box3();
const SPHERE = new Sphere();
const WORLD_POS = new Vector3();
const NEW_WORLD_POS = new Vector3();

type FaceSize = {
  axis: 'x' | 'y' | 'z';
  w: number;
  h: number;
};

const SIZE_EPS = 0.02;
const isSameSize = (a: number, b: number) => Math.abs(a - b) <= SIZE_EPS;

const isSameFaceSize = (a: FaceSize, b: FaceSize) => isSameSize(a.w, b.w) && isSameSize(a.h, b.h);

export const buildDragSphere = (selfRoot: Object3D, pad = 0.05): Sphere => {
  selfRoot.updateWorldMatrix(true, true);
  BOX_SELF.setFromObject(selfRoot);
  BOX_SELF.getBoundingSphere(SPHERE);
  SPHERE.radius += pad;

  return SPHERE;
};

const getSceneRoot = (self: Object3D): Object3D => {
  let root = self;

  while(!isNull(root.parent)) {
    root = root.parent;
  }

  return root;
};
const findSnapRootAncestor = (node: Object3D): Object3D | null => {
  let cur: Object3D | null = node;

  do {
    if(cur.userData.__isSnapRoot === true) {
      return cur;
    }

    cur = cur.parent;
  } while(!isNull(cur));

  return null;
};

export const collectNearbyCandidatesFast = (selfDragNode: Object3D, searchSphere: Sphere): Object3D[] => {
  const scene = getSceneRoot(selfDragNode);
  scene.updateWorldMatrix(true, true);
  const selfRoot = findSnapRootAncestor(selfDragNode) ?? selfDragNode;
  const out: Object3D[] = [];

  scene.traverseVisible(obj => {
    if(obj === selfRoot) {
      return;
    }

    if(obj.userData.__isSnapRoot === true) {
      obj.updateWorldMatrix(true, true);
      BOX_OTHER.setFromObject(obj);

      if(!BOX_OTHER.isEmpty() && searchSphere.intersectsBox(BOX_OTHER)) {
        out.push(obj);
      }
    }
  });

  return out;
};

const getBoxFaceSizes = (obj: Object3D): FaceSize[] => {
  const box = new Box3().setFromObject(obj);
  const size = box.getSize(new Vector3());

  return [
    { axis: 'x', w: size.z, h: size.y },
    { axis: 'y', w: size.x, h: size.z },
    { axis: 'z', w: size.x, h: size.y },
  ];
};

export const filterCandidatesByFaceSize = (self: Object3D, candidates: Object3D[]) => (
  candidates.filter(candidate => {
    const isCeiling = candidate.userData.__isCeilingSnapRoot === true;
    const isFloor = candidate.userData.__isFloorSnapRoot === true;
    const isWall = candidate.userData.__isWallSnapRoot === true;

    if(isCeiling === true || isFloor === true || isWall === true) {
      return true;
    }

    const selfFaces = getBoxFaceSizes(self);
    const candidateFaces = getBoxFaceSizes(candidate);

    for(const fA of selfFaces) {
      for(const fB of candidateFaces) {
        if(isSameFaceSize(fA, fB)) {
          return true;
        }
      }
    }

    return false;
  })
);

export const snapAgainstBoxes = (
  self: Object3D,
  others: Object3D[],
  snapEps: number,
  centerOrthogonal = true,
  maxCenterDelta = Infinity,
  allowY = false,
): { didYSnap: boolean; didHorizontalSnap: boolean } => {
  self.updateWorldMatrix(true, true);
  BOX_SELF.setFromObject(self);

  const selfCx = (BOX_SELF.min.x + BOX_SELF.max.x) * 0.5;
  const selfCz = (BOX_SELF.min.z + BOX_SELF.max.z) * 0.5;

  let bestDX = 0;
  let bestDZ = 0;
  let bestDY = ((e: number | null) => e)(null);
  let bestHorizontal = Infinity;
  let bestHorizontalTarget: Object3D | null = null;
  let bestPriority = Infinity;
  let didHorizontalSnap = false;
  const HYST = 1e-2;

  const centerShift = (selfC: number, otherC: number, allow: boolean) => (
    allow === false
      ? 0
      : Math.sign(otherC - selfC) * Math.min(Math.abs(otherC - selfC), maxCenterDelta)
  );

  if(allowY) {
    for(const o of others) {
      const isCeiling = o.userData.__isCeilingSnapRoot === true;
      const isFloor = o.userData.__isFloorSnapRoot === true;

      if(isCeiling === false && isFloor === false) {
        continue;
      }

      o.updateWorldMatrix(true, true);
      BOX_OTHER.setFromObject(o);
      if(BOX_OTHER.isEmpty()) {
        continue;
      }

      const dyUp = BOX_OTHER.min.y - BOX_SELF.max.y;
      if(dyUp > 0 && dyUp <= snapEps + HYST) {
        if(isNull(bestDY) || Math.abs(dyUp) < Math.abs(bestDY)) {
          bestDY = dyUp;
        }
      }

      const dyDown = BOX_OTHER.max.y - BOX_SELF.min.y;
      if(dyDown < 0 && Math.abs(dyDown) <= snapEps + HYST) {
        if(isNull(bestDY) || Math.abs(dyDown) < Math.abs(bestDY)) {
          bestDY = dyDown;
        }
      }
    }
  }

  if(!isNull(bestDY)) {
    self.getWorldPosition(WORLD_POS);
    NEW_WORLD_POS.set(WORLD_POS.x, WORLD_POS.y + bestDY, WORLD_POS.z);

    const p = self.parent;
    if(!isNull(p)) {
      p.updateWorldMatrix(true, true);
      p.worldToLocal(NEW_WORLD_POS);
    }

    self.position.set(NEW_WORLD_POS.x, NEW_WORLD_POS.y, NEW_WORLD_POS.z);
    self.updateWorldMatrix(false, false);

    return { didYSnap: true, didHorizontalSnap: false };
  }

  for(const o of others) {
    o.updateWorldMatrix(true, true);
    BOX_OTHER.setFromObject(o);
    if(BOX_OTHER.isEmpty()) {
      continue;
    }

    const candidatePriority = (
      false
        || o.userData.__isWallSnapRoot === true
        || o.userData.__isFloorSnapRoot === true
        || o.userData.__isCeilingSnapRoot === true
        ? 2
        : 1
    );

    const oCx = (BOX_OTHER.min.x + BOX_OTHER.max.x) * 0.5;
    const oCz = (BOX_OTHER.min.z + BOX_OTHER.max.z) * 0.5;
    const allowCenter = centerOrthogonal === true && o.userData.__snapToCenter === true;

    const dx1 = BOX_OTHER.min.x - BOX_SELF.max.x;
    if(Math.abs(dx1) <= snapEps + HYST) {
      const dzc = centerShift(selfCz, oCz, allowCenter);
      const g = Math.hypot(dx1, dzc);
      if(candidatePriority < bestPriority || candidatePriority === bestPriority && g < bestHorizontal) {
        bestPriority = candidatePriority;
        bestHorizontal = g;
        bestDX = dx1;
        bestDZ = dzc;
        bestHorizontalTarget = o;
      }
    }

    const dx2 = BOX_OTHER.max.x - BOX_SELF.min.x;
    if(Math.abs(dx2) <= snapEps + HYST) {
      const dzc = centerShift(selfCz, oCz, allowCenter);
      const g = Math.hypot(dx2, dzc);
      if(candidatePriority < bestPriority || candidatePriority === bestPriority && g < bestHorizontal) {
        bestPriority = candidatePriority;
        bestHorizontal = g;
        bestDX = dx2;
        bestDZ = dzc;
        bestHorizontalTarget = o;
      }
    }

    const dz1 = BOX_OTHER.min.z - BOX_SELF.max.z;
    if(Math.abs(dz1) <= snapEps + HYST) {
      const dxc = centerShift(selfCx, oCx, allowCenter);
      const g = Math.hypot(dxc, dz1);
      if(candidatePriority < bestPriority || candidatePriority === bestPriority && g < bestHorizontal) {
        bestPriority = candidatePriority;
        bestHorizontal = g;
        bestDX = dxc;
        bestDZ = dz1;
        bestHorizontalTarget = o;
      }
    }

    const dz2 = BOX_OTHER.max.z - BOX_SELF.min.z;
    if(Math.abs(dz2) <= snapEps + HYST) {
      const dxc = centerShift(selfCx, oCx, allowCenter);
      const g = Math.hypot(dxc, dz2);
      if(candidatePriority < bestPriority || candidatePriority === bestPriority && g < bestHorizontal) {
        bestPriority = candidatePriority;
        bestHorizontal = g;
        bestDX = dxc;
        bestDZ = dz2;
        bestHorizontalTarget = o;
      }
    }
  }

  let lastSnapIsWall = false;

  if(!isNull(bestHorizontalTarget) && bestHorizontal < Infinity) {
    didHorizontalSnap = true;

    lastSnapIsWall = (
      false
        || bestHorizontalTarget.userData.__isWallSnapRoot === true
        || bestHorizontalTarget.userData.__isFloorSnapRoot === true
        || bestHorizontalTarget.userData.__isCeilingSnapRoot === true
    );

    self.getWorldPosition(WORLD_POS);
    NEW_WORLD_POS.set(WORLD_POS.x + bestDX, WORLD_POS.y, WORLD_POS.z + bestDZ);

    const p = self.parent;
    if(!isNull(p)) {
      p.updateWorldMatrix(true, true);
      p.worldToLocal(NEW_WORLD_POS);
    }

    self.position.set(NEW_WORLD_POS.x, NEW_WORLD_POS.y, NEW_WORLD_POS.z);
    self.updateWorldMatrix(false, false);
  }

  const selfUserData = self.userData;
  selfUserData.__lastSnapIsWall = lastSnapIsWall;

  return { didYSnap: false, didHorizontalSnap };
};
