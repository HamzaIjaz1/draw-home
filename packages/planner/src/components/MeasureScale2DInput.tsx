import { IconButton, MenuItem, RowBackdrop, SecondaryButton } from '@draw-house/ui/dist/components';
import { getNotNull, getNotUndefined, isNull, isUndefined } from '@arthurka/ts-utils';
import { useState } from 'react';
import { Positive } from '@draw-house/common/dist/brands';
import { setAsset2DParams, useCustomModels, useGlobalSettings } from '../zustand';
import { MeasurementPairedInputRow } from './MeasurementPairedInputRow';
import { lang } from '../lang';
import { measurements } from '../utils';
import { useSelectedItem } from '../zustand/useSelectedItem';

export const MeasureScale2DInput: React.FC = () => {
  const measurementSystem = useGlobalSettings(s => s.measurementSystem);
  const { customModels } = useCustomModels();
  const { selectedItem } = useSelectedItem();

  const targetSelectedAsset2D = getNotNull(selectedItem, 'This should never happen. |is259t|');
  const measuredDistanceWorld = targetSelectedAsset2D.type === 'asset2D' ? targetSelectedAsset2D.measuredDistanceWorld : null;
  const measureScaleDistance = !isNull(measuredDistanceWorld) ? measuredDistanceWorld : 1;
  const [newLength, setNewLength] = useState(measureScaleDistance);

  const targetAsset2D = getNotUndefined(customModels.find(e => e.id === targetSelectedAsset2D.id), 'This should never happen. |zu17mo|');
  const currentModelScale = isUndefined(targetAsset2D.scale) ? 1 : targetAsset2D.scale;

  return (
    <MenuItem>
      <RowBackdrop>
        <MeasurementPairedInputRow
          name='length'
          label={`${lang.length}:`}
          value={measurements.to(newLength, measurementSystem)}
          measurementSystem={measurementSystem}
          min={0.01}
          onChange={value => {
            setNewLength(measurements.from(value, measurementSystem));
          }}
        />
        <SecondaryButton
          text={lang.apply}
          onClick={() => {
            setAsset2DParams(targetAsset2D.id, {
              scale: Positive(currentModelScale * (newLength / measureScaleDistance)),
            });
          }}
        />
      </RowBackdrop>
      <IconButton
        icon='close'
        size='md-mobile'
        variant='text'
        onClick={() => {
          if(targetSelectedAsset2D.mode === 'measure-scale-mode') {
            useSelectedItem.setState(useSelectedItem.getInitialState());
          }
        }}
      />
    </MenuItem>
  );
};
