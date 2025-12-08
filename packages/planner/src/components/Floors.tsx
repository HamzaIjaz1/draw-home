import { getNotUndefined, isArrayLength, isUndefined } from '@arthurka/ts-utils';
import { clearFutureWalls, mergeFutureWalls, useGlobalSettings, useLevels, useSpaces, useTempWalls, useWalls } from '../zustand';
import { Floor } from './Floor';
import { getFloorCoordinates } from '../utils';
import { useInteractivePresence } from '../customHooks';
import { semiTransparentElementsOpacity } from '../constants';
import { getOverFloorPlans2DData, useFloorPlans2D } from '../utils/getOverFloorPlans2DData';

export const Floors: React.FC = () => {
  const isFloorsShown = useGlobalSettings(s => s.isFloorsShown);
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();
  const { spaces } = useSpaces();
  const { levels } = useLevels();
  const { getInteractivePresence } = useInteractivePresence();
  const floorPlans2D = useFloorPlans2D();

  const futureWalls = mergeFutureWalls([...walls, ...tempWalls]);
  const wallsOverFloorPlan = getOverFloorPlans2DData(futureWalls, floorPlans2D);
  const spacesOverFloorPlan = spaces.filter(({ walls }) => wallsOverFloorPlan.some(e => walls.includes(e.id)));

  return isFloorsShown === true && (
    spaces.map(({
      id,
      walls: wallIds,
      floorData: {
        isVisible,
        isHidden,
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
      },
    }) => {
      const isOverFloorPlan = spacesOverFloorPlan.some(e => e.id === id);

      if(isVisible === false || isHidden === true || isOverFloorPlan === true) {
        return null;
      }

      const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
      const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));

      if(!isArrayLength(spaceWalls, '>=', 1)) {
        return null;
      }

      const { elevation, isActive, isLevelVisible, isSemiTransparent } = getNotUndefined(levels.find(e => e.id === spaceWalls[0].levelId), 'Something went wrong. |gue7zq|');
      if(isLevelVisible === false) {
        return null;
      }

      const coords = getFloorCoordinates(spaceWalls.map(e => e.position));
      const { isRendered, opacity } = getInteractivePresence(isActive);

      if(isRendered === false || !isArrayLength(coords, '>=', 3)) {
        return null;
      }

      return (
        <Floor
          key={id}
          spaceId={id}
          levelId={spaceWalls[0].levelId}
          coords={coords}
          elevation={elevation}
          opacity={isSemiTransparent === true ? semiTransparentElementsOpacity : opacity}
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
        />
      );
    })
  );
};
