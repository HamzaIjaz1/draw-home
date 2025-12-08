import { infoPanelFeatures } from '../constants';
import type { CreationModeStore, IsFirstPersonViewStore, SlideUpMenuLvl1Store } from '../zustand';

export const featureDetectors = {
  'level-menu': (e: SlideUpMenuLvl1Store['slideUpMenuLvl1']) => (
    e.isOpened === true && e.type === 'levels'
  ),
  'view-settings-menu': (e: SlideUpMenuLvl1Store['slideUpMenuLvl1']) => (
    e.isOpened === true && e.type === 'visibilitySettings'
  ),
  'settings-menu': (e: SlideUpMenuLvl1Store['slideUpMenuLvl1']) => (
    e.isOpened === true && e.type === 'globalSettings'
  ),
  'ai-menu': (e: SlideUpMenuLvl1Store['slideUpMenuLvl1']) => (
    e.isOpened === true && e.type === 'aiTools'
  ),
  'draw-mode-line': (e: CreationModeStore['creationMode']) => e === 'walls',
  'select-mode': (e: CreationModeStore['creationMode']) => e === 'pointer',
  'walk-mode': (e: IsFirstPersonViewStore['isFirstPersonView']) => e === true,
} as const satisfies Partial<Record<keyof typeof infoPanelFeatures, (...e: never[]) => boolean>>;
