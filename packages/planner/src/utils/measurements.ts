import { fixIEEE } from '@draw-house/common/dist/utils';
import { isUndefined, round } from '@arthurka/ts-utils';
import assert from 'assert';
import { digitsAfterPoint } from '@draw-house/common/dist/constants';
import { Decimal } from 'decimal.js';
import type { GlobalSettingsStore } from '../zustand/useGlobalSettings';

const metersInInch = 0.0254;
const sqFtInSqMeter = 10.764;
const inchesPerFoot = 12;

export const measurements = {
  to(m: number, measurementSystem: GlobalSettingsStore['measurementSystem']) {
    return ({
      metric: fixIEEE(m),
      imperial: fixIEEE(m / metersInInch),
    } satisfies Record<typeof measurementSystem, number>)[measurementSystem];
  },
  from(mOrIn: number, measurementSystem: GlobalSettingsStore['measurementSystem']) {
    return ({
      metric: mOrIn,
      imperial: mOrIn * metersInInch,
    } satisfies Record<typeof measurementSystem, number>)[measurementSystem];
  },
  units(measurementSystem: GlobalSettingsStore['measurementSystem']) {
    return ({
      metric: 'm',
      imperial: '′',
    } as const satisfies Record<typeof measurementSystem, string>)[measurementSystem];
  },
  subUnits(measurementSystem: GlobalSettingsStore['measurementSystem']) {
    return ({
      metric: 'cm',
      imperial: '″',
    } as const satisfies Record<typeof measurementSystem, string>)[measurementSystem];
  },
  inToFt(i: number) {
    return i / inchesPerFoot;
  },
  ftToIn(ft: number) {
    return ft * inchesPerFoot;
  },
  ftToFtIn(ft: number) {
    const wholeFootComponent = Math.trunc(ft);
    const remainingInches = (ft - wholeFootComponent) * inchesPerFoot;

    return {
      ft: wholeFootComponent,
      in: remainingInches,
    };
  },
  pretty: {
    mFtIn(m: number, measurementSystem: GlobalSettingsStore['measurementSystem']) {
      switch(measurementSystem) {
        case 'metric':
          return `${round(m, digitsAfterPoint)} m`;
        case 'imperial': {
          const inches = new Decimal(fixIEEE(m)).div(metersInInch).mul(4).round().div(4);
          const ft = inches.divToInt(inchesPerFoot).toNumber();
          const b = inches.mod(inchesPerFoot);
          const inch = b.divToInt(1).toNumber();
          const fraction = ({
            0: '',
            0.25: '¼',
            0.5: '½',
            0.75: '¾',
          } as const)[b.mod(1).toNumber()];

          assert(!isUndefined(fraction), 'This should never happen. |vhf74f|');

          return `${ft}′ ${inch === 0 && fraction !== '' ? '' : inch}${fraction}″`;
        }
        default:
          ((e: never) => e)(measurementSystem);
          throw new Error('This should never happen. |16nt65|');
      }
    },
    sqMSqFt(sqM: number, measurementSystem: GlobalSettingsStore['measurementSystem']) {
      return ({
        metric: `${round(sqM, digitsAfterPoint)} m²`,
        imperial: `${round(fixIEEE(sqM * sqFtInSqMeter), digitsAfterPoint)} ft²`,
      } satisfies Record<typeof measurementSystem, string>)[measurementSystem];
    },
  },
};
