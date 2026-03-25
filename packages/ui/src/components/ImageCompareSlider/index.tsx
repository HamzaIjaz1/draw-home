import { WithClassName } from '@draw-house/common/dist/utils';
import { ReactCompareSlider as BaseReactCompareSlider } from 'react-compare-slider';
import { css, styled } from '@mui/material';
import { SliderHandle } from './SliderHandle';

export const ImgStyles = css`
  width: 100%;
  max-width: 190px !important;
  height: auto;
  border-radius: 50%;
  aspect-ratio: 1/1;
`;

const ReactCompareSlider = styled(BaseReactCompareSlider)`
  ${ImgStyles}
`;

export type ImageCompareSliderProps = {
  imgOne: React.ReactElement;
  imgTwo: React.ReactElement;
};

export const ImageCompareSlider = ({
  className,
  imgOne,
  imgTwo,
}: ImageCompareSliderProps & WithClassName) => (
  <ReactCompareSlider
    className={className}
    itemOne={imgOne}
    itemTwo={imgTwo}
    handle={<SliderHandle />}
  />
);
