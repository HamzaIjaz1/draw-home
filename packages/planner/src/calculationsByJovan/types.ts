// geometryTypes.ts

import { Vector3 } from 'three';
import { Point2 } from './Utils/Vector/point';

export type Point = [number, number];
export type Line = {
  start: Vector3;
  end: Vector3;
};
export type Ring = Point[];
export type Polygon = Ring[];
export type MultiPolygon = Polygon[];

export type Subtree = {
  source: Point2;
  height: number;
  sinks: Point2[];
};

export type RoofFace = {
  source: Vector3;
  sinks: Vector3[];
};

export type RoofParts = Array<[Vector3, Vector3, Vector3, ...Vector3[]]>;


// When calculating hip to gable conversion
export type IntersectionInfo = {
  index: number;
  wallIntersection: Vector3;
  sinkPoints: Vector3[];
};
