// CeilingParameters.ts

import { Vector3 } from 'three';

export type CeilingParameters = {
  ceilingType?: CeilingType;

  coords: Vector3[];
  depth?: number;

  // For dropped ceiling
  offsetValue?: number;
  depthDropped?: number;

  // For coffered ceiling
  gridU?: number;
  gridV?: number;
  gridOffset?: number;
  gridDepth?: number;

  // For tray ceiling
  undercutOffset?: number;
  undercutThickness?: number;

  // For beam ceiling
  beamUcount?: number;
  beamUwidth?: number;
  beamUheght?: number;

  beamVcount?: number;
  beamVwidth?: number;
  beamVheight?: number;

  // For shed celings
  // Look at how the shed roof is orientationg sides
  slopeAngle?: number;

  // For chatedral ceilings
  // This is the inverted roof

  // For cove ceilings
  // This will have some arch. Need an arch func


};


export type CeilingType = 'regular' | 'dropped' | 'coffered' | 'tray' | 'beam' | 'shed' | 'chatedral' | 'cove';
