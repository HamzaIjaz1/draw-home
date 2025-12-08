import { Fragment } from 'react';
import { isUndefined } from '@arthurka/ts-utils';
import assert from 'assert';
import { LevelId } from '@draw-house/common/dist/brands';
import { ElevationText, Overlay, Pill, PillText, RailLine, Triangle } from './styles';

export type LevelRailViewItem = {
  levelId: LevelId;
  title?: string;
  screenY: number;
  railX1: number;
  railX2: number;
  active?: boolean;
  worldY?: number;
  elevationText?: string;
};

export type LevelRailsOverlayComponentProps = {
  visible: boolean;
  rightPad: number;
  overlayRightEdgePx: number;
  rails: LevelRailViewItem[];
};

export const LevelRailsOverlayComponent: React.FC<LevelRailsOverlayComponentProps> = ({
  visible,
  rightPad,
  overlayRightEdgePx,
  rails,
}) => (
  visible === false ? null : (
    <Overlay $visible={visible} $rightPad={rightPad}>
      {
        rails.map(({ levelId, title, railX1, railX2, screenY, active = true, elevationText = '' }) => {
          assert(!isUndefined(title), 'This should never happen. |8a1w7a|');

          const endX = Math.min(railX2, overlayRightEdgePx - 2);
          const startX = Math.min(railX1, endX);
          const elevationY = Math.round(screenY) - 16;
          const labelY = elevationY + 18;
          const lineY = Math.round(screenY) + 0.5;

          return (
            <Fragment key={levelId}>
              <RailLine $y={lineY} $x1={startX} $x2={endX} />

              <Pill $y={labelY} $x={endX}>
                <PillText>{title}</PillText>
                <div style={{ transform: 'none' }}>
                  <Triangle $active={active} />
                </div>
              </Pill>

              {elevationText.length > 0 && <ElevationText $y={elevationY} $x={endX}>{elevationText}</ElevationText>}
            </Fragment>
          );
        })
      }
    </Overlay>
  )
);
