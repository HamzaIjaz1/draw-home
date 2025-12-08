import { isNull, KeyOf } from '@arthurka/ts-utils';
import { useGlobalSettings, useIsDesktopMenu, useSlideUpMenuLvl1, useSlideUpMenuLvl2 } from '../zustand';
import { focusObjectByKey, FocusOpts, restorePOV, saveCurrentPOV } from './useCameraFocus3D';
import { SceneObjectsStore } from '../zustand/useSceneObjects';

const TOGGLE_KEYS = [
  'isExteriorWallsShown',
  'isRoofsShown',
  'isCeilingsShown',
  'isInteriorWallsShown',
  'isFloorsShown',
] as const;

type ToggleKey = typeof TOGGLE_KEYS[number];
type ToggleRequest = Partial<Record<ToggleKey, boolean>>;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && !isNull(v);
}
function getRootState(): Record<string, unknown> {
  const raw = useGlobalSettings.getState();
  return isRecord(raw) ? raw : {};
}
function hasOwn(obj: unknown, key: string): boolean {
  return isRecord(obj) && Object.prototype.hasOwnProperty.call(obj, key) === true;
}
function hasTopFlag(
  key: ToggleKey,
): { exists: true; current: boolean } | { exists: false } {
  const root = getRootState();
  if(hasOwn(root, key) === true) {
    return { exists: true, current: Boolean(root[key]) };
  }
  return { exists: false };
}

const sessionsByKey: Record<ToggleKey, Set<string>> = {
  isExteriorWallsShown: new Set<string>(),
  isRoofsShown: new Set<string>(),
  isCeilingsShown: new Set<string>(),
  isInteriorWallsShown: new Set<string>(),
  isFloorsShown: new Set<string>(),
};

const originalByKey: Partial<Record<ToggleKey, { value: boolean }>> = {};
const tokenKeysMap = new Map<string, ToggleKey[]>();

