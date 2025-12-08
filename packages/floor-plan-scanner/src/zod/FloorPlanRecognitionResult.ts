import { isNull, isUndefined } from '@arthurka/ts-utils';
import { clamp, fixIEEE } from '@draw-house/common/dist/utils';
import { routes } from '@draw-house/common/dist/zod';
import assert from 'assert';
import { Vector2 } from 'three';
import { z } from 'zod/v4';

export const FloorPlanRecognitionResult = (
  z
    .string()
    .transform((e): Extract<routes.floorPlanImage.scan.RouteResponse, { success: true }>['data'] => {
      const [e1, e2, ...rest] = e.trim().split('\n').map(e => e.trim().split(/\s+/));
      assert(!isUndefined(e1) && !isUndefined(e2), 'Something went wrong. |y6ex86|');

      const [[width, height], [length]] = (
        z
          .tuple([z.tuple([z.number(), z.number()]), z.tuple([z.number()])])
          .parse([e1, e2].map(e => e.map(e => +e)))
      );

      const data = rest.map(([_x1, _y1, _x2, _y2, ...rest], i) => {
        assert(!isUndefined(_x1) && !isUndefined(_y1) && !isUndefined(_x2) && !isUndefined(_y2), 'Something went wrong. |elq8eb|');

        const x1 = fixIEEE(+_x1 / width);
        const y1 = fixIEEE(+_y1 / height);
        const x2 = fixIEEE(+_x2 / width);
        const y2 = fixIEEE(+_y2 / height);
        if(i < length) {
          assert(x1 >= 0 && x1 <= 1 && y1 >= 0 && y1 <= 1 && x2 >= 0 && x2 <= 1 && y2 >= 0 && y2 <= 1, 'Something went wrong. |hl46wh|');
        }

        return [x1, y1, x2, y2, ...rest] as const;
      });

      const wallsData = data.slice(0, length).map(([x1, y1, x2, y2]): Extract<routes.floorPlanImage.scan.RouteResponse, { success: true }>['data']['wallsData'][number] => ({
        position: {
          start: {
            x: x1,
            y: y1,
          },
          end: {
            x: x2,
            y: y2,
          },
        },
        wallFurnitures: [],
      }));

      const wallFurnitures = data.slice(length).filter((e): e is typeof e & { 4: 'door' | 'window' } => (
        e[4] === 'door' || e[4] === 'window'
      ));

      for(const [x1, y1, x2, y2, type] of wallFurnitures) {
        let targetSegmentDistance = Infinity;
        let targetWallFurnitures: Extract<routes.floorPlanImage.scan.RouteResponse, { success: true }>['data']['wallsData'][number]['wallFurnitures'] | null = null;
        let wallFurnitureOnWallPosition: number | null = null;

        const P = new Vector2().addVectors(new Vector2(x1, y1), new Vector2(x2, y2)).divideScalar(2);

        const doorWidth = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        for(const { position, wallFurnitures } of wallsData) {
          const A = new Vector2(position.start.x, position.start.y);
          const B = new Vector2(position.end.x, position.end.y);

          const AB = new Vector2().subVectors(B, A);
          const AP = new Vector2().subVectors(P, A);

          const t = clamp(0, AP.dot(AB) / AB.lengthSq(), 1);
          const closestPointOnSegment = A.clone().add(AB.multiplyScalar(t));
          const segmentDistance = P.distanceTo(closestPointOnSegment);

          if(segmentDistance < targetSegmentDistance) {
            targetSegmentDistance = segmentDistance;
            targetWallFurnitures = wallFurnitures;
            wallFurnitureOnWallPosition = fixIEEE(
              new Vector2().subVectors(A, closestPointOnSegment).length() / new Vector2().subVectors(B, A).length(),
            );
          }
        }

        assert(!isNull(targetWallFurnitures) && !isNull(wallFurnitureOnWallPosition), 'Something went wrong. |jo3kg9|');
        targetWallFurnitures.push({
          type,
          position: wallFurnitureOnWallPosition,
          width: doorWidth,
        });
      }

      return {
        aspectRatio: width / height,
        wallsData,
      };
    })
);
