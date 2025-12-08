import { BufferAttribute, BufferGeometry, Float32BufferAttribute, Mesh, ShapeUtils, Vector2, Vector3 } from 'three';
import { getNotUndefined, isArrayLength, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { CSG } from 'three-csg-ts';
import { getGlobalBoundingBox, toVector2 } from './helpers';
import { makeSpaceGeometries } from './makeSpaceGeometries';

export const diffThickness = 0.0001;

export const buildSolidSingleMaterial = (roofPart: [Vector3, Vector3, Vector3, ...Vector3[]], scale: number): BufferGeometry => {
  const a = roofPart[0];
  const b = roofPart[1];
  const c = roofPart[2];
  const ab = new Vector3().subVectors(b, a);
  const ac = new Vector3().subVectors(c, a);
  const n = new Vector3().crossVectors(ab, ac).normalize();

  let u = ab.clone().normalize();
  if(u.lengthSq() < 1e-6) {
    u = new Vector3(1, 0, 0);
  }
  const v = new Vector3().crossVectors(n, u).normalize();

  const pts2D = roofPart.map(e => {
    const rel = new Vector3().subVectors(e, a);

    return new Vector2(rel.dot(u), rel.dot(v));
  });

  const roofPartAdjusted = !ShapeUtils.isClockWise(pts2D) ? roofPart : (() => {
    const reversed = roofPart.toReversed();
    assert(isArrayLength(reversed, '>=', 3), 'This should never happen. |c335l5|');

    return reversed;
  })();
  const pts2DAdjusted = ShapeUtils.isClockWise(pts2D) ? pts2D.toReversed() : pts2D;
  const triangles = ShapeUtils.triangulateShape(pts2DAdjusted, []);

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const addVertex = (p: Vector3, uv: Vector2) => {
    positions.push(p.x, p.y, p.z);
    uvs.push(uv.x / scale, uv.y / scale);
  };

  // bottom face
  const baseIndexBottom = positions.length / 3;
  for(const tri of triangles) {
    for(const idx of tri) {
      if(!isUndefined(roofPartAdjusted[idx]) && !isUndefined(pts2DAdjusted[idx])) {
        addVertex(roofPartAdjusted[idx], pts2DAdjusted[idx]);
      }
    }
  }
  for(let i = 0; i < triangles.length; i++) {
    indices.push(baseIndexBottom + i * 3, baseIndexBottom + i * 3 + 1, baseIndexBottom + i * 3 + 2);
  }

  // top face
  const offset = new Vector3(0, diffThickness, 0);
  const baseIndexTop = positions.length / 3;
  for(const tri of triangles) {
    for(const idx of tri.toReversed()) {
      if(!isUndefined(roofPartAdjusted[idx]) && !isUndefined(pts2DAdjusted[idx])) {
        const p = roofPartAdjusted[idx].clone().add(offset);
        addVertex(p, pts2DAdjusted[idx]);
      }
    }
  }
  for(let i = 0; i < triangles.length; i++) {
    indices.push(baseIndexTop + i * 3, baseIndexTop + i * 3 + 1, baseIndexTop + i * 3 + 2);
  }

  // sides
  const len = roofPartAdjusted.length;
  for(let i = 0; i < len; i++) {
    const j = (i + 1) % len;
    const p1 = roofPartAdjusted[i];
    const p2 = roofPartAdjusted[j];
    if(isUndefined(p1) || isUndefined(p2)) {
      continue;
    }
    const p3 = p2.clone().add(offset);
    const p4 = p1.clone().add(offset);

    const base = positions.length / 3;

    positions.push(p1.x, p1.y, p1.z);
    positions.push(p2.x, p2.y, p2.z);
    positions.push(p3.x, p3.y, p3.z);
    positions.push(p4.x, p4.y, p4.z);

    const edgeLen = p1.distanceTo(p2) / scale;
    const h = diffThickness / scale;

    uvs.push(0, 0);
    uvs.push(edgeLen, 0);
    uvs.push(edgeLen, h);
    uvs.push(0, h);

    indices.push(base, base + 1, base + 2);
    indices.push(base, base + 2, base + 3);
  }

  const geom = new BufferGeometry();
  geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geom.setAttribute('uv2', new Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
};

export const buildEdgeSolid = (
  p1: Vector3,
  p2: Vector3,
  thickness: number,
  scale: number,
  isClockwiseXZ: boolean,
): BufferGeometry => {
  const p3 = p2.clone().add(new Vector3(0, thickness, 0));
  const p4 = p1.clone().add(new Vector3(0, thickness, 0));

  const edgeDir = new Vector3().subVectors(p2, p1).normalize();
  const up = new Vector3(0, 1, 0);

  const outward = (
    isClockwiseXZ
      ? new Vector3().crossVectors(up, edgeDir)
      : new Vector3().crossVectors(edgeDir, up)
  ).normalize().multiplyScalar(diffThickness);

  const q1 = p1.clone().add(outward);
  const q2 = p2.clone().add(outward);
  const q3 = p3.clone().add(outward);
  const q4 = p4.clone().add(outward);

  const vertices = [p1, p2, q2, q1, p4, p3, q3, q4];
  const positions = new Float32Array(vertices.flatMap(e => e.toArray()));

  const indices = [
    0, 1, 2, 0, 2, 3, // top
    4, 6, 5, 4, 7, 6, // bottom
    0, 4, 5, 0, 5, 1, // side 1
    1, 5, 6, 1, 6, 2, // side 2
    2, 6, 7, 2, 7, 3, // side 3
    3, 7, 4, 3, 4, 0, // side 4
  ];

  // UV
  const edgeLen = p1.distanceTo(p2) / scale;
  const h = thickness / scale;
  const uvs = new Float32Array([
    0, 0, edgeLen, 0, edgeLen, 0, 0, 0,
    0, h, edgeLen, h, edgeLen, h, 0, h,
  ]);

  const geom = new BufferGeometry();
  geom.setAttribute('position', new BufferAttribute(positions, 3));
  geom.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  geom.setAttribute('uv2', new Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  return geom;
};

export const getUniqueRoofPartPairs = (roofParts: Array<[Vector3, Vector3, Vector3, ...Vector3[]]>) => (
  roofParts.flatMap(roofPart => {
    const isClockWise = ShapeUtils.isClockWise(roofPart.map(toVector2));

    return roofPart.map((endPoint, i, arr) => {
      const startPoint = getNotUndefined(arr.at(i - 1), 'This should never happen. |9ai049|');

      return {
        startPoint,
        endPoint,
        isClockWise,
      };
    });
  })
    .filter((e1, i, arr) => (
      arr.reduce((acc, e2) => acc + Number(
        false
          || e1.startPoint.equals(e2.startPoint) && e1.endPoint.equals(e2.endPoint)
          || e1.startPoint.equals(e2.endPoint) && e1.endPoint.equals(e2.startPoint),
      ), 0) === 1
    ))
);

export const makeRoofGeometries = ({ diff, geometries, spaceGeometries, elevation }: {
  diff: number;
  geometries: BufferGeometry[];
  spaceGeometries: ReturnType<typeof makeSpaceGeometries>;
  elevation: number;
}) => (
  geometries.map(e => {
    const mesh = new Mesh(e);
    const boundingBox = getGlobalBoundingBox(mesh);

    const { geometry } = spaceGeometries.reduce((acc, cur) => {
      const mesh = new Mesh(cur.geometry);
      mesh.position.setY(cur.elevation - elevation + diff);
      mesh.updateMatrix();

      const { min, max } = getGlobalBoundingBox(mesh);

      return (
        true
          && boundingBox.min.x < max.x && min.x < boundingBox.max.x
          && boundingBox.min.y < max.y && min.y < boundingBox.max.y
          && boundingBox.min.z < max.z && min.z < boundingBox.max.z
          ? CSG.subtract(acc, mesh)
          : acc
      );
    }, mesh);

    return { geometry };
  })
);
