import type { MetadataRoute } from 'next';
import { DEPLOY_ENV } from '@draw-house/common/dist/envVariables/public';

export default function robots(): MetadataRoute.Robots {
  const map: Record<typeof DEPLOY_ENV, MetadataRoute.Robots> = {
    local: {
      rules: {},
    },
    staging: {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    },
    production: {
      rules: {},
    },
  };

  return map[DEPLOY_ENV];
}
