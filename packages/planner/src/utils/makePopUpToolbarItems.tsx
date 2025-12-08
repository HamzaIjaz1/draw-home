import { PopUpToolbarProps, ToolbarButton, ToolbarButtonProps } from '@draw-house/ui/dist/components';
import { getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { areTheSameContentArrays } from '@draw-house/common/dist/utils';
import { closePopUpToolbar, closeSlideUpMenuLvl1, copyCustomModel, duplicateDormer, duplicateWallFurniture, flipHorizontalOrMirrorCustomModel, flipHorizontalOrMirrorFurniture, openSlideUpMenuLvl1, PopUpToolbarStore, removeWallFurniture, rotateCustomModel, setCeilingParams, setCustomModelParams, setFloorParams, setWallFurnitureCreationMode, setWallFurnitureParams, setWallParams, useCustomModels, usePopUpToolbar, useRoofDormerPlacement, useSlideUpMenuLvl1, useSpaces, useViewMode, useWalls, ViewModeStore } from '../zustand';
import { flipHorizontalOrMirrorStair, setStairParams } from '../zustand/useStairs';
import { rotateSlantedRoof, setDormerParams, setRoofParams, toggleActiveGableIndex, useRoofs } from '../zustand/useRoofs';
import { useAsset2DTransparency } from '../zustand/useAsset2DTransparency';
import { CanMoveWallStore, useCanMoveWall } from '../zustand/useCanMoveWall';
import { focusThenOpenAndRestore } from './focusThenOpenAndRestore';
import { getWallType } from './getWallType';
import { useSelectedItem } from '../zustand/useSelectedItem';
import { closeSlideUpMenus } from './closeSlideUpMenus';
import { openSpaceSettingsSlideUpMenu } from './handlerHelpers/openSpaceSettingsSlideUpMenu';
import { openRoofSettingsSlideUpMenu } from './handlerHelpers/openRoofSettingsSlideUpMenu';
import { openWithFocus } from './openWithFocus';
import { openCeilingSettingsSlideUpMenu } from './handlerHelpers/openCeilingSettingsSlideUpMenu';
import { openFloorSettingsSlideUpMenu } from './handlerHelpers/openFloorSettingsSlideUpMenu';
import { removeWallPopUpToolbarClick } from './handlerHelpers/removeWallPopUpToolbarClick';
import { removeCustomModelPopUpToolbarClick } from './handlerHelpers/removeCustomModelPopUpToolbarClick';
import { removeStairPopUpToolbarClick } from './handlerHelpers/removeStairPopUpToolbarClick';
import { removeAsset2DPopUpToolbarClick } from './handlerHelpers/removeAsset2DPopUpToolbarClick';
import { removeRoofDormerPopUpToolbarClick } from './handlerHelpers/removeRoofDormerPopUpToolbarClick';
import { StrapiAppConfigStore } from '../zustand/useStrapiAppConfig';
import { Resolved } from './isResolved';
import { Hotkey } from '../components/Hotkey';
import { Tooltip } from '../components/Tooltip';
import { lang } from '../lang';
import { toVector2 } from './helpers';
import { isPointInsideSpaceWalls } from './isPointInsideSpaceWalls';

type MakePopUpToolbarItemsParams = {
  popUpToolbar: NonNullable<PopUpToolbarStore['popUpToolbar']>;
  canMoveWall: CanMoveWallStore['canMoveWall'];
  viewMode: ViewModeStore['viewMode'];
  strapiAppConfig: Resolved<StrapiAppConfigStore['strapiAppConfig']>;
};

export const makePopUpToolbarItems = ({
  canMoveWall,
  viewMode,
  strapiAppConfig,
  popUpToolbar: {
    type,
    coords,
    isSlanted,
    id,
    subItem,
    onWallCoordinateX,
    activeGableIndex,
    clickPoint,
  },
}: MakePopUpToolbarItemsParams): PopUpToolbarProps['items'] => {
  const CloseButton = (
    <Hotkey position='topCloser' label={lang.tooltips.toolbarClose.hotkey}>
      <Tooltip position='top' content={lang.tooltips.toolbarClose}>
        <ToolbarButton
          icon='close'
          onClick={closePopUpToolbar}
        />
      </Tooltip>
    </Hotkey>
  );

  switch(type) {
    case 'wall':
      switch(subItem) {
        case null:
          return (
            <>
              {CloseButton}
              <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
                <ToolbarButton
                  icon='tools'
                  onClick={async () => {
                    closePopUpToolbar();

                    const { viewMode } = useViewMode.getState();
                    const { walls } = useWalls.getState();
                    const wall = getNotUndefined(walls.find(e => e.id === id), 'Something went wrong. |bh2p61|');
                    const wallType = getWallType({
                      frontSideSpaceId: wall.frontSideSpaceId,
                      backSideSpaceId: wall.backSideSpaceId,
                    });
                    const tempToggles = wallType !== 'interior' ? null : {
                      isExteriorWallsShown: false,
                      isRoofsShown: false,
                      isCeilingsShown: false,
                    };

                    const openSame = async () => {
                      const { type, isOpened, wallId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                      await closeSlideUpMenus({ except: 'lvl1' });
                      if(isOpened === true) {
                        if(type === 'wall' && wallId === id) {
                          return;
                        }
                        await closeSlideUpMenuLvl1({});
                      }
                      await openSlideUpMenuLvl1({
                        type: 'wall',
                        isOpened: true,
                        wallId: id,
                      });
                    };
                    const isThisOpen = () => {
                      const { isOpened, type, wallId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                      return isOpened === true && type === 'wall' && wallId === id;
                    };

                    if(viewMode === '3D') {
                      await focusThenOpenAndRestore(`${type}:${id}`, openSame, isThisOpen, {
                        ...!isNull(tempToggles) && { tempToggles },
                        margin: 1.25,
                        distMultipliers: [1.0, 1.25, 1.5],
                        pitchCandidatesDeg: [15, 25, 35],
                      });
                    } else {
                      await focusThenOpenAndRestore(`${type}:${id}`, openSame, isThisOpen, {
                        ...!isNull(tempToggles) && { tempToggles },
                        skipFocus: true,
                      });
                    }
                  }}
                />
              </Tooltip>
              <Tooltip position='top' content={lang.tooltips.toolbarAddDoorOrWindow}>
                <ToolbarButton
                  icon='plus'
                  onClick={() => {
                    usePopUpToolbar.setState({
                      popUpToolbar: {
                        type: 'wall',
                        id,
                        subItem: 'plus',
                        coords,
                        onWallCoordinateX,
                      },
                    });
                  }}
                />
              </Tooltip>
              <Tooltip position='top' content={lang.tooltips.toolbarMove}>
                <ToolbarButton
                  icon='expandArrows'
                  state={
                    viewMode === '3D'
                      ? 'disabled'
                      : canMoveWall === true
                        ? 'active'
                        : 'default'
                  }
                  onClick={() => {
                    useCanMoveWall.setState({
                      canMoveWall: canMoveWall === false,
                    });
                  }}
                />
              </Tooltip>
              <Tooltip position='top' content={lang.tooltips.toolbarHide}>
                <ToolbarButton
                  icon='eye'
                  onClick={() => {
                    setWallParams(id, { isHidden: true });
                  }}
                />
              </Tooltip>
              <Tooltip position='top' content={lang.tooltips.toolbarSelectItem}>
                <ToolbarButton
                  icon='handTapping'
                  onClick={async () => {
                    closePopUpToolbar();

                    const { type, isOpened, spaceIds } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                    const { spaces } = useSpaces.getState();
                    const targetSpaceIds = spaces.filter(e => e.walls.includes(id)).map(e => e.id);

                    await closeSlideUpMenus({ except: 'lvl1' });

                    if(isOpened === true) {
                      if(type === 'associatedObjects' && areTheSameContentArrays(spaceIds, targetSpaceIds)) {
                        return;
                      }
                      await closeSlideUpMenuLvl1({});
                    }
                    await openSlideUpMenuLvl1({
                      type: 'associatedObjects',
                      isOpened: true,
                      spaceIds: targetSpaceIds,
                    });
                  }}
                />
              </Tooltip>
              <Hotkey position='topCloser' label={lang.tooltips.toolbarDelete.hotkey}>
                <Tooltip position='top' content={lang.tooltips.toolbarDelete}>
                  <ToolbarButton
                    icon='bin'
                    onClick={() => {
                      removeWallPopUpToolbarClick(id);
                    }}
                  />
                </Tooltip>
              </Hotkey>
            </>
          );
        case 'plus':
          return (
            <>
              <Tooltip position='top' content={lang.tooltips.toolbarBack}>
                <ToolbarButton
                  icon='back'
                  onClick={() => {
                    usePopUpToolbar.setState({
                      popUpToolbar: {
                        type: 'wall',
                        id,
                        subItem: null,
                        coords,
                        onWallCoordinateX,
                      },
                    });
                  }}
                />
              </Tooltip>
              {
                strapiAppConfig.defaultDoorModels.map(({ id, url, category: { name, toolbarImage } }) => (
                  <Tooltip
                    key={id}
                    position='top'
                    content={{
                      title: name,
                    }}
                  >
                    <ToolbarButton
                      {
                        ...isNull(toolbarImage)
                          ? {
                            icon: 'door',
                          } satisfies Partial<ToolbarButtonProps>
                          : {
                            image: toolbarImage,
                          } satisfies Partial<ToolbarButtonProps>
                      }
                      onClick={() => {
                        setWallFurnitureCreationMode('doors', false, url);
                      }}
                    />
                  </Tooltip>
                ))
              }
              {
                strapiAppConfig.defaultWindowModels.map(({ id, url, category: { name, toolbarImage } }) => (
                  <Tooltip
                    key={id}
                    position='top'
                    content={{
                      title: name,
                    }}
                  >
                    <ToolbarButton
                      {
                        ...isNull(toolbarImage)
                          ? { icon: 'window' }
                          : { image: toolbarImage }
                      }
                      onClick={() => {
                        setWallFurnitureCreationMode('windows', false, url);
                      }}
                    />
                  </Tooltip>
                ))
              }
            </>
          );
        default:
          ((e: never) => e)(subItem);
          throw new Error('This should never happen. |2ak4fr|');
      }
    case 'door':
      return (
        <>
          {CloseButton}
          <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
            <ToolbarButton
              icon='tools'
              onClick={async () => {
                closePopUpToolbar();
                await openWithFocus(
                  `door:${id}`,
                  { type: 'door', isOpened: true, furnitureId: id },
                  s => s.type === 'door' && s.furnitureId === id,
                );
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarDuplicate}>
            <ToolbarButton
              icon='duplicate'
              onClick={() => {
                duplicateWallFurniture(false);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarMove}>
            <ToolbarButton
              icon='expandArrows'
              onClick={() => {
                duplicateWallFurniture(true);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarChangeOrientation}>
            <ToolbarButton
              icon='mirroring'
              onClick={() => {
                flipHorizontalOrMirrorFurniture(id);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarReplace}>
            <ToolbarButton
              icon='replaceModel'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, replacementElement } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                await closeSlideUpMenus({ except: 'lvl1' });

                if(isOpened === true) {
                  if(type === 'replaceElementCatalog' && replacementElement.type === 'door' && replacementElement.id === id) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }
                await openSlideUpMenuLvl1({
                  type: 'replaceElementCatalog',
                  isOpened: true,
                  replacementElement: {
                    type: 'door',
                    id,
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarHide}>
            <ToolbarButton
              icon='eye'
              onClick={() => {
                setWallFurnitureParams(id, null, { isHidden: true });
              }}
            />
          </Tooltip>
          <Hotkey position='topCloser' label={lang.tooltips.toolbarDelete.hotkey}>
            <Tooltip position='top' content={lang.tooltips.toolbarDelete}>
              <ToolbarButton
                icon='bin'
                onClick={() => {
                  removeWallFurniture(id);
                }}
              />
            </Tooltip>
          </Hotkey>
        </>
      );
    case 'window':
      return (
        <>
          {CloseButton}
          <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
            <ToolbarButton
              icon='tools'
              onClick={async () => {
                closePopUpToolbar();
                await openWithFocus(
                  `window:${id}`,
                  { type: 'window', isOpened: true, furnitureId: id },
                  s => s.type === 'window' && s.furnitureId === id,
                );
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarDuplicate}>
            <ToolbarButton
              icon='duplicate'
              onClick={() => {
                duplicateWallFurniture(false);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarMove}>
            <ToolbarButton
              icon='expandArrows'
              onClick={() => {
                duplicateWallFurniture(true);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarReplace}>
            <ToolbarButton
              icon='replaceModel'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, replacementElement } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                await closeSlideUpMenus({ except: 'lvl1' });

                if(isOpened === true) {
                  if(type === 'replaceElementCatalog' && replacementElement.type === 'window' && replacementElement.id === id) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }
                await openSlideUpMenuLvl1({
                  type: 'replaceElementCatalog',
                  isOpened: true,
                  replacementElement: {
                    type: 'window',
                    id,
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarHide}>
            <ToolbarButton
              icon='eye'
              onClick={() => {
                setWallFurnitureParams(id, null, { isHidden: true });
              }}
            />
          </Tooltip>
          <Hotkey position='topCloser' label={lang.tooltips.toolbarDelete.hotkey}>
            <Tooltip position='top' content={lang.tooltips.toolbarDelete}>
              <ToolbarButton
                icon='bin'
                onClick={() => {
                  removeWallFurniture(id);
                }}
              />
            </Tooltip>
          </Hotkey>
        </>
      );
    case 'floor':
      return (
        <>
          {CloseButton}
          <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
            <ToolbarButton
              icon='tools'
              onClick={async () => {
                closePopUpToolbar();
                await openFloorSettingsSlideUpMenu(id);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarHide}>
            <ToolbarButton
              icon='eye'
              onClick={() => {
                closePopUpToolbar();
                setFloorParams(id, null, { isHidden: true });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarSelectItem}>
            <ToolbarButton
              icon='handTapping'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, spaceIds } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                const targetSpaceIds = [id];

                await closeSlideUpMenus({ except: 'lvl1' });

                if(isOpened === true) {
                  if(type === 'associatedObjects' && areTheSameContentArrays(spaceIds, targetSpaceIds)) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }
                await openSlideUpMenuLvl1({
                  type: 'associatedObjects',
                  isOpened: true,
                  spaceIds: targetSpaceIds,
                });
              }}
            />
          </Tooltip>
        </>
      );
    case 'ceiling':
      return (
        <>
          {CloseButton}
          <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
            <ToolbarButton
              icon='tools'
              onClick={async () => {
                closePopUpToolbar();
                await openCeilingSettingsSlideUpMenu(id);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarHide}>
            <ToolbarButton
              icon='eye'
              onClick={() => {
                closePopUpToolbar();
                setCeilingParams(id, null, { isHidden: true });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarSelectItem}>
            <ToolbarButton
              icon='handTapping'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, spaceIds } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                const targetSpaceIds = [id];
                await closeSlideUpMenus({ except: 'lvl1' });

                if(isOpened === true) {
                  if(type === 'associatedObjects' && areTheSameContentArrays(spaceIds, targetSpaceIds)) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }
                await openSlideUpMenuLvl1({
                  type: 'associatedObjects',
                  isOpened: true,
                  spaceIds: targetSpaceIds,
                });
              }}
            />
          </Tooltip>
        </>
      );
    case 'roof': {
      const { roofs } = useRoofs.getState();

      const targetRoof = roofs.find(e => e.id === id);
      const isFlat = !isUndefined(targetRoof) && targetRoof.roofData.type === 'flat';

      switch(subItem) {
        case null:
          return (
            <>
              {CloseButton}
              <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
                <ToolbarButton
                  icon='tools'
                  onClick={async () => {
                    closePopUpToolbar();
                    await openRoofSettingsSlideUpMenu(id);
                  }}
                />
              </Tooltip>
              {
                isFlat === false && (
                  <Tooltip position='top' content={lang.tooltips.toolbarAddDormer}>
                    <ToolbarButton
                      icon='plus'
                      onClick={() => {
                        usePopUpToolbar.setState({
                          popUpToolbar: {
                            type: 'roof',
                            id,
                            subItem: 'plus',
                            coords,
                            activeGableIndex,
                            isSlanted,
                            clickPoint,
                          },
                        });
                      }}
                    />
                  </Tooltip>
                )
              }
              {
                !isNull(activeGableIndex) && (
                  <Tooltip position='top' content={lang.tooltips.toolbarChangeGableCorner}>
                    <ToolbarButton
                      icon='house'
                      onClick={() => {
                        closePopUpToolbar();
                        toggleActiveGableIndex(id, activeGableIndex);
                      }}
                    />
                  </Tooltip>
                )
              }
              {
                isSlanted === true && (
                  <>
                    <Tooltip position='top' content={lang.tooltips.toolbarRotateCounterclockwise}>
                      <ToolbarButton
                        icon='arrowRotateLeft'
                        onClick={() => {
                          closePopUpToolbar();
                          rotateSlantedRoof(id, 'counterclockwise');
                        }}
                      />
                    </Tooltip>
                    <Tooltip position='top' content={lang.tooltips.toolbarRotateClockwise}>
                      <ToolbarButton
                        icon='arrowRotateRight'
                        onClick={() => {
                          closePopUpToolbar();
                          rotateSlantedRoof(id, 'clockwise');
                        }}
                      />
                    </Tooltip>
                  </>
                )
              }
              <Tooltip position='top' content={lang.tooltips.toolbarHide}>
                <ToolbarButton
                  icon='eye'
                  onClick={() => {
                    closePopUpToolbar();
                    setRoofParams(id, null, { isHidden: true });
                  }}
                />
              </Tooltip>
              <Tooltip position='top' content={lang.tooltips.toolbarSelectItem}>
                <ToolbarButton
                  icon='handTapping'
                  onClick={async () => {
                    closePopUpToolbar();

                    const { type, isOpened, spaceIds } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                    const { spaces } = useSpaces.getState();
                    const { walls } = useWalls.getState();
                    const targetSpaceIds = (() => {
                      const _clickPoint = toVector2(clickPoint);
                      const roofSpaces = spaces.filter(e => e.roofId === id).map(e => ({
                        ...e,
                        walls: e.walls.map(id => getNotUndefined(walls.find(e => e.id === id), 'Something went wrong. |9p0g8c|')),
                      }));
                      const underClickSpaces = roofSpaces.filter(e => isPointInsideSpaceWalls(_clickPoint, e.walls));

                      const result = underClickSpaces.length > 0 ? underClickSpaces : roofSpaces;

                      return result.map(e => e.id);
                    })();

                    await closeSlideUpMenus({ except: 'lvl1' });

                    if(isOpened === true) {
                      if(type === 'associatedObjects' && areTheSameContentArrays(spaceIds, targetSpaceIds)) {
                        return;
                      }
                      await closeSlideUpMenuLvl1({});
                    }
                    await openSlideUpMenuLvl1({
                      type: 'associatedObjects',
                      isOpened: true,
                      spaceIds: targetSpaceIds,
                    });
                  }}
                />
              </Tooltip>
            </>
          );
        case 'plus':
          return (
            <>
              <Tooltip position='top' content={lang.tooltips.toolbarBack}>
                <ToolbarButton
                  icon='back'
                  onClick={() => {
                    usePopUpToolbar.setState({
                      popUpToolbar: {
                        type: 'roof',
                        id,
                        subItem: null,
                        coords,
                        activeGableIndex,
                        isSlanted,
                        clickPoint,
                      },
                    });
                  }}
                />
              </Tooltip>
              <Tooltip position='top' content={lang.tooltips.toolbarGableDormer}>
                <ToolbarButton
                  icon='gableDormer'
                  onClick={() => {
                    useRoofDormerPlacement.setState({ activeDormerType: 'gable' });
                    closePopUpToolbar();
                  }}
                />
              </Tooltip>
              <Tooltip position='top' content={lang.tooltips.toolbarHipDormer}>
                <ToolbarButton
                  icon='hipDormer'
                  onClick={() => {
                    useRoofDormerPlacement.setState({ activeDormerType: 'hip' });
                    closePopUpToolbar();
                  }}
                />
              </Tooltip>
              <Tooltip position='top' content={lang.tooltips.toolbarShedDormer}>
                <ToolbarButton
                  icon='shedDormer'
                  onClick={() => {
                    useRoofDormerPlacement.setState({ activeDormerType: 'shed' });
                    closePopUpToolbar();
                  }}
                />
              </Tooltip>
            </>
          );
        default:
          ((e: never) => e)(subItem);
          throw new Error('This should never happen. |gpy5li|');
      }
    }
    case 'customModel':
      return (
        <>
          {CloseButton}
          <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
            <ToolbarButton
              icon='tools'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, customModelId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                await closeSlideUpMenus({ except: 'lvl1' });

                if(isOpened === true) {
                  if(type === 'customModel' && customModelId === id) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }
                await openSlideUpMenuLvl1({
                  type: 'customModel',
                  isOpened: true,
                  customModelId: id,
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarDuplicate}>
            <ToolbarButton
              icon='duplicate'
              onClick={() => {
                closePopUpToolbar();

                const copiedModelId = copyCustomModel(id, false);

                useSelectedItem.setState({
                  selectedItem: {
                    type: 'customModel',
                    id: copiedModelId,
                    mode: 'selected',
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarChangeOrientation}>
            <ToolbarButton
              icon='mirroring'
              onClick={() => {
                flipHorizontalOrMirrorCustomModel(id);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarReplace}>
            <ToolbarButton
              icon='replaceModel'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, replacementElement } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                await closeSlideUpMenus({ except: 'lvl1' });

                if(isOpened === true) {
                  if(type === 'replaceElementCatalog' && replacementElement.type === 'customModel' && replacementElement.id === id) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }

                const { customModels } = useCustomModels.getState();
                const targetModel = getNotUndefined(customModels.find(e => e.id === id), 'This should never happen. |5cp2vz|');

                await openSlideUpMenuLvl1({
                  type: 'replaceElementCatalog',
                  isOpened: true,
                  replacementElement: {
                    type: targetModel.type === 'column' ? 'column' : 'customModel',
                    id,
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarQuickRotate}>
            <ToolbarButton
              icon='rotate45'
              onClick={() => {
                rotateCustomModel(id, 45);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarScale}>
            <ToolbarButton
              icon='scaleUp'
              onClick={() => {
                useSelectedItem.setState({
                  selectedItem: {
                    type: 'customModel',
                    id,
                    mode: 'scale',
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarHide}>
            <ToolbarButton
              icon='eye'
              onClick={() => {
                setCustomModelParams(id, { isHidden: true });
              }}
            />
          </Tooltip>
          <Hotkey position='topCloser' label={lang.tooltips.toolbarDelete.hotkey}>
            <Tooltip position='top' content={lang.tooltips.toolbarDelete}>
              <ToolbarButton
                icon='bin'
                onClick={() => {
                  removeCustomModelPopUpToolbarClick(id);
                }}
              />
            </Tooltip>
          </Hotkey>
        </>
      );
    case 'space':
      return (
        <>
          {CloseButton}
          <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
            <ToolbarButton
              icon='tools'
              onClick={async () => {
                closePopUpToolbar();
                await openSpaceSettingsSlideUpMenu(id);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarSelectItem}>
            <ToolbarButton
              icon='handTapping'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, spaceIds } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                const targetSpaceIds = [id];

                await closeSlideUpMenus({ except: 'lvl1' });
                if(isOpened === true) {
                  if(type === 'associatedObjects' && areTheSameContentArrays(spaceIds, targetSpaceIds)) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }
                await openSlideUpMenuLvl1({
                  type: 'associatedObjects',
                  isOpened: true,
                  spaceIds: targetSpaceIds,
                });
              }}
            />
          </Tooltip>
        </>
      );
    case 'stair':
      return (
        <>
          {CloseButton}
          <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
            <ToolbarButton
              icon='tools'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, stairId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                await closeSlideUpMenus({ except: 'lvl1' });

                if(isOpened === true) {
                  if(type === 'stairSettings' && stairId === id) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }
                await openSlideUpMenuLvl1({
                  type: 'stairSettings',
                  isOpened: true,
                  stairId: id,
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarChangeOrientation}>
            <ToolbarButton
              icon='mirroring'
              onClick={() => {
                flipHorizontalOrMirrorStair(id);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarRotate}>
            <ToolbarButton
              icon='rotateArrowCircle'
              onClick={() => {
                useSelectedItem.setState({
                  selectedItem: {
                    type: 'stair',
                    id,
                    mode: 'rotate',
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarHide}>
            <ToolbarButton
              icon='eye'
              onClick={() => {
                setStairParams(id, { isHidden: true });
              }}
            />
          </Tooltip>
          <Hotkey position='topCloser' label={lang.tooltips.toolbarDelete.hotkey}>
            <Tooltip position='top' content={lang.tooltips.toolbarDelete}>
              <ToolbarButton
                icon='bin'
                onClick={() => {
                  removeStairPopUpToolbarClick(id);
                }}
              />
            </Tooltip>
          </Hotkey>
        </>
      );
    case 'asset2D':
      return (
        <>
          {CloseButton}
          <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
            <ToolbarButton
              icon='tools'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, asset2DId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                await closeSlideUpMenus({ except: 'lvl1' });

                if(isOpened === true) {
                  if(type === 'asset2DSettings' && asset2DId === id) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }

                const { customModels } = useCustomModels.getState();
                const targetAsset2D = customModels.find(e => e.id === id);
                assert(!isUndefined(targetAsset2D) && targetAsset2D.type === 'asset-2d', 'Something went wrong. |z5gt15|');
                useAsset2DTransparency.setState({
                  asset2DTransparency: targetAsset2D.transparency,
                });
                await openSlideUpMenuLvl1({
                  type: 'asset2DSettings',
                  isOpened: true,
                  asset2DId: id,
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarRotate}>
            <ToolbarButton
              icon='rotateArrowCircle'
              onClick={() => {
                useSelectedItem.setState({
                  selectedItem: {
                    type: 'asset2D',
                    id,
                    mode: 'rotate',
                    measuredDistanceWorld: null,
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarTapeMeasure}>
            <ToolbarButton
              icon='tapeMeasure'
              onClick={() => {
                closePopUpToolbar();

                const { selectedItem } = useSelectedItem.getState();
                assert(!isNull(selectedItem) && selectedItem.type === 'asset2D', 'This should never happen. |8j5705|');

                useSelectedItem.setState({
                  selectedItem: {
                    type: 'asset2D',
                    id,
                    mode: selectedItem.mode === 'measure' ? 'selected' : 'measure',
                    measuredDistanceWorld: null,
                  },
                });
              }}
            />
          </Tooltip>
          <Hotkey position='topCloser' label={lang.tooltips.toolbarDelete.hotkey}>
            <Tooltip position='top' content={lang.tooltips.toolbarDelete}>
              <ToolbarButton
                icon='bin'
                onClick={() => {
                  removeAsset2DPopUpToolbarClick(id);
                }}
              />
            </Tooltip>
          </Hotkey>
        </>
      );
    case 'roofDormer':
      return (
        <>
          {CloseButton}
          <Tooltip position='top' content={lang.tooltips.toolbarSettings}>
            <ToolbarButton
              icon='tools'
              onClick={async () => {
                closePopUpToolbar();

                const { type, isOpened, dormerId } = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
                await closeSlideUpMenus({ except: 'lvl1' });

                if(isOpened === true) {
                  if(type === 'roofDormer' && dormerId === id) {
                    return;
                  }
                  await closeSlideUpMenuLvl1({});
                }
                await openSlideUpMenuLvl1({
                  type: 'roofDormer',
                  isOpened: true,
                  dormerId: id,
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarDuplicate}>
            <ToolbarButton
              icon='duplicate'
              onClick={() => {
                closePopUpToolbar();
                duplicateDormer(id, false);
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarMove}>
            <ToolbarButton
              icon='expandArrows'
              onClick={() => {
                closePopUpToolbar();
                useSelectedItem.setState({
                  selectedItem: {
                    type: 'roofDormer',
                    id,
                    mode: 'move',
                  },
                });
              }}
            />
          </Tooltip>
          <Tooltip position='top' content={lang.tooltips.toolbarHide}>
            <ToolbarButton
              icon='eye'
              onClick={() => {
                closePopUpToolbar();
                setDormerParams(id, { isHidden: true });
              }}
            />
          </Tooltip>
          <Hotkey position='topCloser' label={lang.tooltips.toolbarDelete.hotkey}>
            <Tooltip position='top' content={lang.tooltips.toolbarDelete}>
              <ToolbarButton
                icon='bin'
                onClick={() => {
                  removeRoofDormerPopUpToolbarClick(id);
                }}
              />
            </Tooltip>
          </Hotkey>
        </>
      );
    default:
      ((e: never) => e)(type);
      throw new Error('This should never happen. |z49ba5|');
  }
};
