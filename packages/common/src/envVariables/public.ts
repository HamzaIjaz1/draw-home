import assert from 'assert';
import { z, ZodError } from 'zod/v4';
import { noTrailingSlashUrl } from '../zod/common';

const Envs = z.object({
  NODE_ENV: z.enum(['production', 'development']),
  DEPLOY_ENV: z.enum(['local', 'staging', 'production']),
  PLANNER_URL: noTrailingSlashUrl,
  LANDING_PAGE_URL: noTrailingSlashUrl,
  API_URL: noTrailingSlashUrl,
  API_DISCOURSE_SSO_URL: noTrailingSlashUrl,
  FLOOR_PLAN_SCANNER_URL: noTrailingSlashUrl,
  STRAPI_API_KEY: z.string(),
  STRAPI_AUTH_COOKIE_SUFFIX: z.string(),
  IS_EASY_GRAPHICS_MODE: z.enum(['true', 'false']).default('false'),
  IS_JOVAN_DEBUG_MODE: z.enum(['true', 'false']).default('false'),
  HIGHLIGHT_PROJECT_ID: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
});
type Envs = z.infer<typeof Envs>;

let envs: Envs;

try {
  // Because of Next.js and its Webpack
  /* eslint-disable no-process-env */
  envs = Envs.parse({
    NODE_ENV: process.env.NODE_ENV,
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    PLANNER_URL: process.env.PLANNER_URL,
    LANDING_PAGE_URL: process.env.LANDING_PAGE_URL,
    API_URL: process.env.API_URL,
    API_DISCOURSE_SSO_URL: process.env.API_DISCOURSE_SSO_URL,
    FLOOR_PLAN_SCANNER_URL: process.env.FLOOR_PLAN_SCANNER_URL,
    STRAPI_API_KEY: process.env.STRAPI_API_KEY,
    STRAPI_AUTH_COOKIE_SUFFIX: process.env.STRAPI_AUTH_COOKIE_SUFFIX,
    IS_EASY_GRAPHICS_MODE: process.env.IS_EASY_GRAPHICS_MODE,
    IS_JOVAN_DEBUG_MODE: process.env.IS_JOVAN_DEBUG_MODE,
    HIGHLIGHT_PROJECT_ID: process.env.HIGHLIGHT_PROJECT_ID,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  });
  /* eslint-enable no-process-env */
} catch(e) {
  assert(e instanceof ZodError, 'This should never happen. |az56f9|');

  console.error('Zod issues:', e.issues);
  throw e;
}

export const publicEnvs = envs;

export const NODE_ENV = envs.NODE_ENV;
export const DEPLOY_ENV = envs.DEPLOY_ENV;
export const PLANNER_URL = envs.PLANNER_URL;
export const LANDING_PAGE_URL = envs.LANDING_PAGE_URL;
export const API_URL = envs.API_URL;
export const API_DISCOURSE_SSO_URL = envs.API_DISCOURSE_SSO_URL;
export const FLOOR_PLAN_SCANNER_URL = envs.FLOOR_PLAN_SCANNER_URL;
export const STRAPI_API_KEY = envs.STRAPI_API_KEY;
export const STRAPI_AUTH_COOKIE_SUFFIX = envs.STRAPI_AUTH_COOKIE_SUFFIX;
export const IS_EASY_GRAPHICS_MODE = Envs.shape.IS_EASY_GRAPHICS_MODE.transform(e => e === 'true').parse(envs.IS_EASY_GRAPHICS_MODE);
export const IS_JOVAN_DEBUG_MODE = Envs.shape.IS_JOVAN_DEBUG_MODE.transform(e => e === 'true').parse(envs.IS_JOVAN_DEBUG_MODE);
export const HIGHLIGHT_PROJECT_ID = envs.HIGHLIGHT_PROJECT_ID;
export const STRIPE_PUBLISHABLE_KEY = envs.STRIPE_PUBLISHABLE_KEY;
