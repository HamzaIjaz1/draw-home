import { importAllowedAsset2DExtensions } from '../constants';
import { CatalogNode } from './makeCatalog';

export const isCategoryForUpload = (fileExtension: string) => (e: CatalogNode): boolean => {
  const isImageAsset = importAllowedAsset2DExtensions.includes(fileExtension);
  const isImageCategory = e.childrenType === 'assets-2d';

  return e.userUpload !== 'forbidden' && isImageAsset === isImageCategory;
};
