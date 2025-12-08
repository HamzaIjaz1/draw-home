import { getNotUndefined, isNull } from '@arthurka/ts-utils';
import { mergeFutureWalls, useGlobalSettings, useLevels, useSpaces, useTempWallFurniture, useTempWalls, useViewMode, useWalls } from '../../zustand';
import { Wall } from './Wall';
import { WallMovers } from './WallMovers';
import { useInteractivePresence } from '../../customHooks';
import { HiddenWall } from './HiddenWall';
import { calculateWallCornersDiff } from '../../utils';
import { semiTransparentElementsOpacity } from '../../constants';
import { getPolygonOffsetForLevel } from '../../utils/getPolygonOffsetForLevel';
import { getWallType } from '../../utils/getWallType';
import { WallTempFurnitureGuideLineHelper } from './WallTempFurnitureGuideLineHelper';
import { WallTempFurnitureAxisLocker } from './WallTempFurnitureAxisLocker';
import { getWallSidesSpaceRelations } from '../../utils/getWallSidesSpaceRelations';
import { getOverFloorPlans2DData, useFloorPlans2D } from '../../utils/getOverFloorPlans2DData';
import { useTempRoofDormer } from '../../zustand/useTempRoofDormer';
import { useSelectedItem } from '../../zustand/useSelectedItem';

export const Walls: React.FC = () => {
  const isMeasurementsShown1 = useGlobalSettings(s => s.isMeasurementsShown1);
  const isMeasurementsShown2 = useGlobalSettings(s => s.isMeasurementsShown2);
  const isExteriorWallsShown = useGlobalSettings(s => s.isExteriorWallsShown);
  const isInteriorWallsShown = useGlobalSettings(s => s.isInteriorWallsShown);
  const isLabelsIn3DShown = useGlobalSettings(s => s.isLabelsIn3DShown);
  const { viewMode } = useViewMode();
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();
  const { tempWallFurniture } = useTempWallFurniture();
  const { levels } = useLevels();
  const { spaces } = useSpaces();
  const { getInteractivePresence } = useInteractivePresence();
  const floorPlans2D = useFloorPlans2D();
  const tempRoofDormer = useTempRoofDormer(s => s.tempRoofDormer);
  const selectedItem = useSelectedItem(s => s.selectedItem);

  const wallSidesSpaceRelations = getWallSidesSpaceRelations(walls, spaces);
  const futureWalls = mergeFutureWalls([...walls, ...tempWalls]);
  const wallCornersDiff = calculateWallCornersDiff(futureWalls);

  const wallsOverFloorPlan = getOverFloorPlans2DData(futureWalls, floorPlans2D);

  return (
    <>
      <WallMovers />
      <WallTempFurnitureAxisLocker />
      <WallTempFurnitureGuideLineHelper />
      {
        futureWalls
          .filter(e => isExteriorWallsShown === true ? true : getWallType(e) !== 'exterior')
          .filter(e => isInteriorWallsShown === true ? true : getWallType(e) !== 'interior')
          .map(({
            id,
            position,
            frontTexture,
            backTexture,
            levelId,
            isVisible,
            isHidden,
            thickness,
            height,
            furnitures,
            frontColorOverlay,
            backColorOverlay,
            frontCompositeOperation,
            backCompositeOperation,
            excludeFromRoofCutting,
            dormerRoofId,
          }) => {
            const { elevation: levelElevation, isActive, isLevelVisible, isSemiTransparent, height: levelHeight } = getNotUndefined(levels.find(e => e.id === levelId), 'Something went wrong. |xo1xdp|');

            const isDormerWall = !isNull(dormerRoofId);
            const elevation = isDormerWall === true ? levelElevation + levelHeight : levelElevation;

            const isMovingDormer = selectedItem?.type === 'roofDormer' && selectedItem.mode === 'move';
            const isDormerBeingMoved = (
              isDormerWall === true
                && !isNull(tempRoofDormer)
                && dormerRoofId === tempRoofDormer.dormer.id
                && isMovingDormer === true
            );

            const { opacity } = getInteractivePresence(isActive);

            const futureFurnitures = isNull(tempWallFurniture) ? furnitures : [
              ...furnitures.filter(e => e.id !== tempWallFurniture.furniture.id),
              tempWallFurniture.targetWallId === id && tempWallFurniture.furniture,
            ].filter(e => e !== false);

            const { cornersDiff } = getNotUndefined(wallCornersDiff.find(e => e.wallId === id), 'This should never happen. |avl8c5|');
            const isMeasurementsShown = (viewMode === '2D' || isLabelsIn3DShown === true) && (viewMode !== '2D' || isActive === true);
            const wallSidesRelations = wallSidesSpaceRelations.find(e => e.wallId === id);
            const isOverFloorPlan = wallsOverFloorPlan.some(e => e.id === id);

            return (
              isLevelVisible === false || isHidden === true || isDormerBeingMoved === true
                ? null
                : isVisible === false
                  ? (
                    <HiddenWall
                      wallSidesRelations={wallSidesRelations}
                      key={id}
                      id={id}
                      position={position}
                      elevation={elevation}
                      showMeasurement={
                        // eslint-disable-next-line react/jsx-no-leaked-render
                        true
                          && (viewMode === '2D' || isLabelsIn3DShown === true)
                          && (viewMode !== '2D' || isActive === true)
                          && (isMeasurementsShown1 === true || isMeasurementsShown2 === true)
                      }
                      cornersDiff={cornersDiff}
                      wallThickness={thickness}
                      isActiveLevel={isActive}
                      wallHeight={!isNull(height) ? height : levelHeight}
                      levelId={levelId}
                    />
                  )
                  : (
                    <Wall
                      wallSidesRelations={wallSidesRelations}
                      key={id}
                      id={id}
                      levelId={levelId}
                      isActiveLevel={isActive}
                      position={position}
                      frontTexture={frontTexture}
                      backTexture={backTexture}
                      furnitures={futureFurnitures}
                      elevation={elevation}
                      wallHeight={!isNull(height) ? height : levelHeight}
                      isOverFloorPlan={isOverFloorPlan}
                      opacity={isSemiTransparent === true ? semiTransparentElementsOpacity : opacity}
                      thickness={thickness}
                      cornersDiff={cornersDiff}
                      isMeasurementsShown1={isMeasurementsShown === true && isMeasurementsShown1 === true}
                      isMeasurementsShown2={isMeasurementsShown === true && isMeasurementsShown2 === true}
                      frontColorOverlay={frontColorOverlay}
                      backColorOverlay={backColorOverlay}
                      frontCompositeOperation={frontCompositeOperation}
                      backCompositeOperation={backCompositeOperation}
                      polygonOffset={getPolygonOffsetForLevel(levelId, levels)}
                      excludeFromRoofCutting={excludeFromRoofCutting}
                      dormerRoofId={dormerRoofId}
                    />
                  )
            );
          })
      }
    </>
  );
};