function genToken(): string {
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

function setTopKeyValue(key: ToggleKey, value: boolean): void {
  useGlobalSettings.setState({ [key]: value });
}

function beginTempToggles(request?: ToggleRequest): string | null {
  if(request === undefined) {
    return null;
  }

  const keysToApply: ToggleKey[] = [];
  for(const k of TOGGLE_KEYS) {
    if(hasOwn(request, k) === true && typeof request[k] === 'boolean') {
      keysToApply.push(k);
    }
  }
  if(keysToApply.length === 0) {
    return null;
  }

  const token = genToken();

  for(const key of keysToApply) {
    const desired = request[key] === true;
    const loc = hasTopFlag(key);
    if(loc.exists !== true) {
      continue;
    }

    const set = sessionsByKey[key];
    if(set.size === 0) {
      originalByKey[key] = { value: loc.current };
    }
    set.add(token);
    setTopKeyValue(key, desired);
  }

  tokenKeysMap.set(token, keysToApply);
  return token;
}

function endTempToggles(token: string | null): void {
  if(isNull(token)) {
    return;
  }
  const keys = tokenKeysMap.get(token);
  if(keys === undefined) {
    return;
  }

  for(const key of keys) {
    const set = sessionsByKey[key];
    if(set.has(token) !== true) {
      continue;
    }
    set.delete(token);

    if(set.size === 0) {
      const snap = originalByKey[key];
      if(snap !== undefined) {
        setTopKeyValue(key, snap.value);
        delete originalByKey[key];
      }
    }
  }

  tokenKeysMap.delete(token);
}

type ExtraOpts = {
  /** Global toggles to apply while the panel is open (top-level keys only) */
  tempToggles?: ToggleRequest;
  /** Skip focusing (still handles open/close + temp toggles) */
  skipFocus?: boolean;
};

const L1_CLOSE_GRACE_MS = 450;
const RECENT_SAME_PANEL_MS = 600;

export async function focusThenOpenAndRestore(
  key: KeyOf<SceneObjectsStore['sceneObjects']>,
  open: () => Promise<void>,
  isThisOpen: () => boolean,
  opts?: FocusOpts & ExtraOpts,
): Promise<void> {
  const { isZoomToSelectionActive } = useGlobalSettings.getState();

  if(isZoomToSelectionActive === true) {
    saveCurrentPOV();
  }

  const hideToken = beginTempToggles(opts?.tempToggles);

  const isDesktop = useIsDesktopMenu.getState().isDesktopMenu === true;
  const effectiveOpts: FocusOpts & ExtraOpts = {
    ...(opts ?? {}),
    yNdcOffset: typeof opts?.yNdcOffset === 'number' ? opts.yNdcOffset : isDesktop === true ? 0 : 0.38,
    margin: typeof opts?.margin === 'number' ? opts.margin : isDesktop === true ? 1.25 : 1.35,
    distMultipliers: (
      Array.isArray(opts?.distMultipliers) === true
        ? (opts as FocusOpts).distMultipliers
        : isDesktop === true
          ? [1.0, 1.25, 1.5]
          : [1.1, 1.35, 1.7]
    ),
    visibleViewportHeight: typeof opts?.visibleViewportHeight === 'number' ? opts.visibleViewportHeight : isDesktop === true ? 1 : 0.5,
  };

  await open();

  if(isThisOpen() !== true) {
    endTempToggles(hideToken);
    if(isZoomToSelectionActive === true) {
      restorePOV();
    }
    return;
  }

  await new Promise(requestAnimationFrame);

  if(effectiveOpts.skipFocus !== true && isZoomToSelectionActive === true) {
    focusObjectByKey(key, effectiveOpts);
  }

  let done = false;
  let closeTimer: number | null = null;

  const clearCloseTimer = (): void => {
    if(!isNull(closeTimer)) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const cleanupFns: Array<() => void> = [];
  const runCleanup = (restore: boolean): void => {
    if(done === true) {
      return;
    }
    done = true;
    clearCloseTimer();
    window.setTimeout(() => {
      for(const fn of cleanupFns) {
        fn();
      }
      endTempToggles(hideToken);
      if(restore === true && isZoomToSelectionActive === true) {
        restorePOV();
      }
    }, 0);
  };
  const restoreAndCleanup = (): void => runCleanup(true);
  const finishNoRestore = (): void => runCleanup(false);

  let lastSeenOurPanelAt = performance.now();

  let prevL2Opened = useSlideUpMenuLvl2.getState().slideUpMenuLvl2.isOpened;
  const unsubL2 = useSlideUpMenuLvl2.subscribe(state => {
    if(done === true) {
      return;
    }
    const curOpened = state.slideUpMenuLvl2.isOpened;

    if(prevL2Opened === true && curOpened === false) {
      window.setTimeout(() => {
        if(done === true) {
          return;
        }

        const l1 = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
        const ourPanel = isThisOpen();
        if(l1.isOpened === true && ourPanel === true) {
          lastSeenOurPanelAt = performance.now();
          return;
        }

        restoreAndCleanup();
      }, 50);
    }

    prevL2Opened = curOpened;
  });
  cleanupFns.push(unsubL2);

  let prevL1Opened = useSlideUpMenuLvl1.getState().slideUpMenuLvl1.isOpened;
  const unsubL1 = useSlideUpMenuLvl1.subscribe(state => {
    if(done === true) {
      return;
    }

    const isOpened = state.slideUpMenuLvl1.isOpened;

    if(isOpened === true) {
      clearCloseTimer();

      if(isThisOpen() === true) {
        lastSeenOurPanelAt = performance.now();
      } else {
        restoreAndCleanup();
      }

      prevL1Opened = isOpened;
      return;
    }

    if(prevL1Opened === true && isOpened === false) {
      clearCloseTimer();

      closeTimer = window.setTimeout(() => {
        closeTimer = null;

        const l1 = useSlideUpMenuLvl1.getState().slideUpMenuLvl1;
        const l2 = useSlideUpMenuLvl2.getState().slideUpMenuLvl2;

        const ourPanel = isThisOpen();
        const stillClosed = l1.isOpened === false;
        const now = performance.now();
        const recentlyOurPanel = now - lastSeenOurPanelAt <= RECENT_SAME_PANEL_MS;

        if(l2.isOpened === true) {
          return;
        }

        if((stillClosed === true && recentlyOurPanel === false) || ourPanel === false) {
          restoreAndCleanup();
        } else {
          finishNoRestore();
        }
      }, L1_CLOSE_GRACE_MS);
    }

    prevL1Opened = isOpened;
  });
  cleanupFns.push(unsubL1);
}
