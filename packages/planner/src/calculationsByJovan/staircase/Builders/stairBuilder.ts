// StairBuilder.ts

import { Vector2 } from 'three';
import { StairParameters } from '../StairParameters';
import { Stair } from '../Stairs/stair';

import { StraightStair } from '../Stairs/straightStair';
import { CurvedStair } from '../Stairs/curvedStair';
import { SpiralStair } from '../Stairs/spiralStair';
import { LShapedStair } from '../Stairs/LShapedStair';
import { UShapedStair } from '../Stairs/UShapedStair ';


export class StairBuilder {
  protected params: Partial<StairParameters> = {};
  private type: 'straight' | 'curved' | 'spiral' | 'l-shaped' | 'u-shaped' = 'straight';

  setType(type: 'straight' | 'curved' | 'spiral' | 'l-shaped' | 'u-shaped'): this {
    this.type = type;
    return this;
  }

  setMirror(mirror: boolean): this {
    this.params.mirror = mirror;
    return this;
  }

  setCoords(coords: Vector2[]): this {
    this.params.coords = coords;
    return this;
  }

  setWidth(width: number): this {
    this.params.width = width;
    return this;
  }

  setHeight(height: number): this {
    this.params.height = height;
    return this;
  }

  setStepHeight(stepHeight: number): this {
    this.params.stepHeight = stepHeight;
    return this;
  }

  setRun(stepDepth: number): this {
    this.params.stepDepth = stepDepth;
    return this;
  }

  setRailingHeight(railingHeight: number): this {
    this.params.railingHeight = railingHeight;
    return this;
  }

  setRailingOffset(railingOffset: number): this {
    this.params.railingOffset = railingOffset;
    return this;
  }

  setRailingLocation(side: 'left' | 'right' | 'both' | 'none'): this {
    this.params.railingSide = side;
    return this;
  }

  setNumberOfLandings(count: number): this {
    this.params.numberOfLandings = count;
    return this;
  }

  setLandingLength(length: number): this {
    this.params.landingLength = length;
    return this;
  }


  setLandingWidth(width: number): this {
    this.params.landingWidth = width;
    return this;
  }

  setLandingPosition(position: 'custom' | 'symmetric' | 'none'): this {
    this.params.landingPosition = position;
    return this;
  }

  setLandings(stepsAfter: number[], lengths: number[]): this {
    this.params.landings = {
      // position: 'custom',
      stepsAfter,
      lengths,
    };
    return this;
  }


  setLandingType(type: 'landing' | 'winders'): this {
    this.params.landingType = type;
    return this;
  }

  setSupportType(type: 'stringer' | 'beam' | 'box' | 'central-pole' | 'none'): this {
    this.params.supportType = type;
    return this;
  }

  setStringerHeight(stringerHeight: number): this {
    this.params.stringerHeight = stringerHeight;
    return this;
  }

  setStringerLocations(locations: Array<'left' | 'right' | 'middle'>): this {
    this.params.stringerLocations = locations;
    return this;
  }

  setStringerType(type: 'cut' | 'closed'): this {
    this.params.stringerType = type;
    return this;
  }

  setBeamHeight(beamHeight: number): this {
    this.params.beamHeight = beamHeight;
    return this;
  }

  setBeamWidth(beamWidth: number): this {
    this.params.beamWidth = beamWidth;
    return this;
  }

  setNumberOfWinders(count: number): this {
    this.params.numberOfWinders = count;
    return this;
  }

  setIncludeTopLanding(include: boolean): this {
    this.params.includeTopLanding = include;
    return this;
  }

  setTopLandingLength(length: number): this {
    this.params.topLandingLength = length;
    return this;
  }

  setTopLandingRailingOrientation(orientation: 'outerLeft' | 'middle' | 'outerRight'): this {
    this.params.topLandingRailingOrientation = orientation;
    return this;
  }

  setGapBetweenFlights(gap: number): this {
    if(this.type !== 'u-shaped') {
      throw new Error('setGapBetweenFlights is only applicable to U-shaped stairs.');
    }
    this.params.gapBetweenFlights = gap;
    return this;
  }

  setStairConfiguration(config: 'two-flights' | 'three-flights'): this {
    this.params.stairConfiguration = config;
    return this;
  }

  setInnerRadius(radius: number): this {
    this.params.innerRadius = radius;
    return this;
  }

  setOuterRadius(radius: number): this {
    this.params.outerRadius = radius;
    return this;
  }

  // Add more setter methods as needed

  build(): Stair {
    // Validate required parameters
    if(!this.params.coords) {
      throw new Error('Coordinates are required to build a stair.');
    }

    // Set default values if not provided
    const defaultParams: StairParameters = {
      stairType: this.type,
      coords: this.params.coords,
      width: this.params.width || 1.0,
      height: this.params.height || 3.0,
      stepHeight: this.params.stepHeight || 0.175,
      stepDepth: this.params.stepDepth || 0.29,
      railingHeight: this.params.railingHeight || 1.0,
      railingOffset: this.params.railingOffset || 0.05,
      railingSide: this.params.railingSide || 'both',
      mirror: this.params.mirror || false,
      landingPosition: this.params.landingPosition || 'none',
      numberOfLandings: this.params.numberOfLandings || 2,
      landingLength: this.params.landingLength || this.params.width || 0.9,
      landings: this.params.landings,
      landingType: this.params.landingType || 'landing',
      supportType: this.params.supportType || 'stringer',
      stringerLocations: this.params.stringerLocations || [],
      stringerType: this.params.stringerType || 'closed',
      stringerHeight: this.params.stringerHeight || 0.2,
      beamHeight: this.params.beamHeight || 0.2, // Default beamHeight
      beamWidth: this.params.beamWidth || (this.params.width || 1.0) / 3,
      numberOfWinders: this.params.numberOfWinders || 3, // Number of winder steps
      stairConfiguration: this.params.stairConfiguration || 'two-flights',
      innerRadius: this.params.innerRadius || 0, // default value
      outerRadius: this.params.outerRadius || 1, // default value
      includeTopLanding: this.params.includeTopLanding || false, // Add top landing parameter
      topLandingLength: this.params.topLandingLength, // Add top landing length parameter
      topLandingRailingOrientation: this.params.topLandingRailingOrientation || 'middle', // Add top landing railing orientation parameter
      // Add defaults for new parameters
    };

    // Create the appropriate Stair instance
    switch(this.type) {
      case 'straight':
        return new StraightStair(defaultParams);
      case 'curved':
        return new CurvedStair(defaultParams);
      case 'spiral':
        return new SpiralStair(defaultParams);
      case 'l-shaped':
        return new LShapedStair(defaultParams);
      case 'u-shaped':
        return new UShapedStair(defaultParams);
      // case 'freehand':
      //   return new FreehandStair(defaultParams);
      default:
        throw new Error(`Unsupported stair type: ${this.type}`);
    }
  }
}
