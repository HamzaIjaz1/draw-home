import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import { ImgStyles } from '../ImageCompareSlider';

const Img = styled('img')`
  ${ImgStyles}
`;

export type PreviewImageProps = {
  src: string;
  alt?: string;
};

export const PreviewImage = ({
  className,
  src,
  alt,
}: PreviewImageProps & WithClassName) => (
  <Img
    className={className}
    src={src}
    alt={alt}
  />
);
