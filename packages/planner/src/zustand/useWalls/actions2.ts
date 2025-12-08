import { LevelId, Positive, WallFurnitureId, WallId } from '@draw-house/common/dist/brands';
import { capitalize, fixIEEE, generateUUID } from '@draw-house/common/dist/utils';
import { getNotUndefined, isNull, isNullish, isUndefined, Unionize, ValueOf } from '@arthurka/ts-utils';
import { Vector2 } from 'three';
import { routes } from '@draw-house/common/dist/zod';
import Color from 'color';
import { useWalls, WallsStore } from './store';
import { TempWallsStore, useTempWalls } from '../useTempWalls/store';
import { useWallMover } from '../useWallMover';
import { applyQuaternionAroundPivot, getFlipHorizontalMirrorNextStep, isColinear } from '../../utils/helpers';
import { addWallsToSpace, makeSpaces, refreshSpaces, replaceWallsInSpaces } from '../useSpaces/actions';
import { useSpaces } from '../useSpaces/store';
import { useHipRoofTempGableIndicesData } from '../useHipRoofTempGableIndicesData';
import { crossLineSegmentsForOneWall } from '../../utils/crossLineSegmentsForOneWall';
import { extendedJSON } from '../../utils/safeJSONParse';
import { setRoofParams } from '../useRoofs/actions';
import { assets2DDefaultSize, compositeOperations } from '../../constants';
import type { SlideUpMenuLvl2Store } from '../slideUpMenus';
import { clearFutureWalls } from './actions1';
import { useStrapiAppConfigResolved } from '../useStrapiAppConfig';
import { CustomModelsStore } from '../useCustomModels/store';
import { useGlobalSettings } from '../useGlobalSettings/store';
import { getFurnitureWallY } from '../../utils/furnitureHelpers';
import { useLevels } from '../useLevels/store';
import { dispatchInfoPanelEvent } from '../../utils/dispatchInfoPanelEvent';
import { useCreationModeConfig } from '../useCreationModeConfig';
import { DEFAULT_TEXTURE_TRANSFORM, TextureTransform, TextureTransformSchema } from '../../zod/TextureTransform';
import { getWallType } from '../../utils/getWallType';
import { getDefaultColorForTexture } from '../../utils/getDefaultColorForTexture';
import { updateRoofsSubtractions } from '../useRoofsWallSubtraction/actions';
import { lang } from '../../lang';
import { getAndIncreaseAmountCounter } from '../useAmountCounters';

const updateWalls = (makeNewWalls: (walls: WallsStore['walls']) => WallsStore['walls']) => {
  const { walls } = useWalls.getState();
  const newWalls = clearFutureWalls(makeNewWalls(walls));

  if(extendedJSON.stringify(newWalls) !== extendedJSON.stringify(walls)) {
    useWalls.setState({ walls: newWalls });
    refreshSpaces();
  }
};

export const removeWalls = (wallsData: Array<{ oldWallId: WallId; newWallIds: WallId[] }>) => {
  replaceWallsInSpaces(wallsData);
  updateWalls(walls => (
    walls.filter(({ id }) => !wallsData.find(e => e.oldWallId === id))
  ));
  window.setTimeout(() => {
    updateRoofsSubtractions();
  }, 0);
};

