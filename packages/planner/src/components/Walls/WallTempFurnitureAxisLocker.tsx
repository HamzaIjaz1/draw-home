import { useEffect, useMemo, useRef, useState } from 'react';
import { Vector3 } from 'three';
import { WallFurnitureId } from '@draw-house/common/dist/brands';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { setTempWallFurnitureCoordinate, useLevels, useTempWallFurniture, useWalls } from '../../zustand';
import { GuideLines } from '../GuideLines';
import { furnitureWorldOnWall } from '../../utils/wallsChain';
import { useModelBounds } from '../../customHooks/useModelBounds';
import { wallFurnitureLockAxisColor } from '../../constants';

type Axis = 'x' | 'y';

const SNAP_INIT_THRESHOLD = 0.05; // min distance from start to consider axis at all
const SNAP_BREAK_THRESHOLD = 0.2; // off-axis deviation to break snapping
const RESET_THRESHOLD = 0.05; // near-start zone to clear axis
const PICK_CORRIDOR_MULTIPLIER = 1; // how close to an axis to allow picking it (× break threshold)

// World helpers
const NORMAL_OFFSET_MAX = 0.08;
const FALLBACK_EXT = 100;
const EPS_DENOM = 1e-4; // avoid crash

export const WallTempFurnitureAxisLocker: React.FC = () => {
  const { tempWallFurniture } = useTempWallFurniture();
  const { walls } = useWalls();
  const { levels } = useLevels();

  // For anchoring guides through object's CENTER
  const modelBounds = useModelBounds({ url: tempWallFurniture?.furniture.url });

  // Local axis state per movement session
  const [activeAxis, setActiveAxis] = useState<Axis | null>(null);

  // Persist start wall id for the whole session
  const [startWallId, setStartWallId] = useState<string | null>(null);

  const prevFurnitureIdRef = useRef<WallFurnitureId | null>(null);

  // Reset/capture session-scoped data
  useEffect(() => {
    const tf = tempWallFurniture;

    if(isNull(tf)) {
      setActiveAxis(null);
      setStartWallId(null);
      prevFurnitureIdRef.current = null;
      return;
    }

    const curId: WallFurnitureId = tf.furniture.id;

    if(prevFurnitureIdRef.current !== curId) {
      setActiveAxis(null);
      setStartWallId(tf.targetWallId);
      prevFurnitureIdRef.current = curId;
    }
  }, [tempWallFurniture]);

  // Resolve walls (current & start)
  const currentWall = useMemo(() => {
    if(isNull(tempWallFurniture)) {
      return null;
    }
    const id = tempWallFurniture.targetWallId;
    const found = walls.find(e => e.id === id);
    if(isUndefined(found)) {
      return null;
    }
    return found;
  }, [tempWallFurniture, walls]);

  const startWall = useMemo(() => {
    if(isNull(startWallId)) {
      return null;
    }
    const found = walls.find(e => e.id === startWallId);
    if(isUndefined(found)) {
      return null;
    }

    return found;
  }, [startWallId, walls]);

  const UP = useMemo(() => new Vector3(0, 1, 0), []);

  const startFrame = useMemo(() => {
    if(isNull(startWall)) {
      return null;
    }

    const lvl = levels.find(e => e.id === startWall.levelId);
    if(isUndefined(lvl)) {
      return null;
    }

    const elevation = Number(lvl.elevation);
    const wallHeight = Number(startWall.height ?? lvl.height);

    const s = new Vector3(startWall.position.start.x, 0, startWall.position.start.y);
    const e = new Vector3(startWall.position.end.x, 0, startWall.position.end.y);

    const ex = e.clone().sub(s);
    if(ex.lengthSq() > 0) {
      ex.normalize();
    } else {
      ex.set(1, 0, 0);
    }

    const ez = new Vector3().crossVectors(ex, UP).normalize();
    const centerXZ = s.clone().add(e).multiplyScalar(0.5);

    return {
      ex,
      ez,
      centerXZ,
      wallHeight,
      levelElevation: elevation,
      thickness: Number(startWall.thickness),
      wallId: startWall.id,
    };
  }, [startWall, levels, UP]);

  const curFrame = useMemo(() => {
    if(isNull(currentWall)) {
      return null;
    }

    const lvl = levels.find(e => e.id === currentWall.levelId);
    if(isUndefined(lvl)) {
      return null;
    }

    const elevation = Number(lvl.elevation);
    const wallHeight = Number(currentWall.height ?? lvl.height);

    const s = new Vector3(currentWall.position.start.x, 0, currentWall.position.start.y);
    const e = new Vector3(currentWall.position.end.x, 0, currentWall.position.end.y);

    const ex = e.clone().sub(s);
    const len = ex.length();
    if(len > 0) {
      ex.divideScalar(len);
    } else {
      ex.set(1, 0, 0);
    }

    const centerXZ = s.clone().add(e).multiplyScalar(0.5);

    return {
      ex,
      centerXZ,
      wallHeight,
      levelElevation: elevation,
      length: len,
      wallId: currentWall.id,
    };
  }, [currentWall, levels]);

  const { elevation } = useMemo(() => {
    if(isNull(currentWall)) {
      return { currLevel: null, elevation: null };
    }

    const lvl = levels.find(e => e.id === currentWall.levelId);
    if(isUndefined(lvl)) {
      return { currLevel: null, elevation: null };
    }

    return { currLevel: lvl, elevation: lvl.elevation };
  }, [currentWall, levels]);

  const objH = !isNull(modelBounds) ? modelBounds.size.y : 0;

  // Axis lock in WORLD space relative to START axes
  useEffect(() => {
    if(isNull(tempWallFurniture) || isNull(startFrame) || isNull(curFrame) || isNull(startWall) || isNull(currentWall)) {
      return;
    }

    const { furniture, startOnWallCoordinateX, startOnWallCoordinateY } = tempWallFurniture;

    // START anchor (object CENTER in world at start)
    const startX = !isNull(startOnWallCoordinateX) ? startOnWallCoordinateX : furniture.onWallCoordinateX;
    const startYAbs = !isNull(startOnWallCoordinateY) ? startOnWallCoordinateY : furniture.onWallCoordinateY;
    const startCenterYAbs = startYAbs + objH / 2;

    const pStartCenterWorld = furnitureWorldOnWall(
      new Vector3(startWall.position.start.x, 0, startWall.position.start.y),
      new Vector3(startWall.position.end.x, 0, startWall.position.end.y),
      startX,
      startCenterYAbs,
    ).add(new Vector3(0, startFrame.levelElevation, 0));

    // CURRENT furniture center in world
    const xCur = furniture.onWallCoordinateX;
    const yCurAbs = furniture.onWallCoordinateY;
    const curCenterYAbs = yCurAbs + objH / 2;

    const pCurCenterWorld = furnitureWorldOnWall(
      new Vector3(currentWall.position.start.x, 0, currentWall.position.start.y),
      new Vector3(currentWall.position.end.x, 0, currentWall.position.end.y),
      xCur,
      curCenterYAbs,
    ).add(new Vector3(0, curFrame.levelElevation, 0));

    // world deltas relative to START axes
    const delta = pCurCenterWorld.clone().sub(pStartCenterWorld);
    const dxWorld = delta.clone().setY(0).dot(startFrame.ex); // along start X axis
    const dyWorld = delta.y; // along world up
    const dist = Math.hypot(dxWorld, dyWorld);

    // corridors for picking/breaking
    const PICK_CORRIDOR = SNAP_BREAK_THRESHOLD * PICK_CORRIDOR_MULTIPLIER;
    const canPickX = Math.abs(dyWorld) <= PICK_CORRIDOR; // close to horizontal axis (y deviation small)
    const canPickY = Math.abs(dxWorld) <= PICK_CORRIDOR; // close to vertical axis (x deviation small)

    // 1) choose axis ONLY if near some axis (inside pick corridor) and moved enough
    if(isNull(activeAxis) && dist > SNAP_INIT_THRESHOLD) {
      if(canPickX || canPickY) {
        if(canPickX && canPickY) {
          // choose nearest axis by smaller normalized deviation
          const prefX = Math.abs(dyWorld) <= Math.abs(dxWorld);
          setActiveAxis(prefX ? 'x' : 'y');
        } else {
          setActiveAxis(canPickX ? 'x' : 'y');
        }
      }
    }

    // Near start → allow axis re-selection
    if(dist < RESET_THRESHOLD && !isNull(activeAxis)) {
      setActiveAxis(null);
    }

    // Apply lock while inside BREAK threshold; break when outside
    let finalXRelOnCur = xCur; // on-wall X for current wall (relative to its center)
    let finalYAbsBottom = yCurAbs; // absolute bottom Y for current wall
    let nextAxis: Axis | null = activeAxis;

    if(activeAxis === 'x') {
      // If we left horizontal corridor → break
      if(Math.abs(dyWorld) > SNAP_BREAK_THRESHOLD) {
        nextAxis = null;
      } else {
        // lock bottom Y to the start bottom (center minus half height)
        finalYAbsBottom = startYAbs;
      }
    } else if(activeAxis === 'y') {
      if(Math.abs(dxWorld) > SNAP_BREAK_THRESHOLD) {
        nextAxis = null;
      } else {
        // Keep scalar S0 = <ex_start, pStartCenterWorldXZ> and project to current wall
        const S0 = pStartCenterWorld.clone().setY(0).dot(startFrame.ex);
        const denom = startFrame.ex.dot(curFrame.ex); // cos between start & current dir

        if(Math.abs(denom) > EPS_DENOM) {
          const t = (S0 - startFrame.ex.dot(curFrame.centerXZ)) / denom;
          const halfLen = curFrame.length / 2;
          finalXRelOnCur = Math.max(-halfLen, Math.min(halfLen, t));
        } else {
          // walls perpendicular -> cannot project reliably -> break snapping
          nextAxis = null;
        }
      }
    }

    if(nextAxis !== activeAxis) {
      setActiveAxis(nextAxis);
    }

    // commit only if changed
    const yRelForSetter = finalYAbsBottom - curFrame.wallHeight / 2;
    const changed = (
      false
        || Math.abs(finalXRelOnCur - xCur) > 1e-6
        || Math.abs(yRelForSetter - (yCurAbs - curFrame.wallHeight / 2)) > 1e-6
    );

    if(changed === true) {
      setTempWallFurnitureCoordinate(tempWallFurniture.targetWallId, finalXRelOnCur, yRelForSetter);
    }
  }, [tempWallFurniture, startWall, currentWall, startFrame, curFrame, modelBounds, activeAxis, levels, objH]);

  // ---- Rendering (fixed axes anchored at START center) ----
  if(isNull(tempWallFurniture) || isNull(startWall) || isNull(startFrame)) {
    return null;
  }

  const startX = (
    !isNull(tempWallFurniture.startOnWallCoordinateX)
      ? tempWallFurniture.startOnWallCoordinateX
      : tempWallFurniture.furniture.onWallCoordinateX
  );
  const startYAbs = (
    !isNull(tempWallFurniture.startOnWallCoordinateY)
      ? tempWallFurniture.startOnWallCoordinateY
      : tempWallFurniture.furniture.onWallCoordinateY
  );
  const startCenterYAbs = startYAbs + objH / 2;

  // World anchor at START center (fixed)
  const pStartCenterWorld = furnitureWorldOnWall(
    new Vector3(startWall.position.start.x, 0, startWall.position.start.y),
    new Vector3(startWall.position.end.x, 0, startWall.position.end.y),
    startX,
    startCenterYAbs,
  ).add(new Vector3(0, startFrame.levelElevation, 0));

  // Decide visibility corridors vs current center
  const curWall = currentWall;
  const curX = tempWallFurniture.furniture.onWallCoordinateX;
  const curYAbs = tempWallFurniture.furniture.onWallCoordinateY;
  const curCenterYAbs = curYAbs + objH / 2;

  const pCurCenterWorld = curWall
    ? furnitureWorldOnWall(
      new Vector3(curWall.position.start.x, 0, curWall.position.start.y),
      new Vector3(curWall.position.end.x, 0, curWall.position.end.y),
      curX,
      curCenterYAbs,
    ).add(new Vector3(0, (!isNull(elevation) ? elevation : 0), 0))
    : null;

  let showX = false;
  let showY = false;

  if(!isNull(pCurCenterWorld)) {
    const delta = pCurCenterWorld.clone().sub(pStartCenterWorld);
    const dxWorld = delta.clone().setY(0).dot(startFrame.ex);
    const dyWorld = delta.y;

    const PICK_CORRIDOR = SNAP_BREAK_THRESHOLD * PICK_CORRIDOR_MULTIPLIER;

    // Show when inside pick corridor; keep active axis highlighted
    showX = Math.abs(dyWorld) <= PICK_CORRIDOR || activeAxis === 'x';
    showY = Math.abs(dxWorld) <= PICK_CORRIDOR || activeAxis === 'y';
  }

  if(showX === false && showY === false) {
    return null;
  }

  // Push off the start wall for visibility (fixed axes do NOT move)
  const nOffset = Math.min(startFrame.thickness / 2 + 0.02, NORMAL_OFFSET_MAX);
  const anchor = pStartCenterWorld.clone().add(startFrame.ez.clone().multiplyScalar(nOffset));

  const lenX = startFrame.wallHeight * 2 || FALLBACK_EXT * 2;
  const lenY = startFrame.wallHeight || FALLBACK_EXT * 2;
  const halfX = Math.max(1, lenX / 2);
  const halfY = Math.max(1, lenY / 2);

  const lines: Array<{ from: Vector3; to: Vector3 }> = [];
  if(showX === true) {
    const fromX = anchor.clone().add(startFrame.ex.clone().multiplyScalar(+halfX));
    const toX = anchor.clone().add(startFrame.ex.clone().multiplyScalar(-halfX));
    lines.push({ from: fromX, to: toX });
  }
  if(showY === true) {
    const fromY = anchor.clone().add(UP.clone().multiplyScalar(+halfY));
    const toY = anchor.clone().add(UP.clone().multiplyScalar(-halfY));
    lines.push({ from: fromY, to: toY });
  }

  return lines.map(({ from, to }, i) => (
    <GuideLines
      key={i}
      from={from}
      to={to}
      dashedLine={false}
      showLabel={false}
      showEndpoints={false}
      lineColor={wallFurnitureLockAxisColor}
    />
  ));
};
