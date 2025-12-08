/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

// Railing.ts
import { Euler, Vector3 } from 'three';
import { StairComponent } from '../Stairs/stairComponent';
import { StairParameters } from '../StairParameters';
import { Step } from './step';
import { Landing } from './landing';
import { TopLanding } from './topLanding';

type LandingDirection = 'x' | 'x-' | 'z' | 'z-';

/**
 * Our internal type for each segment of the railing:
 * - position/rotation/scale for placing the geometry
 * - type: 'step' or 'corner' or 'fill'
 * - (optional) landingDir: we attach the landing direction to corners so fill bars know how to offset
 */
type RailingSegment = {
  position: Vector3;
  rotation: Euler;
  scale: Vector3;
  isFirstSegment?: boolean;
  type?: 'step' | 'corner' | 'fill';
  landingDir?: LandingDirection;
  isTopLanding?: boolean;
};

export class Railing extends StairComponent {
  private stepDepth: number;
  private components: Array<Step | Landing | TopLanding>;

  public vertices: Vector3[] = [];
  public indices: number[] = [];

  /**
   * This holds everything we need to eventually render the railing parts
   */
  public segments: RailingSegment[] = [];

  constructor(
    components: Array<Step | Landing | TopLanding>,
    side: 'left' | 'right',
    params: StairParameters,
  ) {
    super();

    this.stepDepth = params.stepDepth ?? 0;
    this.components = components;

    // 1) Create step-based railing segments
    this.createSegments(components, side, params);

    // 2) Create corner posts for landings on THIS side
    this.createLandingCornerPosts(components, side);

    // 3) Create fill bars based on side and top landing orientation
    this.createLandingFillBars(side);
  }

  /**
   * STEP RAILING SEGMENTS
   * --------------------
   * Create one railing segment (post) for each Step
   */
  private createSegments(
    components: Array<Step | Landing | TopLanding>,
    side: 'left' | 'right',
    params: StairParameters,
  ) {
    const steps = components.filter(c => c instanceof Step) as Step[];
    steps.forEach((step, index) => {
      const isFirst = index === 0 || step.isFirstStep === true;

      const position = step.position.clone();
      const rotation = step.rotation.clone();

      // Offset for left/right side:
      const offsetVec = this.computeSideOffset(side, step, params);
      position.add(offsetVec);

      this.segments.push({
        position,
        rotation,
        scale: new Vector3(1, 1, 1),
        isFirstSegment: isFirst,
        type: 'step',
      });
    });
  }

  /**
   * CORNER POSTS
   * ------------
   * We place corner posts at each landing corner. We do NOT offset them
   * (so they appear exactly at the landing’s perimeter),
   * but we DO store "landingDir" on them so fill bars can be offset later.
   */
  private createLandingCornerPosts(
    components: Array<Step | Landing | TopLanding>,
    side: 'left' | 'right',
  ) {
    const regularLandings = components.filter(c => c instanceof Landing && !(c instanceof TopLanding)) as Landing[];
    const topLandings = components.filter(c => c instanceof TopLanding) as TopLanding[];

    // Handle regular landings
    regularLandings.forEach(landing => {
      // We do NOT offset corner posts themselves, so we skip local offsets here.
      // But we DO record the landing direction so fill bars can offset themselves.

      if(side === 'right') {
        // "Right" side corner logic
        // We want 4 corners total so the fill-bar code sees sets of 4 corners.
        const cornersLocal = [
          // Right-front corner
          new Vector3(landing.width / 2 - 0.05, 0, landing.width - 0.05),
          // Right-back corner
          new Vector3(-landing.width / 2 + 0.05, 0, landing.width - 0.05),
          // Another right/back corner
          new Vector3(-landing.width / 2 + 0.05, 0, 0.05),
          // "Dummy" corner duplicating the one above
          new Vector3(-landing.width / 2 + 0.05, 0, 0.05),
        ];

        cornersLocal.forEach(localPos => {
          // Rotate into world orientation
          localPos.applyEuler(landing.rotation);
          // Then translate to final position
          localPos.add(landing.position);

          // Store a corner segment with the direction
          this.segments.push({
            position: localPos,
            rotation: landing.rotation.clone(),
            scale: new Vector3(1, 1, 1),
            type: 'corner',
            // Store the direction so fill bars can read it
            landingDir: landing.direction,
            isTopLanding: false,
          });
        });
      } else {
        // "Left" side corner logic
        const cornersLocal = [
          new Vector3(landing.width / 2 - 0.05, 0, 0.05),
        ];

        cornersLocal.forEach(localPos => {
          // Rotate into world orientation
          localPos.applyEuler(landing.rotation);
          // Then translate to final position
          localPos.add(landing.position);

          // Store a corner segment with direction
          this.segments.push({
            position: localPos,
            rotation: landing.rotation.clone(),
            scale: new Vector3(1, 1, 1),
            type: 'corner',
            landingDir: landing.direction,
            isTopLanding: false,
          });
        });
      }
    });

    // Handle top landings
    topLandings.forEach(topLanding => {
      const { railingOrientation } = topLanding;

      // Determine if this side should have corner posts based on orientation
      let shouldCreateCornerPosts = false;

      switch(railingOrientation) {
        case 'outerLeft':
          // Left side gets the corner posts for L-shaped railing
          shouldCreateCornerPosts = side === 'left';
          break;
        case 'outerRight':
          // Right side gets the corner posts for L-shaped railing
          shouldCreateCornerPosts = side === 'right';
          break;
        case 'middle':
          // Both sides get their respective corner posts
          shouldCreateCornerPosts = true;
          break;
        default:
          shouldCreateCornerPosts = false;
          break;
      }

      if(shouldCreateCornerPosts) {
        // For top landings, we create corner posts based on the railing orientation
        const corners = topLanding.getTopLandingCornerPoints();

        // For middle orientation, filter corners based on side
        if(railingOrientation === 'middle') {
          corners.forEach((cornerPos, index) => {
            // Based on the TopLanding implementation for middle orientation:
            // - indices 0,1 are left side corners
            // - indices 2,3 are right side corners
            // However, due to the coordinate system and transformations, the sides appear swapped in UI
            if((index < 2 && side === 'right') || (index >= 2 && side === 'left')) {
              this.segments.push({
                position: cornerPos,
                rotation: topLanding.rotation.clone(),
                scale: new Vector3(1, 1, 1),
                type: 'corner',
                landingDir: topLanding.direction,
                isTopLanding: true,
              });
            }
          });
        } else {
          // For outerLeft and outerRight, create all corners (they're filtered by shouldCreateCornerPosts)
          corners.forEach(cornerPos => {
            this.segments.push({
              position: cornerPos,
              rotation: topLanding.rotation.clone(),
              scale: new Vector3(1, 1, 1),
              type: 'corner',
              landingDir: topLanding.direction,
              isTopLanding: true,
            });
          });
        }
      }
    });
  }

