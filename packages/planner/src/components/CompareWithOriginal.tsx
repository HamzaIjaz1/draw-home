import { ImageCompareSlider, MeasurementInputRow, MenuItem } from '@draw-house/ui/dist/components';
import { ReactCompareSliderImage } from 'react-compare-slider';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRotateRightIcon, ScalingCrossedIcon, ScalingIcon } from '@draw-house/ui/dist/components/Icons';
import { theme } from '@draw-house/ui/dist/theme';
import { Slider as MuiSlider, sliderClasses } from '@mui/material';
import { useTextureCompare } from '../customHooks/useTextureCompare';

export type CompareWithOriginalProps = {
  useTextureCompareParams: Parameters<typeof useTextureCompare>;
  initialTransform: { wScale: number; lScale: number; rotateDeg: number };
  onTransformChange?: (t: { wScale: number; lScale: number; rotateDeg: number }) => void;
};

const InputsWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto 1fr auto;
  height: 187px;
  margin-right: -16px;
`;

const IconRowButton = styled.button`
  display: flex;
  width: fit-content;
  align-items: center;
  padding-left: 12px;
  background: transparent;
  border: 0;
  cursor: pointer;
`;

const TransformWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  overflow: visible;
`;

const RotateWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const RotateIconSlot = styled.button`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  padding: 0;
  cursor: pointer;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const FitImg = styled(ReactCompareSliderImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-origin: center center;
`;

const VerticalSliderWrap = styled.div`
  height: 187px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 8px;
`;

const VerticalSlider = styled(MuiSlider) <{ $accent: string }>`
  && {
    height: 100%;
    box-sizing: border-box;
    padding: 10px 0;
    position: relative;
  }

  .${sliderClasses.track} {
    display: none;
  }

  .${sliderClasses.rail} {
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    opacity: 1;
    background: ${({ $accent }) => $accent};
    border-radius: 999px;
    border: 1.5px solid ${theme.palette.background.paper};
    box-sizing: border-box;
  }

  .${sliderClasses.thumb} {
    width: 18px;
    height: 18px;
    border: 2px solid ${({ $accent }) => $accent};
    background: #fff;
    box-shadow: 0 0 8px 0 #00000040;

    &:focus, &:hover, &.${sliderClasses.active}, &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 8px 0 #00000040;
    }
  }
`;

