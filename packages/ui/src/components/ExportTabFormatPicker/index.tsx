import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { RadioGroup } from '../RadioGroup';
import { menuHorizontalGutterWidth } from '../../utils/styles';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 ${menuHorizontalGutterWidth}px;
`;

const Title = styled('span')(({ theme }) => css`
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);

export type ExportTabFormatPickerProps<T> = {
  title: string;
  chosenFormat: NoInfer<T>;
  formats: readonly T[];
  onChange: (v: NoInfer<T>) => void;
};

export function ExportTabFormatPicker<T extends string>({
  className,
  title,
  formats,
  chosenFormat,
  onChange,
}: ExportTabFormatPickerProps<T> & WithClassName) {
  return (
    <Container className={className}>
      <Title>{title}</Title>
      <RadioGroup
        direction='column'
        value={chosenFormat}
        options={formats.map(e => ({ label: e, value: e }))}
        onChange={e => onChange(e as T)}
      />
    </Container>
  );
}
