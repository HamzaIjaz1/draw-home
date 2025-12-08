// builders/baseRailingBuilder.ts

import { Vector3 } from 'three';
import { RailingParameters, RailingType } from '../railingParameters';

/**
 * An abstract base class for all RailingBuilders.
 */
export abstract class BaseRailingBuilder {
  protected params: Partial<RailingParameters> = {};
  protected type: RailingType = 'straight';

  setType(type: RailingType): this {
    this.type = type;
    this.params.railingType = type;
    return this;
  }

  setStartPoint(point: Vector3): this {
    this.params.startPoint = point;
    return this;
  }

  setEndPoint(point: Vector3): this {
    this.params.endPoint = point;
    return this;
  }

  setRailingSegments(numSegments: number): this {
    this.params.railingSegments = numSegments;
    return this;
  }

  setRailingSegmentDistance(segmentDistance: number): this {
    this.params.railingSegmentDistance = segmentDistance;
    return this;
  }

  /**
   * Final step: build returns a Railing (or specialized Railing) instance.
   */
  abstract build(): any;
}
