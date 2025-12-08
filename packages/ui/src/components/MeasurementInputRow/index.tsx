import { WithClassName } from '@draw-house/common/dist/utils';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { useId } from 'react';
import { Input } from '../TextField';
import { InputVariant } from '../TextField/types';
import { Container, FloorHeightHintIcon, Inputs, Label, LabelTypography, LevelElevationHintIcon } from './styles';

const icons = {
  levelElevationHint: LevelElevationHintIcon,
  floorHeightHint: FloorHeightHintIcon,
};

const NullComponent = () => null;

type InputProps = {
  value: string;
  onChange: (e: string) => void;
  min?: number;
  max?: number;
  allowNegative?: boolean;
  name: string;
  adornment: string;
  variant?: InputVariant;
  disabled?: boolean;
};

export type MeasurementInputRowProps = {
  firstInput: InputProps;
  secondInput?: InputProps;
  label: string;
  icon?: keyof typeof icons;
  onBlur?: () => void;
};

export const MeasurementInputRow = ({
  className,
  label,
  icon,
  firstInput,
  secondInput,
  onBlur,
}: MeasurementInputRowProps & WithClassName) => {
  const id1 = useId();
  const id2 = useId();
  const Icon = isUndefined(icon) ? NullComponent : icons[icon];

  return (
    <Container className={className}>
      <Label htmlFor={firstInput.name}>
        <Icon />
        {/* eslint-disable-next-line arthurka/space-after-keywords */}
        <LabelTypography as='span'>{label}</LabelTypography>
      </Label>

      <Inputs
        onBlur={isUndefined(onBlur) ? undefined : e => {
          if(!isNull(e.relatedTarget) && e.currentTarget.contains(e.relatedTarget)) {
            return;
          }

          onBlur();
        }}
      >
        <Input
          id={id1}
          name={firstInput.name}
          type='number'
          size={isUndefined(secondInput) ? 'sm' : 'xs'}
          variant={firstInput.variant}
          adornment={firstInput.adornment}
          value={firstInput.value}
          onChange={firstInput.onChange}
          min={firstInput.min}
          max={firstInput.max}
          allowNegative={firstInput.allowNegative}
          disabled={firstInput.disabled}
        />
        {
          isUndefined(secondInput) ? null : (
            <Input
              id={id2}
              name={secondInput.name}
              type='number'
              size='xs'
              variant={firstInput.variant}
              adornment={secondInput.adornment}
              value={secondInput.value}
              onChange={secondInput.onChange}
              min={secondInput.min}
              max={secondInput.max}
              allowNegative={secondInput.allowNegative}
              disabled={secondInput.disabled}
            />
          )
        }
      </Inputs>
    </Container>
  );
};
