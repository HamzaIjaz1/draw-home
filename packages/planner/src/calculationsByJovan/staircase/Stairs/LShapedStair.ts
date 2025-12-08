/* eslint-disable max-len */
// LShapedStair.ts

import { Stair } from './stair';
import { StairComponent } from './stairComponent';
import { Step } from '../Components/step';
import { Landing } from '../Components/landing';
import { TopLanding } from '../Components/topLanding';
import { Railing } from '../Components/railing';
import { Stringer } from '../Components/stringer';


export class LShapedStair extends Stair {
  protected initialize(): void {
    this.components = this.generateComponents();
  }

  private generateComponents(): StairComponent[] {
    const components: StairComponent[] = [];
    const {
      width,
      stepHeight,
      stepDepth,
      height,
      landingType,
      numberOfWinders,
      landingLength,
      customLandingStep,
      mirror,
      supportType,
      railingSide,
    } = this.params;

    if(
      width === undefined ||
      stepDepth === undefined ||
      height === undefined ||
      stepHeight === undefined
    ) {
      throw new Error('Missing required parameters for L-shaped stair.');
    }


    const totalSteps = Math.ceil(height / stepHeight) - 1;
    let stepsBeforeTurn: number;
    const numWinders = landingType === 'winders' ? numberOfWinders || 3 : 0;

    if(this.params.landingPosition === 'custom' && customLandingStep !== undefined) {
      stepsBeforeTurn = customLandingStep;
    } else {
      stepsBeforeTurn = Math.floor((totalSteps - numWinders) / 2);
    }

    const stepsAfterTurn = totalSteps - stepsBeforeTurn - numWinders;

    let currentElevation = 0;
    let currentPositionX = 0;
    let currentPositionZ = 0;

    // **First Flight**
    for(let i = 0; i < stepsBeforeTurn; i++) {
      const step = new Step(
        width,
        stepDepth,
        currentElevation,
        currentPositionX,
        currentPositionZ,
        landingLength,
        'z',
      );
      components.push(step);

      currentElevation += stepHeight;
      currentPositionZ += stepDepth;
    }

    currentPositionZ = currentPositionZ - stepDepth / 2 - stepDepth / 6;
    // **Landing or Winders**
    if(landingType === 'landing') {
      const landingLen = landingLength || width;
      const landing = new Landing(
        width,
        landingLen,
        currentElevation,
        currentPositionX,
        currentPositionZ,
        this.params,
        'z',
      );
      components.push(landing);

      currentPositionZ += landingLen / 2;

      // Adjust positions for the 90-degree turn
      if(mirror) {
        // Left turn
        currentPositionX -= (width / 2) + stepDepth / 2;
      } else {
        // Right turn
        currentPositionX += (width / 2) + stepDepth / 2;
      }

      // Ensure currentPositionZ aligns with the center of the landing
      // (Optional based on your coordinate system)
      // currentPositionZ += width! / 2 - stepDepth! / 2;
    }

    // **Second Flight**
    for(let i = 0; i < stepsAfterTurn; i++) {
      currentElevation += stepHeight;

      const stepOffset = (i) * stepDepth;
      let positionX: number;
      let positionZ: number;
      let stepDirection: 'x' | 'x-';

      if(mirror) {
        // Steps going in the negative X direction
        positionX = currentPositionX - stepOffset;
        positionZ = currentPositionZ;
        stepDirection = 'x-';
      } else {
        // Steps going in the positive X direction
        positionX = currentPositionX + stepOffset;
        positionZ = currentPositionZ;
        stepDirection = 'x';
      }

      const step = new Step(
        width,
        stepDepth,
        currentElevation,
        positionX,
        positionZ,
        landingLength,
        stepDirection,
      );
      components.push(step);
    }


    // **Add Top Landing if requested**
    if(this.params.includeTopLanding) {
      const topLandingLength = this.params.topLandingLength || width;
      // Determine the final position and direction based on the last step
      const lastStep = components.filter(c => c instanceof Step).pop() as Step | undefined;
      let topLandingDirection: 'x' | 'x-' | 'z' | 'z-' = 'z';
      let topLandingX = currentPositionX;
      let topLandingZ = currentPositionZ;

      if(lastStep) {
        topLandingDirection = lastStep.direction;
        // Position the landing directly after the last step with no gap
        if(topLandingDirection === 'x') {
          // Adjust X position to account for the landing offset
          topLandingX = lastStep.position.x + stepDepth - (stepDepth / 2 + stepDepth / 6);
        } else if(topLandingDirection === 'x-') {
          // Adjust X position to account for the landing offset
          topLandingX = lastStep.position.x - stepDepth + (stepDepth / 2 + stepDepth / 6);
        } else if(topLandingDirection === 'z') {
          topLandingZ = lastStep.position.z + stepDepth;
        } else if(topLandingDirection === 'z-') {
          topLandingZ = lastStep.position.z - stepDepth;
        }
      }

      // The top landing should be one step higher than the last step
      const topLandingElevation = currentElevation + stepHeight;

      const topLanding = new TopLanding(
        width,
        topLandingLength,
        topLandingElevation,
        topLandingX,
        topLandingZ,
        this.params,
        topLandingDirection,
        this.params.topLandingRailingOrientation || 'middle',
      );
      components.push(topLanding);
    }

    // **Generate Supports**
    if(supportType === 'stringer') {
      const stepsAndLandings = components.filter(
        c => c instanceof Step || c instanceof Landing || c instanceof TopLanding,
      ) as Array<Step | Landing | TopLanding>;

      const { stringerLocations, stringerType } = this.params;
      // default to include left, right, and middle stringers if none provided
      const locationsToUse =
      stringerLocations == null // only check for null/undefined
        ? (['left', 'right'] as Array<'left' | 'right' | 'middle'>)
        : stringerLocations;

      locationsToUse.forEach(location => {
        // pass params so the Stringer can read 'stringerType' + 'stairType'
        const stringer = new Stringer(stepsAndLandings, location, {
          ...this.params,
          stringerType: stringerType ?? 'cut', // or 'closed'
          stairType: 'l-shaped', // ensure L-shaped flipping logic
        });
        components.push(stringer);
      });
    }


    // **Generate Railings**
    if(railingSide !== 'none') {
      const stepsAndLandings = components.filter(c => c instanceof Step || c instanceof Landing || c instanceof TopLanding) as Array<Step | Landing | TopLanding>;
      if(railingSide === 'left' || railingSide === 'both') {
        const railingLeft = new Railing(stepsAndLandings, 'left', this.params);
        components.push(railingLeft);
      }
      if(railingSide === 'right' || railingSide === 'both') {
        const railingRight = new Railing(stepsAndLandings, 'right', this.params);
        components.push(railingRight);
      }
    }

    return components;
  }
}
