import assert from 'assert';
import { isArrayLength } from '@arthurka/ts-utils';
import { GlobalSettingsStore, useGlobalSettings } from './store';
import { measurementSystemUtils } from '../../utils/measurementSystemUtils';
import { useLevels } from '../useLevels/store';
import { setLevelParams } from '../useLevels/actions';

export const setMeasurementSystemFromInitialSettings = (newMeasurementSystem: GlobalSettingsStore['measurementSystem']) => {
  const { levels } = useLevels.getState();
  assert(isArrayLength(levels, '===', 1), 'Something went wrong. |ep9flp|');

  useGlobalSettings.setState({
    measurementSystem: newMeasurementSystem,
    gridSpacing: measurementSystemUtils.gridSpacing(newMeasurementSystem),
    defaultExteriorWallThickness: measurementSystemUtils.wallThickness('exterior', newMeasurementSystem),
    defaultInteriorWallThickness: measurementSystemUtils.wallThickness('interior', newMeasurementSystem),
  });
  setLevelParams(levels[0].id, {
    height: measurementSystemUtils.levelHeight(newMeasurementSystem),
  });
};
