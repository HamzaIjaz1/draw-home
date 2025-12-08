import { ExtrudeGeometry, Shape, Vector2 } from 'three';
import { BaseCeiling } from './ceiling';

export class ChatedralCeiling extends BaseCeiling {
  private geometry!: ExtrudeGeometry;

  protected initialize(): void {
    this.buildGeometry();
  }

  private buildGeometry(): void {
    const { coords, depth = 5 } = this.params;

    if(!coords || coords.length < 3) {
      throw new Error('At least 3 coords are required for a chatedral ceiling');
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
        type: 'chatedral-ceiling-surface',
      },
    ];
  }
}
