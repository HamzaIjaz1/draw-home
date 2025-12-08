import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import Color from 'color';
import { isNull, isNullish } from '@arthurka/ts-utils';
import { Label } from '../SliderRow/styles';
import { PaletteColorButton } from '../Palette';

export type RecentColorsProps = {
  label: string;
  recentColors: string[];
  applyHexFromPalette: (hex: string) => void;
  activeHex?: string | null;
};

const RecentColorsWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
export const Stack = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RecentColors: React.FC<RecentColorsProps & WithClassName> = ({
  className,
  label,
  recentColors,
  applyHexFromPalette,
  activeHex,
}) => {
  const normalizedActive = !isNullish(activeHex) ? new Color(activeHex).hex().toLowerCase() : null;

  return (
    <Stack className={className}>
      <Label>{label}</Label>
      <RecentColorsWrapper>
        {
          recentColors.map((hex, i) => {
            const normalized = new Color(hex).hex().toLowerCase();
            const isActive = !isNull(normalizedActive) && normalized === normalizedActive;

            return (
              <PaletteColorButton
                key={`${normalized}-${i}`}
                onClick={() => applyHexFromPalette(hex)}
                background={hex}
                active={isActive}
                highlightVariant={isActive === true ? 'outline' : 'none'}
                aria-label={hex}
                title={hex}
              />
            );
          })
        }
      </RecentColorsWrapper>
    </Stack>
  );
};
