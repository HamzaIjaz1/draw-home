import { WithClassName } from '@draw-house/common/dist/utils';
import { ReactCompareSlider as BaseReactCompareSlider } from 'react-compare-slider';
import { css, styled } from '@mui/material';
import { SliderHandle } from './SliderHandle';

export const ImgStyles = css`
  width: 187px;
  height: 187px;
  border-radius: 50%;
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
