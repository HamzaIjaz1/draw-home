/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtrudeGeometry, Shape, Vector2 } from 'three';
import { BaseCeiling } from './ceiling';

export class BeamCeiling extends BaseCeiling {
  private geometry!: ExtrudeGeometry;

  protected initialize(): void {
    this.buildGeometry();
  }

  private buildGeometry(): void {
    const {
      coords,
      depth = 5,
      beamUcount = 2,
      beamUwidth = 0.2,
      beamUheght = 0.3,
      beamVcount = 2,
      beamVwidth = 0.2,
      beamVheight = 0.3,
    } = this.params;

    if(!coords || coords.length < 3) {
      throw new Error('At least 3 coords are required for a beam ceiling');
    }

    const shapePoints = coords.map(v => new Vector2(v.x, v.y));
    const shape = new Shape(shapePoints);

    const extrudeSettings = {
      steps: 1,
      depth,
      bevelEnabled: false,
    };

    this.geometry = new ExtrudeGeometry(shape, extrudeSettings);
    this.geometry.rotateX(Math.PI / 2);
    this.geometry.computeVertexNormals();
  }

  public getComponents() {
    return [
      {
        geometry: this.geometry,
        type: 'beam-ceiling-surface',
      },
    ];
  }
}
