// types/regularCeiling.ts
import { BufferGeometry, ExtrudeGeometry, Shape, Vector2 } from 'three';
import { BaseCeiling } from './ceiling';
import { CeilingParameters } from '../ceilingParameters';

export class RegularCeiling extends BaseCeiling {
  private geometry!: BufferGeometry;

  constructor(protected params: CeilingParameters) {
    super(params);

    this.initialize();
  }

  protected initialize(): void {
    this.buildGeometry();
  }

  private buildGeometry(): void {
    const { coords, depth = 5 } = this.params;

    if(!coords || coords.length < 3) {
      throw new Error('Need at least 3 coords for a ceiling shape');
    }

    // Create a 2D shape from the top face coordinates (projected onto the XZ plane)
    const shape = new Shape(coords.map(v => new Vector2(v.x, -v.z)));

    // Extrusion settings
    const extrudeSettings = {
      depth,
      bevelEnabled: false,
    };

    // Generate extruded geometry from the shape
    this.geometry = new ExtrudeGeometry(shape, extrudeSettings);

    // Flip along the Z-axis to correct mirroring
    this.geometry.scale(1, 1, -1);

    // Rotate to align with the Y-axis:
    // Extrude defaults to Z-axis extrusion; rotate it to go down along Y.
    this.geometry.rotateX(-Math.PI / 2);
  }

  public getComponents() {
    return {
      geometry: this.geometry,
      type: 'regular-ceiling-surface',
    };
  }
}
