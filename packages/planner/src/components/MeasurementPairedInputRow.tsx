import { MeasurementInputRow, MeasurementInputRowProps } from '@draw-house/ui/dist/components';
import { clamp, fixIEEE } from '@draw-house/common/dist/utils';
import { round } from '@arthurka/ts-utils';
import { GlobalSettingsStore } from '../zustand';
import { measurements } from '../utils';

export type MeasurementPairedInputRowProps = {
  label: MeasurementInputRowProps['label'];
  value: number;
  measurementSystem: GlobalSettingsStore['measurementSystem'];
  name: string;
  onChange: (value: number) => void;
  onBlur?: () => void;
  icon?: MeasurementInputRowProps['icon'];
  min?: number;
  max?: number;
  allowNegative?: boolean;
};

export const MeasurementPairedInputRow: React.FC<MeasurementPairedInputRowProps> = ({
  icon,
  label,
  measurementSystem,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  name,
  value,
  onChange,
  onBlur,
  allowNegative,
}) => {
  const { ft, in: subValue } = measurements.ftToFtIn(fixIEEE(measurements.inToFt(value)));
  const primaryValue = ({
    metric: value,
    imperial: ft,
  } satisfies Record<typeof measurementSystem, number>)[measurementSystem];

  const transformValue = (value: string, type: 'primary' | 'sub') => {
    switch(measurementSystem) {
      case 'metric':
        return clamp(min, Number(value), max);
      case 'imperial': {
        const newPrimaryValue = type === 'primary' ? Number(value) : primaryValue;
        const newSubValue = type === 'sub' ? Number(value) : subValue;
        const inchesTotal = measurements.ftToIn(newPrimaryValue) + newSubValue;

        return clamp(min, inchesTotal, max);
      }
      default:
        ((e: never) => e)(measurementSystem);
        throw new Error('This should never happen. |p7ba8k|');
    }
  };

  return (
    <MeasurementInputRow
      icon={icon}
      label={label}
      onBlur={onBlur}
      firstInput={{
        name,
        value: primaryValue.toString(),
        adornment: measurements.units(measurementSystem),
        allowNegative,
        onChange(value) {
          onChange(transformValue(value, 'primary'));
        },
      }}
      secondInput={measurementSystem !== 'imperial' ? undefined : {
        name: `${name}-sub-unit`,
        value: round(subValue, 2).toString(),
        adornment: measurements.subUnits(measurementSystem),
        onChange(value) {
          onChange(transformValue(value, 'sub'));
        },
      }}
    />
  );
};
