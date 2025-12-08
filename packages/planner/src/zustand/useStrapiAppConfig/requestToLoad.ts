import assert from 'assert';
import { useStrapiAppConfig } from './store';
import { getStrapiAppConfig } from '../../services/fetch/getStrapiAppConfig';
import { isResolved } from '../../utils/isResolved';
import { getStrapiAppConfigTemplateProjects } from '../../services/fetch/getStrapiAppConfigTemplateProjects';

export const useStrapiAppConfigResolved = () => {
  const { strapiAppConfig } = useStrapiAppConfig();
  assert(isResolved(strapiAppConfig), 'Something went wrong. |kjl42o|');

  return { strapiAppConfig };
};
useStrapiAppConfigResolved.getState = () => {
  const { strapiAppConfig } = useStrapiAppConfig.getState();
  assert(isResolved(strapiAppConfig), 'Something went wrong. |a0g9dk|');

  return { strapiAppConfig };
};

export const requestToLoadStrapiAppConfig = async () => {
  const { strapiAppConfig } = useStrapiAppConfig.getState();
  if(strapiAppConfig !== 'idle') {
    return;
  }

  useStrapiAppConfig.setState({ strapiAppConfig: 'loading' });

  const [baseInfo, templateProjects] = await Promise.all([
    getStrapiAppConfig(),
    getStrapiAppConfigTemplateProjects(),
  ]);

  useStrapiAppConfig.setState({
    strapiAppConfig: {
      ...baseInfo,
      templateProjects,
    },
  });
};
