// CurvedStair.ts

import { Stair } from './stair';
import { StairComponent } from './stairComponent';
import { TopLanding } from '../Components/topLanding';

export class CurvedStair extends Stair {
  protected initialize(): void {
    // Generate steps
    this.components = this.generateComponents();
  }

  private generateComponents(): StairComponent[] {
    // Use this.params or other instance properties to generate components
    const components: StairComponent[] = [];

    // Basic curved stair generation logic would go here
    // For now, returning empty array as placeholder

    // **Add Top Landing if requested**
    if(this.params.includeTopLanding) {
      const topLandingLength = this.params.topLandingLength || (this.params.width || 1);
      const width = this.params.width || 1;
      const height = this.params.height || 3;

      // For curved stairs, place the top landing at the final elevation
      // Position would depend on the curve's end point
      const topLanding = new TopLanding(
        width,
        topLandingLength,
        height,
        0, // X position - adjust based on curve geometry
        0, // Z position - adjust based on curve geometry
        this.params,
        'z', // Default direction for curved top landing
        this.params.topLandingRailingOrientation || 'middle',
      );
      components.push(topLanding);
    }

    return components;
  }
}