  /**
   * FILL BARS BETWEEN CORNER POSTS
   * ------------------------------
   * We place fill bars based on the side and top landing orientation.
   */
  private createLandingFillBars(side: 'left' | 'right') {
    // Separate regular landing corners from top landing corners
    const regularLandingCorners = this.segments.filter(seg => seg.type === 'corner' && !this.isTopLandingCorner(seg));
    const topLandingCorners = this.segments.filter(seg => seg.type === 'corner' && this.isTopLandingCorner(seg));

    // Handle regular landing fill bars (only on right side for regular landings)
    if(side === 'right') {
      this.createRegularLandingFillBars(regularLandingCorners);
    }

    // Handle top landing fill bars (based on orientation and side)
    this.createTopLandingFillBars(topLandingCorners, side);
  }

  private isTopLandingCorner(segment: RailingSegment): boolean {
    // Check if this corner segment belongs to a top landing
    return segment.type === 'corner' && segment.isTopLanding === true;
  }

  private createRegularLandingFillBars(cornerSegments: RailingSegment[]) {
    if(cornerSegments.length === 0) {
      return;
    }

    const spacing = 0.1;

    // Each set of 4 corners = one landing
    for(let i = 0, landingIndex = 0; i < cornerSegments.length; i += 4, landingIndex++) {
      if(i + 3 >= cornerSegments.length) {
        break;
      }

      // Just a convenience handle
      const c0Seg = cornerSegments[i];
      const c1Seg = cornerSegments[i + 1];
      const c2Seg = cornerSegments[i + 2];
      const c3Seg = cornerSegments[i + 3];

      // We’ll use c0Seg.landingDir for fill-bar offsets (assuming all 4 corners are same landing)

      // Create fill bars between adjacent corners for all regular landings
      if(c0Seg && c1Seg && c2Seg && c3Seg) {
        // First edge: c0→c1
        this.fillBarsAlongEdge(c0Seg.position, c1Seg.position, spacing);
        // Second edge: c1→c2
        this.fillBarsAlongEdge(c1Seg.position, c2Seg.position, spacing);
      }
    }
  }

