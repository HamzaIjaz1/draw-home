import { useMemo } from 'react';
import { makeCatalog } from '../utils';
import { useCatalogDataResolved } from '../zustand/useCatalogData';

export const useFullCatalog = () => {
  const { catalogData } = useCatalogDataResolved();
  const fullCatalog = useMemo(() => makeCatalog(catalogData), [catalogData]);

  return { fullCatalog };
};
