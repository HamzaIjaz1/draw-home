/* eslint-disable no-param-reassign */
import { BufferGeometry, ExtrudeGeometry, Path, Shape, Vector2 } from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { BaseCeiling } from './ceiling';
import { CeilingParameters } from '../ceilingParameters';
import { offsetPolygon } from '../../Utils/Curve/utils';

/**
 * Helper function that sets all faces of geometry to material index 0 (red),
 * then re-assigns only the "bottom" faces to material index 1 (blue).
 *
 * After rotating geometry by Math.PI / 2 around X, the bottom surface tends
 * to have normals ~ +Y. (Adjust threshold/orientation if needed.)
 */
function assignBottomFaceBlue(geometry: BufferGeometry, threshold = 0.8) {
  geometry = BufferGeometryUtils.mergeVertices(geometry);
  geometry.clearGroups();

  const indexCount = geometry.index?.count ?? 0;
  // By default, everything gets material index = 0 (red).
  geometry.addGroup(0, indexCount, 0);

  if(!geometry.index || !geometry.attributes.normal) {
    return geometry;
  }

  const indexAttr = geometry.index;
  const normalAttr = geometry.attributes.normal;
  const faceCount = indexAttr.count / 3;

  for(let f = 0; f < faceCount; f++) {
    const i1 = indexAttr.getX(f * 3 + 0);
    const i2 = indexAttr.getX(f * 3 + 1);
    const i3 = indexAttr.getX(f * 3 + 2);

    const n1y = normalAttr.getY(i1);
    const n2y = normalAttr.getY(i2);
    const n3y = normalAttr.getY(i3);

    // If all 3 corners have a Y normal < -threshold -> consider it "bottom"
    if(n1y < -threshold && n2y < -threshold && n3y < -threshold) {
      geometry.addGroup(f * 3, 3, 1);
    }
  }

  return geometry.clone();
}


export class CofferedCeiling extends BaseCeiling {
  private geometries: ExtrudeGeometry[] = [];

  constructor(protected params: CeilingParameters) {
    super(params);
    this.initialize();
  }

  protected initialize(): void {
    this.buildGeometry();
  }

  private buildGeometry(): void {
    const {
      coords,
      depth = 0, // Outer extrude depth
      offsetValue = 0.3, // Inset distance
      depthDropped = 0, // Inner extrude depth
    } = this.params;

    if(!coords || coords.length < 3) {
      throw new Error('At least 3 coords are required for a dropped ceiling');
    }

    // Convert coords to 2D points
    const outerPoints = coords.map(v => new Vector2(v.x, v.z));

    // Inset the polygon
    const innerPoints = offsetPolygon(outerPoints, -offsetValue);

    // 1) Outer ring (with a hole)
    const ringShape = new Shape(outerPoints);
    ringShape.holes.push(new Path(innerPoints));
    const ringGeom = new ExtrudeGeometry(ringShape, {
      depth,
      bevelEnabled: false,
    });
    ringGeom.rotateX(Math.PI / 2);
    ringGeom.computeVertexNormals();
    // Outer ring uses fully red material by default

    // 2) Dropped inset shape
    const innerShape = new Shape(innerPoints);
    const droppedGeom = new ExtrudeGeometry(innerShape, {
      depth: depthDropped,
      bevelEnabled: false,
    });
    droppedGeom.rotateX(Math.PI / 2);
    droppedGeom.computeVertexNormals();

    // Assign bottom face blue, rest red
    const modifiedGeom = assignBottomFaceBlue(droppedGeom);

    this.geometries = [ringGeom, modifiedGeom as ExtrudeGeometry];
  }

  public getComponents() {
    return [
      {
        geometry: this.geometries[0], // Outer ring
        type: 'dropped-ceiling-surface-outer',
      },
      {
        geometry: this.geometries[1], // Inner dropped portion
        type: 'dropped-ceiling-surface-inner',
      },
    ];
  }
}
