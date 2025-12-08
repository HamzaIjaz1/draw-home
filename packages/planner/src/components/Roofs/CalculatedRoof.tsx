import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BufferAttribute, BufferGeometry, DoubleSide, Group, Matrix4, Mesh, Quaternion, Raycaster, Shape, ShapeUtils, Vector2, Vector3 } from 'three';
import { getNotUndefined, isArrayLength, isNull, isNullish, isUndefined } from '@arthurka/ts-utils';
import { GroupProps, MeshProps, ThreeEvent } from '@react-three/fiber';
import { IS_JOVAN_DEBUG_MODE } from '@draw-house/common/dist/envVariables/public';
import { StrictExtract } from '@draw-house/common/dist/utils';
import assert from 'assert';
import { CSG } from 'three-csg-ts';
import { setCursor, setTempRoofDormerIsOnRoof, setTempRoofDormerTransform, useCreationMode, useCreationModeConfig, useLevels, usePopUpToolbar, useRoofDormerPlacement, useSlideUpMenuLvl2, useSpaces, useTempRoofDormer, useViewMode, useWalls } from '../../zustand';
import { addDormer, setDormerParams } from '../../zustand/useRoofs/actions';
import { useSelectedItem } from '../../zustand/useSelectedItem';
import { getGlobalBoundingBox, getShadowProps, toVector2 } from '../../utils';
import { SuspenseHOC } from '../SuspenseHOC';
import { useTextures } from '../../customHooks';
import { HipRoofDebugData } from '../../calculationsByJovan';
import { RoofsStore, useRoofs } from '../../zustand/useRoofs';
import { useAppearanceColor } from '../../zustand/useAppearanceColor';
import { enableOutlineLayer } from '../../utils/enableOutlineLayer';
import { registerSceneObject, unregisterSceneObject } from '../../zustand/useSceneObjects';
import { handleAppearanceSample } from '../../utils/handleAppearanceSample';
import { buildEdgeSolid, buildSolidSingleMaterial, getUniqueRoofPartPairs, makeRoofGeometries } from '../../utils/solidRoofGeometryUtils';
import { DEFAULT_TEXTURE_TRANSFORM } from '../../zod/TextureTransform';
import { makeSpaceGeometries } from '../../utils/makeSpaceGeometries';
import { useDollhouseViewMode } from '../../customHooks/useDollhouseViewMode';

export type CalculatedRoofProps = {
  roofParts: Array<[Vector3, Vector3, Vector3, ...Vector3[]]>;
  type: StrictExtract<RoofsStore['roofs'][number]['roofData']['type'], 'hip' | 'slanted' | 'wraparound'>;
  transformableGableToHipRoofParts: RoofsStore['roofs'][number]['roofData']['transformableGableToHipRoofParts'];
  roofId: RoofsStore['roofs'][number]['id'];
  elevation: number;
  opacity: number;
  thickness: RoofsStore['roofs'][number]['roofData']['thickness'];
  topTexture: RoofsStore['roofs'][number]['roofData']['topTexture'];
  bottomTexture: RoofsStore['roofs'][number]['roofData']['bottomTexture'];
  edgeTexture: RoofsStore['roofs'][number]['roofData']['edgeTexture'];
  topColorOverlay: RoofsStore['roofs'][number]['roofData']['topColorOverlay'];
  bottomColorOverlay: RoofsStore['roofs'][number]['roofData']['bottomColorOverlay'];
  edgeColorOverlay: RoofsStore['roofs'][number]['roofData']['edgeColorOverlay'];
  topCompositeOperation: RoofsStore['roofs'][number]['roofData']['topCompositeOperation'];
  bottomCompositeOperation: RoofsStore['roofs'][number]['roofData']['bottomCompositeOperation'];
  edgeCompositeOperation: RoofsStore['roofs'][number]['roofData']['edgeCompositeOperation'];
};

