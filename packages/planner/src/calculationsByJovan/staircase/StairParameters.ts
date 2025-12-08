// StairParameters.ts

import { Vector2, Vector3 } from 'three';

export type StairParameters = {
  stairType?: StairType;

  coords: Vector2[];
  width?: number;
  height?: number;
  stepHeight?: number;
  stepDepth?: number;

  // Railing parameters
  railingHeight?: number;
  railingOffset?: number;
  railingSide?: 'left' | 'right' | 'both' | 'none';


  // landing parameters
  landingPosition?: 'custom' | 'symmetric' | 'none';
  numberOfLandings?: number;
  landingWidth?: number; // Width of the landing (optional if same as stair width)
  landingLength?: number;
  landings?: {
    stepsAfter?: number[]; // Array of steps after which landings occur
    lengths?: number[]; // Corresponding lengths of the landings
    // widths?: number[]; // Width of the landing (optional if same as stair width)
  };

  // Top landing - optional for all stair types
  includeTopLanding?: boolean;
  topLandingLength?: number; // Length of the top landing (optional, defaults to width if not specified)
  topLandingRailingOrientation?: 'outerLeft' | 'middle' | 'outerRight'; // Orientation of railings on top landing

  // For L-shaped stairs
  customLandingStep?: number;
  landingType?: 'landing' | 'winders';
  numberOfWinders?: number; // Number of winder steps

  // For U-shaped stairs
  stairConfiguration?: 'two-flights' | 'three-flights';


  supportType?: 'stringer' | 'beam' | 'box' | 'central-pole' | 'none';
  stringerLocations?: Array<'left' | 'right' | 'middle'>;
  stringerType?: 'cut' | 'closed';
  stringerHeight?: number;
  stringerThickness?: number;
  beamHeight?: number;
  beamWidth?: number;


  // For U-shaped stairs
  gapBetweenFlights?: number; // Gap between the two stair flights
  // Transfirmations
  position?: Vector3;// Default to (0, 0, 0)
  // rotation?: Euler;
  // Mirror has to be here as r3f can handle badlly non simetrical cases
  mirror?: boolean;

  // Curved & spiral stairs parameters
  innerRadius?: number;
  outerRadius?: number;
};


export type StairType = 'straight' | 'l-shaped' | 'u-shaped' | 'spiral' | 'curved';
