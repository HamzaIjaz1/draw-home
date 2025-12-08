/* eslint-disable class-methods-use-this */
// stringer.ts

import { Euler, Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';
import { StairParameters } from '../StairParameters';
import { Step } from './step';
import { Landing } from './landing';
import { TopLanding } from './topLanding';

type StringerSegment = {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  isFirstSegment: boolean;
  segmentType?: 'step' | 'landing-center';
};

export class Stringer extends StairComponent {
  // We won't be using these for direct rendering anymore,
  // but we keep them for reference:
  public vertices: Vector3[] = [];
  public indices: number[] = [];

  // Instead we store segments. Each segment is a transform for a 3D model (e.g., a .glb).
  public segments: StringerSegment[] = [];

  // Stair parameters for reference
  public params: StairParameters;

  /**
   * @param components    All steps and landings for the stair
   * @param side          'left' | 'right' | 'middle'
   * @param params        The parameters for the entire stair
   */
  constructor(
    components: Array<Step | Landing | TopLanding>,
    side: 'left' | 'right' | 'middle',
    params: StairParameters,
  ) {
    super();
    this.params = params;
    this.createSegments(components, side, params);
  }

  /**
   * Creates one StringerSegment per Step. If it's the very first step,
   * we mark `isFirstSegment = true` so we can render a special/unique model.
   */
  private createSegments(
    components: Array<Step | Landing | TopLanding>,
    side: 'left' | 'right' | 'middle',
    params: StairParameters,
  ) {
    // Only Steps get stringer pieces
    const steps = components.filter(c => c instanceof Step) as Step[];
    if(steps.length === 0) {
      return;
    }

    // ---- Step Segments (original logic, unchanged) ----
    steps.forEach((step, index) => {
      const isFirst = index === 0 || step.isFirstStep === true;
      const localSide = this.adjustSideForComponent(
        step.direction,
        side,
        params.mirror ?? false,
        params.stairType ?? '',
      );
      const position = step.position.clone();
      const rotation = step.rotation.clone();
      const offset = this.computeSideOffset(localSide, step, params);
      position.add(offset);
      this.segments.push({
        position,
        rotation,
        scale: new Vector3(1, 1, 1),
        isFirstSegment: isFirst,
        segmentType: 'step',
      });
    });

    // ---- Landing Segments: was originally "only if (side === 'middle')" ----
    const landings = components.filter(c => c instanceof Landing || c instanceof TopLanding) as Array<Landing | TopLanding>;
    landings.forEach(landing => {
      // 1) If no stringer is active, do nothing
      const locs = params.stringerLocations ?? [];
      if(locs.length === 0) {
        return;
      } // means all are deactivated

      // 2) Decide which side "owns" the landing-center.
      //    For example: if left is active, let left own it; else right, else middle.
      //    Put whichever order of priority you prefer:
      const priority: Array<'left' | 'right' | 'middle'> = ['left', 'right', 'middle'];

      // pick the first side in priority that is actually turned on
      const chosenSide = priority.find(s => locs.includes(s));

      // If our current side isn't that chosen side, skip to avoid duplications
      if(side !== chosenSide) {
        return;
      }

      // 3) If we reach here, it means:
      //    - At least one stringer is active
      //    - We are the "chosen" side
      // => add the landing-center segment
      const centerPos = landing.position.clone();
      const centerRot = landing.rotation.clone();

      this.segments.push({
        position: centerPos,
        rotation: centerRot,
        scale: new Vector3(1, 1, 1),
        isFirstSegment: false,
        segmentType: 'landing-center',
      });
    });
  }


  /**
   * This function offsets the stringer outward for "closed" stringers
   * or leaves it snug under the step edge for "cut" stringers.
   */
  private computeSideOffset(
    side: 'left' | 'right' | 'middle',
    step: Step,
    params: StairParameters,
  ): Vector3 {
    // For the middle stringer, no sideways offset.
    if(side === 'middle') {
      return new Vector3(0, 0, 0);
    }

    // Pull the user’s choice from params or default to 'cut'
    const stringerType = params.stringerType ?? 'cut';
    const halfWidth = (params.width ?? 1) / 2;

    // We'll define two different offsets: one for 'cut' and one for 'closed'
    // so that 'cut' is not zero but is smaller than 'closed'.
    if(stringerType === 'cut') {
      // A small outward offset (e.g., 1–2 cm) so the cut stringer is still visible,
      // but doesn’t extend as far as a "closed" stringer.
      const cutOffset = -0.04; // tweak as desired
      const shiftAmountOffset = halfWidth + cutOffset;
      let offsetX = 0;
      let offsetZ = 0;

      switch(step.direction) {
        case 'z':
          // offsetX = (side === 'left') ? -shiftAmountOffset : shiftAmountOffset;
          offsetX = (side === 'left') ? shiftAmountOffset : -shiftAmountOffset;
          break;
        case 'z-':
          // offsetX = (side === 'left') ? shiftAmountOffset : -shiftAmountOffset;
          offsetX = (side === 'left') ? -shiftAmountOffset : shiftAmountOffset;
          break;
        case 'x':
          offsetZ = (side === 'left') ? shiftAmountOffset : -shiftAmountOffset;
          break;
        case 'x-':
          offsetZ = (side === 'left') ? -shiftAmountOffset : shiftAmountOffset;
          break;
        default:
          break;
      }
      return new Vector3(offsetX, 0, offsetZ);
    }

    // For "closed" stringers, we do a bigger offset that accounts for half the width:
    // const halfWidth = (params.width ?? 1) / 2;
    const extraGap = 0.02; // a little extra gap for clearance
    const shiftAmount = halfWidth + extraGap;

    let closedOffsetX = 0;
    let closedOffsetZ = 0;

    switch(step.direction) {
      case 'z':
        closedOffsetX = (side === 'left') ? -shiftAmount : shiftAmount;
        break;
      case 'z-':
        closedOffsetX = (side === 'left') ? shiftAmount : -shiftAmount;
        break;
      case 'x':
        closedOffsetZ = (side === 'left') ? shiftAmount : -shiftAmount;
        break;
      case 'x-':
        closedOffsetZ = (side === 'left') ? -shiftAmount : shiftAmount;
        break;
      default:
        break;
    }
    return new Vector3(closedOffsetX, 0, closedOffsetZ);
  }

  /**
   * This helper flips 'left' <-> 'right' if needed for L-shaped or mirrored stairs.
   */
  private adjustSideForComponent(
    direction: 'x' | 'x-' | 'z' | 'z-',
    globalSide: 'left' | 'right' | 'middle',
    mirror: boolean,
    stairType: string,
  ): 'left' | 'right' | 'middle' {
    // If it's the "middle" stringer, no flipping is needed
    if(globalSide === 'middle') {
      return 'middle';
    }

    let side = globalSide;

    // Example: if it's an L-shaped stair and we change direction from z to x,
    // you might swap sides
    if(stairType === 'l-shaped') {
      if(direction === 'x' || direction === 'x-') {
        side = side === 'left' ? 'right' : 'left';
      }
    }

    if(stairType === 'u-shaped') {
      if(direction === 'x' || direction === 'x-') {
        side = side === 'left' ? 'right' : 'left';
      }
    }

    // If the entire stair is mirrored, flip again
    if(mirror) {
      side = side === 'left' ? 'right' : 'left';
    }

    return side;
  }
}
