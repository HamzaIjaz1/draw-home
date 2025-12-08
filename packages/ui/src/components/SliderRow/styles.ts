import { css, styled } from '@mui/material';
import MuiSlider, { sliderClasses } from '@mui/material/Slider';
import { backgroundSecondary } from '../../theme';
import { CssVariable, getCssVar } from '../../utils/styles';

export const Stack = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Row = styled('div')`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Label = styled('label')(({ theme }) => css`
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: break-word;
`);

export const sliderColorCssVar: CssVariable = '--ui-slider-color';

export const Slider = styled(MuiSlider)(({ theme }) => css`
  height: 8px;

  .${sliderClasses.track} {
    display: none;
  }
  .${sliderClasses.rail} {
    opacity: 1;
    border: 1.5px solid ${backgroundSecondary};
    background: linear-gradient(to right, ${theme.palette.background.paper}, ${getCssVar(sliderColorCssVar)});
  }

  .${sliderClasses.thumb} {
    width: 22px;
    height: 22px;
    border: 3.5px solid ${theme.palette.background.paper};
    box-shadow: 0px 0px 8px 0px #00000040;
    background-color: ${getCssVar(sliderColorCssVar)};

    &:focus, &:hover, &.Mui-active, &.Mui-focusVisible {
      box-shadow: 0px 0px 8px 0px #00000040;
    }
  }
`);