const splitWalls = () => {
  const { walls } = useWalls.getState();
  const { spaces } = useSpaces.getState();

  const newWallsData = (
    walls
      .map(e => {
        const levelWalls = walls.filter(({ id, levelId }) => id !== e.id && levelId === e.levelId);

        return {
          oldWall: e,
          newSplittedParts: crossLineSegmentsForOneWall(e.position, levelWalls.map(e => e.position)),
        };
      })
      .filter(e => e.newSplittedParts.length > 1)
      .map(({ oldWall, newSplittedParts }) => {
        const oldVector = new Vector2().subVectors(oldWall.position.start, oldWall.position.end);
        const oldCenter = new Vector2().addVectors(oldWall.position.start, oldWall.position.end).divideScalar(2);

        return {
          oldWall,
          newWalls: newSplittedParts.map(({ start, end }) => {
            const newPosition = {
              start: new Vector2(fixIEEE(start.x), fixIEEE(start.y)),
              end: new Vector2(fixIEEE(end.x), fixIEEE(end.y)),
            };
            const newVector = new Vector2().subVectors(newPosition.start, newPosition.end);
            const newCenter = new Vector2().addVectors(newPosition.start, newPosition.end).divideScalar(2);
            const lookToTheSameDirection = isColinear(oldVector, newVector);
            const sameDirectionSign = lookToTheSameDirection === true ? 1 : -1;
            const centersDiff = new Vector2().subVectors(newCenter, oldCenter).multiplyScalar(sameDirectionSign);
            const lookToTheSameDirection2 = isColinear(oldVector, centersDiff);

            return {
              ...oldWall,
              id: WallId(generateUUID()),
              position: newPosition,
              furnitures: oldWall.furnitures.map(e => {
                const onWallCoordinateX = (
                  sameDirectionSign * e.onWallCoordinateX + (lookToTheSameDirection2 === true ? 1 : -1) * centersDiff.length()
                );

                return {
                  ...e,
                  id: WallFurnitureId(generateUUID()),
                  onWallCoordinateX,
                  isFlippedHorizontal: e.isFlippedHorizontal === lookToTheSameDirection,
                };
              }),
            };
          }),
        };
      })
  );

  removeWalls(newWallsData.map(e => ({
    oldWallId: e.oldWall.id,
    newWallIds: e.newWalls.map(e => e.id),
  })));
  updateWalls(walls => [
    ...walls,
    ...newWallsData.flatMap(e => e.newWalls),
  ]);

  for(const { oldWall, newWalls } of newWallsData) {
    const targetSpaces = spaces.filter(e => e.walls.includes(oldWall.id));

    for(const { id } of targetSpaces) {
      addWallsToSpace(id, newWalls.map(e => e.id));
    }
  }
};

export const createWallsFromTempWalls = () => {
  const { defaultExteriorWallThickness } = useGlobalSettings.getState();
  const { tempWalls } = useTempWalls.getState();

  if(tempWalls.length === 0) {
    return false;
  }

  useTempWalls.setState(useTempWalls.getInitialState());
  updateWalls(walls => [
    ...walls,
    ...tempWalls.map(e => ({
      ...e,
      thickness: defaultExteriorWallThickness,
      commentName: lang.wallName(getAndIncreaseAmountCounter('wall')),
    })),
  ]);
  dispatchInfoPanelEvent('first-wall-drawn');
  splitWalls();
  makeSpaces({
    onNewSpaceCreated() {
      dispatchInfoPanelEvent('first-space-completed');
    },
  });
};

export const removeLevelWalls = (levelId: LevelId) => {
  const { walls } = useWalls.getState();

  removeWalls(walls.filter(e => e.levelId === levelId).map(e => ({
    oldWallId: e.id,
    newWallIds: [],
  })));
};

export const removeWallFurniture = (id: WallFurnitureId) => {
  updateWalls(walls => (
    walls.map(e => ({
      ...e,
      furnitures: e.furnitures.filter(e => e.id !== id),
    }))
  ));
};

type AddWallFurnitureParams = {
  targetWallId: WallsStore['walls'][number]['id'];
  furniture: WallsStore['walls'][number]['furnitures'][number];
};
export const addWallFurniture = ({ targetWallId, furniture }: AddWallFurnitureParams) => {
  updateWalls(walls => (
    walls.map(e => ({
      ...e,
      furnitures: [
        ...e.furnitures.filter(e => e.id !== furniture.id),
        e.id === targetWallId && furniture,
      ].filter(e => e !== false),
    }))
  ));
};

export const setWallFurnitureParams = (
  wallFurnitureId: WallsStore['walls'][number]['furnitures'][number]['id'],
  applyToAll: null | Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'wallFurnitureAppearance' }>['applyToAll'],
  params: Unionize<Pick<WallsStore['walls'][number]['furnitures'][number], 'type' | 'isFlippedHorizontal' | 'isMirrored' | 'width' | 'height' | 'depth' | 'url' | 'onWallCoordinateY' | 'overrideMaterials' | 'isHidden'>>,
) => {
  updateWalls(walls => {
    const targetWallFurniture = walls.flatMap(e => e.furnitures).find(e => e.id === wallFurnitureId);
    if(isUndefined(targetWallFurniture)) {
      return walls;
    }

    const getLevelId = (wallFurnitureId: WallFurnitureId) => {
      const { levelId } = getNotUndefined(walls.find(e => !isUndefined(e.furnitures.find(e => e.id === wallFurnitureId))), 'Something went wrong. |069jt5|');

      return levelId;
    };

    const levelId = getLevelId(wallFurnitureId);

    return walls.map(e => ({
      ...e,
      furnitures: e.furnitures.map(e => {
        const isUpdate = (
          false
            || e.id === wallFurnitureId
            || !isNull(applyToAll) && applyToAll.isActive === true && e.url === targetWallFurniture.url && (
              false
                || applyToAll.type === 'sameWallFurnitures'
                || applyToAll.type === 'sameLevelSameWallFurnitures' && getLevelId(e.id) === levelId
            )
        );

        return isUpdate === false ? e : {
          ...e,
          ...params,
        };
      }),
    }));
  });
};