  /**
   * fillBarsAlongEdge
   * -----------------
   * Connect corners (startPos→endPos) with evenly spaced fill bars.
   * Here, we DO apply a direction-based offset (so the fill bars are "inset" or "outset").
   */
  private fillBarsAlongEdge(
    startPos: Vector3,
    endPos: Vector3,
    spacing: number,
  ) {
    // Shift both startPos + endPos
    const offsetStart = startPos.clone();
    const offsetEnd = endPos.clone();

    // Figure out the spacing
    const edgeVector = offsetEnd.clone().sub(offsetStart);
    const distance = edgeVector.length();
    if(distance < spacing) {
      return;
    }

    const direction = edgeVector.normalize();

    // Place fill bars with spacing, skipping the immediate corner
    for(let d = spacing; d < distance; d += spacing) {
      const fillPos = offsetStart.clone().add(direction.clone().multiplyScalar(d));
      const fillRot = new Euler(0, 0, 0);

      this.segments.push({
        position: fillPos,
        rotation: fillRot,
        scale: new Vector3(1, 1, 1),
        type: 'fill',
      });
    }
  }

  private createTopLandingFillBars(cornerSegments: RailingSegment[], side: 'left' | 'right') {
    // Get the actual TopLanding instances from the components
    const topLandings = this.components.filter(c => c instanceof TopLanding) as TopLanding[];

    if(topLandings.length === 0) {
      return;
    }

    const spacing = 0.1;

    // For each top landing, create fill bars based on orientation and side
    topLandings.forEach(topLanding => {
      const { railingOrientation } = topLanding;

      // Determine which edges this side should handle based on orientation
      let shouldCreateFillBars = false;

      switch(railingOrientation) {
        case 'outerLeft':
          // Left side gets the L-shaped railing (left + back edges)
          shouldCreateFillBars = side === 'left';
          break;
        case 'outerRight':
          // Right side gets the L-shaped railing (right + back edges)
          shouldCreateFillBars = side === 'right';
          break;
        case 'middle':
          // Both sides get their respective edges (left side gets left edge, right side gets right edge)
          shouldCreateFillBars = true;
          break;
        default:
          shouldCreateFillBars = false;
          break;
      }

      if(shouldCreateFillBars) {
        // Get the fill edges for this orientation
        const fillEdges = topLanding.getTopLandingFillEdges();

        // For middle orientation, we need to filter edges based on side
        if(railingOrientation === 'middle') {
          // In middle orientation, getTopLandingFillEdges returns two edges: left and right
          // We need to determine which edge corresponds to which side
          fillEdges.forEach((edge, index) => {
            // Based on the TopLanding implementation:
            // - index 0 is the left edge (from left-front to left-back)
            // - index 1 is the right edge (from right-front to right-back)
            // However, due to the coordinate system and transformations, the sides appear swapped in UI
            if((index === 0 && side === 'right') || (index === 1 && side === 'left')) {
              this.fillBarsAlongEdge(edge.start, edge.end, spacing);
            }
          });
        } else {
          // For outerLeft and outerRight, create all edges (they're filtered by shouldCreateFillBars)
          fillEdges.forEach(edge => {
            this.fillBarsAlongEdge(edge.start, edge.end, spacing);
          });
        }
      }
    });
  }

  /**
   * computeSideOffset
   * -----------------
   * Offsets each step railing post either "left" or "right," depending on step direction.
   * This is unchanged from your code, just posted for completeness.
   */
  private computeSideOffset(
    side: 'left' | 'right',
    step: Step,
    params: StairParameters,
  ): Vector3 {
    const stringerType = params.stringerType ?? 'cut';
    const halfWidth = (params.width ?? 1) / 2;

    if(stringerType === 'cut') {
      const cutOffset = -0.05;
      const shiftAmountOffset = halfWidth + cutOffset;
      let offsetX = 0;
      let offsetZ = 0;

      switch(step.direction) {
        case 'z':
          offsetX = side === 'left' ? shiftAmountOffset : -shiftAmountOffset;
          break;
        case 'z-':
          offsetX = side === 'left' ? -shiftAmountOffset : shiftAmountOffset;
          break;
        case 'x':
          offsetZ = side === 'left' ? -shiftAmountOffset : shiftAmountOffset;
          break;
        case 'x-':
          offsetZ = side === 'left' ? shiftAmountOffset : -shiftAmountOffset;
          break;
        default:
          break;
      }
      return new Vector3(offsetX, 0, offsetZ);
    }

    // "closed" stringer case
    const extraGap = 0.02;
    const shiftAmount = halfWidth + extraGap;
    let closedOffsetX = 0;
    let closedOffsetZ = 0;

    switch(step.direction) {
      case 'z':
        closedOffsetX = side === 'left' ? -shiftAmount : shiftAmount;
        break;
      case 'z-':
        closedOffsetX = side === 'left' ? shiftAmount : -shiftAmount;
        break;
      case 'x':
        closedOffsetZ = side === 'left' ? shiftAmount : -shiftAmount;
        break;
      case 'x-':
        closedOffsetZ = side === 'left' ? -shiftAmount : shiftAmount;
        break;
      default:
        break;
    }
    return new Vector3(closedOffsetX, 0, closedOffsetZ);
  }
}
