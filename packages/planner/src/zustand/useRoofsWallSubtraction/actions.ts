import { RoofId } from '@draw-house/common/dist/brands';
import { BufferGeometry, Float32BufferAttribute, Shape, ShapeGeometry, ShapeUtils, Vector2, Vector3 } from 'three';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { computeBoundsTree } from 'three-mesh-bvh';
import { useRoofsWallSubtraction } from './store';
import { useSpaces } from '../useSpaces/store';
import { useWalls } from '../useWalls/store';
import { RoofsStore, useRoofs } from '../useRoofs/store';
import { calculateHipRoofDataCached, calculateSlantedRoofDataCached, calculateWraparoundRoofDataCached } from '../../utils/roofCache';
import { removeRepeatedValues } from '../../utils/removeRepeatedValues';
import { clearFutureWalls } from '../useWalls/actions1';
import { useTempWalls } from '../useTempWalls/store';
import { RoofParts } from '../../calculationsByJovan/types';
import { findSpaceClosedContours } from '../../utils/findSpaceClosedContours';
import { calculateCoplanarPolygonArea } from '../../utils/getAreaOfSmallerContour';

const setRoofWallSubtractionParts = (roofId: RoofId, roofGeometry: BufferGeometry) => {
  const { subtraction } = useRoofsWallSubtraction.getState();
  useRoofsWallSubtraction.setState({
    subtraction: {
      ...subtraction,
      [roofId]: roofGeometry,
    },
  });
};

const setRoofWallSubtractionTotalHeight = (roofId: RoofId, roofParts: RoofParts) => {
  const { min, max } = roofParts.flat().reduce(({ min, max }, { y }) => ({
    min: Math.min(min, y),
    max: Math.max(max, y),
  }), { min: Infinity, max: -Infinity });

  const roofTotalHeight = max - min;
  const { roofHeights } = useRoofsWallSubtraction.getState();
  useRoofsWallSubtraction.setState({
    roofHeights: {
      ...roofHeights,
      [roofId]: roofTotalHeight,
    },
  });
};

const createSubtractionParts = (roofParts: RoofParts): BufferGeometry[] => {
  const currentGeometry: BufferGeometry[] = [];

  for(const roofPart of roofParts) {
    const shape2D: Vector2[] = roofPart.map(({ x, z }) => new Vector2(x, z));
    const shape3D: Vector3[] = roofPart.map(({ x, y, z }) => new Vector3(x, y, z));

    const triangles = ShapeUtils.triangulateShape(shape2D, []);
    const indices: number[] = [];
    const positions: number[] = [];

    for(const pt of shape3D) {
      positions.push(pt.x, pt.y, pt.z);
    }

    for(const tri of triangles) {
      const [a, b, c] = tri;
      assert(!isUndefined(a) && !isUndefined(b) && !isUndefined(c), 'This should never happen. |q6s43h|');
      indices.push(a, b, c);
    }

    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();

    currentGeometry.push(geom);
  }

  return currentGeometry;
};

const createFlatGeometry = (coords: Vector2[]): BufferGeometry => {
  const shape = new Shape(coords);
  const geometry = new ShapeGeometry(shape);
  geometry.rotateX(Math.PI / 2);
  geometry.computeVertexNormals();

  return geometry;
};

export const cleanupAndMergeRoofSubtractions = (roofGeometries: BufferGeometry[]): BufferGeometry => {
  const merged = mergeGeometries(roofGeometries, true).toNonIndexed();
  merged.computeBoundsTree = computeBoundsTree;
  merged.computeBoundsTree();
  return merged;
};

const computeRoofWallSubtractionParts = (roof: RoofsStore['roofs'][number]): BufferGeometry | null => {
  const { spaces } = useSpaces.getState();
  const { walls } = useWalls.getState();
  const { tempWalls } = useTempWalls.getState();

  if(spaces.length === 0 || walls.length === 0) {
    return null;
  }

  const {
    id,
    roofData: {
      overhang,
      heightFromBase,
      hipSlope,
      activeGableIndices,
      slantedSlope,
      slantedSlopeOrientation,
      isFlippedWraparound,
    },
  } = roof;

  const biggestContour = (() => {
    const wallIds = removeRepeatedValues(spaces.filter(e => e.roofId === roof.id).flatMap(e => e.walls));
    const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
    const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));
    const biggestContour = (() => {
      const { contours } = findSpaceClosedContours(spaceWalls);
      const [biggestContour] = (
        contours
          .map(e => ({
            area: calculateCoplanarPolygonArea(e),
            contour: e,
          }))
          .toSorted((a, b) => b.area - a.area)
      );

      return isUndefined(biggestContour) ? [] : biggestContour.contour.slice(0, -1);
    })();

    return biggestContour;
  })();

  const roofParts = (() => {
    switch(roof.roofData.type) {
      case 'hip': {
        const { roofParts } = calculateHipRoofDataCached({
          roofId: id,
          coords: biggestContour,
          offset: overhang,
          roofHeightFromBase: heightFromBase,
          roofSlope: hipSlope,
          gableIndices: activeGableIndices,
          isClosedGable: false,
        });

        return roofParts;
      }
      case 'slanted': {
        const { roofParts } = calculateSlantedRoofDataCached({
          coords: biggestContour,
          offset: overhang,
          roofHeightFromBase: heightFromBase,
          roofSlope: slantedSlope,
          slopeOrientation: slantedSlopeOrientation,
        });

        return roofParts;
      }
      case 'wraparound': {
        const { roofParts } = calculateWraparoundRoofDataCached({
          coords: biggestContour,
          offset: overhang,
          roofHeightFromBase: heightFromBase,
          roofSlope: slantedSlope,
          flipSide: isFlippedWraparound,
        });

        return roofParts;
      }
      case 'flat':
        return [];
      default:
        ((e: never) => e)(roof.roofData.type);
        throw new Error('This should never happen. |cs3v7j|');
    }
  })();

  if(roofParts.length === 0) {
    if(biggestContour.length > 0) {
      return createFlatGeometry(biggestContour);
    }

    return null;
  }

  setRoofWallSubtractionTotalHeight(roof.id, roofParts);

  const geometryParts = createSubtractionParts(roofParts) ?? [];

  return cleanupAndMergeRoofSubtractions(geometryParts);
};

export const clearRoofWallSubtraction = (roofId: RoofId) => {
  const { subtraction } = useRoofsWallSubtraction.getState();
  const newSubtractions = { ...subtraction };
  delete newSubtractions[roofId];
  useRoofsWallSubtraction.setState({ subtraction: newSubtractions });
};

export const createRoofSubtractions = (roofId: RoofId): BufferGeometry | null => {
  const { subtraction } = useRoofsWallSubtraction.getState();

  if(!isUndefined(subtraction[roofId])) {
    return subtraction[roofId];
  }

  const { roofs } = useRoofs.getState();
  const roof = roofs.find(e => e.id === roofId);
  if(isUndefined(roof)) {
    return null;
  }

  const roofGeometry = computeRoofWallSubtractionParts(roof);
  if(!isNull(roofGeometry)) {
    setRoofWallSubtractionParts(roofId, roofGeometry);
  }

  return roofGeometry;
};

export const updateRoofsSubtractions = () => {
  const { roofs } = useRoofs.getState();

  for(const roof of roofs) {
    clearRoofWallSubtraction(roof.id);
    createRoofSubtractions(roof.id);
  }
};
