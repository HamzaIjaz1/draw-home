import { STRAPI_AUTH_COOKIE_SUFFIX } from './envVariables/public';

export const digitsAfterPoint = 2;
export const strapiJwtCookieName = `strapi-user-jwt-v2${STRAPI_AUTH_COOKIE_SUFFIX === '-' ? '' : STRAPI_AUTH_COOKIE_SUFFIX}`;
export const tempProjectQueryParam = 'tempProject';

export const floorPlanRecognitionTimeoutInMinutes = 5;
export const specialZIndexTop = 20000000;
export const loginSearchParam = 'signin';

export const authenticatedFreeUserProjectsLimit = 3;
export const freeUserLevelsLimit = 2;
export const topRightComponentId = 'app-top-right';

export const strapiUsersMeEndpointWithPopulate = '/api/users/me?populate=paymentPlan&populate=avatar';
