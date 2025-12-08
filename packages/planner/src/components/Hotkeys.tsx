import { useEffect } from 'react';
import { throttle } from 'throttle-debounce';
import { isArrayIncludes, isNull, isUndefined, ObjKeys } from '@arthurka/ts-utils';
import { split } from '@draw-house/common/dist/utils';
import { redo, setWallFurnitureCreationMode, switchLevel, undo, useTempWalls, useViewMode } from '../zustand';
import { toggleAiToolsSlideUpMenu } from '../utils/handlerHelpers/toggleAiToolsSlideUpMenu';
import { switchViewModeToggle } from '../utils/handlerHelpers/switchViewModeToggle';
import { toggleVisibilitySlideUpMenu } from '../utils/handlerHelpers/toggleVisibilitySlideUpMenu';
import { useIsExportPopupOpened } from '../zustand/useIsExportPopupOpened';
import { saveProjectButtonClick } from '../utils/handlerHelpers/saveProjectButtonClick';
import { useIsMouseControlStarted } from '../zustand/useIsMouseControlStarted';
import { toggleCatalogSlideUpMenu } from '../utils/handlerHelpers/toggleCatalogSlideUpMenu';
import { toggleLevelsSlideUpMenu } from '../utils/handlerHelpers/toggleLevelsSlideUpMenu';
import { toggleGlobalSettingsSlideUpMenu } from '../utils/handlerHelpers/toggleGlobalSettingsSlideUpMenu';
import { toggleIsImageAssetsPopupButtonOpened } from '../zustand/useIsImageAssetsPopupButtonOpened';
import { escapeHotkeyPress } from '../utils/handlerHelpers/escapeHotkeyPress';
import { clickPointerModeButton } from '../utils/creationModeOrigin';
import { clickWallCreationButton } from '../utils/handlerHelpers/clickWallCreationButton';
import { deleteHotkeyPress } from '../utils/handlerHelpers/deleteHotkeyPress';
import { ModifierKeysHoldingStore, useModifierKeysHolding } from '../zustand/useModifierKeysHolding';
import { copyObjectHotkeyPress } from '../utils/handlerHelpers/copyObjectHotkeyPress';
import { pasteObjectFromClipboardHotkeyPress } from '../utils/handlerHelpers/pasteObjectFromClipboardHotkeyPress';
import { useStrapiAppConfigResolved } from '../zustand/useStrapiAppConfig';
import { orbitControlsCameraZoomInOutHotkeyPress } from '../utils/handlerHelpers/orbitControlsCameraZoomInOutHotkeyPress';
import { moveCameraHotkeyPress } from '../utils/handlerHelpers/moveCameraHotkeyPress';
import { rotateCameraHotkeyPress } from '../utils/handlerHelpers/rotateCameraHotkeyPress';
import { rHotkeyPress } from '../utils/handlerHelpers/rHotkeyPress';
import { shiftRHotkeyPress } from '../utils/handlerHelpers/shiftRHotkeyPress';
import { useIsHotkeysShown } from '../zustand/useIsHotkeysShown';
import { useIsInfoPanelOpened } from '../zustand/useIsInfoPanelOpened';
import { objectDeselectHotkeyPress } from '../utils/handlerHelpers/objectDeselectHotkeyPress';

