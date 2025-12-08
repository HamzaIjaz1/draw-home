import { Vector3 } from 'three';
import { Dormer } from './dormer';
import { GableDormer } from './gableDormer';
import { HipDormer } from './hipDormer';
import { ShedDormer } from './shedDormer';
import { RoofParts } from '../types';

// dormerFactory.ts

export function DormerFactory(
  type: string,
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
): Dormer | null {
  switch(type.toLowerCase()) {
    case 'gable':
      return new GableDormer(
        position,
        directionPoint,
        width,
        depth,
        wallHeight,
        roofHeight,
        roofParts,
        dormerMainRoofPartIndex,
        placement,
        dormerSoffit,
      );
    case 'hip':
      return new HipDormer(
        position,
        directionPoint,
        width,
        depth,
        wallHeight,
        roofHeight,
        roofParts,
        dormerMainRoofPartIndex,
        placement,
        dormerSoffit,
      );
    case 'shed':
      return new ShedDormer(
        position,
        directionPoint,
        width,
        depth,
        wallHeight,
        roofHeight,
        roofParts,
        dormerMainRoofPartIndex,
        placement,
        dormerSoffit,
      );
    // case 'shed-free':
    // case 'shed-fixed':
    // case 'recessed':
    // case 'reversed':
    // case 'eyebrow':
    // case 'pyramidal':
    // case 'arched':
    // case 'flared':
    // case 'polygonal':
    // case 'triangle':
    // case 'reversed-gable':
    // case 'trapezoidal':
    // case 'false-hip':
    // Add other dormer types here
    default:
      console.warn(`Unknown dormer type: ${type}. Returning null.`);
      return null;
  }
}
