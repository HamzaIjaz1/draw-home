import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box3, Group } from 'three';
import { getNotNull, isNull, isUndefined, ValueOf } from '@arthurka/ts-utils';
import { topRightComponentId } from '@draw-house/common/dist/constants';
import { LevelId } from '@draw-house/common/dist/brands';
import { sizeMdDesktop } from '@draw-house/ui/dist/components/IconButton/styles';
import { useLevels } from '../zustand/useLevels';
import { LevelRailsStore, setLevelRails } from '../zustand/useLevelRails';
import { useLevelPlanesForLabels } from '../zustand/useLevelPlanesForLabels';
import { useIsDesktopMenu } from '../zustand';

const SAFE_PAD_FROM_RIGHT_COLUMN = 20;
const MIN_RAIL_START_X_DEFAULT = 16;
const END_CAP_GUARD = 16;
const EMA_ALPHA = 0.35;
const DEADBAND_PX = 1;

export type LevelRailsPublisherProps = {
  levelTargetGroupRef: React.RefObject<Group>;
};

export const LevelRailsPublisher: React.FC<LevelRailsPublisherProps> = ({ levelTargetGroupRef }) => {
  const { levels } = useLevels();
  const { isDesktopMenu } = useIsDesktopMenu();

  const tmpBoxRef = useRef(new Box3());
  const prevXRef = useRef(new Map<LevelId, number>());
  const railEndXRef = useRef(0);

  const roundPx = (x: number) => Math.round(x * window.devicePixelRatio) / window.devicePixelRatio;

  const computeRailEndX = (el: HTMLElement): number => {
    const rect = el.getBoundingClientRect();
    const rightPad = Math.max(0, window.innerWidth - rect.left + SAFE_PAD_FROM_RIGHT_COLUMN);
    return window.innerWidth - rightPad;
  };

  useEffect(() => {
    const topRightContainer = getNotNull(document.getElementById(topRightComponentId), 'This should never happen. |5qb379|');

    const updateRailEndX = () => {
      railEndXRef.current = (
        isDesktopMenu === true
          ? computeRailEndX(topRightContainer)
          : window.innerWidth - Math.max(0, sizeMdDesktop + SAFE_PAD_FROM_RIGHT_COLUMN)
      );
    };

    updateRailEndX();

    const resizeObserver = new ResizeObserver(updateRailEndX);
    resizeObserver.observe(document.documentElement);

    const mutationObserver = new MutationObserver(updateRailEndX);
    mutationObserver.observe(topRightContainer, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    window.addEventListener('resize', updateRailEndX);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('resize', updateRailEndX);
    };
  }, [isDesktopMenu]);

  useEffect(() => {
    setLevelRails([]);
  }, []);

  const finishStartX = (raw: number, idKey: LevelId, railEndX: number): number => {
    const last = prevXRef.current.get(idKey);
    let start = raw;

    if(typeof last === 'number') {
      const delta = raw - last;
      if(delta >= 0) {
        start = raw;
      } else if(Math.abs(delta) < DEADBAND_PX) {
        start = last;
      } else {
        start = last * (1 - EMA_ALPHA) + raw * EMA_ALPHA;
      }
    }

    if(start < MIN_RAIL_START_X_DEFAULT) {
      start = MIN_RAIL_START_X_DEFAULT;
    }
    if(start > railEndX - END_CAP_GUARD) {
      start = railEndX - END_CAP_GUARD;
    }
    if(start < raw) {
      start = raw;
    }

    start = roundPx(start);
    prevXRef.current.set(idKey, start);

    return start;
  };

  const lastCommittedRef = useRef<Array<ValueOf<LevelRailsStore['levelRails']>> | null>(null);

  const equalItems = (a: Array<ValueOf<LevelRailsStore['levelRails']>> | null, b: Array<ValueOf<LevelRailsStore['levelRails']>>): boolean => {
    if(isNull(a) || a.length !== b.length) {
      return false;
    }

    for(let i = 0; i < b.length; i++) {
      const x = a[i];
      const y = b[i];
      if(isUndefined(x) || isUndefined(y)) {
        return false;
      }

      if(x.levelId !== y.levelId) {
        return false;
      }
      if(x.active !== y.active) {
        return false;
      }
      if(x.worldY !== y.worldY) {
        return false;
      }

      if(Math.abs(x.screenY - y.screenY) > 0.75) {
        return false;
      }
      if(Math.abs(x.railX1 - y.railX1) > 0.75) {
        return false;
      }
      if(Math.abs(x.railX2 - y.railX2) > 0.75) {
        return false;
      }
    }
    return true;
  };

  useFrame(() => {
    const house = levelTargetGroupRef.current;
    if(isNull(house)) {
      if(!isNull(lastCommittedRef.current) && lastCommittedRef.current.length > 0) {
        lastCommittedRef.current = [];
        setLevelRails([]);
      }
      return;
    }

    const tmpBox = tmpBoxRef.current;
    tmpBox.setFromObject(house);
    if(tmpBox.isEmpty() === true) {
      if(!isNull(lastCommittedRef.current) && lastCommittedRef.current.length > 0) {
        lastCommittedRef.current = [];
        setLevelRails([]);
      }
      return;
    }

    const railEndX = railEndXRef.current;
    const { levelPlanesForLabels } = useLevelPlanesForLabels.getState();

    const items: Array<ValueOf<LevelRailsStore['levelRails']>> = [];
    for(const lvl of levels) {
      const item = levelPlanesForLabels.items.get(lvl.id);
      if(isUndefined(item)) {
        continue;
      }

      const rawStart = item.screenXRight;
      const startX = finishStartX(rawStart, lvl.id, railEndX);

      items.push({
        levelId: lvl.id,
        screenY: roundPx(item.screenY),
        railX1: roundPx(startX),
        railX2: roundPx(railEndX),
        active: lvl.isActive,
        worldY: item.worldY,
      });
    }

    if(equalItems(lastCommittedRef.current, items) === false) {
      lastCommittedRef.current = items;
      setLevelRails(items);
    }
  });

  return null;
};
