// railingParameters.ts

import { Vector3 } from 'three';

/**
 * The shape and meta parameters describing a railing.
 */
export type RailingParameters = {
  railingType?: RailingType;

  /**
   * 3D start/end points that define the line for the railing.
   */
  startPoint?: Vector3;
  endPoint?: Vector3;

  /**
   * How many segments to split the line into.
   * (Straight, for instance, will just subdivide linearly.)
   */
  railingSegments?: number;
  railingSegmentDistance?: number;
};

/**
 * Possible types of railings. Add more as you expand (e.g. 'curved', 'spiral', etc.).
 */
export type RailingType = 'straight';
