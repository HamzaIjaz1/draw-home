import Typography from '@mui/material/Typography';
import { css, styled } from '@mui/material';
import { BaseButton } from '../BaseButton';
import { menuHorizontalGutterWidth } from '../../utils/styles';
import { createStyledOptions } from '../../utils/createStyledOptions';
import type { RecentTexturePickerProps } from '.';

type ContainerProps = {
  wrap: boolean;
};
const ContainerOptions = createStyledOptions<ContainerProps>({
  wrap: true,
});
export const Container = styled('div', ContainerOptions)<ContainerProps>(({ wrap }) => css`
  margin: 0 ${menuHorizontalGutterWidth}px;

  ${wrap === true && css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    justify-items: center;
    gap: 2px 8px;
  `}

  ${wrap === false && css`
    display: flex;
    gap: 8px;
    overflow-x: auto;
  `}
`);

type MaterialButtonProps = {
  size: NonNullable<RecentTexturePickerProps<number>['size']>;
};
const MaterialButtonOptions = createStyledOptions<MaterialButtonProps>({
  size: true,
});
export const MaterialButton = styled(BaseButton, MaterialButtonOptions)<MaterialButtonProps>(({ size }) => css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 8px;
  height: min-content;
  gap: 4px;
  padding: 4px 2px;
  ${size === 'sm' && css`
    width: 60px;
  `}
  ${size === 'md' && css`
    width: 68px;
  `}
`);

type ImageProps = {
  active: boolean;
  squareImages: boolean;
  highlightVariant: NonNullable<RecentTexturePickerProps<number>['highlightVariant']>;
  size: NonNullable<RecentTexturePickerProps<number>['size']>;
};
const ImageOptions = createStyledOptions<ImageProps>({
  active: true,
  squareImages: true,
  highlightVariant: true,
  size: true,
});
export const Image = styled('img', ImageOptions)<ImageProps>(({
  theme,
  active,
  squareImages,
  highlightVariant,
  size,
}) => css`
  ${size === 'sm' && css`
    width: 48px;
    height: 48px;
  `}
  ${size === 'md' && css`
    width: 56px;
    height: 56px;
  `}

  box-sizing: content-box;
  object-fit: cover;
  border-radius: ${squareImages === true ? '8px' : '50%'};

  ${highlightVariant === 'outline' && css`
    border: 1px solid transparent;
    ${active === true && css`
      outline: 2px solid ${theme.palette.primary.main};
    `}
  `}

  ${highlightVariant === 'background' && css`
    ${active === false && css`
      filter: grayscale(1);
    `}
    ${active === true && css`
      background-color: #fd563112;
    `}
  `}
`);

export const Text = styled(Typography)(({ theme }) => css`
  font-size: 11px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;
  color: ${theme.palette.text.secondary};
  width: calc(100% + 2px);
  overflow-wrap: break-word;
`);
