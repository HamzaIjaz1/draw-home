"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strapiUsersMeEndpointWithPopulate = exports.topRightComponentId = exports.freeUserLevelsLimit = exports.authenticatedFreeUserProjectsLimit = exports.loginSearchParam = exports.specialZIndexTop = exports.floorPlanRecognitionTimeoutInMinutes = exports.tempProjectQueryParam = exports.strapiJwtCookieName = exports.digitsAfterPoint = void 0;
const public_1 = require("./envVariables/public");
exports.digitsAfterPoint = 2;
exports.strapiJwtCookieName = `strapi-user-jwt-v2${public_1.STRAPI_AUTH_COOKIE_SUFFIX === '-' ? '' : public_1.STRAPI_AUTH_COOKIE_SUFFIX}`;
exports.tempProjectQueryParam = 'tempProject';
exports.floorPlanRecognitionTimeoutInMinutes = 5;
exports.specialZIndexTop = 20000000;
exports.loginSearchParam = 'signin';
exports.authenticatedFreeUserProjectsLimit = 3;
exports.freeUserLevelsLimit = 2;
exports.topRightComponentId = 'app-top-right';
exports.strapiUsersMeEndpointWithPopulate = '/api/users/me?populate=paymentPlan&populate=avatar';
//# sourceMappingURL=constants.js.map