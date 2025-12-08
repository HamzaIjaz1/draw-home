import { Vector2 } from 'three';
import { Decimal } from 'decimal.js';
import { isNull } from '@arthurka/ts-utils';
import type { WallsStore } from '../zustand';

// Algorithm is copied from the Internet, a bit refactored, black box tested, seems to be working
export const getLinesCrossPoint = (
  e1: WallsStore['walls'][number]['position'],
  e2: WallsStore['walls'][number]['position'],
): Vector2 | null => {
  const x1 = new Decimal(e1.start.x);
  const y1 = new Decimal(e1.start.y);
  const x2 = new Decimal(e1.end.x);
  const y2 = new Decimal(e1.end.y);
  const x3 = new Decimal(e2.start.x);
  const y3 = new Decimal(e2.start.y);
  const x4 = new Decimal(e2.end.x);
  const y4 = new Decimal(e2.end.y);
  let n: Decimal;

  if(y2.sub(y1).toNumber() === 0) {
    if(y3.sub(y4).toNumber() === 0) {
      return null;
    }

    n = y3.sub(y1).div(y3.sub(y4));
  } else {
    const q = x2.sub(x1).div(y1.sub(y2));
    const sn = y3.sub(y4).mul(q).add(x3.sub(x4));

    if(sn.toNumber() === 0) {
      return null;
    }

    n = y3.sub(y1).mul(q).add(x3.sub(x1)).div(sn);
  }

  return new Vector2(x4.sub(x3).mul(n).add(x3).toNumber(), y4.sub(y3).mul(n).add(y3).toNumber());
};

export const getLineSegmentsCrossPoint = (
  e1: WallsStore['walls'][number]['position'],
  e2: WallsStore['walls'][number]['position'],
): Vector2 | null => {
  const x1 = new Decimal(e1.start.x);
  const y1 = new Decimal(e1.start.y);
  const x2 = new Decimal(e1.end.x);
  const y2 = new Decimal(e1.end.y);
  const x3 = new Decimal(e2.start.x);
  const y3 = new Decimal(e2.start.y);
  const x4 = new Decimal(e2.end.x);
  const y4 = new Decimal(e2.end.y);

  const crossPoint = getLinesCrossPoint(e1, e2);
  if(isNull(crossPoint)) {
    return null;
  }

  const crossPointRange = {
    x: {
      min: Math.max(Math.min(x1.toNumber(), x2.toNumber()), Math.min(x3.toNumber(), x4.toNumber())),
      max: Math.min(Math.max(x1.toNumber(), x2.toNumber()), Math.max(x3.toNumber(), x4.toNumber())),
    },
    y: {
      min: Math.max(Math.min(y1.toNumber(), y2.toNumber()), Math.min(y3.toNumber(), y4.toNumber())),
      max: Math.min(Math.max(y1.toNumber(), y2.toNumber()), Math.max(y3.toNumber(), y4.toNumber())),
    },
  };

  if(
    true
      && crossPointRange.x.min <= crossPoint.x && crossPoint.x <= crossPointRange.x.max
      && crossPointRange.y.min <= crossPoint.y && crossPoint.y <= crossPointRange.y.max
      && !e1.start.equals(e2.start)
      && !e1.start.equals(e2.end)
      && !e1.end.equals(e2.start)
      && !e1.end.equals(e2.end)
  ) {
    return crossPoint;
  }

  return null;
};