export const CompareWithOriginal: React.FC<CompareWithOriginalProps> = ({
  useTextureCompareParams,
  initialTransform,
  onTransformChange,
}) => {
  const [wScale, setWScale] = useState(initialTransform.wScale);
  const [lScale, setLScale] = useState(initialTransform.lScale);
  const [rotate, setRotate] = useState(initialTransform.rotateDeg);
  const [isLocked, setIsLocked] = useState(true);
  const [baselineOverlay, setBaselineOverlay] = useState(useTextureCompareParams[1]);

  useEffect(() => {
    setBaselineOverlay(useTextureCompareParams[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useTextureCompareParams[0]]);

  useEffect(() => {
    setWScale(initialTransform.wScale);
    setLScale(initialTransform.lScale);
    setRotate(initialTransform.rotateDeg);
  }, [initialTransform.wScale, initialTransform.lScale, initialTransform.rotateDeg]);

  const persist = (next?: Partial<{ wScale: number; lScale: number; rotateDeg: number }>) => {
    const payload = { wScale, lScale, rotateDeg: rotate, ...next };
    onTransformChange?.(payload);
  };

  const baselineCompare = useTextureCompare(
    useTextureCompareParams[0],
    baselineOverlay,
    useTextureCompareParams[2],
  );
  const liveCompare = useTextureCompare(...useTextureCompareParams);

  const minAxis = Math.min(wScale, lScale);
  const normalize = minAxis < 1 ? 1 / Math.max(minAxis, 0.01) : 1;

  const originalTransform = useMemo(
    () => (minAxis < 1 ? `scale(${normalize})` : undefined),
    [minAxis, normalize],
  );

  const editedTransform = useMemo(
    () => `rotate(${Number.isFinite(rotate) ? rotate : 0}deg) scale(${
      Number.isFinite(lScale) ? lScale * normalize : 1 * normalize
    }, ${
      Number.isFinite(wScale) ? wScale * normalize : 1 * normalize
    })`,
    [rotate, wScale, lScale, normalize],
  );

  const parseNum = (
    v: string,
    { min = -Infinity, max = Infinity, fallback = 0 }: { min?: number; max?: number; fallback?: number } = {},
  ) => {
    const n = Number(v.replace(',', '.'));
    if(!Number.isFinite(n)) {
      return fallback;
    }
    return Math.min(max, Math.max(min, n));
  };

  const stepRotate = () => {
    setRotate(prev => {
      const a = ((prev % 360) + 360) % 360;
      const rem = a % 45;
      const delta = rem === 0 ? 45 : 45 - rem;
      const next = (a + delta) % 360;
      persist({ rotateDeg: next });
      return next;
    });
  };

  const toPercent = (s: number) => (Number.isFinite(s) ? s * 100 : 100);
  const snap20 = (p: number) => {
    const rounded = Math.round(p / 20) * 20;
    return Math.min(200, Math.max(20, rounded));
  };

  const sliderValue = snap20(Math.max(1, Math.min(200, Math.round(toPercent(wScale)))));

  return (
    <MenuItem spaceBetween paddingHorizontal>
      <ImageCompareSlider
        imgOne={
          <FitImg
            src={baselineCompare.mixedImageSrc}
            alt='Original'
            style={originalTransform ? { transform: originalTransform } : undefined}
          />
        }
        imgTwo={
          <TransformWrap>
            <FitImg src={liveCompare.mixedImageSrc} alt='Edited' style={{ transform: editedTransform }} />
          </TransformWrap>
        }
      />

      <VerticalSliderWrap>
        <VerticalSlider
          orientation='vertical'
          min={0}
          max={200}
          step={20}
          value={sliderValue}
          $accent={isLocked === true ? theme.palette.primary.main : theme.palette.text.secondary}
          disabled={isLocked === false}
          aria-label='Uniform scale'
          onChange={(_, pct) => {
            const raw = (Array.isArray(pct) ? pct[0] : pct) ?? 100;
            const snapped = snap20(raw);
            const scale = snapped / 100;
            setWScale(scale);
            setLScale(scale);
            persist({ wScale: scale, lScale: scale });
          }}
        />
      </VerticalSliderWrap>

      <InputsWrapper>
        <MeasurementInputRow
          label='W'
          firstInput={{
            name: 'W',
            value: wScale.toString(),
            adornment: 'x',
            onChange(value) {
              const v = parseNum(value, { min: 0.01, fallback: 0.01 });
              setWScale(v);
              if(isLocked === true) {
                setLScale(v);
                persist({ wScale: v, lScale: v });
              } else {
                persist({ wScale: v });
              }
            },
          }}
        />

        <IconRowButton
          type='button'
          aria-pressed={isLocked === true}
          onClick={() => {
            setIsLocked(prev => {
              const next = !prev;
              if(next === !prev) {
                setLScale(wScale);
                persist({ wScale, lScale: wScale });
              }
              return next;
            });
          }}
          title={isLocked === true ? 'Unlock proportions' : 'Lock proportions'}
        >
          {
            isLocked === true
              ? (
                <ScalingIcon color={theme.palette.primary.main} />
              )
              : (
                <ScalingCrossedIcon color={theme.palette.text.secondary} />
              )
          }
        </IconRowButton>

        <MeasurementInputRow
          label='L'
          firstInput={{
            name: 'L',
            value: lScale.toString(),
            adornment: 'x',
            onChange(value) {
              const v = parseNum(value, { min: 0.01, fallback: 0.01 });
              setLScale(v);
              if(isLocked === true) {
                setWScale(v);
                persist({ wScale: v, lScale: v });
              } else {
                persist({ lScale: v });
              }
            },
          }}
        />
        <div />
        <RotateWrapper>
          <RotateIconSlot type='button' onClick={stepRotate}>
            <ArrowRotateRightIcon color={theme.palette.primary.main} />
          </RotateIconSlot>

          <MeasurementInputRow
            label=''
            firstInput={{
              name: 'rotate',
              value: rotate.toString(),
              adornment: '°',
              allowNegative: true,
              onChange(value) {
                const r = parseNum(value, { fallback: 0 });
                setRotate(r);
                persist({ rotateDeg: r });
              },
            }}
          />
        </RotateWrapper>
      </InputsWrapper>
    </MenuItem>
  );
};
