// SpiralStair.ts

import { Stair } from './stair';
import { StairComponent } from './stairComponent';
import { SpiralStep } from '../Components/spiralStep';
import { TopLanding } from '../Components/topLanding';

export class SpiralStair extends Stair {
  protected initialize(): void {
    const { height, stepHeight } = this.params;

    if(height === undefined || stepHeight === undefined) {
      throw new Error('Missing required parameters for spiral stair.');
    }

    // Generate steps
    this.components = this.generateComponents();
  }

  private generateComponents(): StairComponent[] {
    const components: StairComponent[] = [];
    const {
      height,
      stepHeight,
    } = this.params;

    if(
      height === undefined ||
      stepHeight === undefined
    ) {
      throw new Error('Missing required parameters for U-shaped stair.');
    }

    const totalSteps = Math.ceil(height / stepHeight) - 1;
    const anglePerStep = 25 * Math.PI / 180;


    for(let i = 0; i < totalSteps; i++) {
      const angle = i * anglePerStep;
      const elevation = i * stepHeight;
      const step = new SpiralStep(angle, elevation);
      components.push(step);
    }

    // **Add Top Landing if requested**
    if(this.params.includeTopLanding) {
      const topLandingLength = this.params.topLandingLength || (this.params.width || 1);
      // For spiral stairs, place the top landing at the final elevation and angle
      // Use the same positioning logic as spiral steps: centered at origin, only elevated
      const finalAngle = totalSteps * anglePerStep; // This should be the NEXT step position (as if it's the last step)
      const finalElevation = totalSteps * stepHeight;

      // Use the same positioning logic as SpiralStep: centered at origin, only elevated
      const topLanding = new TopLanding(
        this.params.width || 1,
        topLandingLength,
        finalElevation,
        0, // X position at origin like SpiralStep
        0, // Z position at origin like SpiralStep
        this.params,
        'z', // Default direction for spiral top landing
        this.params.topLandingRailingOrientation || 'middle',
      );

      // For spiral stairs, set rotation to follow the spiral progression
      // This will be used by the GLB model rendering (same as SpiralStep logic)
      topLanding.rotation.y = finalAngle;

      components.push(topLanding);
    }

    return components;
  }
}
