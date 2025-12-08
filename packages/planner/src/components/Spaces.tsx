import { getNotUndefined, isArrayLength, isUndefined, trimMultiline } from '@arthurka/ts-utils';
import { Text } from '@react-three/drei';
import { Vector2 } from 'three';
import { Suspense } from 'react';
import { clearFutureWalls, useCreationMode, useCreationModeConfig, useGlobalSettings, useLevels, usePopUpToolbar, useSpaces, useTempWalls, useViewMode, useWalls } from '../zustand';
import { useActiveActionCheck } from '../customHooks';
import { getSpaceAreaWithUnits } from '../utils';

export const Spaces: React.FC = () => {
  const isSpaceNamesShown = useGlobalSettings(s => s.isSpaceNamesShown);
  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const isLabelsIn3DShown = useGlobalSettings(s => s.isLabelsIn3DShown);
  const { spaces } = useSpaces();
  const { levels } = useLevels();
  const { walls } = useWalls();
  const { tempWalls } = useTempWalls();
  const { viewMode } = useViewMode();
  const { creationMode } = useCreationMode();
  const { isActiveActionEnabled } = useActiveActionCheck();

  const futureWalls = clearFutureWalls([...walls, ...tempWalls]);
  return spaces.map(({ id, name, walls: wallIds }) => {
    const spaceWalls = wallIds.map(id => futureWalls.find(e => e.id === id)).filter(e => !isUndefined(e));

    if(!isArrayLength(spaceWalls, '>=', 1)) {
      return null;
    }

    const spaceArea = getSpaceAreaWithUnits(id, spaceWalls, measurementSystem);
    const { elevation, isLevelVisible, isActive } = getNotUndefined(levels.find(e => e.id === spaceWalls[0].levelId), 'Something went wrong. |4c69th|');
    const minX = Math.min(...spaceWalls.flatMap(e => [e.position.start.x, e.position.end.x]));
    const minY = Math.min(...spaceWalls.flatMap(e => [e.position.start.y, e.position.end.y]));
    const maxX = Math.max(...spaceWalls.flatMap(e => [e.position.start.x, e.position.end.x]));
    const maxY = Math.max(...spaceWalls.flatMap(e => [e.position.start.y, e.position.end.y]));

    return (
      true
        && isSpaceNamesShown === true
        && isLevelVisible === true
        && (viewMode === '2D' || isLabelsIn3DShown === true)
        && (viewMode !== '2D' || isActive === true)
        && (
          <Suspense key={id} fallback={null}>
            <Text
              position={[(minX + maxX) / 2, elevation + 0.03, (minY + maxY) / 2]}
              rotation={[-Math.PI / 2, 0, 0]}
              fontSize={0.24}
              lineHeight={1.3}
              textAlign='center'
              font='/fonts/sofia-pro/regular.otf'
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
                        type: 'space',
                        id,
                        coords: new Vector2(e.clientX, e.clientY),
                      },
                    });
                  },
                } satisfies Partial<React.ComponentProps<typeof Text>>
              }
              {
                ...creationMode === 'pointer' && {
                  onClick(e) {
                    if(e.button !== 0 || isActiveActionEnabled === true) {
                      return;
                    }
                    e.stopPropagation();

                    usePopUpToolbar.setState({
                      popUpToolbar: {
                        type: 'space',
                        id,
                        coords: new Vector2(e.clientX, e.clientY),
                      },
                    });
                  },
                } satisfies Partial<React.ComponentProps<typeof Text>>
              }
            >
              {
                trimMultiline`
                  ${name}
                  ${spaceArea}
                `
              }
            </Text>
          </Suspense>
        )
    );
  });
};
