import { getNotNull, getNotUndefined, getNotUndefinedSimple, isArrayLength, isNull, isNullish, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import path from 'path-browserify';
import { Color, Euler, Mesh, OrthographicCamera, Quaternion, Vector2, Vector3 } from 'three';
import { TextureAssetCategoryId, TextureAssetId } from '@draw-house/common/dist/brands';
import { useTexture } from '@react-three/drei';
import { clamp, fixIEEE } from '@draw-house/common/dist/utils';
import { IS_EASY_GRAPHICS_MODE } from '@draw-house/common/dist/envVariables/public';
import { MeshStandardMaterialProps } from '@react-three/fiber';
import { TextureAssetCategory } from '../zod';
import { textureMaps } from '../services';
import { useWalls } from '../zustand/useWalls/store';
import { useGlobalSettings } from '../zustand/useGlobalSettings/store';
import { useLevels } from '../zustand/useLevels/store';
import { useWallMover } from '../zustand/useWallMover';
import { useR3FDataResolved } from '../zustand/useR3FData';
import { TextureMaps } from '../zod/commonTextureAttributes';
import { lang } from '../lang';
import { CustomModelCategory } from '../zod/CustomModelCategory';
import { extractAllCategoriesAndSubcategories } from './extractAllCategoriesAndSubcategories';
import type { RoofsStore } from '../zustand/useRoofs';
import { getHoldingModifiers, useModifierKeysHolding } from '../zustand/useModifierKeysHolding';

export const getRotation = (rot: Euler): [number, number, number] => {
  const rotation = rot.reorder('XYZ').toArray().slice(0, 3).map(e => {
    assert(typeof e === 'number', 'Something went wrong. |vo55oo|');

    return e;
  });

  assert(isArrayLength(rotation, '===', 3), 'Something went wrong. |p75ial|');

  return rotation;
};

export const getUniquePoints = <T extends { equals: (e: T) => boolean }>(arr: T[]) => (
  arr.filter((e, i, arr) => arr.findLastIndex(e1 => e1.equals(e)) === i)
);

export const getVector2Distance = (start: Vector2, end: Vector2) => (
  fixIEEE(new Vector2().subVectors(start, end).length())
);

const getCameraZoom = () => {
  const { camera } = useR3FDataResolved.getState();

  return camera instanceof OrthographicCamera ? camera.zoom : (() => {
    const { target } = (camera.parent as any)?.__r3f?.objects?.[0] ?? {};
    if(!(target instanceof Vector3)) {
      return 100;
    }

    const length = new Vector3().subVectors(target, camera.position).length();

    return fixIEEE(1576 / length ** 1.03);
  })();
};

const calculateWallLineSnapPoint = (
  point: Vector2,
  snapMinDistance: number,
  snapToGrid: boolean,
  gridSpacing: number,
) => {
  const { levels } = useLevels.getState();
  const { walls } = useWalls.getState();
  const { wallMover } = useWallMover.getState();
  const { modifierKeysHolding } = useModifierKeysHolding.getState();

  const holdingModifiers = getHoldingModifiers(modifierKeysHolding);
  const zoom = getCameraZoom();
  const wallLineSnapDistance = clamp(snapMinDistance, fixIEEE(112 / zoom ** 1.35), 1);
  const { id } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |830iyz|');

  const nearestWalls = (
    walls
      .filter(e => e.levelId === id)
      .filter(e => (
        !isNull(wallMover) && wallMover.type === 'corner'
          ? !wallMover.startPosition.equals(e.position.start) && !wallMover.startPosition.equals(e.position.end)
          : true
      ))
      .map(wall => {
        const startToEnd = new Vector2().subVectors(wall.position.end, wall.position.start);
        const startToPoint = new Vector2().subVectors(point, wall.position.start);

        const lineLength = startToEnd.length();

        const projectionScalar = startToPoint.dot(startToEnd) / (lineLength * lineLength);

        const clampedScalar = Math.max(0, Math.min(1, projectionScalar));

        const closestPointOnWall = wall.position.start.clone().add(
          startToEnd.clone().multiplyScalar(clampedScalar),
        );

        const distance = closestPointOnWall.distanceTo(point);

        return distance > wallLineSnapDistance ? null : {
          distance,
          point: closestPointOnWall,
          wall,
          projectionScalar: clampedScalar,
        };
      })
      .filter(e => !isNull(e))
      .sort((a, b) => a.distance - b.distance)
  );

  if(nearestWalls.length > 0) {
    const nearestWall = getNotUndefined(nearestWalls[0], 'This should never happen. |0w2cn6|');

    if(snapToGrid !== (holdingModifiers === 'shift' || holdingModifiers === 'ctrl+shift')) {
      const wallPoint = nearestWall.point;
      const wall = nearestWall.wall;

      const gridX = fixIEEE(Math.round(wallPoint.x / gridSpacing) * gridSpacing);
      const gridY = fixIEEE(Math.round(wallPoint.y / gridSpacing) * gridSpacing);
      const gridPoint = new Vector2(gridX, gridY);

      const startToEnd = new Vector2().subVectors(wall.position.end, wall.position.start);
      const startToGrid = new Vector2().subVectors(gridPoint, wall.position.start);

      const lineLength = startToEnd.length();

      if(lineLength > 0) {
        const projectionScalar = startToGrid.dot(startToEnd) / (lineLength * lineLength);

        if(projectionScalar >= 0 && projectionScalar <= 1) {
          const pointOnLine = wall.position.start.clone().add(
            startToEnd.clone().multiplyScalar(projectionScalar),
          );

          const tolerance = 0.00000001;

          if(getVector2Distance(pointOnLine, gridPoint) < tolerance) {
            return gridPoint;
          }
        }
      }
    }

    const wall = nearestWall.wall;
    const snapPoint = nearestWall.point;
    const endSnapThreshold = 0.2;

    const distanceToStart = snapPoint.distanceTo(wall.position.start);
    const distanceToEnd = snapPoint.distanceTo(wall.position.end);

    if(distanceToStart < endSnapThreshold) {
      return wall.position.start.clone();
    }

    if(distanceToEnd < endSnapThreshold) {
      return wall.position.end.clone();
    }

    return nearestWall.point.clone();
  }

  return null;
};

const calculateWallEndSnapPoint = (
  point: Vector2,
  snapMinDistance: number,
  gridSpacing: number,
) => {
  const { levels } = useLevels.getState();
  const { walls } = useWalls.getState();
  const { wallMover } = useWallMover.getState();

  const zoom = getCameraZoom();
  const wallEndSnapDistance = clamp(snapMinDistance, fixIEEE(112 / zoom ** 1.35), gridSpacing);
  const { id } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |m32t98|');

  const [nearestPoint] = (
    getUniquePoints(
      walls
        .filter(e => e.levelId === id)
        .flatMap(({ position: { start, end } }) => [start, end]),
    )
      .filter(e => !isNull(wallMover) && wallMover.type === 'corner' ? !wallMover.startPosition.equals(e) : true)
      .map(e => {
        const distance = getVector2Distance(e, point);

        return distance > wallEndSnapDistance ? null : {
          distance,
          point: e,
        };
      })
      .filter(e => !isNull(e))
      .toSorted((a, b) => a.distance - b.distance)
  );

  return isUndefined(nearestPoint) ? null : nearestPoint.point;
};

export const snapPosition = ({ x, z: y }: Vector3): Vector2 => {
  const { gridSpacing, snapToGrid, snapToWallEnd, snapToWallLine } = useGlobalSettings.getState();
  const { wallMover } = useWallMover.getState();
  const { modifierKeysHolding } = useModifierKeysHolding.getState();

  const holdingModifiers = getHoldingModifiers(modifierKeysHolding);
  const snapMinDistance = 0.6;
  const point = new Vector2(fixIEEE(x), fixIEEE(y));

  if(snapToWallLine === true) {
    const snapPoint = calculateWallLineSnapPoint(point, snapMinDistance, snapToGrid, gridSpacing);

    if(!isNull(snapPoint)) {
      return snapPoint;
    }
  }

  if(snapToWallEnd === true && (isNull(wallMover) || wallMover.type === 'corner')) {
    const snapPoint = calculateWallEndSnapPoint(point, snapMinDistance, gridSpacing);

    if(!isNull(snapPoint)) {
      return snapPoint;
    }
  }

  return snapToGrid === (holdingModifiers === 'shift' || holdingModifiers === 'ctrl+shift') ? point : new Vector2(
    fixIEEE(Math.round(x / gridSpacing) * gridSpacing),
    fixIEEE(Math.round(y / gridSpacing) * gridSpacing),
  );
};

export const getImageWithDefault = <T extends string | undefined>(e: undefined | string extends T ? T : never): string => (
  e === undefined ? '/no-image.png' : e
);
export const getImageWithDefaultNull = <T extends string | null>(e: null | string extends T ? T : never): string => (
  e === null ? '/no-image.png' : e
);

export const preferImage = (urls: Array<string | undefined>) => urls.find(e => !isUndefined(e));

export const extractTextureAssetCategories = (
  textures: Array<{ id: TextureAssetId; attributes: { categories: { data: TextureAssetCategory[] } } }>,
) => {
  type MapValue = {
    name: string;
    image: string;
    overlayColors: TextureAssetCategory['attributes']['overlayColors'];
    appearanceTypes: Array<NonNullable<CustomModelCategory['appearanceType']>>;
    order: TextureAssetCategory['attributes']['order'];
    modelCategoryIds: Array<CustomModelCategory['id']>;
    textureAssetIds: TextureAssetId[];
    excludeFromAllMaterials: TextureAssetCategory['attributes']['excludeFromAllMaterials'];
  };

  const categories = textures.reduce((acc, { id: textureAssetId, attributes: { categories: { data } } }) => {
    if(data.length === 0) {
      const category = acc.get(null);

      acc.set(null, {
        name: lang.none,
        image: '/no-category.png',
        overlayColors: [],
        appearanceTypes: [],
        order: 0,
        modelCategoryIds: [],
        excludeFromAllMaterials: false,
        textureAssetIds: [
          ...isUndefined(category) ? [] : category.textureAssetIds,
          textureAssetId,
        ],
      });
    } else {
      for(const { id, attributes } of data) {
        const category = acc.get(id);

        const categories = extractAllCategoriesAndSubcategories(attributes.modelCategory.data.map(e => e.id));

        acc.set(id, {
          name: attributes.name,
          image: getImageWithDefault(attributes.image?.data?.attributes.formats?.thumbnail.url),
          overlayColors: attributes.overlayColors,
          appearanceTypes: categories.map(e => e.appearanceType).filter(e => !isNull(e)),
          order: attributes.order,
          modelCategoryIds: categories.map(e => e.id),
          excludeFromAllMaterials: attributes.excludeFromAllMaterials,
          textureAssetIds: [
            ...isUndefined(category) ? [] : category.textureAssetIds,
            textureAssetId,
          ],
        });
      }
    }

    return acc;
  }, new Map<TextureAssetCategoryId | null, MapValue>());

  return [...categories.entries()];
};

export const isTheSameVectorArrays = <T extends { equals: (e: T) => boolean }>(arr1: T[], arr2: T[]) => {
  if(arr1.length !== arr2.length) {
    return false;
  }

  for(const [i, e1] of arr1.entries()) {
    const e2 = getNotUndefinedSimple(arr2[i], 'This should never happen. |0z8r9k|');

    if(e2.equals(e1) === false) {
      return false;
    }
  }

  return true;
};

export const preloadTexture = (maps: TextureMaps) => {
  for(const e of textureMaps) {
    if(!isNull(maps[e].data)) {
      useTexture.preload(maps[e].data.attributes.url);
    }
  }
};

export const getShadowProps = () => (
  IS_EASY_GRAPHICS_MODE === true
    ? {}
    : {
      castShadow: true,
      receiveShadow: true,
    }
);

export const isLineEquals = (e1: [Vector3, Vector3], e2: [Vector3, Vector3]) => (
  false
    || e1[0].equals(e2[0]) && e1[1].equals(e2[1])
    || e1[0].equals(e2[1]) && e1[1].equals(e2[0])
);

export const isColinear = (v1: Vector2, v2: Vector2) => {
  const sum = new Vector2().addVectors(v1, v2).length();
  const subtraction = new Vector2().subVectors(v1, v2).length();

  return sum > subtraction;
};

const isRGBArray = (value: unknown): value is [number, number, number] => (
  true
    && Array.isArray(value)
    && value.length === 3
    && value.every(e => typeof e === 'number')
);

export const nullMapProps = (
  ifTrue: boolean,
  props: MeshStandardMaterialProps,
): MeshStandardMaterialProps => {
  const result = { ...props };

  if(ifTrue) {
    for(const name of textureMaps) {
      result[name === 'colorMap' ? 'map' : name] = null;
    }
  }

  if(isRGBArray(result.color)) {
    result.color = new Color(...result.color).getStyle();
  }

  if(isRGBArray(result.emissive)) {
    result.emissive = new Color(...result.emissive).getStyle();
  }

  return result;
};

export const toVector2 = ({ x, z }: Vector3) => new Vector2(x, z);
export const toVector3 = ({ x, y }: Vector2) => new Vector3(x, 0, y);
export const toVector3Project2D = (p: Vector3): Vector3 => new Vector3(p.x, 0, p.z);
export const arrayToVector3 = (v: Vector3 | [number, number, number]) => (Array.isArray(v) ? new Vector3(...v) : v);

export const dirOf = (a: Vector3, b: Vector3): Vector3 => {
  const d = b.clone().sub(a);
  const len = d.length();
  return len > 0 ? d.divideScalar(len) : d.set(1, 0, 0);
};

export const dotAbs = (a: Vector3, b: Vector3): number => Math.abs(a.dot(b));

/**
* Returns the minimal (perpendicular) distance from a point `p`
 * to an infinite 3D line. The line is defined by a point on it
 * (`linePoint`) and a **unit** direction vector (`lineDirUnit`).
 *
 * @param p           Point to measure from.
 * @param linePoint   Any point lying on the line.
 * @param lineDirUnit Unit direction vector of the line (must be normalized).
 * @returns           The perpendicular distance from `p` to the line.
 */
export const pointToLineDistance = (p: Vector3, linePoint: Vector3, lineDirUnit: Vector3): number => {
  const ap = p.clone().sub(linePoint);
  const proj = lineDirUnit.normalize().clone().multiplyScalar(ap.dot(lineDirUnit));
  return ap.sub(proj).length();
};

/**
 * Checks whether a given point lies on (or very close to) a plane.
 * The plane is defined by a point lying on it (`planePoint`) and
 * a unit normal vector (`planeNormal`).
 *
 * Mathematically, the signed distance from the point to the plane is:
 *   d = (p - planePoint) · planeNormal
 *
 * If |d| <= eps, the point is considered to be on the plane.
 *
 * @param p           Point to test.
 * @param planePoint  Any known point lying on the plane.
 * @param planeNormal Plane's normal vector (should be normalized).
 * @param eps         Allowed tolerance (default = 1e-3).
 * @returns           true if the point lies in the plane within tolerance.
 */
export const isPointOnPlane = (p: Vector3, plane: { normal: Vector3; point: Vector3 }, eps = 1e-3) => {
  const dist = plane.normal.dot(new Vector3().subVectors(p, plane.point));
  return Math.abs(dist) <= eps;
};

/**
 * Checks if a vector is (almost) parallel to any of the allowed axes.
 *
 * @param dir     Direction vector to check
 * @param axes    Allowed axes
 * @param tol     Angular tolerance (cosine threshold)
 */
export const isParallelToAllowedAxes = (dir: Vector3, axes: Vector3[], tol = 1e-2): boolean => {
  if(axes.length === 0) {
    return true;
  }
  const d = dir.clone().normalize();
  return axes.some(axis => {
    const a = axis.clone().normalize();
    return 1 - Math.abs(d.dot(a)) < tol; // nearly parallel
  });
};

/**
 * Returns the point located at a signed distance `dist` from `start`
 * along the direction `dir`.
 *
 * @param start Start point.
 * @param dir   Direction vector to follow (will be normalized).
 * @param dist  Signed distance to travel along `dir`.
 * @returns     The computed point along `dir` from `start`.
 */
export const pointAlong = (start: Vector3, dir: Vector3, dist: number): Vector3 => {
  const d = dir.clone().normalize();
  return start.clone().addScaledVector(d, dist);
};

export const isVerticalOrHorizontal = (from: Vector3, to: Vector3, tolerance: number): boolean => {
  const dx = Math.abs(to.x - from.x);
  const dy = Math.abs(to.y - from.y);
  const dz = Math.abs(to.z - from.z);

  if(dy > tolerance && dx < tolerance && dz < tolerance) {
    return true;
  }

  if(dx > tolerance && dy < tolerance && dz < tolerance) {
    return true;
  }

  if(dz > tolerance && dx < tolerance && dy < tolerance) {
    return true;
  }

  return false;
};

/**
 * Returns the vector perpendicular toward pointC: (AB) | C
 *
 * @param startPointA Start point.
 * @param endPointB   Direction vector to follow (will be normalized).
 * @param pointC  Signed distance to travel along `dir`.
 * @returns       vector toward AC from C
 */
export const perpTowardPointC = (startPointA: Vector3, endPointB: Vector3, pointC: Vector3): Vector3 => {
  const t = endPointB.clone().sub(startPointA).normalize();
  const mid = startPointA.clone().add(endPointB).multiplyScalar(0.5);
  const toCam = pointC.clone().sub(mid);

  const n = toCam.clone().sub(t.clone().multiplyScalar(toCam.dot(t)));

  if(n.lengthSq() === 0) {
    n.copy(new Vector3().crossVectors(t, new Vector3(0, 1, 0)));
  }
  return n.normalize();
};

export const distanceIgnoreY = (a: Vector3, b: Vector3): number => {
  const dx = a.x - b.x;
  const dz = a.z - b.z;
  return Math.sqrt(dx * dx + dz * dz);
};

export const projectScalarOnAxis = (p: Vector3, origin: Vector3, axisUnit: Vector3): number => p.clone().sub(origin).dot(axisUnit);

export const removeFileExtension = (filename: string) => path.parse(filename).name;
export const getFileExtension = (filename: string) => path.parse(filename).ext.slice(1).toLowerCase();

export const getFlipHorizontalMirrorNextStep = (e: { isFlippedHorizontal: boolean; isMirrored: boolean }) => {
  const key = `_${Number(e.isFlippedHorizontal)}${Number(e.isMirrored)}` as const;

  const [isFlippedHorizontal, isMirrored] = ({
    _00: [true, false],
    _10: [true, true],
    _11: [false, true],
    _01: [false, false],
  } satisfies Record<typeof key, [boolean, boolean]>)[key];

  return { isFlippedHorizontal, isMirrored };
};

export const applyQuaternionAroundPivot = (pivot: Vector3, quaternion: Quaternion, position: Vector2) => {
  const { x, z } = (
    new Vector3(position.x, 0, position.y)
      .sub(pivot)
      .applyQuaternion(quaternion)
      .add(pivot)
  );

  return new Vector2(x, z);
};

export const getRoofType = (targetRoof: null | undefined | RoofsStore['roofs'][number]) => (
  isNullish(targetRoof)
    ? 'hip'
    : targetRoof.roofData.type === 'hip' && targetRoof.roofData.activeGableIndices.length > 0
      ? 'hip-with-all-gable-corners'
      : targetRoof.roofData.type
);

export const getGlobalBoundingBox = (mesh: Mesh) => {
  mesh.updateWorldMatrix(true, false);

  mesh.geometry.computeBoundingBox();
  const boundingBox = getNotNull(mesh.geometry.boundingBox, 'This should never happen. |hqx7db|').clone();

  boundingBox.applyMatrix4(mesh.matrixWorld);

  return boundingBox;
};