export const updateWallsFromWallMover = () => {
  const { tempWalls } = useTempWalls.getState();
  const { wallMover } = useWallMover.getState();
  const { hipRoofTempGableIndicesData } = useHipRoofTempGableIndicesData.getState();
  const { walls } = useWalls.getState();

  if(isNull(wallMover)) {
    // Note: on mobile triggers onPointerUp and onPointerLeave
    return null;
  }

  useWallMover.setState({ wallMover: null });
  useTempWalls.setState(useTempWalls.getInitialState());
  updateWalls(walls => [...walls, ...tempWalls]);

  for(const [spaceId, activeGableIndices] of hipRoofTempGableIndicesData.entries()) {
    setRoofParams(spaceId, null, { activeGableIndices });
  }
  useHipRoofTempGableIndicesData.setState(useHipRoofTempGableIndicesData.getInitialState());
  splitWalls();
  makeSpaces();

  if(wallMover.type === 'parallel') {
    const { walls: newWalls } = useWalls.getState();
    const { position } = getNotUndefined(walls.find(e => e.id === wallMover.wallId), 'This should never happen. |x6w5pk|');
    const newWall = newWalls.find(e => e.id === wallMover.wallId);
    if(isUndefined(newWall)) {
      return null;
    }

    return {
      theSameCoordinates: position.start.equals(newWall.position.start) && position.end.equals(newWall.position.end),
      wallId: wallMover.wallId,
    };
  }

  return null;
};

export const setWallParams = (
  wallId: WallsStore['walls'][number]['id'],
  params: Unionize<Pick<WallsStore['walls'][number], 'thickness' | 'commentName' | 'isVisible' | 'height' | 'isHidden'>>,
) => {
  updateWalls(walls => (
    walls.map(e => e.id !== wallId ? e : {
      ...e,
      ...params,
    })
  ));
};

