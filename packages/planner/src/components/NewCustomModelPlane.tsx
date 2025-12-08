import { Plane, useGLTF } from '@react-three/drei';
import { DoubleSide, Mesh, Vector3 } from 'three';
import { NODE_ENV } from '@draw-house/common/dist/envVariables/public';
import { Suspense, useEffect, useRef } from 'react';
import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import assert from 'assert';
import { CustomModelId } from '@draw-house/common/dist/brands';
import { generateUUID } from '@draw-house/common/dist/utils';
import { useThree } from '@react-three/fiber';
import { floorSquareSize } from '../constants';
import { addAndSelectAsset2D, addCustomModel, setCursor, useCreationMode, useCustomModels, useGlobalSettings, useLevels } from '../zustand';
import { useCatalogDataResolved } from '../zustand/useCatalogData';
import { clearNewCustomModelSnapWorldPosition, useNewCustomModelPosition } from '../zustand/useNewCustomModelPosition';
import { NewCustomModelStore, useNewCustomModel } from '../zustand/useNewCustomModel';
import { CustomModelCategory } from '../zod/CustomModelCategory';
import { makeUniqueName } from '../utils/makeUniqueName';
import { DEFAULT_LAYER, GHOST_MODE_LAYER } from './ActiveRaycasterLayersManager';
import { useSelectedItem } from '../zustand/useSelectedItem';
import { PreloaderCircle } from './PreloaderCircle';
import { getClampedViewportPointPlaneIntersection } from './PlacementAreaPreview';

type _NewCUstomModelPlaneProps = {
  newCustomModel: NonNullable<NewCustomModelStore['newCustomModel']>;
  childrenType: CustomModelCategory['childrenType'];
  placementAreaPosition: Vector3 | null;
};

