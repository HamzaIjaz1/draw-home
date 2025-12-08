/* eslint-disable @typescript-eslint/no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Euler, Vector3 } from 'three';
import { Railing } from './railing';
import { RailingParameters } from '../railingParameters';

/**
 * A straight vertical railing that can be segmented by count or by distance.
 * Now includes 3 model types: endpost, baluster, handrail.
 */
export class StraightVerticalRailing extends Railing<{
  modelType: 'endpost' | 'baluster' | 'handrail';
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
}> {
  constructor(params: RailingParameters) {
    super(params);
  }

  protected initialize(): void {
    const {
      startPoint,
      endPoint,
      railingSegments,
      railingSegmentDistance,
    } = this.params;

    if(!startPoint || !endPoint) {
      throw new Error('StraightRailing: startPoint and endPoint must be provided.');
    }

    // 1) Figure out our list of "points" along the line:
    let points: Vector3[];
    if(railingSegmentDistance && railingSegmentDistance > 0) {
      points = this.buildPointsByDistance(startPoint, endPoint, railingSegmentDistance);
    } else {
      const divisions = railingSegments ?? 7;
      points = this.buildPointsByCount(startPoint, endPoint, divisions);
    }

    // 2) We'll accumulate all items (endposts, balusters, handrails) into 'components'
    const components: Array<{
      modelType: 'endpost' | 'baluster' | 'handrail';
      position: Vector3;
      rotation: Euler;
      scale: Vector3;
    }> = [];

    const n = points.length - 1;
    if(n < 1) {
      // means we have only one point or zero. Not enough for a segment
      // but we can at least place an "endpost" if we have a single point
      if(points.length === 1) {
        components.push(this.makeEndPost(points[0]!, points[0]!));
      }
      this.components = components;
      return;
    }

    // Place endpost at the first point
    components.push(this.makeEndPost(points[0]!, points[1]!));

    // For each segment p(i)->p(i+1), place a baluster + a handrail
    for(let i = 0; i < n; i++) {
      const p1 = points[i]!;
      const p2 = points[i + 1]!;

      // Baluster
      components.push(this.makeBaluster(p1, p2));

      // Handrail
      components.push(this.makeHandrail(p1, p2));
    }

    // Place endpost at the last point
    components.push(this.makeEndPost(points[n]!, points[n - 1]!));

    // Store the final array in this.components
    this.components = components;
  }

  /**
   * Return a "component" for an endpost placed exactly at 'pt' with
   * orientation based on pRef. The rotation is computed from pt->pRef.
   */
  private makeEndPost(pt: Vector3, pRef: Vector3) {
    const direction = pRef.clone().sub(pt);
    const angleY = Math.atan2(direction.x, direction.z);
    return {
      modelType: 'endpost' as const,
      position: pt.clone(),
      rotation: new Euler(0, angleY, 0, 'XYZ'),
      scale: new Vector3(1, 1, 1),
    };
  }

  /**
   * Return a "component" for a baluster in the middle of the segment p1->p2.
   */
  private makeBaluster(p1: Vector3, p2: Vector3) {
    const midpoint = p1.clone().lerp(p2, 0.5);
    const direction = p2.clone().sub(p1);
    const angleY = Math.atan2(direction.x, direction.z);

    return {
      modelType: 'baluster' as const,
      position: midpoint,
      rotation: new Euler(0, angleY, 0, 'XYZ'),
      scale: new Vector3(1, 1, 1),
    };
  }

  /**
   * Return a "component" for a handrail along the segment p1->p2,
   * but **without** length scaling — so we can just see the raw model.
   */
  private makeHandrail(p1: Vector3, p2: Vector3) {
    const midpoint = p1.clone().lerp(p2, 0.5);

    // Direction for rotation
    const direction = p2.clone().sub(p1);
    const angleY = Math.atan2(direction.x, direction.z);

    // No length-based scaling so we can see the model:
    return {
      modelType: 'handrail' as const,
      position: midpoint,
      rotation: new Euler(0, angleY, 0, 'XYZ'),
      scale: new Vector3(1, 1, 1),
    };
  }

  /**
   * Create an array of points by dividing the line into N equal segments.
   */
  private buildPointsByCount(start: Vector3, end: Vector3, divisions: number): Vector3[] {
    const pts: Vector3[] = [];
    for(let i = 0; i <= divisions; i++) {
      const t = i / divisions;
      const pt = new Vector3().lerpVectors(start, end, t);
      pts.push(pt);
    }
    return pts;
  }

  /**
   * Create an array of points by walking along the line in increments of 'distance'.
   * This will produce a variable number of segments depending on the total length.
   */
  private buildPointsByDistance(start: Vector3, end: Vector3, distance: number): Vector3[] {
    const pts: Vector3[] = [];
    const direction = end.clone().sub(start);
    const totalLength = direction.length();

    const dirNorm = direction.clone().normalize();
    let currentDist = 0;

    pts.push(start.clone());

    while(true) {
      currentDist += distance;
      if(currentDist >= totalLength) {
        pts.push(end.clone());
        break;
      }
      const newPoint = start.clone().add(dirNorm.clone().multiplyScalar(currentDist));
      pts.push(newPoint);
    }
    return pts;
  }
}
