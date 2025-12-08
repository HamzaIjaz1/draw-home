import { useCallback, useEffect, useMemo } from 'react';
import { BufferAttribute, BufferGeometry, Float32BufferAttribute, Mesh, ShapeUtils, Vector2, Vector3 } from 'three';
import { getNotUndefined, isArrayLength, isNull, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { CSG } from 'three-csg-ts';
import { RoofDormerId } from '@draw-house/common/dist/brands';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { RoofParts } from '../../calculationsByJovan/types';
import { getGlobalBoundingBox, toVector2 } from '../../utils';
import { buildEdgeSolid, buildSolidSingleMaterial, diffThickness, getUniqueRoofPartPairs } from '../../utils/solidRoofGeometryUtils';
import { RoofsStore } from '../../zustand/useRoofs';
import { useTextures } from '../../customHooks';
import { DEFAULT_TEXTURE_TRANSFORM } from '../../zod/TextureTransform';
import { makeSpaceGeometries } from '../../utils/makeSpaceGeometries';
import { useLevels, useSpaces, useWalls } from '../../zustand';
import { clearDormerRoofWallSubtraction, setDormerRoofWallSubtraction } from '../../zustand/useDormerRoofsWallSubtraction';

export type RealRoofDormerProps = {
  dormerBodyParts: RoofParts;
  elevation: number;
  opacity: number;
  color?: string;
  dormerRoofId?: RoofDormerId | null;
  thickness?: RoofsStore['roofs'][number]['roofData']['thickness'];
  topTexture?: RoofsStore['roofs'][number]['roofData']['topTexture'];
  bottomTexture?: RoofsStore['roofs'][number]['roofData']['bottomTexture'];
  edgeTexture?: RoofsStore['roofs'][number]['roofData']['edgeTexture'];
  topColorOverlay?: RoofsStore['roofs'][number]['roofData']['topColorOverlay'];
  bottomColorOverlay?: RoofsStore['roofs'][number]['roofData']['bottomColorOverlay'];
  edgeColorOverlay?: RoofsStore['roofs'][number]['roofData']['edgeColorOverlay'];
  topCompositeOperation?: RoofsStore['roofs'][number]['roofData']['topCompositeOperation'];
  bottomCompositeOperation?: RoofsStore['roofs'][number]['roofData']['bottomCompositeOperation'];
  edgeCompositeOperation?: RoofsStore['roofs'][number]['roofData']['edgeCompositeOperation'];
  topTextureTransform?: RoofsStore['roofs'][number]['roofData']['topTextureTransform'];
  bottomTextureTransform?: RoofsStore['roofs'][number]['roofData']['bottomTextureTransform'];
  edgeTextureTransform?: RoofsStore['roofs'][number]['roofData']['edgeTextureTransform'];
};

const RealRoofDormerAdvanced: React.FC<{
  dormerBodyParts: RoofParts;
  elevation: number;
  opacity: number;
  thickness: RoofsStore['roofs'][number]['roofData']['thickness'];
  topTexture: RoofsStore['roofs'][number]['roofData']['topTexture'];
  bottomTexture: RoofsStore['roofs'][number]['roofData']['bottomTexture'];
  edgeTexture: RoofsStore['roofs'][number]['roofData']['edgeTexture'];
  topColorOverlay?: RoofsStore['roofs'][number]['roofData']['topColorOverlay'];
  bottomColorOverlay?: RoofsStore['roofs'][number]['roofData']['bottomColorOverlay'];
  edgeColorOverlay?: RoofsStore['roofs'][number]['roofData']['edgeColorOverlay'];
  topCompositeOperation?: RoofsStore['roofs'][number]['roofData']['topCompositeOperation'];
  bottomCompositeOperation?: RoofsStore['roofs'][number]['roofData']['bottomCompositeOperation'];
  edgeCompositeOperation?: RoofsStore['roofs'][number]['roofData']['edgeCompositeOperation'];
  topTextureTransform?: RoofsStore['roofs'][number]['roofData']['topTextureTransform'];
  bottomTextureTransform?: RoofsStore['roofs'][number]['roofData']['bottomTextureTransform'];
  edgeTextureTransform?: RoofsStore['roofs'][number]['roofData']['edgeTextureTransform'];
  dormerRoofId?: RoofDormerId | null;
}> = ({
  dormerBodyParts,
  elevation,
  opacity,
  thickness,
  topTexture,
  bottomTexture,
  edgeTexture,
  topColorOverlay,
  bottomColorOverlay,
  edgeColorOverlay,
  topCompositeOperation,
  bottomCompositeOperation,
  edgeCompositeOperation,
  topTextureTransform,
  bottomTextureTransform,
  edgeTextureTransform,
  dormerRoofId,
}) => {
  const { spaces } = useSpaces();
  const { walls } = useWalls();
  const { levels } = useLevels();

  const topXf = topTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const bottomXf = bottomTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const edgeXf = edgeTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;

  const topRepeat = useMemo(() => ({
    x: 1 / topTexture.attributes.scale / Math.max(0.01, topXf.wScale),
    y: -1 / topTexture.attributes.scale / Math.max(0.01, topXf.lScale),
  }), [topTexture.attributes.scale, topXf.lScale, topXf.wScale]);

  const bottomRepeat = useMemo(() => ({
    x: 1 / bottomTexture.attributes.scale / Math.max(0.01, bottomXf.wScale),
    y: -1 / bottomTexture.attributes.scale / Math.max(0.01, bottomXf.lScale),
  }), [bottomTexture.attributes.scale, bottomXf.lScale, bottomXf.wScale]);

  const edgeRepeat = useMemo(() => ({
    x: 1 / edgeTexture.attributes.scale / Math.max(0.01, edgeXf.wScale),
    y: -1 / edgeTexture.attributes.scale / Math.max(0.01, edgeXf.lScale),
  }), [edgeTexture.attributes.scale, edgeXf.lScale, edgeXf.wScale]);

  const topMapProps = useTextures(
    topTexture.attributes.maps,
    useCallback(e => {
      e.center.set(0.5, 0.5);
      e.repeat.set(topRepeat.x, topRepeat.y);
      e.rotation = topXf.rotateDeg * Math.PI / 180;
    }, [topRepeat.x, topRepeat.y, topXf.rotateDeg]),
    {
      overlayColor: topColorOverlay?.value ?? null,
      compositeOperation: topCompositeOperation ?? 'source-over',
    },
  );

  const bottomMapProps = useTextures(
    bottomTexture.attributes.maps,
    useCallback(e => {
      e.center.set(0.5, 0.5);
      e.repeat.set(bottomRepeat.x, bottomRepeat.y);
      e.rotation = bottomXf.rotateDeg * Math.PI / 180;
    }, [bottomRepeat.x, bottomRepeat.y, bottomXf.rotateDeg]),
    {
      overlayColor: bottomColorOverlay?.value ?? null,
      compositeOperation: bottomCompositeOperation ?? 'source-over',
    },
  );

  const edgeMapProps = useTextures(
    edgeTexture.attributes.maps,
    useCallback(e => {
      e.center.set(0.5, 0.5);
      e.repeat.set(edgeRepeat.x, edgeRepeat.y);
      e.rotation = edgeXf.rotateDeg * Math.PI / 180;
    }, [edgeRepeat.x, edgeRepeat.y, edgeXf.rotateDeg]),
    {
      overlayColor: edgeColorOverlay?.value ?? null,
      compositeOperation: edgeCompositeOperation ?? 'source-over',
    },
  );

  const { topGeometries, bottomGeometries, edgeGeometries } = useMemo(() => {
    const roofParts: Array<[Vector3, Vector3, Vector3, ...Vector3[]]> = [];
    for(const part of dormerBodyParts) {
      if(part.length >= 3) {
        const typedPart = part as [Vector3, Vector3, Vector3, ...Vector3[]];
        roofParts.push(typedPart);
      }
    }

    if(roofParts.length === 0) {
      return { topGeometries: [], bottomGeometries: [], edgeGeometries: [] };
    }

    const scale = topTexture.attributes.scale;

    // Note: We need a dummy roofId since makeSpaceGeometries requires it, but we're filtering by dormerRoofId
    const spaceGeometries = !isUndefined(dormerRoofId) && !isNull(dormerRoofId)
      ? makeSpaceGeometries({
        roofId: '' as any, // Not used when dormerRoofId is provided
        dormerRoofId,
        spaces,
        walls,
        levels,
      })
      : [];

    // Build top geometries (facing up)
    const topGeos = roofParts.map(roofPart => {
      const geom = buildSolidSingleMaterial(roofPart, scale);
      const positions = geom.getAttribute('position').array as Float32Array;

      // Shift positions by elevation and thickness
      for(let i = 0; i < positions.length; i += 3) {
        const yIndex = i + 1;
        if(yIndex < positions.length) {
          positions[yIndex] = (positions[yIndex] ?? 0) + elevation + thickness - diffThickness;
        }
      }

      geom.getAttribute('position').needsUpdate = true;
      geom.computeBoundingBox();
      geom.computeBoundingSphere();

      // Apply space cutting if dormerRoofId is provided
      let finalGeom = geom;
      if(spaceGeometries.length > 0) {
        const mesh = new Mesh(geom);
        const boundingBox = getGlobalBoundingBox(mesh);

        const { geometry: cutGeom } = spaceGeometries.reduce((acc, cur) => {
          const spaceMesh = new Mesh(cur.geometry);
          spaceMesh.position.setY(cur.elevation - elevation - thickness + diffThickness);
          spaceMesh.updateMatrix();

          const { min, max } = getGlobalBoundingBox(spaceMesh);

          return (
            true
              && boundingBox.min.x < max.x && min.x < boundingBox.max.x
              && boundingBox.min.y < max.y && min.y < boundingBox.max.y
              && boundingBox.min.z < max.z && min.z < boundingBox.max.z
              ? CSG.subtract(acc, spaceMesh)
              : acc
          );
        }, mesh);

        finalGeom = cutGeom;
        geom.dispose(); // Dispose original geometry
      }

      return { geometry: finalGeom };
    });

    // Build bottom geometries (facing down)
    const bottomGeos = roofParts.map(roofPart => {
      // Reverse winding order for bottom face
      const reversed = roofPart.toReversed();
      assert(isArrayLength(reversed, '>=', 3), 'This should never happen. |drm_btm|');

      const geom = buildSolidSingleMaterial(reversed as [Vector3, Vector3, Vector3, ...Vector3[]], scale);
      const positions = geom.getAttribute('position').array as Float32Array;

      // Shift positions by elevation only (bottom surface)
      for(let i = 0; i < positions.length; i += 3) {
        const yIndex = i + 1;
        if(yIndex < positions.length) {
          positions[yIndex] = (positions[yIndex] ?? 0) + elevation;
        }
      }

      geom.getAttribute('position').needsUpdate = true;
      geom.computeBoundingBox();
      geom.computeBoundingSphere();

      // Apply space cutting if dormerRoofId is provided
      let finalGeom = geom;
      if(spaceGeometries.length > 0) {
        const mesh = new Mesh(geom);
        const boundingBox = getGlobalBoundingBox(mesh);

        const { geometry: cutGeom } = spaceGeometries.reduce((acc, cur) => {
          const spaceMesh = new Mesh(cur.geometry);
          spaceMesh.position.setY(cur.elevation - elevation);
          spaceMesh.updateMatrix();

          const { min, max } = getGlobalBoundingBox(spaceMesh);

          return (
            true
              && boundingBox.min.x < max.x && min.x < boundingBox.max.x
              && boundingBox.min.y < max.y && min.y < boundingBox.max.y
              && boundingBox.min.z < max.z && min.z < boundingBox.max.z
              ? CSG.subtract(acc, spaceMesh)
              : acc
          );
        }, mesh);

        finalGeom = cutGeom;
        geom.dispose(); // Dispose original geometry
      }

      return { geometry: finalGeom };
    });

    // Build edge geometries (perimeter walls)
    const uniqueEdgePairs = getUniqueRoofPartPairs(roofParts);
    const edgeGeos = uniqueEdgePairs.map(({ startPoint, endPoint, isClockWise }) => {
      const p1 = startPoint.clone();
      const p2 = endPoint.clone();

      p1.y += elevation;
      p2.y += elevation;

      const geom = buildEdgeSolid(p1, p2, thickness, scale, isClockWise);

      // Apply space cutting if dormerRoofId is provided
      let finalGeom = geom;
      if(spaceGeometries.length > 0) {
        const mesh = new Mesh(geom);
        const boundingBox = getGlobalBoundingBox(mesh);

        const { geometry: cutGeom } = spaceGeometries.reduce((acc, cur) => {
          const spaceMesh = new Mesh(cur.geometry);
          spaceMesh.position.setY(cur.elevation - elevation);
          spaceMesh.updateMatrix();

          const { min, max } = getGlobalBoundingBox(spaceMesh);

          return (
            true
              && boundingBox.min.x < max.x && min.x < boundingBox.max.x
              && boundingBox.min.y < max.y && min.y < boundingBox.max.y
              && boundingBox.min.z < max.z && min.z < boundingBox.max.z
              ? CSG.subtract(acc, spaceMesh)
              : acc
          );
        }, mesh);

        finalGeom = cutGeom;
        geom.dispose(); // Dispose original geometry
      }

      return { geometry: finalGeom };
    });

    // Clean up space geometries
    for(const { geometry } of spaceGeometries) {
      geometry.dispose();
    }

    return {
      topGeometries: topGeos,
      bottomGeometries: bottomGeos,
      edgeGeometries: edgeGeos,
    };
  }, [dormerBodyParts, elevation, thickness, topTexture.attributes.scale, dormerRoofId, spaces, walls, levels]);

  // Store geometry for wall cutting (only use roofParts before any CSG operations)
  useEffect(() => {
    if(isNull(dormerRoofId) || isUndefined(dormerRoofId)) {
      return;
    }

    if(dormerBodyParts.length === 0) {
      return;
    }

    // Convert RoofParts to properly typed arrays
    const roofParts: Array<[Vector3, Vector3, Vector3, ...Vector3[]]> = [];
    for(const part of dormerBodyParts) {
      if(part.length >= 3) {
        const typedPart = part as [Vector3, Vector3, Vector3, ...Vector3[]];
        roofParts.push(typedPart);
      }
    }

    if(roofParts.length === 0) {
      return;
    }

    try {
      // Create simple surface geometries from roof parts (similar to main roof subtraction)
      const geometries: BufferGeometry[] = [];

      for(const roofPart of roofParts) {
        const shape2D: Vector2[] = roofPart.map(({ x, z }) => new Vector2(x, z));
        const shape3D: Vector3[] = roofPart.map(({ x, y, z }) => new Vector3(x, y + elevation, z));

        const triangles = ShapeUtils.triangulateShape(shape2D, []);
        const indices: number[] = [];
        const positions: number[] = [];

        for(const pt of shape3D) {
          positions.push(pt.x, pt.y, pt.z);
        }

        for(const tri of triangles) {
          const [a, b, c] = tri;
          assert(!isUndefined(a) && !isUndefined(b) && !isUndefined(c), 'This should never happen. |drm_cut|');
          indices.push(a, b, c);
        }

        const geom = new BufferGeometry();
        geom.setAttribute('position', new Float32BufferAttribute(positions, 3));
        geom.setIndex(indices);
        geom.computeVertexNormals();

        geometries.push(geom);
      }

      const mergedGeometry = mergeGeometries(geometries, true).toNonIndexed();
      mergedGeometry.computeBoundingBox();
      mergedGeometry.computeBoundingSphere();

      setDormerRoofWallSubtraction(dormerRoofId, mergedGeometry);

      // Cleanup temporary geometries
      for(const geom of geometries) {
        geom.dispose();
      }
    } catch(error) {
      console.error('[RealRoofDormer] Failed to create wall cutting geometry:', error);
    }

    return () => {
      clearDormerRoofWallSubtraction(dormerRoofId);
    };
  }, [dormerBodyParts, elevation, dormerRoofId]);

  // Cleanup geometries
  useEffect(() => (
    () => {
      for(const { geometry } of [...topGeometries, ...bottomGeometries, ...edgeGeometries]) {
        geometry.dispose();
      }
    }
  ), [topGeometries, bottomGeometries, edgeGeometries]);

  return (
    <group>
      {/* Top surface */}
      {
        topGeometries.map(({ geometry }, index) => (
          <mesh key={`top-${index}`} geometry={geometry}>
            <meshStandardMaterial
              {...topMapProps}
              transparent={opacity !== 1}
              opacity={opacity}
            />
          </mesh>
        ))
      }

      {/* Bottom surface */}
      {
        bottomGeometries.map(({ geometry }, index) => (
          <mesh key={`bottom-${index}`} geometry={geometry}>
            <meshStandardMaterial
              {...bottomMapProps}
              transparent={opacity !== 1}
              opacity={opacity}
            />
          </mesh>
        ))
      }

      {/* Edge surfaces */}
      {
        edgeGeometries.map(({ geometry }, index) => (
          <mesh key={`edge-${index}`} geometry={geometry}>
            <meshStandardMaterial
              {...edgeMapProps}
              transparent={opacity !== 1}
              opacity={opacity}
            />
          </mesh>
        ))
      }
    </group>
  );
};

/**
 * Renders real dormer geometry calculated from the dormer classes
 * Supports both simple rendering (with color) and advanced rendering (with textures and thickness)
 */
export const RealRoofDormer: React.FC<RealRoofDormerProps> = ({
  dormerBodyParts,
  elevation,
  opacity,
  color = '#8b4513',
  dormerRoofId,
  thickness,
  topTexture,
  bottomTexture,
  edgeTexture,
  topColorOverlay,
  bottomColorOverlay,
  edgeColorOverlay,
  topCompositeOperation,
  bottomCompositeOperation,
  edgeCompositeOperation,
  topTextureTransform,
  bottomTextureTransform,
  edgeTextureTransform,
}) => {
  // Determine if we should use advanced rendering (with textures and thickness)
  const useAdvancedRendering = !isUndefined(thickness) && !isUndefined(topTexture) && !isUndefined(bottomTexture) && !isUndefined(edgeTexture);

  // Simple geometries for fallback rendering
  const simpleGeometries = useMemo(() => {
    if(useAdvancedRendering) {
      return [];
    }

    const results: Array<{ geometry: BufferGeometry }> = [];

    for(const [i, dormerPart] of dormerBodyParts.entries()) {
      const positions: number[] = [];
      const indices: number[] = [];

      if(dormerPart.length === 3) {
        // Triangle - simple case
        for(const vertex of dormerPart) {
          positions.push(vertex.x, vertex.y + elevation, vertex.z);
        }
        indices.push(0, 1, 2);
      } else if(dormerPart.length === 4) {
        // Quadrilateral - split into two triangles
        for(const vertex of dormerPart) {
          positions.push(vertex.x, vertex.y + elevation, vertex.z);
        }
        indices.push(0, 1, 2, 0, 2, 3);
      } else {
        // Use 2D triangulation for complex polygons
        try {
          const triangles = ShapeUtils.triangulateShape(dormerPart.map(toVector2), []);

          let indexOffset = 0;
          for(const triangle of triangles) {
            const triangleVertices = triangle.map(e => getNotUndefined(dormerPart[e], 'This should never happen. |yz0bi5|'));

            for(const vertex of triangleVertices) {
              positions.push(vertex.x, vertex.y + elevation, vertex.z);
            }

            indices.push(indexOffset, indexOffset + 1, indexOffset + 2);
            indexOffset += 3;
          }
        } catch(e) {
          console.error(`[RealRoofDormer] Failed to triangulate part ${i}:`, e);
          continue;
        }
      }

      if(positions.length === 0 || indices.length === 0) {
        continue;
      }

      const geometry = new BufferGeometry();
      geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      results.push({ geometry });
    }

    return results;
  }, [useAdvancedRendering, dormerBodyParts, elevation]);
  useEffect(() => (
    () => {
      for(const { geometry } of simpleGeometries) {
        geometry.dispose();
      }
    }
  ), [simpleGeometries]);

  // Render simple version with solid color (when textures not provided)
  if(!useAdvancedRendering) {
    return (
      <group>
        {
          simpleGeometries.map(({ geometry }, index) => (
            <mesh key={index} geometry={geometry}>
              <meshStandardMaterial
                color={color}
                roughness={0.8}
                metalness={0.2}
                transparent={opacity !== 1}
                opacity={opacity}
                side={2}
              />
            </mesh>
          ))
        }
      </group>
    );
  }

  // Advanced rendering component (with textures)
  return (
    <RealRoofDormerAdvanced
      dormerBodyParts={dormerBodyParts}
      elevation={elevation}
      opacity={opacity}
      thickness={thickness}
      topTexture={topTexture}
      bottomTexture={bottomTexture}
      edgeTexture={edgeTexture}
      topColorOverlay={topColorOverlay}
      bottomColorOverlay={bottomColorOverlay}
      edgeColorOverlay={edgeColorOverlay}
      topCompositeOperation={topCompositeOperation}
      bottomCompositeOperation={bottomCompositeOperation}
      edgeCompositeOperation={edgeCompositeOperation}
      topTextureTransform={topTextureTransform}
      bottomTextureTransform={bottomTextureTransform}
      edgeTextureTransform={edgeTextureTransform}
      dormerRoofId={dormerRoofId}
    />
  );
};