const keys = split('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
const specialKeys = ObjKeys({
  Escape: true,
  Equal: true,
  Minus: true,
  Space: true,
  Comma: true,
  Period: true,
  Backslash: true,
  Backspace: true,
  Enter: true,
  Backquote: true,
  AltLeft: true,
  AltRight: true,
  Tab: true,
  PageDown: true,
  PageUp: true,
  Home: true,
  End: true,
  Delete: true,
  ShiftLeft: true,
  ShiftRight: true,
  ControlLeft: true,
  ControlRight: true,
  ArrowLeft: true,
  ArrowRight: true,
  ArrowUp: true,
  ArrowDown: true,
  Slash: true,
} satisfies Record<string, true>);

type NoModifiersHotkey = typeof keys[number] | typeof specialKeys[number];
type Hotkey = `${'Ctrl+' | ''}${'Alt+' | ''}${'Shift+' | ''}${NoModifiersHotkey}`;

const makeNoModifiersHotkey = (e: KeyboardEvent): NoModifiersHotkey | null => {
  const code = e.code.replace(/Digit(\d)/, '$1').replace(/Key(\w)/, '$1');

  return isArrayIncludes([...keys, ...specialKeys], code) ? code : null;
};
const makeHotkey = (e: KeyboardEvent): Hotkey | null => {
  const noModifiersHotkey = makeNoModifiersHotkey(e);

  return (
    isNull(noModifiersHotkey)
      ? null
      : `${e.ctrlKey === true ? 'Ctrl+' : ''}${e.altKey === true ? 'Alt+' : ''}${e.shiftKey === true ? 'Shift+' : ''}${noModifiersHotkey}`
  );
};
const isHotkeysDisabled = (e: KeyboardEvent): boolean => {
  const { isMouseControlStarted } = useIsMouseControlStarted.getState();

  if(isMouseControlStarted === true) {
    return true;
  }
  if(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
    return ['text', 'number', 'textarea'].includes(e.target.type);
  }

  return false;
};

const keydownThrottledCache = new Map<NoModifiersHotkey, throttle<(e1: Hotkey, e2: ModifierKeysHoldingStore['modifierKeysHolding']) => Promise<void>>>();
const pendingPromisesCache = new Map<Hotkey, Promise<void>>();

export const Hotkeys: React.FC = () => {
  useEffect(() => {
    const preventDefaultKeydown = (e: KeyboardEvent) => {
      const hotkey = makeHotkey(e);
      if(isHotkeysDisabled(e) || isNull(hotkey)) {
        return;
      }

      switch(hotkey) {
        case 'Tab':
        case 'Shift+Tab':
        case 'Ctrl+S':
        case 'Alt+AltLeft':
        case 'Space':
        case 'Ctrl+Equal':
        case 'Ctrl+Minus':
          e.preventDefault();
          break;
        default:
          break;
      }
    };
    const keydown = async (hotkey: Hotkey) => {
      const { strapiAppConfig } = useStrapiAppConfigResolved.getState();

      switch(hotkey) {
        case 'Ctrl+Z':
          undo();
          break;
        case 'Ctrl+Shift+Z':
        case 'Ctrl+Y':
          redo();
          break;
        case 'D':
          clickWallCreationButton();
          break;
        case 'S':
          useTempWalls.setState(useTempWalls.getInitialState());
          clickPointerModeButton();
          break;
        case 'Escape':
          escapeHotkeyPress();
          break;
        case 'A':
          await toggleAiToolsSlideUpMenu();
          break;
        case 'Tab': {
          const { viewMode } = useViewMode.getState();

          await switchViewModeToggle(viewMode === '2D' ? '3D' : '2D');
          break;
        }
        case '2':
          await switchViewModeToggle('2D');
          break;
        case '3':
          await switchViewModeToggle('3D');
          break;
        case '4':
          await switchViewModeToggle('dollhouse');
          break;
        case 'W':
          await switchViewModeToggle('walk');
          break;
        case 'Shift+D':
          await setWallFurnitureCreationMode('doors', false, strapiAppConfig.defaultDoorModels[0].url);
          break;
        case 'Shift+W':
          await setWallFurnitureCreationMode('windows', false, strapiAppConfig.defaultWindowModels[0].url);
          break;
        case 'V':
          await toggleVisibilitySlideUpMenu();
          break;
        case 'Ctrl+S':
          await saveProjectButtonClick({});
          break;
        case 'E':
          useIsExportPopupOpened.setState({ isExportPopupOpened: true });
          break;
        case 'R':
          rHotkeyPress();
          break;
        case 'Shift+R':
          shiftRHotkeyPress();
          break;
        case 'C':
        case 'Equal':
        case 'Shift+Equal':
          await toggleCatalogSlideUpMenu();
          break;
        case 'Space':
        case 'L':
          await toggleLevelsSlideUpMenu();
          break;
        case 'P':
        case 'T':
          await toggleGlobalSettingsSlideUpMenu();
          break;
        case 'F':
          toggleIsImageAssetsPopupButtonOpened();
          break;
        case 'Home':
        case 'PageUp':
          switchLevel('prev');
          break;
        case 'End':
        case 'PageDown':
          switchLevel('next');
          break;
        case 'Delete':
        case 'Backspace':
          deleteHotkeyPress();
          break;
        case 'Ctrl+C':
          copyObjectHotkeyPress();
          break;
        case 'Ctrl+V':
          pasteObjectFromClipboardHotkeyPress();
          break;
        case 'Z':
        case 'Ctrl+Equal':
          orbitControlsCameraZoomInOutHotkeyPress('in');
          break;
        case 'Shift+Z':
        case 'Ctrl+Minus':
          orbitControlsCameraZoomInOutHotkeyPress('out');
          break;
        case 'ArrowUp':
          moveCameraHotkeyPress('forward');
          break;
        case 'ArrowDown':
          moveCameraHotkeyPress('backward');
          break;
        case 'ArrowLeft':
          moveCameraHotkeyPress('left');
          break;
        case 'ArrowRight':
          moveCameraHotkeyPress('right');
          break;
        case 'Ctrl+ArrowUp':
          rotateCameraHotkeyPress('up');
          break;
        case 'Ctrl+ArrowDown':
          rotateCameraHotkeyPress('down');
          break;
        case 'Ctrl+ArrowLeft':
          rotateCameraHotkeyPress('left');
          break;
        case 'Ctrl+ArrowRight':
          rotateCameraHotkeyPress('right');
          break;
        case 'Slash':
          useIsHotkeysShown.setState({ isHotkeysShown: true });
          useIsInfoPanelOpened.setState({ isInfoPanelOpened: true });
          break;
        case 'X':
          objectDeselectHotkeyPress();
          break;
        default:
          break;
      }
    };
    const keyup = (e: KeyboardEvent) => {
      const noModifiersHotkey = makeNoModifiersHotkey(e);
      if(isHotkeysDisabled(e) || isNull(noModifiersHotkey)) {
        return;
      }

      switch(noModifiersHotkey) {
        case 'Slash':
          useIsHotkeysShown.setState({ isHotkeysShown: false });
          break;
        default:
          break;
      }

      useModifierKeysHolding.setState({
        modifierKeysHolding: {
          ctrl: e.ctrlKey,
          alt: e.altKey,
          shift: e.shiftKey,
        },
      });
      keydownThrottledCache.delete(noModifiersHotkey);
    };
    const blur = () => {
      useIsHotkeysShown.setState({ isHotkeysShown: false });
      useModifierKeysHolding.setState({
        modifierKeysHolding: {
          ctrl: false,
          alt: false,
          shift: false,
        },
      });
    };

    const throttledKeydown = (e: KeyboardEvent) => {
      const hotkey = makeHotkey(e);
      const noModifiersHotkey = makeNoModifiersHotkey(e);
      if(isHotkeysDisabled(e) || isNull(hotkey) || isNull(noModifiersHotkey)) {
        return;
      }

      const throttledHandler = (() => {
        const cached = keydownThrottledCache.get(noModifiersHotkey);
        if(!isUndefined(cached)) {
          return cached;
        }

        const handler = throttle(700, async (hotkey: Hotkey, modifierKeysHolding: ModifierKeysHoldingStore['modifierKeysHolding']) => {
          const pendingPromise = pendingPromisesCache.get(hotkey);
          if(!isUndefined(pendingPromise)) {
            return;
          }

          useModifierKeysHolding.setState({ modifierKeysHolding });

          const result = keydown(hotkey).finally(() => {
            pendingPromisesCache.delete(hotkey);
          });
          pendingPromisesCache.set(hotkey, result);

          await result;
        }, { debounceMode: true });

        keydownThrottledCache.set(noModifiersHotkey, handler);

        return handler;
      })();

      throttledHandler(hotkey, {
        ctrl: e.ctrlKey,
        alt: e.altKey,
        shift: e.shiftKey,
      });
    };

    window.addEventListener('blur', blur);
    document.addEventListener('keydown', preventDefaultKeydown);
    document.addEventListener('keydown', throttledKeydown);
    document.addEventListener('keyup', keyup);

    return () => {
      window.removeEventListener('blur', blur);
      document.removeEventListener('keydown', preventDefaultKeydown);
      document.removeEventListener('keydown', throttledKeydown);
      document.removeEventListener('keyup', keyup);
    };
  }, []);

  return null;
};
