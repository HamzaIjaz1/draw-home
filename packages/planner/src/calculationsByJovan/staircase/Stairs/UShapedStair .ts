// UShapedStair.ts

import { Stair } from './stair';
import { StairComponent } from './stairComponent';
import { Step } from '../Components/step';
import { Landing } from '../Components/landing';
import { TopLanding } from '../Components/topLanding';
import { Railing } from '../Components/railing';
import { Stringer } from '../Components/stringer';

export class UShapedStair extends Stair {
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
      landingLength,
      mirror,
      supportType,
      railingSide,
      gapBetweenFlights,
      stairConfiguration,
    } = this.params;

    if(
      width === undefined ||
      stepDepth === undefined ||
      height === undefined ||
      stepHeight === undefined
    ) {
      throw new Error('Missing required parameters for U-shaped stair.');
    }

    const totalSteps = Math.ceil(height / stepHeight) - 1;

    // Determine the configuration
    const configuration = stairConfiguration || 'two-flights';

    // Move these variables to outer scope
    let currentElevation = 0;
    let currentPositionX = 0;
    let currentPositionZ = 0;

    if(configuration === 'two-flights') {
      // **Existing Two-Flight Logic**

      const numFlights = 2;
      const stepsPerFlight = Math.floor(totalSteps / numFlights);
      const remainderSteps = totalSteps % numFlights;

      const stepsInFlights = [stepsPerFlight, stepsPerFlight];
      for(let i = 0; i < remainderSteps; i++) {
        const index = i % numFlights;
        if(index < stepsInFlights.length) {
          stepsInFlights[index] = (stepsInFlights[index] ?? 0) + 1;
        }
      }

      const landingLen = landingLength || width;

      // **First Flight** (going along +Z)
      for(let i = 0; i < (stepsInFlights[0] ?? 0); i++) {
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
      // **First Landing**
      const firstLanding = new Landing(
        width,
        landingLen,
        currentElevation,
        currentPositionX,
        currentPositionZ,
        this.params,
        'z',
      );
      components.push(firstLanding);

      currentPositionZ += landingLen;

      // **Adjust Position for Second Flight**
      const shiftX = width + (gapBetweenFlights || 0);

      if(mirror) {
        // Shift to the left
        currentPositionX -= shiftX;
      } else {
        // Shift to the right
        currentPositionX += shiftX;
      }

      currentPositionZ -= landingLen / 2;

      // **Second Landing** (adjacent to the first landing)
      const secondLanding = new Landing(
        width,
        landingLen,
        currentElevation,
        currentPositionX - landingLen / 2,
        currentPositionZ,
        this.params,
        'x',
      );
      components.push(secondLanding);

      currentPositionZ -= stepDepth + landingLen / 2 - stepDepth / 2;

      // **Second Flight** (going along -Z)
      for(let i = 0; i < (stepsInFlights[1] ?? 0); i++) {
        currentElevation += stepHeight;

        const step = new Step(
          width,
          stepDepth,
          currentElevation,
          currentPositionX,
          currentPositionZ, // Use currentPositionZ before decrementing
          landingLength,
          'z-',
        );
        components.push(step);

        currentPositionZ -= stepDepth; // Decrement after creating the step
      }
    } else if(configuration === 'three-flights') {
      // **Three-Flight Logic**

      const numFlights = 3;
      const stepsPerFlight = Math.floor(totalSteps / numFlights);
      const remainderSteps = totalSteps % numFlights;

      const stepsInFlights = [stepsPerFlight, stepsPerFlight, stepsPerFlight];
      for(let i = 0; i < remainderSteps; i++) {
        const index = i % numFlights;
        if(stepsInFlights[index] !== undefined) {
          stepsInFlights[index]++;
        }
      }

      const landingLen = landingLength || width;

      // **First Flight** (going along +Z)
      for(let i = 0; i < (stepsInFlights[0] ?? 0); i++) {
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

      // **First Landing**
      const firstLanding = new Landing(
        width,
        landingLen,
        currentElevation,
        currentPositionX,
        currentPositionZ,
        this.params,
        'z',
      );
      components.push(firstLanding);

      currentPositionZ += landingLen;

      // **Adjust Position for Second Flight**
      const secondFlightDirection: 'x' | 'x-' = mirror ? 'x-' : 'x';

      if(mirror) {
        // Shift to the left by the width of the stair
        currentPositionX -= width;
      } else {
        // Shift to the right by the width of the stair
        currentPositionX += width;
      }

      // **Second Flight** (Perpendicular to the first flight)
      for(let i = 0; i < (stepsInFlights[1] ?? 0); i++) {
        currentElevation += stepHeight;

        const stepOffset = i * stepDepth;
        let positionX: number;
        let positionZ: number;

        if(mirror) {
          // Steps going in the negative X direction
          positionX = currentPositionX - stepOffset;
          positionZ = currentPositionZ;
        } else {
          // Steps going in the positive X direction
          positionX = currentPositionX + stepOffset;
          positionZ = currentPositionZ;
        }

        const step = new Step(
          width,
          stepDepth,
          currentElevation,
          positionX,
          positionZ,
          landingLength,
          secondFlightDirection,
        );
        components.push(step);
      }

      currentPositionZ -= width / 2;
      currentElevation += stepHeight;
      // **Second Landing**
      const landingPositionX = mirror
        ? currentPositionX - ((stepsInFlights[1] ?? 0) - 1) * stepDepth + stepDepth / 2
        : currentPositionX + ((stepsInFlights[1] ?? 0) - 1) * stepDepth - stepDepth / 2;
      const secondLanding = new Landing(
        width,
        landingLen,
        currentElevation,
        landingPositionX,
        currentPositionZ,
        this.params,
        secondFlightDirection,
      );
      components.push(secondLanding);

      // Adjust position after the second landing for the third flight
      if(mirror) {
        currentPositionX = secondLanding.position.x;
        // currentPositionX -= landingLen;
      } else {
        currentPositionX = secondLanding.position.x;
        currentPositionX += landingLen;
      }

      // **Third Flight** (going along -Z)
      currentPositionZ -= stepDepth + stepDepth / 2; // Align with the start of the third flight
      currentPositionX -= width / 2;

      for(let i = 0; i < (stepsInFlights[2] ?? 0); i++) {
        currentElevation += stepHeight;

        const step = new Step(
          width,
          stepDepth,
          currentElevation,
          currentPositionX,
          currentPositionZ,
          landingLength,
          'z-',
        );
        components.push(step);

        currentPositionZ -= stepDepth;
      }
    }

    // **Add Top Landing if requested**
    if(this.params.includeTopLanding) {
      const topLandingLength = this.params.topLandingLength || width;
      // Determine the final position and direction based on the last step
      const lastStep = components.filter(c => c instanceof Step).pop() as Step | undefined;
      let topLandingDirection: 'x' | 'x-' | 'z' | 'z-' = 'z-';
      let topLandingX = currentPositionX;
      let topLandingZ = currentPositionZ;

      if(lastStep) {
        topLandingDirection = lastStep.direction;
        // Adjust position based on the direction of the last flight
        if(topLandingDirection === 'x') {
          topLandingX = lastStep.position.x + stepDepth;
        } else if(topLandingDirection === 'x-') {
          topLandingX = lastStep.position.x - stepDepth;
        } else if(topLandingDirection === 'z') {
          topLandingZ = lastStep.position.z + stepDepth - (stepDepth / 2 + stepDepth / 6);
        } else if(topLandingDirection === 'z-') {
          topLandingZ = lastStep.position.z - stepDepth + (stepDepth / 2 + stepDepth / 6);
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

    // **Generate Supports and Railings** (Same as before)


    if(supportType === 'stringer') {
      // We'll generate a stringer for each location in stringerLocations
      // default to ['left', 'right'] if not provided
      const stepsAndLandings = components.filter(
        c => c instanceof Step || c instanceof Landing || c instanceof TopLanding,
      ) as Array<Step | Landing | TopLanding>;

      const { stringerLocations, stringerType } = this.params;
      const locationsToUse =
      stringerLocations == null // only check for null/undefined
        ? (['left', 'right'] as Array<'left' | 'right' | 'middle'>)
        : stringerLocations;

      locationsToUse.forEach(location => {
        // Pass params so the Stringer can read stringerType
        const stringer = new Stringer(stepsAndLandings, location, {
          ...this.params,
          stringerType: stringerType ?? 'cut', // default to 'cut' if undefined
          stairType: 'u-shaped',
        });
        components.push(stringer);
      });
    }

    // Generate Railings
    if(railingSide !== 'none') {
      const stepsAndLandings = components.filter(
        c => c instanceof Step || c instanceof Landing || c instanceof TopLanding,
      ) as Array<Step | Landing | TopLanding>;
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
