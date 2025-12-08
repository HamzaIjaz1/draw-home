import { isArrayLength, ObjKeys } from '@arthurka/ts-utils';
import { Positive } from '@draw-house/common/dist/brands';
import { NODE_ENV } from '@draw-house/common/dist/envVariables/public';
import assert from 'assert';

export const initialMeasurementSystem = NODE_ENV === 'production' ? 'imperial' : 'metric';

export const floorSquareSize = 140;
export const wallSizeTakeout = 0.35;
export const defaultRoofOverhang = 0.5;
export const defaultRoofHeightFromBase = 0;
export const defaultHipRoofSlope = 35;
export const defaultSlantedRoofSlope = 20;
export const twoDFurnitureColor = '#585858';
export const semiTransparentElementsOpacity = 0.3;
export const semiTransparentElementsOpacity2 = 0.5;
export const floatingMenuDOMNodeId = 'floatingMenuDOMNode';
export const defaultRoofThickness = Positive(0.2);
export const defaultFloorThickness = Positive(0.3);
export const defaultCeilingThickness = Positive(0.3);
export const twoDWallColor = '#cdcdcd';
export const drawingLineColor = '#a0a0a0';
export const wallGuideLineLabelTextColor = '#fff';
export const wallGuideLineDistanceColor = '#31bcfdff';
export const wallGuideLineDistanceLabelColor = '#31bcfd98';
export const wallGuideLineSnapColor = '#fd5631ff';
export const wallFurnitureLockAxisColor = '#999';
export const levelMaxHeight = 10;
export const furnitureSnapDistance = 0.1;
export const assets2DDefaultSize = 5;
export const ghostOpacity = 0.5;
export const compositeOperations = (() => {
  const compositeOperations = ObjKeys({
    multiply: true,
    overlay: true,
    color: true,
    'color-burn': true,
    'color-dodge': true,
    copy: true,
    darken: true,
    'destination-atop': true,
    'destination-in': true,
    'destination-out': true,
    'destination-over': true,
    difference: true,
    exclusion: true,
    'hard-light': true,
    hue: true,
    lighten: true,
    lighter: true,
    luminosity: true,
    saturation: true,
    screen: true,
    'soft-light': true,
    'source-atop': true,
    'source-in': true,
    'source-out': true,
    'source-over': true,
    xor: true,
  } satisfies Record<GlobalCompositeOperation, true>);

  assert(isArrayLength(compositeOperations, '>=', 1), 'This should never happen. |10x9v7|');

  return compositeOperations;
})();

export const quickTourClassNames = {
  welcome: 'quickTour_welcome',
  drawLineTool: 'quickTour_drawLineTool',
  tab3D: 'quickTour_tab3D',
  menuPointer: 'quickTour_menuPointer',
} as const satisfies Record<string, `quickTour_${string}`>;

export const infoPanelFeatures = {
  'first-space-completed': { onboarding: true },
  'first-switch-to-3d': { onboarding: true },
  'first-wall-drawn': { onboarding: true },
  'first-wall-furniture-added': { onboarding: true },
  'first-switch-to-walk-mode': { onboarding: true },
  'ai-menu': { onboarding: false },
  'draw-mode-line': { onboarding: false },
  'level-menu': { onboarding: false },
  'select-mode': { onboarding: false },
  'settings-menu': { onboarding: false },
  'view-settings-menu': { onboarding: false },
  'walk-mode': { onboarding: false },
} as const satisfies Record<string, { onboarding: boolean }>;

export const importAllowedAsset2DExtensions = ['jpg', 'jpeg', 'png'] as const;
export const importAllowedAsset3DExtensions = ['glb'] as const;

export const perspectiveCameraY = 10;
export const cameraTargetY = 0.5;

export const maxStorageUsageKilobytes = 1_000_000;
