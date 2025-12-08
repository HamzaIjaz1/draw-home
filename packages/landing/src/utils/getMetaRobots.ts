import type { Metadata } from 'next';
import { DEPLOY_ENV } from '@draw-house/common/dist/envVariables/public';

export const getMetaRobots = () => {
  const map: Record<typeof DEPLOY_ENV, Metadata['robots']> = {
    local: undefined,
    staging: {
      index: false,
      follow: false,
    },
    production: undefined,
  };

  return map[DEPLOY_ENV];
};