export const setWallSideParams = (
  wallId: WallsStore['walls'][number]['id'],
  applyToAll: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'wallAppearance' }>['applyToAll'],
  wallSide: Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'wallAppearance' }>['textureType'],
  params: Unionize<{
    texture: WallsStore['walls'][number]['frontTexture'];
    colorOverlay: WallsStore['walls'][number]['frontColorOverlay'];
    compositeOperation: WallsStore['walls'][number]['frontCompositeOperation'];
    commentTextureAppearance: WallsStore['walls'][number]['commentFrontTextureAppearance'];
    commentTextureOverlayColor: WallsStore['walls'][number]['commentFrontTextureOverlayColor'];
    textureTransform?: TextureTransform;
    resetTransform?: boolean;
  }>,
) => {
  updateWalls(walls => {
    if(params === undefined) {
      return walls;
    }

    const { spaces } = useSpaces.getState();

    const targetWall = getNotUndefined(walls.find(e => e.id === wallId), 'Something went wrong. |21eft5|');
    const targetSpaces = spaces.filter(({ walls }) => walls.includes(targetWall.id)).map(e => e.id);
    const otherWallSide = ({
      front: 'back',
      back: 'front',
    } satisfies Record<typeof wallSide, typeof wallSide>)[wallSide];

    return walls.map(e => {
      const isTheSameType = isNull(targetWall[`${wallSide}SideSpaceId`]) === isNull(e[`${wallSide}SideSpaceId`]);
      const isTheSameOtherType = isNull(targetWall[`${wallSide}SideSpaceId`]) === isNull(e[`${otherWallSide}SideSpaceId`]);
      const _spaces = spaces.filter(({ walls }) => walls.includes(e.id)).map(e => e.id);
      const _targetSpaces = (() => {
        const e = targetWall[`${wallSide}SideSpaceId`];

        return isNull(e) ? targetSpaces : [e];
      })();

      const applyToWallSide = (
        false
          || e.id === wallId
          || applyToAll.isActive === true && (
            false
              || applyToAll.type === 'sameFaceWallFaces' && isTheSameType === true
              || applyToAll.type === 'sameFaceSameLevelWallFaces' && e.levelId === targetWall.levelId && isTheSameType === true
              || applyToAll.type === 'sameFaceSameSpaceWallFaces' && _targetSpaces.some(e => _spaces.includes(e)) && targetWall[`${wallSide}SideSpaceId`] === e[`${wallSide}SideSpaceId`]
          )
      );
      const applyToOtherWallSide = applyToAll.isActive === true && (
        false
          || applyToAll.type === 'sameFaceWallFaces' && isTheSameOtherType === true
          || applyToAll.type === 'sameFaceSameLevelWallFaces' && e.levelId === targetWall.levelId && isTheSameOtherType === true
          || applyToAll.type === 'sameFaceSameSpaceWallFaces' && _targetSpaces.some(e => _spaces.includes(e)) && targetWall[`${wallSide}SideSpaceId`] === e[`${otherWallSide}SideSpaceId`]
      );

      const updateParams: Partial<typeof e> = {};

      if('texture' in params) {
        if(applyToWallSide === true) {
          updateParams[`${wallSide}Texture`] = params.texture;
        }
        if(applyToOtherWallSide === true) {
          updateParams[`${otherWallSide}Texture`] = params.texture;
        }
      }
      if('colorOverlay' in params) {
        if(applyToWallSide === true) {
          updateParams[`${wallSide}ColorOverlay`] = params.colorOverlay;
        }
        if(applyToOtherWallSide === true) {
          updateParams[`${otherWallSide}ColorOverlay`] = params.colorOverlay;
        }
      }
      if('compositeOperation' in params) {
        if(applyToWallSide === true) {
          updateParams[`${wallSide}CompositeOperation`] = params.compositeOperation;
        }
        if(applyToOtherWallSide === true) {
          updateParams[`${otherWallSide}CompositeOperation`] = params.compositeOperation;
        }
      }
      if('commentTextureAppearance' in params) {
        if(applyToWallSide === true) {
          updateParams[`comment${capitalize(wallSide)}TextureAppearance`] = params.commentTextureAppearance;
        }
        if(applyToOtherWallSide === true) {
          updateParams[`comment${capitalize(otherWallSide)}TextureAppearance`] = params.commentTextureAppearance;
        }
      }
      if('commentTextureOverlayColor' in params) {
        if(applyToWallSide === true) {
          updateParams[`comment${capitalize(wallSide)}TextureOverlayColor`] = params.commentTextureOverlayColor;
        }
        if(applyToOtherWallSide === true) {
          updateParams[`comment${capitalize(otherWallSide)}TextureOverlayColor`] = params.commentTextureOverlayColor;
        }
      }

      if('resetTransform' in params && params.resetTransform === true) {
        if(applyToWallSide === true) {
          if(wallSide === 'front') {
            updateParams.frontTextureTransform = { ...DEFAULT_TEXTURE_TRANSFORM };
          } else {
            updateParams.backTextureTransform = { ...DEFAULT_TEXTURE_TRANSFORM };
          }
        }
        if(applyToOtherWallSide === true) {
          if(otherWallSide === 'front') {
            updateParams.frontTextureTransform = { ...DEFAULT_TEXTURE_TRANSFORM };
          } else {
            updateParams.backTextureTransform = { ...DEFAULT_TEXTURE_TRANSFORM };
          }
        }
      }

      if('textureTransform' in params && params.textureTransform) {
        if(applyToWallSide === true) {
          if(wallSide === 'front') {
            const curr = e.frontTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
            const parsed = TextureTransformSchema.safeParse({ ...curr, ...params.textureTransform });
            updateParams.frontTextureTransform = parsed.success ? parsed.data : curr;
          } else {
            const curr = e.backTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
            const parsed = TextureTransformSchema.safeParse({ ...curr, ...params.textureTransform });
            updateParams.backTextureTransform = parsed.success ? parsed.data : curr;
          }
        }
        if(applyToOtherWallSide === true) {
          if(otherWallSide === 'front') {
            const currOther = e.frontTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
            const parsedOther = TextureTransformSchema.safeParse({ ...currOther, ...params.textureTransform });
            updateParams.frontTextureTransform = parsedOther.success ? parsedOther.data : currOther;
          } else {
            const currOther = e.backTextureTransform ?? DEFAULT_TEXTURE_TRANSFORM;
            const parsedOther = TextureTransformSchema.safeParse({ ...currOther, ...params.textureTransform });
            updateParams.backTextureTransform = parsedOther.success ? parsedOther.data : currOther;
          }
        }
      }

      return {
        ...e,
        ...updateParams,
      };
    });
  });
};

