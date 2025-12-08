import { WithClassName } from '@draw-house/common/dist/utils';
import Color from 'color';
import { css, styled } from '@mui/material';
import { isNull } from '@arthurka/ts-utils';
import { createStyledOptions } from '../../utils/createStyledOptions';

type PaletteWrapperProps = {
  paletteColumns: number;
};
const opts = createStyledOptions<PaletteWrapperProps>({
  paletteColumns: true,
});
const PaletteWrapper = styled('div', opts)<PaletteWrapperProps>(({ paletteColumns }) => css`
  display: grid;
  grid-template-columns: repeat(${paletteColumns}, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
`);

const ALL_COLORS_MATRIX: string[][] = [
  ['#fff', '#f8f8f6', '#f5f3f0', '#f0ede8', '#ebe8e1', '#e8e6e4', '#e5e2de', '#d0ccc8', '#c0bab4'],
  ['#b8b2ac', '#a09890', '#908078', '#887e74', '#706458', '#584a3c', '#504540', '#483f38', '#403830', '#383028'],
  ['#fdf5e6', '#f8eaba', '#f5e6a3', '#e6d080', '#d4b86a', '#c2a050', '#b08840', '#9e7030', '#8c5820', '#7a4018'],
  ['#f8e8e0', '#f4ddd4', '#e8c4b0', '#d4a081', '#c08060', '#b07050', '#a66840', '#965a35', '#864c2a', '#763e20'],
  ['#f0d8d0', '#e6b8a8', '#d29580', '#c07860', '#b87060', '#a05040', '#883020', '#702818', '#5c2010', '#481808'],
  ['#f0f8ff', '#e8f4f8', '#e0f0f5', '#d0e3ea', '#b8d5e0', '#a0c7d5', '#88b9ca', '#70abbf', '#5a9db4', '#448fa9'],
  ['#7ab8ca', '#5ba0b8', '#4088a0', '#307088', '#285870', '#204058', '#182840', '#101828', '#0c1420', '#081018'],
  ['#d0e8e0', '#a8d1c8', '#80b8a8', '#60a088', '#408868', '#207048', '#185838', '#104028', '#0c3020', '#082018'],
  ['#f0f5e8', '#e8f0d6', '#d8e6c4', '#c8dca8', '#b8d18c', '#a8c670', '#9bb88a', '#8baa6f', '#7a986a', '#6a8860'],
  ['#f2f4f0', '#e8eae0', '#d8dac8', '#c8cab0', '#b8ba98', '#a8aa80', '#989a68', '#888a50', '#787a40', '#686a30'],
];

type PaletteColorButtonProps = {
  background: string;
  active: boolean;
  highlightVariant?: 'outline' | 'none';
};

const btnOpts = createStyledOptions<PaletteColorButtonProps>({
  background: true,
  active: true,
  highlightVariant: true,
});

export const PaletteColorButton = styled('button', btnOpts)<PaletteColorButtonProps>(({
  theme,
  background,
  active,
  highlightVariant = 'outline',
}) => css`
  width: 30px;
  height: 30px;
  border: 0.5px solid ${theme.palette.text.secondary};
  border-radius: 50%;
  background: ${background};
  background-size: cover;
  cursor: pointer;

  ${highlightVariant === 'outline' && css`
    border: 1px solid transparent;
    ${active && css`
      outline: 2px solid ${theme.palette.primary.main};
      outline-offset: 2px;
    `}
  `}
`);

export type PaletteProps = {
  value: string | null;
  noneOptionImage: string;
  onChange: (hex: string) => void;
  noneOptionClick: () => void;
};

export const Palette: React.FC<PaletteProps & WithClassName> = ({ className, value, noneOptionImage, onChange, noneOptionClick }) => {
  const palette = ALL_COLORS_MATRIX.flat().map(e => new Color(e).hex());
  const paletteColumns = ALL_COLORS_MATRIX.reduce((acc, cur) => Math.max(acc, cur.length), 0);
  const normalizedActive = isNull(value) ? null : new Color(value).hex().toLowerCase();

  return (
    <PaletteWrapper className={className} paletteColumns={paletteColumns}>
      <PaletteColorButton
        background={`url(${noneOptionImage})`}
        active={isNull(value)}
        highlightVariant={isNull(value) ? 'outline' : 'none'}
        title='none'
        onClick={noneOptionClick}
      />
      {
        palette.map((hex, i) => {
          const normalized = new Color(hex).hex().toLowerCase();
          const isActive = normalized === normalizedActive;

          return (
            <PaletteColorButton
              key={`${normalized}-${i}`}
              background={hex}
              active={normalized === normalizedActive}
              highlightVariant={isActive === true ? 'outline' : 'none'}
              title={hex}
              onClick={() => {
                onChange(hex);
              }}
            />
          );
        })
      }
    </PaletteWrapper>
  );
};
