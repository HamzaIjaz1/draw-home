import { isUndefined } from '@arthurka/ts-utils';
import { encodeSvgAsDataUri } from './encodeSvgAsDataUri';

type MakeSolidColorImageUriOptions = {
  width?: number;
  height?: number;
};

export const makeSolidColorImageUri = (color: string, { width, height }: MakeSolidColorImageUriOptions = {}) => {
  const w = isUndefined(width) ? '' : `width="${width}"`;
  const h = isUndefined(height) ? '' : `height="${height}"`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" ${w} ${h}><rect width="100%" height="100%" fill="${color}" /></svg>`;

  return encodeSvgAsDataUri(svg);
};