export const CalculatedRoof: React.FC<CalculatedRoofProps> = SuspenseHOC(({
  roofId,
  type,
  roofParts,
  elevation,
  thickness,
  transformableGableToHipRoofParts,
  opacity,
  topTexture,
  bottomTexture,
  edgeTexture,
  topCompositeOperation,
  bottomCompositeOperation,
  edgeCompositeOperation,
  topColorOverlay: _topColorOverlay,
  bottomColorOverlay: _bottomColorOverlay,
  edgeColorOverlay: _edgeColorOverlay,
}) => {
  const { viewMode } = useViewMode();
  const { creationMode } = useCreationMode();
  const { popUpToolbar } = usePopUpToolbar();
  const { appearanceColor } = useAppearanceColor();
  const { walls } = useWalls();
  const { spaces } = useSpaces();
  const { levels } = useLevels();
  const [activeGableIndex, setActiveGableIndex] = useState<null | number>(null);
  const { roofs } = useRoofs();
  const { selectedItem } = useSelectedItem();

  const roof = roofs.find(e => e.id === roofId);
  const topXf = roof?.roofData.topTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const bottomXf = roof?.roofData.bottomTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const edgeXf = roof?.roofData.edgeTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;

  const { topColorOverlay, bottomColorOverlay, edgeColorOverlay } = (() => {
    const { slideUpMenuLvl2 } = useSlideUpMenuLvl2.getState();

    if(isNull(appearanceColor) || appearanceColor.type !== 'roofAppearance' || slideUpMenuLvl2.type !== appearanceColor.type || slideUpMenuLvl2.roofId !== roofId) {
      return {
        topColorOverlay: _topColorOverlay,
        bottomColorOverlay: _bottomColorOverlay,
        edgeColorOverlay: _edgeColorOverlay,
      };
    }

    return {
      topColorOverlay: slideUpMenuLvl2.textureType === 'top' ? appearanceColor.color : _topColorOverlay,
      bottomColorOverlay: slideUpMenuLvl2.textureType === 'bottom' ? appearanceColor.color : _bottomColorOverlay,
      edgeColorOverlay: slideUpMenuLvl2.textureType === 'edge' ? appearanceColor.color : _edgeColorOverlay,
    };
  })();

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
      overlayColor: isNull(topColorOverlay) ? null : topColorOverlay.value,
      compositeOperation: topCompositeOperation,
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
      overlayColor: isNull(bottomColorOverlay) ? null : bottomColorOverlay.value,
      compositeOperation: bottomCompositeOperation,
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
      overlayColor: isNull(edgeColorOverlay) ? null : edgeColorOverlay.value,
      compositeOperation: edgeCompositeOperation,
    },
  );

  const { topGeometries, bottomGeometries, edgeGeometries, roofPartLowestEdges } = useMemo(() => {
    const positions: number[] = [];
    const uvArray: number[] = [];
    const indicesArrayTop: number[] = [];
    const indicesArrayBottom: number[] = [];
    const roofPartLowestEdges: Array<{ roofPartIndex: number; lowestEdgePoint1: Vector3; lowestEdgePoint2: Vector3 }> = [];

    let indexOffset = 0;

    for(const [roofPartIndex, roofPart] of roofParts.entries()) {
      let lowestEdge = [roofPart[0], roofPart[1]] as const;

      for(const [i, e] of roofPart.entries()) {
        const ePrev = getNotUndefined(roofPart.at(i - 1), 'This should never happen. |awo2dn|');

        if(ePrev.y + e.y < lowestEdge[0].y + lowestEdge[1].y) {
          lowestEdge = [ePrev, e];
        }
      }

      // Store the lowest edge data for reuse (dormers, gutters, etc.)
      roofPartLowestEdges.push({
        roofPartIndex,
        lowestEdgePoint1: lowestEdge[0],
        lowestEdgePoint2: lowestEdge[1],
      });

      const [lowestEdgePoint1V2, lowestEdgePoint2V2] = lowestEdge.map(toVector2);
      const lowestEdgeDirection = new Vector2().subVectors(lowestEdgePoint1V2, lowestEdgePoint2V2).normalize();
      const lowestEdgePerpendicular = new Vector2(-lowestEdgeDirection.y, lowestEdgeDirection.x);

      const { shape, holes } = new Shape(roofPart.map(toVector2)).extractPoints(12);
      const triangles = ShapeUtils.triangulateShape(shape, holes);

      for(const triangle of triangles) {
        const triangleVertices = triangle.map(e => getNotUndefined(roofPart[e], 'This should never happen. |589v7n|'));

        for(const e of triangleVertices) {
          const direction = new Vector2().subVectors(toVector2(e), lowestEdgePoint1V2);
          const u = direction.dot(lowestEdgeDirection);
          const v = direction.dot(lowestEdgePerpendicular);

          positions.push(...e.toArray());
          uvArray.push(u, v);
        }

        indicesArrayTop.push(indexOffset, indexOffset + 2, indexOffset + 1);
        indicesArrayBottom.push(indexOffset, indexOffset + 1, indexOffset + 2);
        indexOffset += 3;
      }
    }

    const spaceGeometries = makeSpaceGeometries({ roofId, spaces, walls, levels });
    const topGeometries = makeRoofGeometries({
      geometries: roofParts.map(e => buildSolidSingleMaterial(e, topTexture.attributes.scale)),
      diff: -thickness,
      spaceGeometries,
      elevation,
    });
    const bottomGeometries = makeRoofGeometries({
      geometries: roofParts.map(e => buildSolidSingleMaterial(e, bottomTexture.attributes.scale)),
      diff: 0,
      spaceGeometries,
      elevation,
    });
    const edgeGeometries = (() => {
      const results: Array<{ geometry: BufferGeometry }> = [];

      for(const { startPoint, endPoint, isClockWise } of getUniqueRoofPartPairs(roofParts)) {
        const baseGeom = buildEdgeSolid(
          startPoint,
          endPoint,
          thickness,
          edgeTexture.attributes.scale,
          isClockWise,
        );

        const baseMesh = new Mesh(baseGeom);
        const boundingBox = getGlobalBoundingBox(baseMesh);
        const { geometry } = spaceGeometries.reduce((acc, cur) => {
          const mesh = new Mesh(cur.geometry);
          mesh.position.setY(cur.elevation - elevation);
          mesh.updateMatrix();

          const { min, max } = getGlobalBoundingBox(mesh);

          return (
            true
              && boundingBox.min.x < max.x && min.x < boundingBox.max.x
              && boundingBox.min.y < max.y && min.y < boundingBox.max.y
              && boundingBox.min.z < max.z && min.z < boundingBox.max.z
              ? (() => {
                const result = CSG.subtract(acc, mesh);
                if(acc !== baseMesh) {
                  acc.geometry.dispose();
                }

                return result;
              })()
              : acc
          );
        }, baseMesh);

        results.push({ geometry });
        baseGeom.dispose();
      }
      for(const { geometry } of spaceGeometries) {
        geometry.dispose();
      }

      return results;
    })();

    return {
      topGeometries,
      bottomGeometries,
      edgeGeometries,
      roofPartLowestEdges,
    };
  }, [
    bottomTexture.attributes.scale,
    edgeTexture.attributes.scale,
    elevation,
    levels,
    roofId,
    roofParts,
    spaces,
    thickness,
    topTexture.attributes.scale,
    walls,
  ]);
  useEffect(() => (
    () => {
      for(const { geometry } of [...topGeometries, ...bottomGeometries, ...edgeGeometries]) {
        geometry.dispose();
      }
    }
  ), [topGeometries, bottomGeometries, edgeGeometries]);

  const gableToHipGeometries = useMemo(() => (
    transformableGableToHipRoofParts.map(({ index, part }) => {
      const geometry = new BufferGeometry();
      const vertices = new Float32Array(part.flatMap(e => e.toArray()));

      geometry.setAttribute('position', new BufferAttribute(vertices, 3));

      return {
        index,
        geometry,
      };
    })
  ), [transformableGableToHipRoofParts]);
  useEffect(() => () => {
    for(const { geometry } of gableToHipGeometries) {
      geometry.dispose();
    }
  }, [gableToHipGeometries]);

  const onPointerUp = (e: ThreeEvent<PointerEvent>) => {
    if(e.button !== 0 || handleAppearanceSample(e)) {
      return;
    }

    e.stopPropagation();

    // Check if we're in dormer placement/move mode
    const { tempRoofDormer } = useTempRoofDormer.getState();
    if(!isNull(tempRoofDormer) && tempRoofDormer.isOnRoof === true) {
      // Check if we're moving an existing dormer or placing a new one
      const isMovingDormer = selectedItem?.type === 'roofDormer' && selectedItem.mode === 'move';

      if(isMovingDormer === true) {
        // Update existing dormer position
        setDormerParams(tempRoofDormer.dormer.id, {
          position: tempRoofDormer.dormer.position.clone(),
          rotation: tempRoofDormer.dormer.rotation.clone(),
        });

        // Exit move mode
        useSelectedItem.setState({ selectedItem: null });
        setCursor(null);
      } else {
        // Place new dormer
        addDormer({
          roofId,
          type: tempRoofDormer.dormer.type,
          position: tempRoofDormer.dormer.position.clone(),
          rotation: tempRoofDormer.dormer.rotation.clone(),
          width: tempRoofDormer.dormer.width,
          height: tempRoofDormer.dormer.height,
          depth: tempRoofDormer.dormer.depth,
        });
      }

      // If needToStopAfterFirstSet is true, clear the active dormer type to exit placement mode
      // This allows the subscription to recreate the temp dormer if the user selects the same type again
      if(tempRoofDormer.needToStopAfterFirstSet === true) {
        useRoofDormerPlacement.setState({ activeDormerType: null });
      }

      // Clear temp dormer after placement/move
      useTempRoofDormer.setState({ tempRoofDormer: null });
      return;
    }

    usePopUpToolbar.setState({
      popUpToolbar: {
        type: 'roof',
        id: roofId,
        coords: new Vector2(e.clientX, e.clientY),
        activeGableIndex,
        isSlanted: type === 'slanted',
        clickPoint: e.point,
        subItem: null,
      },
    });
  };

  const roofGeometriesGroupRef = useRef<Group>(null);
  const dollhouseViewRef = useRef<Group>(null);
  useDollhouseViewMode({ groupRef: dollhouseViewRef, normal: new Vector3(0, -1, 0), threshold: 0.2 });

  useEffect(() => {
    if(viewMode !== '3D' || isNull(roofGeometriesGroupRef.current)) {
      unregisterSceneObject(`roof:${roofId}`);
      return;
    }

    roofGeometriesGroupRef.current.updateMatrixWorld(true);
    registerSceneObject(`roof:${roofId}`, roofGeometriesGroupRef.current);

    return () => {
      unregisterSceneObject(`roof:${roofId}`);
    };
  }, [viewMode, roofId]);

  useEffect(() => {
    roofGeometriesGroupRef.current?.updateMatrixWorld(true);
  }, [roofParts, elevation, thickness, type]);

  useEffect(() => {
    assert(!isNull(roofGeometriesGroupRef.current), 'Something went wrong. |n9ht2r|');

    enableOutlineLayer(roofGeometriesGroupRef.current);
  }, []);

  return (
    <group ref={dollhouseViewRef}>
      <group
        position-y={elevation}
        {
          ...creationMode === 'walls' && {
            onClick(e) {
              const { creationModeConfig } = useCreationModeConfig.getState();

              if(e.button !== 0 || e.delta > 2 || creationModeConfig.mode === 'multipleStraightLines') {
                return;
              }
              e.stopPropagation();

              usePopUpToolbar.setState({
                popUpToolbar: {
                  type: 'roof',
                  id: roofId,
                  coords: new Vector2(e.clientX, e.clientY),
                  activeGableIndex,
                  isSlanted: type === 'slanted',
                  clickPoint: e.point,
                  subItem: null,
                },
              });
            },
          } satisfies Partial<GroupProps>
        }
        {
          ...creationMode === 'pointer' && viewMode !== '2D' && isNull(activeGableIndex) && {
            onPointerEnter() {
              setCursor('pointer');
            },
            onPointerLeave(e) {
              e.stopPropagation();
              setCursor(null);

              const { tempRoofDormer } = useTempRoofDormer.getState();
              if(!isNull(tempRoofDormer)) {
                setTempRoofDormerIsOnRoof(false);
              }
            },
            onPointerMove(e) {
              const { tempRoofDormer } = useTempRoofDormer.getState();

              if(!isNull(tempRoofDormer) && !isNullish(e.face)) {
                e.stopPropagation();

                // Find which roof part contains the hit point by checking distance to plane
                let matchedLowestEdge: { lowestEdgePoint1: Vector3; lowestEdgePoint2: Vector3 } | null = null;

                for(const { roofPartIndex, lowestEdgePoint1, lowestEdgePoint2 } of roofPartLowestEdges) {
                  const roofPart = roofParts[roofPartIndex];
                  if(isUndefined(roofPart)) {
                    continue;
                  }

                  // Adjust roof part vertices for elevation
                  const p0 = roofPart[0].clone().setY(roofPart[0].y + elevation);
                  const p1 = roofPart[1].clone().setY(roofPart[1].y + elevation);
                  const p2 = roofPart[2].clone().setY(roofPart[2].y + elevation);

                  const partNormal = new Vector3().crossVectors(
                    new Vector3().subVectors(p1, p0),
                    new Vector3().subVectors(p2, p0),
                  ).normalize();

                  const distanceToPlane = Math.abs(new Vector3().subVectors(e.point, p0).dot(partNormal));

                  // If hit point is close to this roof part's plane (within 0.5 units)
                  if(distanceToPlane < 0.5) {
                    // Use the pre-calculated lowest edge data (adjusted for elevation)
                    matchedLowestEdge = {
                      lowestEdgePoint1: lowestEdgePoint1.clone().setY(lowestEdgePoint1.y + elevation),
                      lowestEdgePoint2: lowestEdgePoint2.clone().setY(lowestEdgePoint2.y + elevation),
                    };
                    break;
                  }
                }

                // Calculate tangent along the base edge (texture U direction)
                const tangent = isNull(matchedLowestEdge) ? new Vector3(1, 0, 0) : (() => {
                  // Calculate the tangent along the baseline
                  const rawTangent = new Vector3().subVectors(
                    matchedLowestEdge.lowestEdgePoint2,
                    matchedLowestEdge.lowestEdgePoint1,
                  ).normalize();

                  // Ensure consistent direction: prefer positive X direction
                  // If the tangent points mostly in negative X, flip it
                  if(rawTangent.x < 0) {
                    rawTangent.negate();
                  } else if(Math.abs(rawTangent.x) < 0.01 && rawTangent.z < 0) {
                    // If X is near zero, use Z direction as tiebreaker
                    rawTangent.negate();
                  }

                  return rawTangent;
                })();

                // Get dormer dimensions from temp dormer
                const rectangleWidth = tempRoofDormer.dormer.width;
                const rectangleHeight = tempRoofDormer.dormer.height;
                const normalizedNormal = e.face.normal.clone().normalize();

                // Calculate bitangent (perpendicular to tangent and normal)
                const bitangent = new Vector3().crossVectors(normalizedNormal, tangent).normalize();
                const orthogonalTangent = new Vector3().crossVectors(bitangent, normalizedNormal).normalize();

                // Calculate rotation quaternion for the dormer
                const rotation = new Quaternion();
                rotation.setFromRotationMatrix(
                  new Matrix4().makeBasis(orthogonalTangent, bitangent, normalizedNormal),
                );

                // Calculate the four corners of the rectangle
                const halfWidth = rectangleWidth / 2;
                const halfHeight = rectangleHeight / 2;
                const corners = [
                  e.point.clone().addScaledVector(orthogonalTangent, -halfWidth).addScaledVector(bitangent, -halfHeight),
                  e.point.clone().addScaledVector(orthogonalTangent, halfWidth).addScaledVector(bitangent, -halfHeight),
                  e.point.clone().addScaledVector(orthogonalTangent, halfWidth).addScaledVector(bitangent, halfHeight),
                  e.point.clone().addScaledVector(orthogonalTangent, -halfWidth).addScaledVector(bitangent, halfHeight),
                ];

                // Check if corners are within bounds by raycasting
                // We cast rays from above each corner downward to see if they hit the roof
                // This works correctly for roof parts made of multiple triangles
                const raycaster = new Raycaster();
                const rayDirection = new Vector3(0, -1, 0); // Cast downward
                const roofObject = e.object;

                const isWithinBounds = corners.every(corner => {
                  // Start ray from above the corner
                  const rayOrigin = corner.clone().add(new Vector3(0, 10, 0));
                  raycaster.set(rayOrigin, rayDirection);

                  const intersects = raycaster.intersectObject(roofObject, false);

                  // Corner is valid if we hit the roof and the hit point is close to the corner
                  if(isArrayLength(intersects, '>', 0)) {
                    return corner.distanceTo(intersects[0].point) < 0.1; // Tolerance for floating point errors
                  }

                  return false;
                });

                // Update temp dormer transform
                setTempRoofDormerTransform(roofId, e.point, rotation, isWithinBounds);
              }
            },
            onPointerUp,
          } satisfies Partial<GroupProps>
        }
      >
        <group ref={roofGeometriesGroupRef} renderOrder={viewMode === '3D' ? 0 : 1}>
          {
            topGeometries.map(({ geometry }, i) => (
              <mesh
                {...getShadowProps()}
                key={i}
                geometry={geometry}
                position-y={thickness}
                onPointerUp={handleAppearanceSample}
                userData={{
                  appearance: {
                    texture: topTexture,
                    transform: topXf,
                    overlay: topColorOverlay,
                  },
                }}
              >
                <meshStandardMaterial
                  {...topMapProps}
                  transparent={opacity !== 1}
                  opacity={opacity}
                />
              </mesh>
            ))
          }
          {
            bottomGeometries.map(({ geometry }, i) => (
              <mesh
                {...getShadowProps()}
                key={i}
                geometry={geometry}
                onPointerUp={handleAppearanceSample}
                userData={{
                  appearance: {
                    texture: bottomTexture,
                    transform: bottomXf,
                    overlay: bottomColorOverlay,
                  },
                }}
              >
                <meshStandardMaterial
                  {...bottomMapProps}
                  transparent={opacity !== 1}
                  opacity={opacity}
                />
              </mesh>
            ))
          }
          {
            edgeGeometries.map(({ geometry }, i) => (
              <mesh
                {...getShadowProps()}
                key={i}
                geometry={geometry}
                onPointerUp={handleAppearanceSample}
                userData={{
                  appearance: {
                    texture: edgeTexture,
                    overlay: edgeColorOverlay,
                  },
                }}
              >
                <meshStandardMaterial
                  {...edgeMapProps}
                  transparent={opacity !== 1}
                  opacity={opacity}
                />
              </mesh>
            ))
          }
        </group>
        {
          gableToHipGeometries.map(({ geometry, index }, i) => {
            const isActive = (
              false
                || activeGableIndex === index
                || (
                  true
                    && !isNull(popUpToolbar)
                    && popUpToolbar.id === roofId
                    && popUpToolbar.activeGableIndex === index
                )
            );

            return (
              <mesh
                key={`${i} ${index}`}
                visible={creationMode === 'pointer' && viewMode !== '2D'}
                renderOrder={3}
                geometry={geometry}
                position-y={thickness}
                {
                  ...creationMode === 'pointer' && viewMode !== '2D' && {
                    onPointerEnter(e) {
                      e.stopPropagation();
                      setCursor('pointer');
                      setActiveGableIndex(index);
                    },
                    onPointerLeave(e) {
                      e.stopPropagation();
                      setCursor(null);
                      setActiveGableIndex(null);
                    },
                    onPointerUp,
                  } satisfies Partial<MeshProps>
                }
              >
                <meshBasicMaterial
                  side={DoubleSide}
                  transparent
                  opacity={isActive === true ? 0.5 : 0}
                  color='orange'
                  polygonOffset={isActive === true}
                  polygonOffsetFactor={-10000}
                />
              </mesh>
            );
          })
        }
        {
          IS_JOVAN_DEBUG_MODE === true && topGeometries.map(({ geometry }, i) => (
            <HipRoofDebugData key={i} roofId={roofId} geometry={geometry} />
          ))
        }
      </group>
    </group>
  );
});
