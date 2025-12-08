import { Positive } from '@draw-house/common/dist/brands';
import { NODE_ENV } from '@draw-house/common/dist/envVariables/public';
import { create } from 'zustand';
import { measurementSystemUtils } from '../../utils/measurementSystemUtils';
import { initialMeasurementSystem } from '../../constants';
import { RoofsStore } from '../useRoofs/store';
import { withComparingSetState } from '../../utils/withComparingSetState';
import { lang } from '../../lang';

export type GlobalSettingsStore = {
  projectName: string;
  isMeasurementsShown1: boolean;
  isMeasurementsShown2: boolean;
  isSpaceNamesShown: boolean;
  measurementSystem: 'metric' | 'imperial';
  withLandscapeTextures: boolean;
  landscapeTexture: string | null;
  withFloorTextures: boolean;
  gridSpacing: Positive;
  snapToWallEnd: boolean;
  snapToWallLine: boolean;
  snapToGrid: boolean;
  snapToLockedAxis: boolean;
  isRoofsShown: boolean;
  isGridShown: boolean;
  isZoomToSelectionActive: boolean;
  isLabelsIn3DShown: boolean;
  isExteriorWallsShown: boolean;
  isInteriorWallsShown: boolean;
  isFloorsShown: boolean;
  isCeilingsShown: boolean;
  isDoorsShown: boolean;
  isWindowsShown: boolean;
  isCustomModelsShown: boolean;
  isColumnsShown: boolean;
  isStairsShown: boolean;
  isAssets2DShown: boolean;
  isRoofLinesIn2DShown: boolean;
  isOutlinesTurnedOn: boolean;
  defaultExteriorWallThickness: Positive;
  defaultInteriorWallThickness: Positive;
  snapDistanceFactor: Positive;
  defaultRoof: {
    isVisible: RoofsStore['roofs'][number]['roofData']['isVisible'];
    type: 'hip-with-all-gable-corners' | RoofsStore['roofs'][number]['roofData']['type'];
  };
  outlinesSettings: {
    depthBias: number;
    depthMultiplier: number;
    normalBias: number;
    normalMultiplier: number;
    outlineColor: string;
    debugVisualize: 0 | 1 | 2 | 3 | 4;
  };
};

export const defaultProjectName = NODE_ENV === 'production' ? lang.newProjectName : 'DEV project';

export const useGlobalSettings = create<GlobalSettingsStore>(() => ({
  projectName: defaultProjectName,
  isMeasurementsShown1: true,
  isMeasurementsShown2: false,
  isSpaceNamesShown: true,
  measurementSystem: initialMeasurementSystem,
  withLandscapeTextures: false,
  landscapeTexture: null,
  withFloorTextures: false,
  gridSpacing: measurementSystemUtils.gridSpacing(initialMeasurementSystem),
  snapToWallEnd: true,
  snapToWallLine: true,
  snapToGrid: true,
  snapToLockedAxis: true,
  isRoofsShown: true,
  isGridShown: true,
  isZoomToSelectionActive: false,
  isLabelsIn3DShown: true,
  isExteriorWallsShown: true,
  isInteriorWallsShown: true,
  isFloorsShown: true,
  isCeilingsShown: true,
  isDoorsShown: true,
  isWindowsShown: true,
  isCustomModelsShown: true,
  isColumnsShown: true,
  isStairsShown: true,
  isAssets2DShown: true,
  isRoofLinesIn2DShown: false,
  isOutlinesTurnedOn: false,
  defaultExteriorWallThickness: measurementSystemUtils.wallThickness('exterior', initialMeasurementSystem),
  defaultInteriorWallThickness: measurementSystemUtils.wallThickness('interior', initialMeasurementSystem),
  snapDistanceFactor: Positive(4),
  defaultRoof: {
    isVisible: true,
    type: 'hip-with-all-gable-corners',
  },
  outlinesSettings: {
    depthBias: 1,
    depthMultiplier: 1,
    normalBias: 1,
    normalMultiplier: 1,
    outlineColor: '#a7a7a7',
    debugVisualize: 0,
  },
}));

withComparingSetState(useGlobalSettings);