export const setWallFurnitureOverrideMaterialParams = (
  wallFurnitureId: WallsStore['walls'][number]['furnitures'][number]['id'],
  materialName: string,
  applyToAll: null | Extract<SlideUpMenuLvl2Store['slideUpMenuLvl2'], { type: 'wallFurnitureAppearance' }>['applyToAll'],
  params: Unionize<Pick<ValueOf<WallsStore['walls'][number]['furnitures'][number]['overrideMaterials']>, 'texture' | 'compositeOperation' | 'commentTextureOverlayColor' | 'commentTextureAppearance' | 'textureTransform' | 'colorOverlay'>>,
) => {
  const { walls } = useWalls.getState();
  const targetWallFurniture = walls.flatMap(e => e.furnitures).find(e => e.id === wallFurnitureId);
  if(isUndefined(targetWallFurniture)) {
    return;
  }

  const overrideMaterial = isNull(targetWallFurniture.overrideMaterials) ? null : targetWallFurniture.overrideMaterials[materialName];

  if(!isNullish(overrideMaterial)) {
    setWallFurnitureParams(wallFurnitureId, applyToAll, {
      overrideMaterials: {
        ...targetWallFurniture.overrideMaterials,
        [materialName]: {
          ...overrideMaterial,
          ...params,
        },
      },
    });
    return;
  }

  if(isUndefined(params)) {
    return;
  }

  if('texture' in params) {
    setWallFurnitureParams(wallFurnitureId, applyToAll, {
      overrideMaterials: {
        ...targetWallFurniture.overrideMaterials,
        [materialName]: {
          colorOverlay: null,
          compositeOperation: compositeOperations[0],
          commentTextureAppearance: '',
          commentTextureOverlayColor: '',
          textureTransform: DEFAULT_TEXTURE_TRANSFORM,
          ...params,
        },
      },
    });
  }
};

export const flipHorizontalOrMirrorFurniture = (furnitureId: WallFurnitureId) => {
  const { walls } = useWalls.getState();
  const furniture = getNotUndefined(walls.flatMap(e => e.furnitures).find(e => e.id === furnitureId), 'Something went wrong. |21t3m6|');

  const { isFlippedHorizontal, isMirrored } = getFlipHorizontalMirrorNextStep(furniture);

  setWallFurnitureParams(furnitureId, null, { isFlippedHorizontal, isMirrored });
};

