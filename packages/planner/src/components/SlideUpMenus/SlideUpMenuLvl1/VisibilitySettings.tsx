import { useTheme } from '@mui/material';
import { MainButton, Material, MenuItem, SwitchRow, VisibilityMenuContent } from '@draw-house/ui/dist/components';
import { checkIsNotNever } from '@draw-house/common/dist/utils';
import { AnimatePresence } from 'framer-motion';
import { getNotNull, isNull } from '@arthurka/ts-utils';
import { closeSlideUpMenuLvl1, openSlideUpMenuLvl2, setCeilingParams, setCustomModelParams, setFloorParams, setWallFurnitureParams, setWallParams, SlideUpMenuLvl1Store, useCustomModels, useGlobalSettings, useSpaces, useWalls } from '../../../zustand';
import { lang } from '../../../lang';
import { SlideUpAndFloatingMenusWrapper } from '../../SlideUpAndFloatingMenusWrapper';
import { setRoofParams, useRoofs } from '../../../zustand/useRoofs';
import { setStairParams, useStairs } from '../../../zustand/useStairs';
import { getWallType } from '../../../utils/getWallType';
import { Animations } from '../../animations';

export type VisibilitySettingsProps = {
  slideUpMenuLvl1: Extract<SlideUpMenuLvl1Store['slideUpMenuLvl1'], { type: 'visibilitySettings' }>;
};

