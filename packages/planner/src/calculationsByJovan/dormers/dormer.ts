// // dormer.ts

import { Vector3 } from 'three';
import { RoofParts } from '../types';
import { computeDirectionVectorXZ } from '../Utils/Vector/vector';
import { computePlaneNormal } from '../Utils/Vector/plane';

export abstract class Dormer {
  position: Vector3;
  directionPoint: Vector3;
  width: number;
  depth: number;
  wallHeight: number;
  placement: string;
  dormerSoffit: number;

  protected directionVector!: Vector3;
  protected roofPlanePoint!: Vector3;
  protected roofPlaneNormal!: Vector3;

  protected basePoints!: Vector3[];

  // protected roofFaceVertices: [Vector3, Vector3, Vector3, ...Vector3[]] = [new Vector3(), new Vector3(), new Vector3()];
  protected roofFaceVertices: Vector3[] = [new Vector3(), new Vector3(), new Vector3()];

  constructor(
    position: Vector3,
    directionPoint: Vector3,
    width: number,
    depth: number,
    wallHeight: number,
    roofParts: RoofParts,
    dormerMainRoofPartIndex: number[],
    placement: string,
    dormerSoffit: number,
  ) {
    this.position = position;
    this.directionPoint = directionPoint;
    this.width = width;
    this.depth = depth;
    this.wallHeight = wallHeight;
    this.placement = placement;

    this.directionVector = computeDirectionVectorXZ(
      this.directionPoint,
      this.position,
    ).clone();

    if(
      dormerMainRoofPartIndex.length === 0 ||
      dormerMainRoofPartIndex[0] === undefined
    ) {
      console.warn('Invalid index in dormerMainRoofPartIndex. Defaulting to empty roof face.');
      this.roofFaceVertices = [];
      this.roofPlanePoint = new Vector3();
      this.roofPlaneNormal = new Vector3(0, 1, 0); // default normal pointing upwards
    } else {
      const roofFace = roofParts[dormerMainRoofPartIndex[0]];

      if(!roofFace || roofFace.length < 3) {
        console.warn(
          'Roof face does not have enough points to define a plane. Defaulting to empty roof face.',
        );
        this.roofFaceVertices = [];
        this.roofPlanePoint = new Vector3();
        this.roofPlaneNormal = new Vector3(0, 1, 0); // default normal pointing upwards
      } else {
        this.roofFaceVertices = roofFace.map(vertex => vertex.clone()) as [Vector3, Vector3, Vector3, ...Vector3[]];
        const [p0, p1, p2] = roofFace;
        const normal = computePlaneNormal(p0, p1, p2);

        this.roofPlanePoint = p0.clone();
        this.roofPlaneNormal = normal.clone();
      }
    }

    this.dormerSoffit = dormerSoffit;
  }

  /**
   * Calculates the geometry of the dormer.
   * @returns An object containing dormer roof parts, body parts, and base polygon.
   */
  calculateGeometry(): {
    dormerRoofParts: RoofParts;
    dormerBodyParts: RoofParts;
    dormerBasePolygon: Vector3[];
    debugPoints?: {
      leftFrontTop: Vector3;
      rightFrontTop: Vector3;
      leftBackProjected: Vector3;
      rightBackProjected: Vector3;
    };
    // eslint-disable-next-line indent
  } {
    this.basePoints = this.calculateBasePolygon();

    if(!this.basePoints || this.basePoints.length === 0) {
      console.warn('Base points are not calculated. Returning empty geometry.');
      return {
        dormerRoofParts: [],
        dormerBodyParts: [],
        dormerBasePolygon: [],
      };
    }

    const dormerBodyParts = this.calculateBodyParts(this.basePoints);
    const dormerRoofParts = this.calculateRoofParts(this.basePoints);

    return {
      dormerRoofParts,
      dormerBodyParts,
      dormerBasePolygon: this.basePoints,
    };
  }

  /**
   * Abstract method to calculate the base polygon of the dormer.
   * @returns An array of Vector3 points defining the base polygon.
   */
  protected abstract calculateBasePolygon(): Vector3[];

  /**
   * Abstract method to calculate the body parts of the dormer.
   * @param basePoints The base polygon points.
   * @returns An array of roof parts representing the body.
   */
  protected abstract calculateBodyParts(basePoints: Vector3[]): RoofParts;

  /**
   * Abstract method to calculate the roof parts of the dormer.
   * @param basePoints The base polygon points.
   * @returns An array of roof parts representing the roof.
   */
  protected abstract calculateRoofParts(basePoints: Vector3[]): RoofParts;

  /**
   * Retrieves the calculated base points.
   * @returns An array of Vector3 points defining the base polygon.
   */
  protected getBasePoints(): Vector3[] {
    return this.basePoints;
  }

  /**
   * Projects a set of points onto the roof plane.
   * @param points The points to project.
   * @returns An array of Vector3 points projected onto the roof plane.
   */
  protected projectPointsOntoRoofPlane(points: Vector3[]): Vector3[] {
    const planePoint = this.roofPlanePoint;
    const normal = this.roofPlaneNormal;

    const d = -normal.dot(planePoint);

    return points.map(point => {
      const distance = normal.dot(point) + d;
      return point.clone().sub(normal.clone().multiplyScalar(distance));
    });
  }
}
