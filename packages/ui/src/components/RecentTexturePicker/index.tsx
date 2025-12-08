import Color from 'color';
import { WithClassName } from '@draw-house/common/dist/utils';
import styled from 'styled-components';
import { Container, Image, MaterialButton, Text } from './styles';

type RecentOption<T extends number> = {
  id: T;
  name: string;
  image: string;
  wScale: number;
  lScale: number;
  rotateDeg: number;
  color: string;
};

export type RecentTexturePickerProps<T extends number> = {
  options: Array<RecentOption<T>>;
  chosenOption?: RecentOption<NoInfer<T>>['id'];
  onClick: (id: RecentOption<NoInfer<T>>['id']) => void;
  squareImages?: boolean;
  wrap?: boolean;
  highlightVariant?: 'outline' | 'background';
  size?: 'sm' | 'md';
};

const ThumbFrame = styled.div<{
  $size: 'sm' | 'md';
  $square: boolean;
}>`
  position: relative;
  display: grid;
  place-items: center;
  /* Match Image sizes from styles.ts */
  width: ${({ $size }) => ($size === 'sm' ? '48px' : '56px')};
  height: ${({ $size }) => ($size === 'sm' ? '48px' : '56px')};
  overflow: hidden;
  border-radius: ${({ $square }) => ($square ? '8px' : '50%')};
`;

const Overlay = styled.div<{ $rgba: string; $square: boolean }>`
  position: absolute;
  inset: 0;
  background: ${({ $rgba }) => $rgba};
  mix-blend-mode: multiply;
  pointer-events: none;
  border-radius: ${({ $square }) => ($square ? '8px' : '50%')};
`;

export function RecentTexturePicker<T extends number>({
  className,
  options,
  onClick,
  chosenOption,
  squareImages = false,
  wrap = false,
  highlightVariant = 'outline',
  size = 'md',
}: RecentTexturePickerProps<T> & WithClassName) {
  return (
    <Container className={className} wrap={wrap}>
      {options.map(({ id, image, name, wScale, lScale, rotateDeg, color }) => {
        const w = Number.isFinite(wScale) && wScale > 0 ? wScale : 1;
        const l = Number.isFinite(lScale) && lScale > 0 ? lScale : 1;
        const minAxis = Math.min(w, l);
        const normalize = minAxis < 1 ? 1 / Math.max(minAxis, 0.01) : 1;

        const transform = `rotate(${Number.isFinite(rotateDeg) ? rotateDeg : 0}deg) scale(${l * normalize}, ${w * normalize})`;

        const c = (() => {
          try {
            const cc = Color(color ?? '#fff');
            const { r, g, b } = cc.rgb().object();
            const a = cc.alpha();
            return `rgba(${r}, ${g}, ${b}, ${a})`;
          } catch(e) {
            return 'rgba(255,255,255,1)';
          }
        })();

        return (
          <MaterialButton key={id} onClick={() => onClick(id)} size={size}>
            <ThumbFrame $size={size} $square={squareImages}>
              <Image
                src={image}
                active={id === chosenOption}
                squareImages={squareImages}
                highlightVariant={highlightVariant}
                size={size}
                draggable={false}
                style={{ transform, transformOrigin: 'center center' }}
              />
              <Overlay $rgba={c} $square={squareImages} />
            </ThumbFrame>
            <Text>{name}</Text>
          </MaterialButton>
        );
      })}
    </Container>
  );
}