export const VisibilitySettings: React.FC<VisibilitySettingsProps> = ({ slideUpMenuLvl1: { isOpened } }) => {
  checkIsNotNever(isOpened);

  const isMeasurementsShown1 = useGlobalSettings(s => s.isMeasurementsShown1);
  const isMeasurementsShown2 = useGlobalSettings(s => s.isMeasurementsShown2);
  const isSpaceNamesShown = useGlobalSettings(s => s.isSpaceNamesShown);
  const isRoofsShown = useGlobalSettings(s => s.isRoofsShown);
  const isExteriorWallsShown = useGlobalSettings(s => s.isExteriorWallsShown);
  const isInteriorWallsShown = useGlobalSettings(s => s.isInteriorWallsShown);
  const isFloorsShown = useGlobalSettings(s => s.isFloorsShown);
  const isCeilingsShown = useGlobalSettings(s => s.isCeilingsShown);
  const isDoorsShown = useGlobalSettings(s => s.isDoorsShown);
  const isWindowsShown = useGlobalSettings(s => s.isWindowsShown);
  const isCustomModelsShown = useGlobalSettings(s => s.isCustomModelsShown);
  const isColumnsShown = useGlobalSettings(s => s.isColumnsShown);
  const isStairsShown = useGlobalSettings(s => s.isStairsShown);
  const isAssets2DShown = useGlobalSettings(s => s.isAssets2DShown);
  const withLandscapeTextures = useGlobalSettings(s => s.withLandscapeTextures);
  const landscapeTexture = useGlobalSettings(s => s.landscapeTexture);
  const withFloorTextures = useGlobalSettings(s => s.withFloorTextures);
  const isRoofLinesIn2DShown = useGlobalSettings(s => s.isRoofLinesIn2DShown);
  const isLabelsIn3DShown = useGlobalSettings(s => s.isLabelsIn3DShown);
  const theme = useTheme();

  return (
    <SlideUpAndFloatingMenusWrapper
      title={lang.slideUpMenus.visibilitySettings.title}
      opened={isOpened}
      onClose={async () => {
        await closeSlideUpMenuLvl1({});
      }}
      header={
        <MenuItem minHeight='unset' paddingHorizontal='row 3/4'>
          <MainButton
            text={lang.slideUpMenus.visibilitySettings.unhideAll}
            variant='text'
            icon='eyeOutlined'
            iconColors={{ default: theme.palette.primary.main }}
            width='fit-content'
            height='md'
            padding='row 1/4'
            onClick={() => {
              const { customModels } = useCustomModels.getState();
              const { roofs } = useRoofs.getState();
              const { spaces } = useSpaces.getState();
              const { walls } = useWalls.getState();
              const { stairs } = useStairs.getState();

              const wallFurnitures = walls.flatMap(e => e.furnitures);

              for(const { id } of customModels.filter(e => e.isHidden === true)) {
                setCustomModelParams(id, { isHidden: false });
              }
              for(const { id } of roofs.filter(e => e.roofData.isHidden === true)) {
                setRoofParams(id, null, { isHidden: false });
              }
              for(const { id } of spaces.filter(e => e.ceilingData.isHidden === true)) {
                setCeilingParams(id, null, { isHidden: false });
              }
              for(const { id } of spaces.filter(e => e.floorData.isHidden === true)) {
                setFloorParams(id, null, { isHidden: false });
              }
              for(const { id } of walls.filter(e => e.isHidden === true)) {
                setWallParams(id, { isHidden: false });
              }
              for(const { id } of wallFurnitures.filter(e => e.isHidden === true)) {
                setWallFurnitureParams(id, null, { isHidden: false });
              }
              for(const { id } of stairs.filter(e => e.isHidden === true)) {
                setStairParams(id, { isHidden: false });
              }

              useGlobalSettings.setState({
                isMeasurementsShown1: true,
                isMeasurementsShown2: true,
                isSpaceNamesShown: true,
                isExteriorWallsShown: true,
                isInteriorWallsShown: true,
                isFloorsShown: true,
                isRoofsShown: true,
                isCeilingsShown: true,
                isDoorsShown: true,
                isWindowsShown: true,
                isCustomModelsShown: true,
                isColumnsShown: true,
                isAssets2DShown: true,
                isStairsShown: true,
              });
            }}
          />
        </MenuItem>
      }
    >
      {
        !isNull(landscapeTexture) && (
          <MenuItem divider>
            <SwitchRow
              title={lang.slideUpMenus.visibilitySettings.showLandscapeTextures}
              checked={withLandscapeTextures}
              onClick={() => {
                useGlobalSettings.setState({
                  withLandscapeTextures: withLandscapeTextures === false,
                });
              }}
            />
          </MenuItem>
        )
      }
      <AnimatePresence>
        {
          withLandscapeTextures === true && (
            <Animations.collapseRow>
              <MenuItem divider>
                <Material
                  text={lang.slideUpMenus.visibilitySettings.land}
                  image={getNotNull(landscapeTexture, 'Something went wrong. |j8wl7s|')}
                  onClick={async () => {
                    await closeSlideUpMenuLvl1({ preserveState: true });
                    await openSlideUpMenuLvl2({
                      type: 'landTextures',
                      isOpened: true,
                    });
                  }}
                  withArrow
                />
              </MenuItem>
            </Animations.collapseRow>
          )
        }
      </AnimatePresence>
      <MenuItem divider>
        <SwitchRow
          title={lang.slideUpMenus.visibilitySettings.showFloorTextures}
          checked={withFloorTextures}
          onClick={() => {
            useGlobalSettings.setState({
              withFloorTextures: withFloorTextures === false,
            });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <SwitchRow
          title={lang.slideUpMenus.visibilitySettings.showRoofLinesIn2D}
          checked={isRoofLinesIn2DShown}
          onClick={() => {
            useGlobalSettings.setState({
              isRoofLinesIn2DShown: isRoofLinesIn2DShown === false,
            });
          }}
        />
      </MenuItem>
      <MenuItem divider>
        <SwitchRow
          title={lang.slideUpMenus.visibilitySettings.showLabelsIn3DView}
          checked={isLabelsIn3DShown}
          onClick={() => {
            useGlobalSettings.setState({
              isLabelsIn3DShown: isLabelsIn3DShown === false,
            });
          }}
        />
      </MenuItem>
      <VisibilityMenuContent
        items={[
          {
            title: lang.slideUpMenus.visibilitySettings.dimensions,
            items: [
              {
                title: lang.slideUpMenus.visibilitySettings.insideDimensions,
                active: isMeasurementsShown1,
                onClick() {
                  useGlobalSettings.setState({
                    isMeasurementsShown1: isMeasurementsShown1 === false,
                  });
                },
              },
              {
                title: lang.slideUpMenus.visibilitySettings.outsideDimensions,
                active: isMeasurementsShown2,
                onClick() {
                  useGlobalSettings.setState({
                    isMeasurementsShown2: isMeasurementsShown2 === false,
                  });
                },
              },
            ],
          },
          {
            title: lang.slideUpMenus.visibilitySettings.spaceNames,
            active: isSpaceNamesShown,
            onClick() {
              useGlobalSettings.setState({
                isSpaceNamesShown: isSpaceNamesShown === false,
              });
            },
          },
          {
            title: lang.slideUpMenus.visibilitySettings.assets2D,
            active: isAssets2DShown,
            onClick() {
              useGlobalSettings.setState({
                isAssets2DShown: isAssets2DShown === false,
              });
            },
          },
          {
            title: lang.slideUpMenus.visibilitySettings.construction,
            items: [
              {
                title: lang.slideUpMenus.visibilitySettings.walls,
                items: [
                  {
                    title: lang.slideUpMenus.visibilitySettings.exteriorWalls,
                    active: isExteriorWallsShown,
                    onClick() {
                      const { walls } = useWalls.getState();

                      if(isExteriorWallsShown === false) {
                        for(const { id } of walls.filter(e => getWallType(e) === 'exterior' && e.isHidden === true)) {
                          setWallParams(id, { isHidden: false });
                        }
                      }
                      useGlobalSettings.setState({
                        isExteriorWallsShown: isExteriorWallsShown === false,
                      });
                    },
                  },
                  {
                    title: lang.slideUpMenus.visibilitySettings.interiorWalls,
                    active: isInteriorWallsShown,
                    onClick() {
                      const { walls } = useWalls.getState();

                      if(isInteriorWallsShown === false) {
                        for(const { id } of walls.filter(e => getWallType(e) === 'interior' && e.isHidden === true)) {
                          setWallParams(id, { isHidden: false });
                        }
                      }
                      useGlobalSettings.setState({
                        isInteriorWallsShown: isInteriorWallsShown === false,
                      });
                    },
                  },
                ],
              },
              {
                title: lang.slideUpMenus.visibilitySettings.floors,
                active: isFloorsShown,
                onClick() {
                  const { spaces } = useSpaces.getState();

                  if(isFloorsShown === false) {
                    for(const { id } of spaces.filter(e => e.floorData.isHidden === true)) {
                      setFloorParams(id, null, { isHidden: false });
                    }
                  }
                  useGlobalSettings.setState({
                    isFloorsShown: isFloorsShown === false,
                  });
                },
              },
              {
                title: lang.slideUpMenus.visibilitySettings.roofs,
                active: isRoofsShown,
                onClick() {
                  const { roofs } = useRoofs.getState();

                  if(isRoofsShown === false) {
                    for(const { id } of roofs.filter(e => e.roofData.isHidden === true)) {
                      setRoofParams(id, null, { isHidden: false });
                    }
                  }
                  useGlobalSettings.setState({
                    isRoofsShown: isRoofsShown === false,
                    ...isRoofsShown === true && {
                      isCeilingsShown: false,
                    },
                  });
                },
              },
              {
                title: lang.slideUpMenus.visibilitySettings.ceilings,
                active: isCeilingsShown,
                onClick() {
                  const { spaces } = useSpaces.getState();

                  if(isCeilingsShown === false) {
                    for(const { id } of spaces.filter(e => e.ceilingData.isHidden === true)) {
                      setCeilingParams(id, null, { isHidden: false });
                    }
                  }
                  useGlobalSettings.setState({
                    isCeilingsShown: isCeilingsShown === false,
                  });
                },
              },
              {
                title: lang.slideUpMenus.visibilitySettings.columns,
                active: isColumnsShown,
                onClick() {
                  const { customModels } = useCustomModels.getState();

                  if(isCustomModelsShown === false) {
                    for(const { id } of customModels.filter(e => e.type === 'column' && e.isHidden === true)) {
                      setCustomModelParams(id, { isHidden: false });
                    }
                  }
                  useGlobalSettings.setState({
                    isColumnsShown: isColumnsShown === false,
                  });
                },
              },
              {
                title: lang.slideUpMenus.visibilitySettings.stairs,
                active: isStairsShown,
                onClick() {
                  const { stairs } = useStairs.getState();

                  if(isStairsShown === false) {
                    for(const { id } of stairs.filter(e => e.isHidden === true)) {
                      setStairParams(id, { isHidden: false });
                    }
                  }
                  useGlobalSettings.setState({
                    isStairsShown: isStairsShown === false,
                  });
                },
              },
              {
                title: lang.slideUpMenus.visibilitySettings.doors,
                active: isDoorsShown,
                onClick() {
                  const { walls } = useWalls.getState();

                  const wallFurnitures = walls.flatMap(e => e.furnitures);

                  if(isDoorsShown === false) {
                    for(const { id } of wallFurnitures.filter(e => e.isHidden === true && e.type === 'door')) {
                      setWallFurnitureParams(id, null, { isHidden: false });
                    }
                  }
                  useGlobalSettings.setState({
                    isDoorsShown: isDoorsShown === false,
                  });
                },
              },
              {
                title: lang.slideUpMenus.visibilitySettings.windows,
                active: isWindowsShown,
                onClick() {
                  const { walls } = useWalls.getState();

                  const wallFurnitures = walls.flatMap(e => e.furnitures);

                  if(isWindowsShown === false) {
                    for(const { id } of wallFurnitures.filter(e => e.isHidden === true && e.type === 'window')) {
                      setWallFurnitureParams(id, null, { isHidden: false });
                    }
                  }
                  useGlobalSettings.setState({
                    isWindowsShown: isWindowsShown === false,
                  });
                },
              },
            ],
          },
          {
            title: lang.slideUpMenus.visibilitySettings.customModels,
            active: isCustomModelsShown,
            onClick() {
              const { customModels } = useCustomModels.getState();

              if(isCustomModelsShown === false) {
                for(const { id } of customModels.filter(e => e.type === 'regular' && e.isHidden === true)) {
                  setCustomModelParams(id, { isHidden: false });
                }
              }
              useGlobalSettings.setState({
                isCustomModelsShown: isCustomModelsShown === false,
              });
            },
          },
        ]}
      />
    </SlideUpAndFloatingMenusWrapper>
  );
};
