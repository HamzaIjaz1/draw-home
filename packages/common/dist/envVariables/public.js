"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRIPE_PUBLISHABLE_KEY = exports.HIGHLIGHT_PROJECT_ID = exports.IS_JOVAN_DEBUG_MODE = exports.IS_EASY_GRAPHICS_MODE = exports.STRAPI_AUTH_COOKIE_SUFFIX = exports.STRAPI_API_KEY = exports.FLOOR_PLAN_SCANNER_URL = exports.API_DISCOURSE_SSO_URL = exports.API_URL = exports.LANDING_PAGE_URL = exports.PLANNER_URL = exports.DEPLOY_ENV = exports.NODE_ENV = exports.publicEnvs = void 0;
const assert_1 = __importDefault(require("assert"));
const v4_1 = require("zod/v4");
const common_1 = require("../zod/common");
const Envs = v4_1.z.object({
    NODE_ENV: v4_1.z.enum(['production', 'development']),
    DEPLOY_ENV: v4_1.z.enum(['local', 'staging', 'production']),
    PLANNER_URL: common_1.noTrailingSlashUrl,
    LANDING_PAGE_URL: common_1.noTrailingSlashUrl,
    API_URL: common_1.noTrailingSlashUrl,
    API_DISCOURSE_SSO_URL: common_1.noTrailingSlashUrl,
    FLOOR_PLAN_SCANNER_URL: common_1.noTrailingSlashUrl,
    STRAPI_API_KEY: v4_1.z.string(),
    STRAPI_AUTH_COOKIE_SUFFIX: v4_1.z.string(),
    IS_EASY_GRAPHICS_MODE: v4_1.z.enum(['true', 'false']).default('false'),
    IS_JOVAN_DEBUG_MODE: v4_1.z.enum(['true', 'false']).default('false'),
    HIGHLIGHT_PROJECT_ID: v4_1.z.string(),
    STRIPE_PUBLISHABLE_KEY: v4_1.z.string(),
});
let envs;
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
}
catch (e) {
    (0, assert_1.default)(e instanceof v4_1.ZodError, 'This should never happen. |az56f9|');
    console.error('Zod issues:', e.issues);
    throw e;
}
exports.publicEnvs = envs;
exports.NODE_ENV = envs.NODE_ENV;
exports.DEPLOY_ENV = envs.DEPLOY_ENV;
exports.PLANNER_URL = envs.PLANNER_URL;
exports.LANDING_PAGE_URL = envs.LANDING_PAGE_URL;
exports.API_URL = envs.API_URL;
exports.API_DISCOURSE_SSO_URL = envs.API_DISCOURSE_SSO_URL;
exports.FLOOR_PLAN_SCANNER_URL = envs.FLOOR_PLAN_SCANNER_URL;
exports.STRAPI_API_KEY = envs.STRAPI_API_KEY;
exports.STRAPI_AUTH_COOKIE_SUFFIX = envs.STRAPI_AUTH_COOKIE_SUFFIX;
exports.IS_EASY_GRAPHICS_MODE = Envs.shape.IS_EASY_GRAPHICS_MODE.transform(e => e === 'true').parse(envs.IS_EASY_GRAPHICS_MODE);
exports.IS_JOVAN_DEBUG_MODE = Envs.shape.IS_JOVAN_DEBUG_MODE.transform(e => e === 'true').parse(envs.IS_JOVAN_DEBUG_MODE);
exports.HIGHLIGHT_PROJECT_ID = envs.HIGHLIGHT_PROJECT_ID;
exports.STRIPE_PUBLISHABLE_KEY = envs.STRIPE_PUBLISHABLE_KEY;
//# sourceMappingURL=public.js.map