import { UndirectedEdge, UndirectedGraph, UndirectedVertex } from 'data-structure-typed';
import { Vector2 } from 'three';
import { getNotUndefined, isArrayLength } from '@arthurka/ts-utils';
import { SpaceId } from '@draw-house/common/dist/brands';
import { type GlobalSettingsStore, useSpaces, type WallsStore } from '../zustand';
import { crossLineSegments } from './crossLineSegments';
import { getPolygonArea } from './getPolygonArea';
import { makeGraphNodes } from './makeGraphNodes';
import { measurements } from './measurements';
import { getAreaOfSmallestContour } from './getAreaOfSmallerContour';
import { findSpaceClosedContours } from './findSpaceClosedContours';
import { getWallSidesSpaceRelations } from './getWallSidesSpaceRelations';

const getBiggestCycleAndArea = (positions: Array<WallsStore['walls'][number]['position']>) => {
  const lineSegments = crossLineSegments(positions);
  const nodes = makeGraphNodes(lineSegments);
  const graph = new UndirectedGraph();

  for(const { id } of nodes) {
    graph.addVertex(new UndirectedVertex(id));
  }
  for(const { start, end } of lineSegments) {
    const a = getNotUndefined(nodes.find(e => e.vector.equals(start)), 'This should never happen. |fvs621|');
    const b = getNotUndefined(nodes.find(e => e.vector.equals(end)), 'This should never happen. |2lj8ro|');

    graph.addEdge(new UndirectedEdge(a.id, b.id));
  }

  const allGraphCycles = graph.getCycles();

  return (
    allGraphCycles
      .map(e => (
        e.map(id => (
          getNotUndefined(nodes.find(e => e.id === id)?.vector, 'This should never happen. |qv48ur|')
        ))
      ))
      .reduce<{ area: number; cycle: Vector2[] }>(({ area, cycle }, cur) => {
        const curArea = getPolygonArea(cur);

        return (
          curArea > area
            ? {
              area: curArea,
              cycle: cur,
            } : {
              area,
              cycle,
            }
        );
      }, { area: 0, cycle: [] })
  );
};

export const getWallCoordsForRoofs = (positions: Array<WallsStore['walls'][number]['position']>): Array<[Vector2, Vector2, Vector2, ...Vector2[]]> => {
  const { cycle } = getBiggestCycleAndArea(positions);

  return [cycle].filter(e => isArrayLength(e, '>=', 3));
};

export const getSpaceArea = (positions: Array<WallsStore['walls'][number]['position']>) => {
  const { area } = getBiggestCycleAndArea(positions);

  return area;
};

export const getSpaceAreaWithUnits = (
  spaceId: SpaceId,
  spaceWalls: WallsStore['walls'],
  measurementSystem: GlobalSettingsStore['measurementSystem'],
) => {
  const { contours, spaceWallsCornerDiff } = findSpaceClosedContours(spaceWalls);
  const currentSpace = getNotUndefined(useSpaces.getState().spaces.find(e => e.id === spaceId), 'Something went wrong. |9a2jmc|');
  const hasInvisibleWalls = spaceWalls.some(e => e.isVisible === false);
  let baseArea = getAreaOfSmallestContour(contours);

  if(hasInvisibleWalls === true) {
    const wallSidesRelations = getWallSidesSpaceRelations(spaceWalls, [currentSpace]);

    const areaOfInvisibleWalls = spaceWalls.reduce((acc, { id, thickness, isVisible, position }) => {
      if(isVisible === true) {
        return acc;
      }

      const { frontSide, backSide } = getNotUndefined(wallSidesRelations.find(e => e.wallId === id), 'Something went wrong. |oyi2ol|');
      const wallCornerDiff = getNotUndefined(spaceWallsCornerDiff.find(({ wallId }) => wallId === id), 'Something went wrong. |u0gh87|');

      const { cornersDiff: { frontStart, frontEnd, backStart, backEnd } } = wallCornerDiff;
      const halfThickness = thickness / 2;

      let sideArea = 0;

      if(frontSide === spaceId) {
        const direction = position.end.clone().sub(position.start).normalize();
        const perpendicular = new Vector2(-direction.y, direction.x);

        const p1 = position.start;
        const p2 = position.end;
        const p3 = position.end.clone().addScaledVector(direction, frontEnd).addScaledVector(perpendicular, halfThickness);
        const p4 = position.start.clone().addScaledVector(direction, -frontStart).addScaledVector(perpendicular, halfThickness);

        sideArea += Math.abs((p1.x * (p2.y - p4.y) + p2.x * (p3.y - p1.y) + p3.x * (p4.y - p2.y) + p4.x * (p1.y - p3.y)) / 2);
      }

      if(backSide === spaceId) {
        const direction = position.end.clone().sub(position.start).normalize();
        const perpendicular = new Vector2(-direction.y, direction.x);

        const p1 = position.start;
        const p2 = position.end;
        const p3 = position.end.clone().addScaledVector(direction, backEnd).addScaledVector(perpendicular, -halfThickness);
        const p4 = position.start.clone().addScaledVector(direction, -backStart).addScaledVector(perpendicular, -halfThickness);

        sideArea += Math.abs((p1.x * (p2.y - p4.y) + p2.x * (p3.y - p1.y) + p3.x * (p4.y - p2.y) + p4.x * (p1.y - p3.y)) / 2);
      }

      return acc + sideArea;
    }, 0);

    baseArea += areaOfInvisibleWalls;
  }

  return measurements.pretty.sqMSqFt(baseArea, measurementSystem);
};
