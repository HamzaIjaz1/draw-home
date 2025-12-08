import { getNotUndefined } from '@arthurka/ts-utils';
import { Vector2 } from 'three';
import { calculateWallCornersDiff } from './calculateWallCornersDiff';
import { WallSegment } from './getWallContoursFromSegments';
import type { WallsStore } from '../zustand';

export const getSpaceWallSegmentsAndDiff = (spaceWalls: WallsStore['walls']) => {
  const spaceWallsCornerDiff = calculateWallCornersDiff(spaceWalls);
  const spaceWallSegments = spaceWalls.flatMap(({ id, thickness, position: { start, end } }) => {
    const {
      cornersDiff: { frontStart, backEnd, frontEnd, backStart },
    } = getNotUndefined(spaceWallsCornerDiff.find(({ wallId }) => wallId === id), 'Something went wrong. |o33mzt|');

    const direction = end.clone().sub(start).normalize();
    const perpendicular = new Vector2(-direction.y, direction.x);
    const segments: WallSegment[] = [];

    const frontStartPoint = (
      start
        .clone()
        .addScaledVector(perpendicular, thickness / 2)
        .addScaledVector(direction, -frontStart)
    );
    const frontEndPoint = (
      end
        .clone()
        .addScaledVector(perpendicular, thickness / 2)
        .addScaledVector(direction, frontEnd)
    );
    const backStartPoint = (
      start
        .clone()
        .addScaledVector(perpendicular, -thickness / 2)
        .addScaledVector(direction, -backStart)
    );
    const backEndPoint = (
      end
        .clone()
        .addScaledVector(perpendicular, -thickness / 2)
        .addScaledVector(direction, backEnd)
    );

    segments.push(
      {
        wallId: id,
        sideType: 'front',
        position: [frontStartPoint, frontEndPoint],
      },
      {
        wallId: id,
        sideType: 'back',
        position: [backStartPoint, backEndPoint],
      },
    );

    if(backEnd === 0 || frontEnd === 0) {
      const wallConnectedToEnd = spaceWalls.find(e => e.id !== id && (e.position.start.equals(end) || e.position.end.equals(end)));

      if(wallConnectedToEnd && wallConnectedToEnd.thickness < thickness) {
        const perpendicularToConnected = new Vector2(-direction.y, direction.x);
        const diff = (thickness - wallConnectedToEnd.thickness) / 2;

        const p1 = backEndPoint.clone();
        const p2 = p1.clone().addScaledVector(perpendicularToConnected, diff);
        segments.push(
          {
            wallId: id,
            sideType: 'back-cap',
            position: [p1, p2],
          },
        );

        const p3 = frontEndPoint.clone();
        const p4 = p3.clone().addScaledVector(perpendicularToConnected, -diff);
        segments.push(
          {
            wallId: id,
            sideType: 'front-cap',
            position: [p3, p4],
          },
        );
      }
    }

    if(backStart === 0 || frontStart === 0) {
      const wallConnectedToStart = spaceWalls.find(e => e.id !== id && (e.position.start.equals(start) || e.position.end.equals(start)));

      if(wallConnectedToStart && wallConnectedToStart.thickness < thickness) {
        const perpendicularToConnected = new Vector2(-direction.y, direction.x);
        const diff = (thickness - wallConnectedToStart.thickness) / 2;

        const p1 = backStartPoint.clone();
        const p2 = p1.clone().addScaledVector(perpendicularToConnected, diff);
        segments.push(
          {
            wallId: id,
            sideType: 'back-cap',
            position: [p1, p2],
          },
        );

        const p3 = frontStartPoint.clone();
        const p4 = p3.clone().addScaledVector(perpendicularToConnected, -diff);
        segments.push(
          {
            wallId: id,
            sideType: 'front-cap',
            position: [p3, p4],
          },
        );
      }
    }

    return segments;
  });

  return { spaceWallSegments, spaceWallsCornerDiff };
};
