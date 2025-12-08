import { useEffect, useState } from 'react';
import { menuFrameWidth } from '@draw-house/ui/dist/components/Menu/FloatingMenu';
import { LevelRailsOverlayComponent } from '@draw-house/ui/dist/components/LevelRailsOverlayComponent';
import { getNotNull, isUndefined } from '@arthurka/ts-utils';
import { topRightComponentId } from '@draw-house/common/dist/constants';
import { sizeMdDesktop } from '@draw-house/ui/dist/components/IconButton/styles';
import { useGlobalSettings, useIsDesktopMenu, useSlideUpMenuLvl1, useViewMode } from '../zustand';
import { useLevelRails } from '../zustand/useLevelRails';
import { useLevels } from '../zustand/useLevels';
import { measurements } from '../utils';

const SAFE_PAD_FROM_RIGHT_COLUMN = 20;

export const LevelsRailOverlay: React.FC = () => {
  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { levelRails } = useLevelRails();
  const { slideUpMenuLvl1 } = useSlideUpMenuLvl1();
  const { levels } = useLevels();
  const { viewMode } = useViewMode();
  const { isDesktopMenu } = useIsDesktopMenu();

  const isVisible = viewMode === '3D' && slideUpMenuLvl1.type === 'levels' && slideUpMenuLvl1.isOpened === true;

  const [rightPad, setRightPad] = useState(menuFrameWidth + SAFE_PAD_FROM_RIGHT_COLUMN);

  useEffect(() => {
    const topRightContainer = getNotNull(document.getElementById(topRightComponentId), 'This should never happen. |p0b91h|');

    const computeRightPadding = () => {
      const rect = topRightContainer.getBoundingClientRect();
      const padding = (
        isDesktopMenu === true
          ? Math.max(0, window.innerWidth - rect.left + SAFE_PAD_FROM_RIGHT_COLUMN)
          : Math.max(0, sizeMdDesktop + SAFE_PAD_FROM_RIGHT_COLUMN)
      );

      setRightPad(padding);
    };

    computeRightPadding();

    const resizeObserver = new ResizeObserver(computeRightPadding);
    resizeObserver.observe(topRightContainer);

    const handleWindowResize = () => computeRightPadding();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      resizeObserver.disconnect();
    };
  }, [isDesktopMenu]);

  const titleById = new Map(levels.map(({ id, name }) => [id, name] as const));

  const railsWithText = (
    [...levelRails]
      .filter(([levelId]) => titleById.has(levelId))
      .map(([levelId, e]) => ({
        ...e,
        levelId,
        title: titleById.get(levelId),
        elevationText: isUndefined(e.worldY) ? '' : measurements.pretty.mFtIn(e.worldY, measurementSystem),
      }))
  );

  return isVisible === true && (
    <LevelRailsOverlayComponent
      visible={isVisible}
      rightPad={rightPad}
      overlayRightEdgePx={window.innerWidth - rightPad}
      rails={railsWithText}
    />
  );
};
