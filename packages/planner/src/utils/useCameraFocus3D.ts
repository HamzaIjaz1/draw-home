import { Box3, Camera, Object3D, PerspectiveCamera, Raycaster, Vector3 } from 'three';
import { isNull, isUndefined, KeyOf } from '@arthurka/ts-utils';
import { useR3FData } from '../zustand/useR3FData';
import { SceneObjectsStore, useSceneObjects } from '../zustand/useSceneObjects';

type SavedPOV = { pos: Vector3; tgt: Vector3 } | null;
let saved: SavedPOV = null;

export function saveCurrentPOV() {
  const { controls } = useR3FData.getState();
  if(isNull(controls)) {
    saved = null;
    return;
  }
  saved = {
    pos: controls.object.position.clone(),
    tgt: controls.target.clone(),
  };
}

export function restorePOV(durationMs = 600) {
  const { controls } = useR3FData.getState();
  if(isNull(controls) || isNull(saved)) {
    return;
  }
  const ctr = controls;

  const fromPos = ctr.object.position.clone();
  const fromTgt = ctr.target.clone();
  const toPos = saved.pos.clone();
  const toTgt = saved.tgt.clone();

  const start = performance.now();
  function tick(now: number) {
    const t = Math.min(1, (now - start) / durationMs);
    ctr.object.position.lerpVectors(fromPos, toPos, t);
    ctr.target.lerpVectors(fromTgt, toTgt, t);
    ctr.update();
    if(t < 1) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}

export type FocusOpts = {
  durationMs?: number;
  /** Screen-space vertical offset (NDC Y). 0=center, +1=top, -1=bottom. */
  yNdcOffset?: number;
  /** Candidate pitches (deg). */
  pitchCandidatesDeg?: number[]; // default [15, 25, 35]
  /** Sweep yaw around current azimuth (deg) and step size (deg). */
  yawSweepDeg?: number; // default 360
  yawStepDeg?: number; // default 15
  /** Extra framing margin multiplier (>=1). */
  margin?: number; // default 1.25
  /** Distance multipliers to try (relative to fit distance). */
  distMultipliers?: number[]; // default [1.0, 1.25, 1.5]
  /** Acceptable visibility threshold (0..1). */
  minVisibleFraction?: number; // default 0.6
  visibleViewportHeight?: number;
  alignY?: 'center' | 'top' | 'bottom';
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const degToRad = (d: number) => (d * Math.PI) / 180;

function distanceToFitSphere(
  camera: PerspectiveCamera,
  size: Vector3,
  margin: number,
  viewportHeightFrac = 1,
) {
  const radius = size.length() / 2;
  const fovRad = degToRad(camera.fov);
  const eff = clamp(viewportHeightFrac, 0.2, 1);
  const dist = radius / Math.sin((fovRad * eff) / 2);
  return dist * margin;
}

function dirFromYawPitch(yawRad: number, pitchRad: number) {
  const x = Math.cos(pitchRad) * Math.sin(yawRad);
  const y = Math.sin(pitchRad);
  const z = Math.cos(pitchRad) * Math.cos(yawRad);
  return new Vector3(x, y, z).normalize();
}

function getOccluders(target: Object3D) {
  const { sceneObjects } = useSceneObjects.getState();
  const occluders: Object3D[] = [];
  const ALLOWED: readonly string[] = [
    'wall:',
    'roof:',
    'floor:',
    'ceiling:',
    'space:',
    'stair:',
    'customModel:',
  ];

  for(const [key, obj] of sceneObjects) {
    if(obj === target) {
      continue;
    }
    const allowed = ALLOWED.some(e => key.startsWith(e));
    if(allowed === true) {
      occluders.push(obj);
    }
  }
  return occluders;
}

type BoundsCache = {
  box: Box3;
  size: Vector3;
  center: Vector3;
  samples: Vector3[];
  mw: Float32Array;
};
const BOUNDS = new WeakMap<Object3D, BoundsCache>();

function snapshotMatrixWorld(obj: Object3D) {
  const elements = obj.matrixWorld.elements;
  const snapshot = new Float32Array(16);

  const elementCount = Math.min(16, elements.length);
  for(let i = 0; i < elementCount; i++) {
    snapshot[i] = elements[i] ?? 0;
  }
  for(let i = elementCount; i < 16; i++) {
    snapshot[i] = 0;
  }
  return snapshot;
}

function sameMatrix(lhs: Float32Array, rhs: Float32Array) {
  for(let i = 0; i < 16; i++) {
    if(lhs[i] !== rhs[i]) {
      return false;
    }
  }
  return true;
}

function computeWorldBounds(obj: Object3D) {
  const box = new Box3().setFromObject(obj);
  const size = new Vector3();
  const center = new Vector3();
  box.getSize(size);
  box.getCenter(center);
  return { center, size, box };
}

function boxCorners(box: Box3) {
  const { min, max } = box;
  return [
    new Vector3(min.x, min.y, min.z), new Vector3(max.x, min.y, min.z),
    new Vector3(min.x, max.y, min.z), new Vector3(max.x, max.y, min.z),
    new Vector3(min.x, min.y, max.z), new Vector3(max.x, min.y, max.z),
    new Vector3(min.x, max.y, max.z), new Vector3(max.x, max.y, max.z),
  ];
}
function boxFaceCenters(box: Box3, c: Vector3) {
  const { min, max } = box;
  return [
    new Vector3(c.x, c.y, min.z), new Vector3(c.x, c.y, max.z),
    new Vector3(c.x, min.y, c.z), new Vector3(c.x, max.y, c.z),
    new Vector3(min.x, c.y, c.z), new Vector3(max.x, c.y, c.z),
  ];
}

function getBoundsCached(obj: Object3D): BoundsCache {
  obj.updateWorldMatrix(true, true);
  const last = BOUNDS.get(obj);
  const curMw = snapshotMatrixWorld(obj);
  if(last !== undefined && sameMatrix(last.mw, curMw) === true) {
    return last;
  }

  const { center, size, box } = computeWorldBounds(obj);
  const samples = [center, ...boxCorners(box), ...boxFaceCenters(box, center)];

  const rec: BoundsCache = { box, size, center, samples, mw: curMw };
  BOUNDS.set(obj, rec);
  return rec;
}

const tmpDir = new Vector3();
const tmpRay = new Raycaster();

function rayHitsOccluder(
  from: Vector3,
  to: Vector3,
  occluders: Object3D[],
  target: Object3D,
  cam: Camera,
) {
  const dir = tmpDir.copy(to).sub(from);
  const dist = dir.length();
  if(dist <= 0.0001 || occluders.length === 0) {
    return false;
  }

  const segMin = new Vector3(Math.min(from.x, to.x), Math.min(from.y, to.y), Math.min(from.z, to.z));
  const segMax = new Vector3(Math.max(from.x, to.x), Math.max(from.y, to.y), Math.max(from.z, to.z));

  const candidates: Object3D[] = [];
  for(const o of occluders) {
    const { box } = getBoundsCached(o);
    if(
      box.max.x < segMin.x || box.min.x > segMax.x ||
      box.max.y < segMin.y || box.min.y > segMax.y ||
      box.max.z < segMin.z || box.min.z > segMax.z
    ) {
      continue;
    }
    candidates.push(o);
  }
  if(candidates.length === 0) {
    return false;
  }

  tmpRay.set(from, dir.normalize());
  tmpRay.camera = cam;

  let hits: Array<import('three').Intersection<Object3D>> = [];
  try {
    hits = tmpRay.intersectObjects(candidates, true);
  } catch(e) {
    return false;
  }

  const visibleHit = hits.find(h => {
    let o: Object3D | null = h.object;
    while(o) {
      if(o === target) {
        return false;
      }
      o = o.parent ?? null;
    }
    const t = h.object.type;
    if(t.startsWith('Line') === true) {
      return false;
    }
    return true;
  });

  return visibleHit !== undefined;
}

function visibleEnough(
  cam: Camera,
  from: Vector3,
  samples: Vector3[],
  occluders: Object3D[],
  minVisibleFraction: number,
  maxSamples: number,
  target: Object3D,
) {
  const total = Math.min(maxSamples, samples.length);
  const order = Array.from({ length: total }, (e, i) => i);

  let visible = 0;
  for(let i = 0; i < order.length; i++) {
    const idx = order[i];
    if(typeof idx !== 'number') {
      continue;
    }

    const p = samples[idx];
    if(p === undefined) {
      continue;
    }

    const blocked = rayHitsOccluder(from, p, occluders, target, cam);
    if(blocked === false) {
      visible++;
    }

    const processed = i + 1;
    const remaining = total - processed;
    if((visible + remaining) / total < minVisibleFraction) {
      return { ok: false, frac: visible / total };
    }
    if(visible / total >= minVisibleFraction) {
      return { ok: true, frac: visible / total };
    }
  }
  return { ok: visible / total >= minVisibleFraction, frac: visible / total };
}

function ndcYMinMax(cam: Camera, pts: Vector3[]) {
  const p = new Vector3();
  let min = Infinity;
  let max = -Infinity;
  for(const v of pts) {
    p.copy(v).project(cam);
    if(p.y < min) {
      min = p.y;
    }
    if(p.y > max) {
      max = p.y;
    }
  }
  return { min, max, center: (min + max) / 2, span: max - min };
}

function measureNdcForPose(
  cam: PerspectiveCamera,
  pos: Vector3,
  tgt: Vector3,
  samples: Vector3[],
) {
  const posBak = cam.position.clone();
  const quatBak = cam.quaternion.clone();

  cam.position.copy(pos);
  cam.lookAt(tgt);
  cam.updateMatrixWorld(true);

  const m = ndcYMinMax(cam, samples);

  cam.position.copy(posBak);
  cam.quaternion.copy(quatBak);
  cam.updateMatrixWorld(true);

  return m;
}

function centerIntoTopHalf(
  cam: PerspectiveCamera,
  obj: Object3D,
  posIn: Vector3,
  tgtIn: Vector3,
  padNdc = 0.02,
) {
  let posW = posIn.clone();
  const tgtW = tgtIn.clone();

  const { samples } = getBoundsCached(obj);

  const allowedMin = 0 + padNdc;
  const allowedMax = 1 - padNdc;
  const allowedSpan = allowedMax - allowedMin;
  const desiredCenter = (allowedMin + allowedMax) / 2;

  const m0 = measureNdcForPose(cam, posW, tgtW, samples);

  if(m0.span > allowedSpan * 0.999) {
    const d0 = posW.distanceTo(tgtW);
    const dir = new Vector3().subVectors(posW, tgtW).normalize();
    const scale = m0.span / allowedSpan;
    const d1 = d0 * scale * 1.02;
    posW = tgtW.clone().addScaledVector(dir, d1);
  }

  const d = posW.distanceTo(tgtW);
  const fovRad = degToRad(cam.fov);
  const worldPerNdc = d * Math.tan(fovRad / 2);

  const tol = 0.004;
  const maxIters = 4;
  const maxStep = worldPerNdc * 0.35;
  const probe = worldPerNdc * 0.05;

  for(let iter = 0; iter < maxIters; iter++) {
    const m = measureNdcForPose(cam, posW, tgtW, samples);
    const err = desiredCenter - m.center;

    if(Math.abs(err) <= tol) {
      break;
    }

    cam.position.copy(posW);
    cam.lookAt(tgtW);
    cam.updateMatrixWorld(true);
    const camUp = new Vector3(0, 1, 0).applyQuaternion(cam.quaternion).normalize();

    const pPlus = posW.clone().addScaledVector(camUp, +probe);
    const tPlus = tgtW.clone().addScaledVector(camUp, +probe);
    const yPlus = measureNdcForPose(cam, pPlus, tPlus, samples).center;

    const pMinus = posW.clone().addScaledVector(camUp, -probe);
    const tMinus = tgtW.clone().addScaledVector(camUp, -probe);
    const yMinus = measureNdcForPose(cam, pMinus, tMinus, samples).center;

    const slope = (yPlus - yMinus) / (2 * probe);

    if(Math.abs(slope) < 0.000001) {
      const dir = new Vector3().subVectors(posW, tgtW).normalize();
      posW = tgtW.clone().addScaledVector(dir, d * 1.05);
      continue;
    }

    const delta = clamp(err / slope, -maxStep, +maxStep);
    posW.addScaledVector(camUp, delta);
    tgtW.addScaledVector(camUp, delta);

    const m2 = measureNdcForPose(cam, posW, tgtW, samples);
    if(m2.span > allowedSpan * 0.999) {
      const dir = new Vector3().subVectors(posW, tgtW).normalize();
      const dCur = posW.distanceTo(tgtW);
      posW = tgtW.clone().addScaledVector(dir, dCur * (m2.span / allowedSpan) * 1.02);
    }
  }

  return { pos: posW, tgt: tgtW };
}

function animateTo(
  ctr: NonNullable<ReturnType<typeof useR3FData.getState>['controls']>,
  to: { pos: Vector3; tgt: Vector3 },
  durationMs: number,
) {
  const start = performance.now();
  const pos0 = ctr.object.position.clone();
  const tgt0 = ctr.target.clone();
  const pos1 = to.pos.clone();
  const tgt1 = to.tgt.clone();

  function tick(now: number) {
    const t = Math.min(1, (now - start) / durationMs);
    ctr.object.position.lerpVectors(pos0, pos1, t);
    ctr.target.lerpVectors(tgt0, tgt1, t);
    ctr.update();

    if(t < 1) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}

function focusSimple(
  ctr: NonNullable<ReturnType<typeof useR3FData.getState>['controls']>,
  obj: Object3D,
  { durationMs, yNdcOffset }: { durationMs: number; yNdcOffset: number },
) {
  const { center } = getBoundsCached(obj);
  const fromPos = ctr.object.position.clone();
  const fromTarget = ctr.target.clone();
  const viewDir = new Vector3().subVectors(fromPos, fromTarget).normalize();

  const baseDist = 3;
  const fovRad = Math.PI / 3;
  const dy = clamp(yNdcOffset, -0.95, 0.95) * baseDist * Math.tan(fovRad / 2);

  const camUp = new Vector3(0, 1, 0).applyQuaternion(ctr.object.quaternion).normalize();
  const baseTarget = center.clone().addScaledVector(camUp, -dy);
  const pos1 = baseTarget.clone().addScaledVector(viewDir, baseDist);

  const start = performance.now();
  function tick(now: number) {
    const t = Math.min(1, (now - start) / durationMs);
    ctr.object.position.lerpVectors(fromPos, pos1, t);
    ctr.target.lerpVectors(fromTarget, baseTarget, t);
    ctr.update();
    if(t < 1) {
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}

type PoseCache = {
  mw: Float32Array;
  pos: Vector3;
  tgt: Vector3;
  fov: number;
  cfg: string;
};
const LAST_POSE = new WeakMap<Object3D, PoseCache>();

function makeCfgHash(
  cam: PerspectiveCamera,
  o: Required<
    Pick<FocusOpts, 'visibleViewportHeight' | 'margin' | 'yawSweepDeg' | 'yawStepDeg' | 'minVisibleFraction'>
  > & { dist: string; pitch: string },
) {
  return [
    cam.fov.toFixed(3),
    o.visibleViewportHeight.toFixed(3),
    o.margin.toFixed(3),
    o.yawSweepDeg,
    o.yawStepDeg,
    o.minVisibleFraction.toFixed(2),
    o.dist,
    o.pitch,
  ].join('|');
}

export function focusObjectByKey(
  key: KeyOf<SceneObjectsStore['sceneObjects']>,
  opts: FocusOpts = {},
) {
  const {
    durationMs = 700,
    yNdcOffset,
    pitchCandidatesDeg = [15, 25, 35],
    yawSweepDeg = 360,
    yawStepDeg = 15,
    margin = 1.25,
    distMultipliers = [1.0, 1.25, 1.5],
    minVisibleFraction = 0.6,
    visibleViewportHeight = 1,
    alignY = 'center',
  } = opts;

  const { controls, camera } = useR3FData.getState();
  const { sceneObjects } = useSceneObjects.getState();

  const obj = sceneObjects.get(key);

  if(isNull(controls) || isNull(camera) || obj === undefined) {
    return;
  }

  if(camera instanceof PerspectiveCamera !== true) {
    focusSimple(controls, obj, { durationMs, yNdcOffset: yNdcOffset ?? 0 });
    return;
  }

  const ctr = controls;
  const cam = camera;

  const { center, size, samples } = getBoundsCached(obj);

  const fromPos = ctr.object.position.clone();
  const fromTarget = ctr.target.clone();
  const rel = fromPos.clone().sub(fromTarget);
  const baseYaw = Math.atan2(rel.x, rel.z);
  const relLen = rel.length();
  const basePitchDeg = (Math.asin(relLen > 1e-6 ? rel.y / relLen : 0) * 180) / Math.PI;

  const targetBasePitchDeg = key.startsWith('ceiling:') ? -basePitchDeg : basePitchDeg;
  const pitchCandidates = key.startsWith('ceiling:') ? pitchCandidatesDeg.map(e => -Math.abs(e)) : pitchCandidatesDeg;

  const useHalf = (visibleViewportHeight ?? 1) < 0.999;
  const fitDist = distanceToFitSphere(cam, size, margin, clamp(visibleViewportHeight, 0.2, 1));

  const effectiveOffset =
    useHalf === true
      ? 0
      : clamp(
        typeof yNdcOffset === 'number'
          ? yNdcOffset
          : alignY === 'top'
            ? +0.5
            : alignY === 'bottom'
              ? -0.5
              : 0,
        -0.95,
        0.95,
      );

  const fovRad = degToRad(cam.fov);
  const dy = effectiveOffset * fitDist * Math.tan(fovRad / 2);
  ctr.update();
  const camUpInit = new Vector3(0, 1, 0).applyQuaternion(ctr.object.quaternion).normalize();
  const baseTarget = center.clone().addScaledVector(camUpInit, -dy);

  const nearestPitch = (() => {
    const [candidate] = pitchCandidates.toSorted((a, b) => Math.abs(a - targetBasePitchDeg) - Math.abs(b - targetBasePitchDeg));

    return (
      !isUndefined(candidate)
        ? candidate
        : key.startsWith('ceiling:')
          ? -20
          : 20
    );
  })();

  const dir0 = dirFromYawPitch(baseYaw, degToRad(nearestPitch));
  const pos0 = baseTarget.clone().addScaledVector(dir0, fitDist);
  const tgt0 = baseTarget.clone();

  const occluders = getOccluders(obj);

  const cfg = makeCfgHash(cam, {
    visibleViewportHeight,
    margin,
    yawSweepDeg,
    yawStepDeg,
    minVisibleFraction,
    dist: distMultipliers.join(','),
    pitch: pitchCandidates.join(','),
  });
  const last = LAST_POSE.get(obj);
  if(last !== undefined && sameMatrix(last.mw, snapshotMatrixWorld(obj)) === true && last.fov === cam.fov && last.cfg === cfg) {
    if(rayHitsOccluder(last.pos, center, occluders, obj, cam) === false) {
      let to = { pos: last.pos.clone(), tgt: last.tgt.clone() };
      if(useHalf === true) {
        to = centerIntoTopHalf(cam, obj, to.pos, to.tgt);
      }
      animateTo(ctr, to, durationMs);
      return;
    }
  }

  if(occluders.length === 0) {
    let to = { pos: pos0, tgt: tgt0 };
    if(useHalf === true) {
      to = centerIntoTopHalf(cam, obj, to.pos, to.tgt);
    }
    LAST_POSE.set(obj, { mw: snapshotMatrixWorld(obj), pos: to.pos.clone(), tgt: to.tgt.clone(), fov: cam.fov, cfg });
    animateTo(ctr, to, durationMs);
    return;
  }

  if(rayHitsOccluder(pos0, center, occluders, obj, cam) === false) {
    let to = { pos: pos0, tgt: tgt0 };
    if(useHalf === true) {
      to = centerIntoTopHalf(cam, obj, to.pos, to.tgt);
    }
    LAST_POSE.set(obj, { mw: snapshotMatrixWorld(obj), pos: to.pos.clone(), tgt: to.tgt.clone(), fov: cam.fov, cfg });
    animateTo(ctr, to, durationMs);
    return;
  }

  const yawFast: number[] = (() => {
    const half = Math.max(0, 90 / 2);
    const steps = Math.max(1, Math.round(half / yawStepDeg));
    const out: number[] = [0];
    for(let i = 1; i <= steps; i++) {
      const d = i * yawStepDeg;
      if(d <= half) {
        out.push(+d, -d);
      }
    }
    return out;
  })();
  const distFast = [1.0, 1.25];
  const sampleCapFast = 8;

  for(const k of distFast) {
    const dist = fitDist * k;
    for(const deltaDeg of yawFast) {
      const yawRad = baseYaw + degToRad(deltaDeg);
      const dir = dirFromYawPitch(yawRad, degToRad(nearestPitch));
      const pos = baseTarget.clone().addScaledVector(dir, dist);
      const tgt = baseTarget.clone();

      const vis = visibleEnough(cam, pos, samples, occluders, minVisibleFraction, sampleCapFast, obj);
      if(vis.ok === true) {
        let to = { pos, tgt };
        if(useHalf === true) {
          to = centerIntoTopHalf(cam, obj, to.pos, to.tgt);
        }
        LAST_POSE.set(obj, { mw: snapshotMatrixWorld(obj), pos: to.pos.clone(), tgt: to.tgt.clone(), fov: cam.fov, cfg });
        animateTo(ctr, to, durationMs);
        return;
      }
    }
  }

  const yawFull = (() => {
    const yawHalf = Math.max(0, yawSweepDeg / 2);
    const steps = Math.max(1, Math.round(yawHalf / yawStepDeg));
    const out: number[] = [0];
    for(let i = 1; i <= steps; i++) {
      const d = i * yawStepDeg;
      if(d <= yawHalf) {
        out.push(+d, -d);
      }
    }
    return out;
  })();

  const sampleCapFull = 12;

  type ViewCandidate = {
    position: Vector3;
    target: Vector3;
    visibility: number;
    yawAbs: number;
    pitchAbs: number;
    distance: number;
  };
  const candidates: ViewCandidate[] = [];

  for(const pitchDeg of pitchCandidates) {
    const pitchRad = degToRad(pitchDeg);
    const pitchAbs = Math.abs(pitchDeg - basePitchDeg);

    for(const mult of distMultipliers) {
      const dist = fitDist * mult;
      for(const deltaDeg of yawFull) {
        const yawRad = baseYaw + degToRad(deltaDeg);
        const dir = dirFromYawPitch(yawRad, pitchRad);
        const pos = baseTarget.clone().addScaledVector(dir, dist);
        const tgt = baseTarget.clone();

        const { ok, frac } = visibleEnough(cam, pos, samples, occluders, minVisibleFraction, sampleCapFull, obj);
        if(ok) {
          let to = { pos, tgt };
          if(useHalf) {
            to = centerIntoTopHalf(cam, obj, to.pos, to.tgt);
          }
          LAST_POSE.set(obj, { mw: snapshotMatrixWorld(obj), pos: to.pos.clone(), tgt: to.tgt.clone(), fov: cam.fov, cfg });
          animateTo(ctr, to, durationMs);
          return;
        }
        candidates.push({
          position: pos,
          target: tgt,
          visibility: frac,
          yawAbs: Math.abs(deltaDeg),
          pitchAbs,
          distance: dist,
        });
      }
    }
  }

  if(candidates.length === 0) {
    return;
  }

  candidates.sort(
    (a, b) => b.visibility - a.visibility ||
      a.yawAbs - b.yawAbs ||
      a.pitchAbs - b.pitchAbs ||
      a.distance - b.distance,
  );
  const best = candidates[0];
  if(best === undefined) {
    return;
  }

  let to = { pos: best.position, tgt: best.target };
  if(useHalf === true) {
    to = centerIntoTopHalf(cam, obj, to.pos, to.tgt);
  }
  LAST_POSE.set(obj, { mw: snapshotMatrixWorld(obj), pos: to.pos.clone(), tgt: to.tgt.clone(), fov: cam.fov, cfg });
  animateTo(ctr, to, durationMs);
}
