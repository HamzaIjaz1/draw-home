import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Box3, BoxGeometry, BufferGeometry, ExtrudeGeometry, Group, Matrix4, Mesh, Shape, Vector2, Vector3 } from 'three';
import { getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import { Positive, RoofId } from '@draw-house/common/dist/brands';
import Color from 'color';
import assert from 'assert';
import { CSG } from 'three-csg-ts';
import { useGLTFArrayCached, useRefWithUV2, useTextures } from '../../customHooks';
import { calculateWallCornersDiff, ColorOverlay, getShadowProps } from '../../utils';
import { SuspenseHOC } from '../SuspenseHOC';
import type { WallProps } from './Wall';
import { useSlideUpMenuLvl2, useViewMode, useWalls } from '../../zustand';
import { useStrapiAppConfigResolved } from '../../zustand/useStrapiAppConfig';
import { compositeOperations } from '../../constants';
import { useRoofs } from '../../zustand/useRoofs';
import { useAppearanceColor } from '../../zustand/useAppearanceColor';
import { enableOutlineLayer } from '../../utils/enableOutlineLayer';
import { useSharedMaterial } from '../../customHooks/useSharedMaterial';
import { useRoofsWallSubtraction } from '../../zustand/useRoofsWallSubtraction';
import { useDormerRoofsWallSubtraction } from '../../zustand/useDormerRoofsWallSubtraction';
import { handleAppearanceSample } from '../../utils/handleAppearanceSample';
import { DEFAULT_TEXTURE_TRANSFORM } from '../../zod/TextureTransform';
import { getDefaultColorForTexture } from '../../utils/getDefaultColorForTexture';

type CustomModelGeometryProps = {
  is2D: boolean;
  position: Vector3;
  bias: Vector3;
  furnitures: WallSidesProps['furnitures'];
  wallThickness: WallSidesProps['wallThickness'];
  wallHeight: WallSidesProps['wallHeight'];
  wallDirection: Vector3;
  wallCenter: Vector3;
  floorThickness: WallSidesProps['floorThickness'];
  wallGeometry: BufferGeometry;
  roofId: null | RoofId;
  roofTotalHeight: number;
  elevation: number;
  excludeFromRoofCutting: WallSidesProps['excludeFromRoofCutting'];
  dormerRoofId: WallSidesProps['dormerRoofId'];
};

const CustomModelGeometry: React.FC<CustomModelGeometryProps> = SuspenseHOC(({
  is2D,
  position,
  elevation,
  wallGeometry,
  wallCenter,
  wallDirection,
  wallThickness,
  wallHeight,
  bias,
  roofId,
  floorThickness,
  roofTotalHeight,
  furnitures,
  excludeFromRoofCutting = false,
  dormerRoofId,
}) => {
  const loadedModels = useGLTFArrayCached(furnitures.map(e => e.url));
  const roofGeometry = useRoofsWallSubtraction(s => isNull(roofId) ? null : s.subtraction[roofId]?.clone() ?? null);
  const dormerRoofGeometry = useDormerRoofsWallSubtraction(s => (
    isNull(dormerRoofId) ? null : s.dormerRoofsWallSubtraction[dormerRoofId]?.clone() ?? null
  ));

  if(is2D === true) {
    return (
      <primitive object={wallGeometry} attach='geometry' />
    );
  }

  // Doors/Walls subtraction
  const { geometry } = furnitures.reduce((acc, { onWallCoordinateX, onWallCoordinateY, width, height, depth }, i) => {
    const accCount = (
      !isNull(acc.geometry.index)
        ? acc.geometry.index.count
        : getNotUndefined(acc.geometry.attributes.position, 'This should never happen. |23672h|').count
    );
    if(accCount === 0) {
      return acc;
    }

    const { scene } = getNotUndefined(loadedModels[i], 'This should never happen. |dc10ne|');
    const box = new Box3().setFromObject(scene);

    const { y } = box.getCenter(new Vector3());
    const size = box.getSize(new Vector3());

    const n = 0.001;
    const [_w, _h, _d] = size.toArray();
    const w = n + (isNull(width) ? _w : width);
    const h = n + (isNull(height) ? _h : height);
    const d = n + (isNull(depth) ? _d : depth);

    const boundingBoxGeometry = new BoxGeometry(w, h, Math.max(d, wallThickness + n));
    const boundingBoxPosition = new Vector3(0, y, 0);

    const modelMesh = new Mesh(boundingBoxGeometry);

    const pos = (
      new Vector3()
        .add(new Vector3(onWallCoordinateX - position.x, onWallCoordinateY - (wallHeight + floorThickness) / 2 - roofTotalHeight, 0))
        .add(new Vector3(0, isNull(height) ? 0 : (height - _h) / 2, 0))
        .add(new Vector3(-bias.x, 0, 0))
        .add(boundingBoxPosition)
        .add(position)
    );
    modelMesh.position.set(...pos.toArray());
    modelMesh.updateMatrixWorld();

    const res = CSG.subtract(acc, modelMesh);
    boundingBoxGeometry.dispose();

    return res;
  }, new Mesh(wallGeometry));

  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  // Apply dormer roof subtraction if this is a dormer wall
  if(!isNull(dormerRoofGeometry)) {
    // For dormer walls: the wall elevation already includes the ceiling offset,
    // but the dormer roof geometry was created at the base roof elevation.
    // So we use 0 instead of -elevation to keep them aligned.
    const elevationOffset = !isNull(dormerRoofId) ? 0 : -elevation;

    const dormerMatrix = (
      new Matrix4()
        .makeTranslation(0, elevationOffset, 0)
        .multiply(new Matrix4().makeTranslation(-bias.x, -bias.y, -bias.z))
        .multiply(new Matrix4().makeRotationAxis(new Vector3(0, 1, 0), Math.atan2(wallDirection.z, wallDirection.x)))
        .multiply(new Matrix4().makeTranslation(-wallCenter.x, -wallCenter.y, -wallCenter.z))
    );

    dormerRoofGeometry.applyMatrix4(dormerMatrix);

    const wallCroppedByDormerRoof = CSG.subtract(new Mesh(geometry), new Mesh(dormerRoofGeometry));
    dormerRoofGeometry.dispose();

    return <primitive object={wallCroppedByDormerRoof.geometry} attach='geometry' />;
  }

  // Render without roof subtraction
  // Dormer walls should not be cut by the main roof (only by their dormer roof above)
  if(isNull(roofId) || isNull(roofGeometry) || excludeFromRoofCutting === true || !isNull(dormerRoofId)) {
    return <primitive object={geometry} attach='geometry' />;
  }

  // Render with roof subtraction
  const finalMatrix = (
    new Matrix4()
      .makeTranslation(0, floorThickness / 2 + wallHeight + elevation, 0)
      .multiply(new Matrix4().makeTranslation(-bias.x, -bias.y, -bias.z))
      .multiply(new Matrix4().makeRotationAxis(new Vector3(0, 1, 0), Math.atan2(wallDirection.z, wallDirection.x)))
      .multiply(new Matrix4().makeTranslation(-wallCenter.x, -wallCenter.y, -wallCenter.z))
  );

  roofGeometry.applyMatrix4(finalMatrix);
  const wallCroppedByRoof = CSG.subtract(new Mesh(geometry), new Mesh(roofGeometry));
  roofGeometry.dispose();

  return (
    <primitive object={wallCroppedByRoof.geometry} attach='geometry' />
  );
});

export type WallSidesProps = {
  id: WallProps['id'];
  frontTexture: WallProps['frontTexture'];
  backTexture: WallProps['backTexture'];
  wallHeight: WallProps['wallHeight'];
  wallThickness: WallProps['thickness'];
  furnitures: WallProps['furnitures'];
  elevation: number;
  w: number;
  isSelected: boolean;
  opacity: number;
  floorThickness: 0 | Positive;
  cornersDiff: ReturnType<typeof calculateWallCornersDiff>[number]['cornersDiff'];
  roofId: null | RoofId;
  wallCenter: Vector3;
  wallDirection: Vector3;
  frontColorOverlay: WallProps['frontColorOverlay'];
  backColorOverlay: WallProps['backColorOverlay'];
  frontCompositeOperation: WallProps['frontCompositeOperation'];
  backCompositeOperation: WallProps['backCompositeOperation'];
  polygonOffset: WallProps['polygonOffset'];
  isOverFloorPlan: boolean;
  excludeFromRoofCutting: WallProps['excludeFromRoofCutting'];
  dormerRoofId: WallProps['dormerRoofId'];
};

export const WallSides: React.FC<WallSidesProps> = SuspenseHOC(({
  id,
  excludeFromRoofCutting,
  isSelected,
  w,
  wallHeight,
  elevation,
  opacity,
  wallThickness,
  frontTexture,
  backTexture,
  furnitures,
  floorThickness,
  roofId,
  wallCenter,
  wallDirection,
  frontCompositeOperation,
  backCompositeOperation,
  frontColorOverlay: _frontColorOverlay,
  backColorOverlay: _backColorOverlay,
  polygonOffset,
  isOverFloorPlan,
  dormerRoofId,
  cornersDiff: {
    frontStart,
    frontEnd,
    backStart,
    backEnd,
  },
}) => {
  const { viewMode } = useViewMode();
  const { walls } = useWalls();
  const wall = walls.find(e => e.id === id) || null;
  const frontXf = wall?.frontTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const backXf = wall?.backTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
  const { roofs } = useRoofs();
  const { strapiAppConfig } = useStrapiAppConfigResolved();
  const { appearanceColor } = useAppearanceColor();
  const roofHeights = useRoofsWallSubtraction(s => s.roofHeights);

  const { wallTextureCenter } = strapiAppConfig.defaultTexturePalette;
  const _wallTextureCenterOverlayColor = getDefaultColorForTexture(wallTextureCenter.id);

  const { frontColorOverlay, backColorOverlay, centerColorOverlay } = (() => {
    const { slideUpMenuLvl2 } = useSlideUpMenuLvl2.getState();

    const centerColorOverlay = isNull(_wallTextureCenterOverlayColor) ? null : {
      type: 'predefined',
      value: new Color(_wallTextureCenterOverlayColor),
    } satisfies ColorOverlay;

    if(isNull(appearanceColor) || appearanceColor.type !== 'wallAppearance' || slideUpMenuLvl2.type !== appearanceColor.type || slideUpMenuLvl2.wallId !== id) {
      return {
        frontColorOverlay: _frontColorOverlay,
        backColorOverlay: _backColorOverlay,
        centerColorOverlay,
      };
    }

    return {
      frontColorOverlay: slideUpMenuLvl2.textureType === 'front' ? appearanceColor.color : _frontColorOverlay,
      backColorOverlay: slideUpMenuLvl2.textureType === 'back' ? appearanceColor.color : _backColorOverlay,
      centerColorOverlay,
    };
  })();

  const roof = (() => {
    if(isNull(roofId)) {
      return null;
    }

    const roof = getNotUndefined(roofs.find(e => e.id === roofId), 'Something went wrong. |j66cfw|');

    return roof.roofData.isVisible === false ? null : roof;
  })();

  let roofTotalHeight = 0;
  if(!isNull(roof) && roof.roofData.type !== 'flat' && viewMode === '3D') {
    if(!isNull(roofId) && roofId in roofHeights) {
      const val = roofHeights[roofId];
      if(!isUndefined(val)) {
        roofTotalHeight = val;
      }
    }
  }

  const frontWidth = w + frontEnd + frontStart;
  const backWidth = w + backEnd + backStart;
  const wallHeightWithFloorThickness = Positive(wallHeight + floorThickness);

  const frontRepeat = useMemo(() => ({
    x: (frontWidth / frontTexture.attributes.scale) / Math.max(0.01, frontXf.wScale),
    y: ((wallHeightWithFloorThickness + roofTotalHeight) / frontTexture.attributes.scale) / Math.max(0.01, frontXf.lScale),
  }), [frontWidth, frontTexture.attributes.scale, wallHeightWithFloorThickness, roofTotalHeight, frontXf.wScale, frontXf.lScale]);

  const backRepeat = useMemo(() => ({
    x: (backWidth / backTexture.attributes.scale) / Math.max(0.01, backXf.wScale),
    y: ((wallHeightWithFloorThickness + roofTotalHeight) / backTexture.attributes.scale) / Math.max(0.01, backXf.lScale),
  }), [backWidth, backTexture.attributes.scale, wallHeightWithFloorThickness, roofTotalHeight, backXf.wScale, backXf.lScale]);

  const centerRepeat = useMemo(() => ({
    x: -wallThickness / wallTextureCenter.attributes.scale,
    y: (wallHeightWithFloorThickness + roofTotalHeight) / wallTextureCenter.attributes.scale,
  }), [wallThickness, wallTextureCenter.attributes.scale, wallHeightWithFloorThickness, roofTotalHeight]);

  const frontFaceMapProps = useTextures(
    frontTexture.attributes.maps,
    useCallback(e => {
      e.center.set(0.5, 0.5);
      e.repeat.set(frontRepeat.x, frontRepeat.y);
      e.rotation = -(frontXf.rotateDeg * Math.PI) / 180;
    }, [frontRepeat, frontXf.rotateDeg]),
    {
      overlayColor: isNull(frontColorOverlay) ? null : frontColorOverlay.value,
      compositeOperation: frontCompositeOperation,
    },
  );

  const backFaceMapProps = useTextures(
    backTexture.attributes.maps,
    useCallback(e => {
      e.center.set(0.5, 0.5);
      e.repeat.set(backRepeat.x, backRepeat.y);
      e.rotation = -(backXf.rotateDeg * Math.PI) / 180;
    }, [backRepeat, backXf.rotateDeg]),
    {
      overlayColor: isNull(backColorOverlay) ? null : backColorOverlay.value,
      compositeOperation: backCompositeOperation,
    },
  );

  const centerFaceMapProps = useTextures(
    wallTextureCenter.attributes.maps,
    useCallback(e => e.repeat.set(centerRepeat.x, centerRepeat.y), [centerRepeat]),
    {
      overlayColor: isNull(centerColorOverlay) ? null : centerColorOverlay.value,
      compositeOperation: compositeOperations[0],
    },
  );

  const n = 0.005;
  const wThickDiv2 = (wallThickness + n) / 2;
  const correctedWallThickness = Positive(wallThickness + 2 * n);

  const frontStartPoint = useMemo(() => new Vector2(-(w / 2 + frontStart), wallThickness / 2), [frontStart, w, wallThickness]);
  const frontEndPoint = useMemo(() => new Vector2(w / 2 + frontEnd, wallThickness / 2), [frontEnd, w, wallThickness]);
  const backStartPoint = useMemo(() => new Vector2(-(w / 2 + backStart), -wallThickness / 2), [backStart, w, wallThickness]);
  const backEndPoint = useMemo(() => new Vector2(w / 2 + backEnd, -wallThickness / 2), [backEnd, w, wallThickness]);
  const wallStartPoint = useMemo(() => new Vector2(-w / 2, 0), [w]);
  const wallEndPoint = useMemo(() => new Vector2(w / 2, 0), [w]);

  const shape = useMemo(() => (
    new Shape([
      wallStartPoint,
      frontStartPoint,
      frontEndPoint,
      wallEndPoint,
      backEndPoint,
      backStartPoint,
    ])
  ), [wallStartPoint, frontStartPoint, frontEndPoint, wallEndPoint, backEndPoint, backStartPoint]);

  const wallGeometry = useMemo(() => {
    const wallGeometry = new ExtrudeGeometry(shape, {
      depth: wallHeightWithFloorThickness + roofTotalHeight,
      bevelEnabled: false,
    });
    wallGeometry.rotateX(Math.PI / 2);

    return wallGeometry;
  }, [shape, wallHeightWithFloorThickness, roofTotalHeight]);
  useEffect(() => (
    () => {
      wallGeometry.dispose();
    }
  ), [wallGeometry]);

  const frontGeometry = useMemo(() => (
    new BoxGeometry(frontWidth, wallHeightWithFloorThickness + roofTotalHeight, n)
  ), [frontWidth, wallHeightWithFloorThickness, roofTotalHeight]);
  useEffect(() => (
    () => {
      frontGeometry.dispose();
    }
  ), [frontGeometry]);

  const backGeometry = useMemo(() => (
    new BoxGeometry(backWidth, wallHeightWithFloorThickness + roofTotalHeight, n)
  ), [backWidth, wallHeightWithFloorThickness, roofTotalHeight]);
  useEffect(() => (
    () => {
      backGeometry.dispose();
    }
  ), [backGeometry]);

  const sharedCenterMaterial = useSharedMaterial({
    mapProps: centerFaceMapProps,
    repeat: centerRepeat,
    overlayColor: centerColorOverlay?.value ?? null,
    compositeOperation: compositeOperations[0],
    isSelected,
    is2D: viewMode === '2D',
    opacity,
    polygonOffset: isSelected === true,
    polygonOffsetUnits: polygonOffset - 1,
    polygonOffsetFactor: 0,
    isOverFloorPlan,
  });

  const commonMaterialParams = {
    isSelected,
    is2D: viewMode === '2D',
    opacity,
    polygonOffset: true,
    polygonOffsetUnits: polygonOffset,
    polygonOffsetFactor: 0,
    isOverFloorPlan,
  };

  const sharedFrontMaterial = useSharedMaterial({
    ...commonMaterialParams,
    mapProps: frontFaceMapProps,
    repeat: frontRepeat,
    overlayColor: frontColorOverlay?.value ?? null,
    compositeOperation: frontCompositeOperation,
  });

  const sharedBackMaterial = useSharedMaterial({
    ...commonMaterialParams,
    mapProps: backFaceMapProps,
    repeat: backRepeat,
    overlayColor: backColorOverlay?.value ?? null,
    compositeOperation: backCompositeOperation,
  });

  const ref = useRef<Group>(null);
  useEffect(() => {
    assert(!isNull(ref.current), 'Something went wrong. |hc3d98|');

    enableOutlineLayer(ref.current);
  }, []);

  return (
    <group
      ref={ref}
      position-y={-floorThickness / 2}
      onPointerUp={handleAppearanceSample}
    >
      <mesh
        {...getShadowProps()}
        ref={useRefWithUV2(centerFaceMapProps)}
        material={sharedCenterMaterial}
        visible={w > 0}
        position-y={wallHeightWithFloorThickness / 2 + roofTotalHeight}
        userData={{
          appearance: {
            texture: wallTextureCenter,
            overlay: centerColorOverlay,
          },
        }}
      >
        <CustomModelGeometry
          is2D={viewMode === '2D'}
          wallGeometry={wallGeometry}
          roofId={roofId}
          furnitures={furnitures}
          wallThickness={correctedWallThickness}
          wallDirection={wallDirection}
          wallHeight={wallHeight}
          wallCenter={wallCenter}
          bias={new Vector3(0, wallHeightWithFloorThickness / 2 + roofTotalHeight, 0)}
          roofTotalHeight={roofTotalHeight}
          floorThickness={floorThickness}
          position={new Vector3(0, -wallHeightWithFloorThickness / 2, 0).add(new Vector3(0, floorThickness, 0))}
          elevation={elevation}
          excludeFromRoofCutting={excludeFromRoofCutting}
          dormerRoofId={dormerRoofId}
        />
      </mesh>
      <mesh
        {...getShadowProps()}
        ref={useRefWithUV2(frontFaceMapProps)}
        material={sharedFrontMaterial}
        visible={w > 0 && viewMode === '3D'}
        position-z={wThickDiv2}
        position-y={roofTotalHeight / 2}
        position-x={(frontEnd - frontStart) / 2}
        userData={{
          appearance: {
            texture: frontTexture,
            transform: frontXf,
            overlay: frontColorOverlay,
          },
        }}
      >
        <CustomModelGeometry
          is2D={viewMode === '2D'}
          wallGeometry={frontGeometry}
          roofId={roofId}
          furnitures={furnitures}
          wallThickness={correctedWallThickness}
          wallDirection={wallDirection}
          wallHeight={wallHeight}
          wallCenter={wallCenter}
          bias={new Vector3((frontEnd - frontStart) / 2, roofTotalHeight / 2, wThickDiv2)}
          roofTotalHeight={roofTotalHeight}
          floorThickness={floorThickness}
          position={new Vector3(-(frontEnd - frontStart) / 2, floorThickness + roofTotalHeight / 2, -wThickDiv2)}
          elevation={elevation}
          excludeFromRoofCutting={excludeFromRoofCutting}
          dormerRoofId={dormerRoofId}
        />
      </mesh>
      <mesh
        {...getShadowProps()}
        ref={useRefWithUV2(backFaceMapProps)}
        material={sharedBackMaterial}
        visible={w > 0 && viewMode === '3D'}
        position-z={-wThickDiv2}
        position-y={roofTotalHeight / 2}
        position-x={(backEnd - backStart) / 2}
        userData={{
          appearance: {
            texture: backTexture,
            transform: backXf,
            overlay: backColorOverlay,
          },
        }}
      >
        <CustomModelGeometry
          is2D={viewMode === '2D'}
          wallGeometry={backGeometry}
          roofId={roofId}
          furnitures={furnitures}
          wallThickness={correctedWallThickness}
          wallDirection={wallDirection}
          wallHeight={wallHeight}
          wallCenter={wallCenter}
          bias={new Vector3((backEnd - backStart) / 2, roofTotalHeight / 2, -wThickDiv2)}
          roofTotalHeight={roofTotalHeight}
          floorThickness={floorThickness}
          position={new Vector3((backEnd - backStart) / 2, floorThickness + roofTotalHeight / 2, wThickDiv2)}
          elevation={elevation}
          excludeFromRoofCutting={excludeFromRoofCutting}
          dormerRoofId={dormerRoofId}
        />
      </mesh>
    </group>
  );
});