export const importScanDataFromFloorScanner = (
  { aspectRatio, wallsData }: Extract<routes.floorPlanImage.scan.RouteResponse, { success: true }>['data'],
  asset2D: Extract<CustomModelsStore['customModels'][number], { type: 'asset-2d' }>,
) => {
  const { defaultExteriorWallThickness, defaultInteriorWallThickness } = useGlobalSettings.getState();
  const { levels } = useLevels.getState();
  const { strapiAppConfig } = useStrapiAppConfigResolved.getState();

  useTempWalls.setState({
    tempWalls: wallsData.map(({ wallFurnitures, position: { start, end } }): TempWallsStore['tempWalls'][number] => {
      const position = {
        start: applyQuaternionAroundPivot(asset2D.position, asset2D.quaternion, new Vector2(
          fixIEEE(asset2D.position.x + (start.x - 0.5) * assets2DDefaultSize * asset2D.scale),
          fixIEEE(asset2D.position.z + (start.y - 0.5) * assets2DDefaultSize * asset2D.scale / aspectRatio),
        )),
        end: applyQuaternionAroundPivot(asset2D.position, asset2D.quaternion, new Vector2(
          fixIEEE(asset2D.position.x + (end.x - 0.5) * assets2DDefaultSize * asset2D.scale),
          fixIEEE(asset2D.position.z + (end.y - 0.5) * assets2DDefaultSize * asset2D.scale / aspectRatio),
        )),
      };

      const { height } = getNotUndefined(levels.find(e => e.id === asset2D.levelId), 'Something went wrong. |b4y9hj|');
      const wallLength = new Vector2().subVectors(position.end, position.start).length();
      const frontSideSpaceId = null;
      const backSideSpaceId = null;

      const frontColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.wallTextureFront.id);
      const backColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.wallTextureFront.id);

      return {
        id: WallId(generateUUID()),
        levelId: asset2D.levelId,
        frontSideSpaceId,
        backSideSpaceId,
        frontTexture: strapiAppConfig.defaultTexturePalette.wallTextureFront,
        backTexture: strapiAppConfig.defaultTexturePalette.wallTextureBack,
        frontColorOverlay: isNull(frontColorOverlay) ? null : {
          type: 'predefined',
          value: new Color(frontColorOverlay),
        },
        backColorOverlay: isNull(backColorOverlay) ? null : {
          type: 'predefined',
          value: new Color(backColorOverlay),
        },
        frontCompositeOperation: compositeOperations[0],
        backCompositeOperation: compositeOperations[0],
        thickness: ({
          exterior: defaultExteriorWallThickness,
          interior: defaultInteriorWallThickness,
        } satisfies Record<ReturnType<typeof getWallType>, Positive>)[getWallType({ frontSideSpaceId, backSideSpaceId })],
        height: null,
        isVisible: true,
        isHidden: false,
        commentName: '',
        commentFrontTextureAppearance: '',
        commentFrontTextureOverlayColor: '',
        commentBackTextureAppearance: '',
        commentBackTextureOverlayColor: '',
        position,
        dormerRoofId: null,
        excludeFromRoofCutting: false,
        furnitures: wallFurnitures.map(({ type, position, width }) => ({
          id: WallFurnitureId(generateUUID()),
          type,
          isFlippedHorizontal: false,
          isMirrored: false,
          isHidden: false,
          onWallCoordinateX: (position - 0.5) * wallLength,
          onWallCoordinateY: getFurnitureWallY(height)[type],
          width: Positive(width * assets2DDefaultSize * asset2D.scale),
          height: null,
          depth: null,
          overrideMaterials: null,
          url: ({
            door: strapiAppConfig.defaultDoorModels[0].url,
            window: strapiAppConfig.defaultWindowModels[0].url,
          } satisfies Record<typeof type, string>)[type],
        })),
      };
    }),
  });

  createWallsFromTempWalls();
};

export const createDefaultWall = (start: Vector2, end: Vector2, levelId: LevelId): WallsStore['walls'][number] => {
  const { defaultExteriorWallThickness, defaultInteriorWallThickness } = useGlobalSettings.getState();
  const { strapiAppConfig } = useStrapiAppConfigResolved.getState();
  const { creationModeConfig } = useCreationModeConfig.getState();
  const frontSideSpaceId = null;
  const backSideSpaceId = null;

  const frontColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.wallTextureFront.id);
  const backColorOverlay = getDefaultColorForTexture(strapiAppConfig.defaultTexturePalette.wallTextureFront.id);

  return {
    id: WallId(generateUUID()),
    levelId,
    frontSideSpaceId,
    backSideSpaceId,
    frontTexture: strapiAppConfig.defaultTexturePalette.wallTextureFront,
    backTexture: strapiAppConfig.defaultTexturePalette.wallTextureBack,
    frontColorOverlay: isNull(frontColorOverlay) ? null : {
      type: 'predefined',
      value: new Color(frontColorOverlay),
    },
    backColorOverlay: isNull(backColorOverlay) ? null : {
      type: 'predefined',
      value: new Color(backColorOverlay),
    },
    frontCompositeOperation: compositeOperations[0],
    backCompositeOperation: compositeOperations[0],
    thickness: ({
      exterior: defaultExteriorWallThickness,
      interior: defaultInteriorWallThickness,
    } satisfies Record<ReturnType<typeof getWallType>, Positive>)[getWallType({ frontSideSpaceId, backSideSpaceId })],
    height: null,
    furnitures: [],
    isVisible: creationModeConfig.isWallVisible,
    isHidden: false,
    commentName: '',
    commentFrontTextureAppearance: '',
    commentFrontTextureOverlayColor: '',
    commentBackTextureAppearance: '',
    commentBackTextureOverlayColor: '',
    dormerRoofId: null,
    excludeFromRoofCutting: false,
    position: {
      start,
      end,
    },
  };
};
