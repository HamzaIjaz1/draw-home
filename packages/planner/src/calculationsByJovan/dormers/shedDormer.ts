// shedDormer.ts

import { Vector3 } from 'three';
import { RoofParts } from '../types';
import { projectPointOntoPlaneAlongDirection } from '../Utils/Vector/point';
import { rectangleMidpointSlopes } from '../Utils/Curve/primitive';
import { roofSoffitShed } from '../Utils/Curve/utils';
import { Dormer } from './dormer';
import { isPointInPolygonOnPlane } from '../Utils/Curve/analysis';

export class ShedDormer extends Dormer {
  roofHeight: number;
  protected ridgeData!: {
    areWallTopPointsInside: boolean;
    wallTopPointsBase: Vector3[];
    wallTopPointsSoffit: Vector3[];
    projectedWallTopPointsBody: Vector3[];
    projectedWallTopPoints: Vector3[];
  };

  constructor(
    position: Vector3,
    directionPoint: Vector3,
    width: number,
    depth: number,
    wallHeight: number,
    roofHeight: number,
    roofParts: RoofParts,
    dormerMainRoofPartIndex: number[],
    placement: string,
    dormerSoffit: number,
  ) {
    super(
      position,
      directionPoint,
      width,
      depth,
      wallHeight,
      roofParts,
      dormerMainRoofPartIndex,
      placement,
      dormerSoffit,
    );
    this.roofHeight = roofHeight;
  }

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
      console.warn('Base points could not be calculated. Returning empty geometry.');
      return {
        dormerRoofParts: [],
        dormerBodyParts: [],
        dormerBasePolygon: [],
      };
    }

    // Calculate sloped front points for validation
    const { leftFrontSloped, rightFrontSloped } = this.calculateSlopedFrontPoints(this.basePoints);

    // Check if sloped front points are within roof bounds
    const areSlopedFrontPointsInside = [leftFrontSloped, rightFrontSloped].every(point => isPointInPolygonOnPlane(
      point,
      this.roofFaceVertices,
      this.roofPlaneNormal,
      this.roofPlanePoint,
    ));

    if(!areSlopedFrontPointsInside) {
      // Sloped front points are outside the roof face
      return {
        dormerRoofParts: [],
        dormerBodyParts: [],
        dormerBasePolygon: this.basePoints,
      };
    }

    // Compute ridge data and perform the checks
    this.ridgeData = this.computeRidgeData(this.basePoints);

    if(!this.ridgeData.areWallTopPointsInside) {
      console.warn('One or more projected wall top points are outside of the roof face.');
      // Return empty arrays since the dormer cannot be built
      return {
        dormerRoofParts: [],
        dormerBodyParts: [],
        dormerBasePolygon: this.basePoints,
      };
    }

    const dormerBodyParts = this.calculateBodyParts(this.basePoints);
    const dormerRoofParts = this.calculateRoofParts(this.basePoints);

    // Extract debug points from ridgeData
    const leftFrontTop = this.ridgeData.wallTopPointsBase[0];
    const rightFrontTop = this.ridgeData.wallTopPointsBase[1];
    const leftBackProjected = this.ridgeData.projectedWallTopPointsBody[3];
    const rightBackProjected = this.ridgeData.projectedWallTopPointsBody[2];

    return {
      dormerRoofParts,
      dormerBodyParts,
      dormerBasePolygon: this.basePoints,
      debugPoints: (leftFrontTop && rightFrontTop && leftBackProjected && rightBackProjected) ? {
        leftFrontTop,
        rightFrontTop,
        leftBackProjected,
        rightBackProjected,
      } : undefined,
    };
  }

  private computeRidgeData(basePoints: Vector3[]): {
    areWallTopPointsInside: boolean;
    wallTopPointsBase: Vector3[];
    wallTopPointsSoffit: Vector3[];
    projectedWallTopPointsBody: Vector3[];
    projectedWallTopPoints: Vector3[];
  } {
    const offsetValue = this.dormerSoffit;

    // Compute top points of the dormer walls (front wall only for shed dormer)
    const wallTopPointsBase = basePoints.map(point => point.clone().add(new Vector3(0, this.wallHeight, 0)));

    if(wallTopPointsBase.length < 2) {
      console.warn('Insufficient wall top points to define the dormer roof. Returning default ridge data.');
      return {
        areWallTopPointsInside: false,
        wallTopPointsBase: [],
        wallTopPointsSoffit: [],
        projectedWallTopPointsBody: [],
        projectedWallTopPoints: [],
      };
    }

    // Apply soffit offset
    const wallTopPointsSoffit = roofSoffitShed(wallTopPointsBase, offsetValue);

    // Projecting the top points so the body can be assembled
    const projectedWallTopPointsBody = wallTopPointsBase.map(point => projectPointOntoPlaneAlongDirection(
      point,
      this.directionVector,
      this.roofPlaneNormal,
      this.roofPlanePoint,
    ));

    // Project wall top points onto the roof plane along the direction vector
    const projectedWallTopPoints = wallTopPointsSoffit.map(point => projectPointOntoPlaneAlongDirection(
      point,
      this.directionVector,
      this.roofPlaneNormal,
      this.roofPlanePoint,
    ));

    // Check if all projected wall top points lie within the roof face
    const areWallTopPointsInside = projectedWallTopPoints.every(point => isPointInPolygonOnPlane(
      point,
      this.roofFaceVertices,
      this.roofPlaneNormal,
      this.roofPlanePoint,
    ));

    return {
      areWallTopPointsInside,
      wallTopPointsBase,
      wallTopPointsSoffit,
      projectedWallTopPointsBody,
      projectedWallTopPoints,
    };
  }

  /**
   * Calculates the base polygon of the shed dormer.
   * @returns An array of Vector3 points defining the base polygon.
   */
  protected calculateBasePolygon(): Vector3[] {
    const directionVector = this.directionVector.clone();

    // Compute the slope direction vector (perpendicular to dormer's direction)
    const upVector = new Vector3(0, 1, 0);
    const slopeDirection = directionVector.clone().cross(upVector).normalize();

    // Define the dormer's base rectangle on the roof plane
    const halfWidth = this.width / 2;

    // Compute front center and back center of the dormer base
    // Position is where the dormer meets the roof
    // Depth extends outward (opposite to direction vector pointing into roof)
    const backCenter = this.position.clone();
    const frontCenter = this.position
      .clone()
      .add(directionVector.clone().multiplyScalar(-this.depth));

    // Compute corners of the dormer's base (for movement and positioning)
    const [leftFrontCorner, rightFrontCorner, leftBackCorner, rightBackCorner] =
      rectangleMidpointSlopes(frontCenter, backCenter, slopeDirection, halfWidth);

    // Validate corners
    if(!leftFrontCorner || !rightFrontCorner || !leftBackCorner || !rightBackCorner) {
      console.warn('Failed to calculate dormer base corners. Returning empty base polygon.');
      return [];
    }

    const basePoints: Vector3[] = [
      leftFrontCorner.clone(),
      rightFrontCorner.clone(),
      rightBackCorner.clone(),
      leftBackCorner.clone(),
    ];

    return basePoints;
  }

  /**
   * Calculates sloped front base points that lie on the roof surface.
   * These are used for the geometry to ensure proper connection to the roof.
   */
  private calculateSlopedFrontPoints(basePoints: Vector3[]): {
    leftFrontSloped: Vector3;
    rightFrontSloped: Vector3;
  } {
    const leftFrontCorner = basePoints[0];
    const rightFrontCorner = basePoints[1];

    if(!leftFrontCorner || !rightFrontCorner) {
      console.warn('Front corners are undefined. Returning default sloped points.');
      return {
        leftFrontSloped: new Vector3(),
        rightFrontSloped: new Vector3(),
      };
    }

    // Project the front corners vertically onto the roof plane
    const leftFrontSloped = projectPointOntoPlaneAlongDirection(
      leftFrontCorner,
      new Vector3(0, -1, 0), // Project straight down
      this.roofPlaneNormal,
      this.roofPlanePoint,
    );

    const rightFrontSloped = projectPointOntoPlaneAlongDirection(
      rightFrontCorner,
      new Vector3(0, -1, 0), // Project straight down
      this.roofPlaneNormal,
      this.roofPlanePoint,
    );

    return {
      leftFrontSloped,
      rightFrontSloped,
    };
  }

  /**
   * Calculates the body parts (walls) of the shed dormer.
   * @param basePoints The base polygon points.
   * @returns An array of roof parts representing the dormer walls.
   */
  protected calculateBodyParts(basePoints: Vector3[]): RoofParts {
    const { wallTopPointsBase, projectedWallTopPointsBody } = this.ridgeData;

    const dormerBodyParts: RoofParts = [];

    // Ensure there are enough base points
    if(basePoints.length < 4 || wallTopPointsBase.length < 4) {
      console.warn('Insufficient points to define the dormer walls. Returning empty body parts.');
      return dormerBodyParts;
    }

    // Calculate sloped front points that sit on the roof surface
    const { leftFrontSloped, rightFrontSloped } = this.calculateSlopedFrontPoints(basePoints);

    const topPoints = wallTopPointsBase;

    // Define the dormer's body (walls)
    // Front face (quadrilateral) - the vertical front wall
    // Use sloped points to ensure the front face sits on the roof surface
    const topPoint1 = topPoints[0]; // Left front top
    const topPoint2 = topPoints[1]; // Right front top

    if(leftFrontSloped && rightFrontSloped && topPoint1 && topPoint2) {
      dormerBodyParts.push([leftFrontSloped, rightFrontSloped, topPoint2, topPoint1]);
    } else {
      console.warn('Undefined point found when defining front face of dormer. Skipping front face.');
    }

    // Left side face (triangle)
    // Use leftFrontSloped instead of basePoint1 to ensure it sits on the roof
    const projectedPoint3 = projectedWallTopPointsBody[3]; // Left back projected
    if(leftFrontSloped && topPoint1 && projectedPoint3) {
      dormerBodyParts.push([leftFrontSloped, topPoint1, projectedPoint3]);
    } else {
      console.warn('Undefined point found when defining left side face. Skipping left side face.');
    }

    // Right side face (triangle)
    // Use rightFrontSloped instead of basePoint2 to ensure it sits on the roof
    const projectedPoint2 = projectedWallTopPointsBody[2]; // Right back projected
    if(rightFrontSloped && projectedPoint2 && topPoint2) {
      dormerBodyParts.push([rightFrontSloped, projectedPoint2, topPoint2]);
    } else {
      console.warn('Undefined point found when defining right side face. Skipping right side face.');
    }

    return dormerBodyParts;
  }

  /**
   * Calculates the roof parts of the shed dormer.
   * @param basePoints The base polygon points.
   * @returns An array of roof parts representing the dormer roof.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected calculateRoofParts(basePoints: Vector3[]): RoofParts {
    const { wallTopPointsSoffit, projectedWallTopPoints } = this.ridgeData;

    const dormerRoofParts: RoofParts = [];

    // Ensure necessary points are available
    if(
      !wallTopPointsSoffit[0] ||
      !wallTopPointsSoffit[1] ||
      !projectedWallTopPoints[2] ||
      !projectedWallTopPoints[3]
    ) {
      console.warn('Insufficient points to define dormer roof parts. Returning empty roof parts.');
      return dormerRoofParts;
    }

    // Shed dormer has a single sloped roof surface
    // It's a quadrilateral from the front wall top to the back projected points
    dormerRoofParts.push([
      wallTopPointsSoffit[0], // Left front top
      wallTopPointsSoffit[1], // Right front top
      projectedWallTopPoints[2], // Right back projected
      projectedWallTopPoints[3], // Left back projected
    ]);

    return dormerRoofParts;
  }
}