const _NewCustomModelPlane: React.FC<_NewCUstomModelPlaneProps> = ({ newCustomModel, childrenType, placementAreaPosition }) => {
  const { models } = useCatalogDataResolved().catalogData;
  const { levels } = useLevels();
  const ref = useRef<Mesh>(null);

  const { url, distanceToFloor, name } = getNotUndefined(models.find(e => e.id === newCustomModel.strapiId), 'This should never happen. |m37kbp|');
  const { elevation, id } = getNotUndefined(levels.find(e => e.isActive), 'Something went wrong. |xnh43e|');

  const { scene } = useGLTF(childrenType !== 'assets-2d' ? url : '/stub.glb');

  useEffect(() => {
    assert(!isNull(ref.current), 'Something went wrong. |3way33|');

    ref.current.layers.enable(DEFAULT_LAYER);
    ref.current.layers.enable(GHOST_MODE_LAYER);
  }, []);

  useEffect(() => {
    if(newCustomModel.isSelectedFromCatalog === false) {
      return;
    }

    const position = (
      isNull(placementAreaPosition)
        ? new Vector3(0, elevation + distanceToFloor, 0)
        : placementAreaPosition.add(new Vector3(0, distanceToFloor, 0))
    );

    if(childrenType === 'assets-2d') {
      const { customModels } = useCustomModels.getState();
      const { models } = useCatalogDataResolved.getState().catalogData;
      const { category } = getNotUndefined(models.find(e => e.id === newCustomModel.strapiId), 'This should never happen. |q5i3da|');
      const uniqueName = makeUniqueName(name, customModels.map(e => e.commentName));

      useCreationMode.setState({ creationMode: 'pointer' });
      addAndSelectAsset2D({
        url,
        position,
        levelId: id,
        commentName: uniqueName,
        tilt: category.tilt,
      });
    } else {
      const modelId = CustomModelId(generateUUID());
      addCustomModel({
        id: modelId,
        url,
        position,
        levelId: id,
        scene,
        isColumn: childrenType === 'columns',
        width: newCustomModel.width,
        height: newCustomModel.height,
        depth: newCustomModel.depth,
        quaternion: newCustomModel.quaternion,
        overrideMaterials: newCustomModel.overrideMaterials,
        isFlippedHorizontal: newCustomModel.isFlippedHorizontal,
        isMirrored: newCustomModel.isMirrored,
        commentName: newCustomModel.commentName,
        isHidden: newCustomModel.isHidden,
        appearanceOptionsShown: newCustomModel.appearanceOptionsShown,
        appearanceOptionsExceptionTextureNames: newCustomModel.appearanceOptionsExceptionTextureNames,
      });

      useSelectedItem.setState({ selectedItem: { id: modelId, type: 'customModel', mode: 'selected' } });
    }

    useNewCustomModel.setState(useNewCustomModel.getInitialState());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Plane
      ref={ref}
      userData={{ isNotPartOfLevelObjects: true }}
      args={[floorSquareSize, floorSquareSize]}
      position-y={elevation}
      rotation-x={-Math.PI / 2}
      renderOrder={2}
      onPointerEnter={e => {
        e.stopPropagation();
        setCursor('pointer');
      }}
      onPointerMove={e => {
        e.stopPropagation();

        const next = new Vector3(
          e.point.x,
          e.point.y + distanceToFloor,
          e.point.z,
        );

        const { lastSnapWorldPosition } = useNewCustomModelPosition.getState();

        if(!isNull(lastSnapWorldPosition)) {
          const dx = next.x - lastSnapWorldPosition.x;
          const dz = next.z - lastSnapWorldPosition.z;
          const dist = Math.hypot(dx, dz);

          const { snapDistanceFactor } = useGlobalSettings.getState();
          const snapDistance = snapDistanceFactor / 10;

          if(dist > snapDistance) {
            clearNewCustomModelSnapWorldPosition();
          }
        }

        useNewCustomModelPosition.setState({
          newCustomModelPosition: next,
        });
      }}
      onPointerLeave={e => {
        e.stopPropagation();
        setCursor(null);
      }}
      onPointerUp={e => {
        if(e.button !== 0) {
          return;
        }
        e.stopPropagation();

        const { lastSnapWorldPosition, newCustomModelPosition } = useNewCustomModelPosition.getState();
        const finalPosition = !isNull(lastSnapWorldPosition) ? lastSnapWorldPosition : newCustomModelPosition;
        const { customModels } = useCustomModels.getState();
        const { models } = useCatalogDataResolved.getState().catalogData;

        const { category } = getNotUndefined(models.find(e => e.id === newCustomModel.strapiId), 'This should never happen. |w4oz59|');
        const customModelId = CustomModelId(generateUUID());

        if(childrenType === 'assets-2d') {
          const uniqueName = makeUniqueName(name, customModels.map(e => e.commentName));

          useCreationMode.setState({ creationMode: 'pointer' });
          addAndSelectAsset2D({
            url,
            position: finalPosition,
            levelId: id,
            commentName: uniqueName,
            tilt: category.tilt,
          });
        } else {
          addCustomModel({
            id: customModelId,
            url,
            position: finalPosition,
            levelId: id,
            scene,
            isColumn: childrenType === 'columns',
            width: newCustomModel.width,
            height: newCustomModel.height,
            depth: newCustomModel.depth,
            quaternion: newCustomModel.quaternion,
            overrideMaterials: newCustomModel.overrideMaterials,
            isFlippedHorizontal: newCustomModel.isFlippedHorizontal,
            isMirrored: newCustomModel.isMirrored,
            commentName: newCustomModel.commentName,
            isHidden: newCustomModel.isHidden,
            appearanceOptionsExceptionTextureNames: newCustomModel.appearanceOptionsExceptionTextureNames,
            appearanceOptionsShown: newCustomModel.appearanceOptionsShown,
          });

          useNewCustomModel.setState({
            newCustomModel: {
              ...newCustomModel,
              lastCopiedModelId: customModelId,
            },
          });
        }

        if(newCustomModel.needToStopAfterFirstSet === true) {
          useNewCustomModel.setState(useNewCustomModel.getInitialState());
          useSelectedItem.setState({
            selectedItem: {
              id: customModelId,
              type: 'customModel',
              mode: 'selected',
            },
          });
        }
      }}
    >
      <meshStandardMaterial
        transparent
        opacity={NODE_ENV === 'production' ? 0 : 0.1}
        color='green'
        side={DoubleSide}
      />
    </Plane>
  );
};

export const NewCustomModelPlane: React.FC = () => {
  const { models } = useCatalogDataResolved().catalogData;
  const { newCustomModel } = useNewCustomModel();
  const { camera } = useThree();
  const { elevation } = getNotUndefined(useLevels.getState().levels.find(e => e.isActive), 'Something went wrong. |5y23ls|');
  const placementAreaPosition = getClampedViewportPointPlaneIntersection(camera, elevation, floorSquareSize);

  return (
    isNull(newCustomModel)
      ? null
      : (
        <Suspense fallback={<PreloaderCircle placementAreaPosition={placementAreaPosition} elevation={elevation} />}>
          <_NewCustomModelPlane
            placementAreaPosition={placementAreaPosition}
            newCustomModel={newCustomModel}
            childrenType={
              getNotUndefined(
                models.find(({ id }) => id === newCustomModel.strapiId),
                'Something went wrong. |r9h4u0|',
              ).category.childrenType
            }
          />
        </Suspense>
      )
  );
};
