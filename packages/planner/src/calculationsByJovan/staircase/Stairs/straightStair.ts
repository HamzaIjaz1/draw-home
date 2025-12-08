/* eslint-disable max-len */
// straightStair.ts

import { Stair } from './stair';
import { StairComponent } from './stairComponent';
import { Step } from '../Components/step';
import { Landing } from '../Components/landing';
import { TopLanding } from '../Components/topLanding';
import { Railing } from '../Components/railing';
import { Stringer } from '../Components/stringer';
import { CentralBeam } from '../Components/CentralBeam';
import { BoxSupport } from '../Components/BoxSupport';

export class StraightStair extends Stair {
  protected initialize(): void {
    const { width, height, stepHeight, stepDepth } = this.params;
    if(
      width === undefined ||
      height === undefined ||
      stepHeight === undefined ||
      stepDepth === undefined
    ) {
      throw new Error('Missing required parameters for straight stair.');
    }

    // Generate steps and landings
    this.components = this.generateComponents();
  }

  private generateComponents(): StairComponent[] {
    const components: StairComponent[] = [];

    const {
      width,
      stepHeight,
      stepDepth,
      height,
      landingPosition,
      numberOfLandings,
      landingLength,
      landings,
      supportType,
      railingSide,
    } = this.params;

    if(!height || !stepHeight || !width || !stepDepth) {
      throw new Error('Height, stepHeight, width, and stepDepth must be defined');
    }
    const totalSteps = Math.ceil(height / stepHeight);
    let currentElevation = 0;
    let currentPositionZ = 0;
    const currentPositionX = 0;

    // Prepare landing steps and lengths based on landingPosition
    let landingSteps: number[] = [];
    let landingLengthsArray: number[] = [];

    if(landingPosition === 'symmetric') {
      const numLandings = numberOfLandings || 1;
      const totalSegments = numLandings + 1;
      const baseStepsPerSegment = Math.floor(totalSteps / totalSegments);
      const remainderSteps = totalSteps % totalSegments;


      // Distribute remainder steps to the first few segments
      const stepsPerSegmentArray = Array(totalSegments).fill(baseStepsPerSegment);
      for(let i = 0; i < remainderSteps; i++) {
        stepsPerSegmentArray[i]++;
      }

      // Accumulate steps to determine landing steps
      landingSteps = [];
      let accumulatedSteps = stepsPerSegmentArray[0];
      for(let i = 1; i < totalSegments; i++) {
        landingSteps.push(accumulatedSteps);
        accumulatedSteps += stepsPerSegmentArray[i];
      }

      // Use landingLength if provided, otherwise default to width
      const defaultLandingLength = landingLength || width;
      landingLengthsArray = Array(numLandings).fill(defaultLandingLength);
    } else if(landingPosition === 'custom' && landings?.stepsAfter && landings.lengths) {
      landingSteps = landings.stepsAfter;
      landingLengthsArray = landings.lengths;
    } else {
      // No landings
      landingSteps = [];
      landingLengthsArray = [];
    }

    if(landingSteps.length !== landingLengthsArray.length) {
      throw new Error('The length of landing steps and landing lengths must be equal.');
    }

    // Sort landings by stepsAfter to ensure correct order
    const sortedLandings = landingSteps
      .map((step, index) => ({
        stepAfter: step,
        length: landingLengthsArray[index],
      }))
      .sort((a, b) => a.stepAfter - b.stepAfter);

    let stepsCreated = 0;
    let landingCount = 0;

    while(stepsCreated < totalSteps) {
      // Check if we need to insert a landing
      if(
        landingCount < sortedLandings.length &&
        stepsCreated === sortedLandings[landingCount]?.stepAfter
      ) {
        // **Landing**
        const landingLen = sortedLandings[landingCount]?.length;
        if(!landingLen) {
          throw new Error(`Landing length is undefined at index ${landingCount}`);
        }
        const landing = new Landing(
          width,
          landingLen,
          currentElevation,
          currentPositionX, // positionX
          currentPositionZ, // positionZ
          this.params,
          'z', // direction
        );
        components.push(landing);

        currentPositionZ += landingLen;
        currentElevation += stepHeight; // Fixed line: Increase elevation after landing
        landingCount++;
      } else {
        // **Step**
        const step = new Step(
          width,
          stepDepth,
          currentElevation,
          currentPositionX, // positionX
          currentPositionZ, // positionZ
          landingLength,
          'z', // direction
        );
        // Set isFirstStep flag for the first step(s)
        if(stepsCreated === 0) {
          step.isFirstStep = true;
        }
        components.push(step);

        currentElevation += stepHeight;
        currentPositionZ += stepDepth;
        stepsCreated++;
      }
    }

    // **Add Top Landing if requested**
    if(this.params.includeTopLanding) {
      const topLandingLength = this.params.topLandingLength || width;

      // Calculate the landing position with the necessary offset
      const topLandingX = currentPositionX;
      const topLandingZ = currentPositionZ - (stepDepth / 2 + stepDepth / 6); // Adjust Z position for proper landing placement
      const topLandingElevation = currentElevation; // currentElevation is already one step higher than the last step

      const topLanding = new TopLanding(
        width,
        topLandingLength,
        topLandingElevation,
        topLandingX,
        topLandingZ,
        this.params,
        'z',
        this.params.topLandingRailingOrientation || 'middle',
      );
      components.push(topLanding);
    }

    // **Generate Supports**
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
        // pass params so the Stringer can read stringerType
        const stringer = new Stringer(stepsAndLandings, location, {
          ...this.params,
          stringerType: stringerType ?? 'cut', // or 'closed'
        });
        components.push(stringer);
      });
    } else if(supportType === 'beam') {
      // Generate a central beam supporting the stairs
      const stepsAndLandings = components.filter(c => c instanceof Step || c instanceof Landing || c instanceof TopLanding) as Array<Step | Landing | TopLanding>;
      const beam = new CentralBeam(stepsAndLandings, this.params);
      components.push(beam);
    } else if(supportType === 'box') {
      // Generate box supports for each step and landing
      components.forEach(component => {
        if(component instanceof Step || component instanceof Landing || component instanceof TopLanding) {
          const boxSupportLeft = new BoxSupport(component.vertices, 'left');
          const boxSupportRight = new BoxSupport(component.vertices, 'right');
          components.push(boxSupportLeft, boxSupportRight);
        }
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
