import assert from 'assert';
import { useCatalogData } from './store';
import { getAllCustomModels, getCustomModelCategories } from '../../services';
import { isResolved } from '../../utils/isResolved';

export const useCatalogDataResolved = () => {
  const { catalogData } = useCatalogData();
  assert(isResolved(catalogData), 'Something went wrong. |dr8l9a|');

  return { catalogData };
};
useCatalogDataResolved.getState = () => {
  const { catalogData } = useCatalogData.getState();
  assert(isResolved(catalogData), 'Something went wrong. |s12wtu|');

  return { catalogData };
};

export const requestToLoadCatalogData = async (forceRefresh = false) => {
  const { catalogData } = useCatalogData.getState();

  if(forceRefresh === false) {
    if(catalogData !== 'idle') {
      return;
    }

    useCatalogData.setState({ catalogData: 'loading' });
  }

  const [models, categories] = await Promise.all([getAllCustomModels(), getCustomModelCategories()]);

  useCatalogData.setState({
    catalogData: {
      models,
      categories,
    },
  });
};
