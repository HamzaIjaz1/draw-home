import { ObjKeys } from '@arthurka/ts-utils';
import { ProjectId, StrapiCustomModelId, StrapiProjectId } from '@draw-house/common/dist/brands';
import { strapiUsersMeEndpointWithPopulate } from '@draw-house/common/dist/constants';
import { API_URL, LANDING_PAGE_URL, NODE_ENV, PLANNER_URL } from '@draw-house/common/dist/envVariables/public';

const makeQueryParams = (arr: string[]) => (
  arr.map(e => e.includes('=') ? e : `${e}=*`).join('&')
);

export const textureMaps = ObjKeys({
  colorMap: true,
  alphaMap: true,
  aoMap: true,
  bumpMap: true,
  emissiveMap: true,
  metalnessMap: true,
  normalMap: true,
  roughnessMap: true,
} as const satisfies Record<string, true>);

const commonTextureAssetQueryParams = makeQueryParams([
  'pagination[pageSize]=100',
  'populate[preview]',
  'populate[maps][populate]',
  'populate[category][populate][image]',
  'populate[category][populate][overlayColors]',
  'populate[category][populate][modelCategory][populate]',
]);
const strapiAppConfigQueryParams = makeQueryParams([
  'populate[defaultDoorModel][populate][model]',
  'populate[defaultDoorModel][populate][preview]',
  'populate[defaultDoorModel][populate][appearanceOptionsExceptionTextureNames]',
  'populate[defaultDoorModel][populate][category][populate][image]',
  'populate[defaultDoorModel][populate][category][populate][toolbarImage]',
  'populate[defaultWindowModel][populate][model]',
  'populate[defaultWindowModel][populate][preview]',
  'populate[defaultWindowModel][populate][appearanceOptionsExceptionTextureNames]',
  'populate[defaultWindowModel][populate][category][populate][image]',
  'populate[defaultWindowModel][populate][category][populate][toolbarImage]',
  ...[
    'wallTextureInside',
    'wallTextureCenter',
    'wallTextureOutside',
    'floorTextureTop',
    'floorTextureEdge',
    'floorTextureBottom',
    'ceilingTextureTop',
    'ceilingTextureEdge',
    'ceilingTextureBottom',
    'roofTextureTop',
    'roofTextureEdge',
    'roofTextureBottom',
    'landTextures',
  ].flatMap(field1 => [
    `populate[defaultTexturePalette][populate][${field1}][populate][preview]`,
    `populate[defaultTexturePalette][populate][${field1}][populate][maps][populate]`,
    `populate[defaultTexturePalette][populate][${field1}][populate][category][populate][image]`,
  ]),
]);
const modelTextureOverlayParams = makeQueryParams([
  'pagination[limit]=-1',
  'populate[texture][populate][preview]',
  'populate[texture][populate][maps][populate]',
  'populate[texture][populate][category][populate][image]',
  'populate[modelCategory][populate]',
]);
const customModelsOverlayParams = makeQueryParams([
  'populate[model]',
  'populate[preview]',
  'populate[appearanceOptionsExceptionTextureNames]',
  'populate[category][populate][image]',
]);

export const apiUrls = {
  strapiAppConfig: `${API_URL}/api/app-config?${strapiAppConfigQueryParams}`,
  strapiAppConfigTemplateProjects: `${API_URL}/api/app-config/get-template-projects`,
  textureAssets: `${API_URL}/api/texture-assets?${commonTextureAssetQueryParams}`,
  modelTextureOverlays: `${API_URL}/api/model-texture-overlays?${modelTextureOverlayParams}`,
  projects: {
    href: (projectId: ProjectId) => `${PLANNER_URL}?projectId=${projectId}`,
    get: (id: ProjectId) => `${API_URL}/api/projects/project-id/${id}`,
    create: `${API_URL}/api/projects`,
    delete: (id: StrapiProjectId) => `${API_URL}/api/projects/${id}`,
    update: (id: StrapiProjectId) => `${API_URL}/api/projects/${id}`,
    my: `${API_URL}/api/projects/my?limit=30`,
  },
  user: {
    me: `${API_URL}${strapiUsersMeEndpointWithPopulate}`,
    logout: `${API_URL}/api/users/me/logout${NODE_ENV === 'production' ? '' : '?dev=true'}`,
    sendEmail: `${NODE_ENV === 'production' ? PLANNER_URL : LANDING_PAGE_URL}/api/user-support`,
    changePassword: `${API_URL}/api/auth/change-password`,
    changeName: `${API_URL}/api/users/me/full-name`,
    changeEmail: `${API_URL}/api/auth/change-email-send-email-confirmation`,
    deleteAccount: `${API_URL}/api/users/me/delete`,
    updateAvatar: `${API_URL}/api/users/me/avatar`,
  },
  customModels: {
    get: (id: StrapiCustomModelId) => `${API_URL}/api/models/${id}?${customModelsOverlayParams}`,
    create: `${API_URL}/api/models?${customModelsOverlayParams}`,
    getAll: `${API_URL}/api/models?pagination[limit]=-1&${customModelsOverlayParams}`,
    getCategories: `${API_URL}/api/model-categories?populate=*&pagination[limit]=-1`,
  },
  quickTour: `${API_URL}/api/quick-tours?pagination[limit]=-1&populate=video&populate=image`,
  featureTips: `${API_URL}/api/feature-tips?pagination[limit]=-1`,
  paymentPlans: `${API_URL}/api/payment-plans?pagination[limit]=-1`,
  strapiMedia: `${API_URL}/api/upload?populate=*`,
  storageUsage: `${API_URL}/api/users/me/storage-usage`,
  stripe: {
    createCheckoutSession: `${API_URL}/api/stripe/create-checkout-session`,
    getCheckoutSessionStatus: `${API_URL}/api/stripe/get-checkout-session-status`,
    createSetupIntent: `${API_URL}/api/stripe/create-setup-intent`,
    setDefaultPaymentMethod: `${API_URL}/api/stripe/set-default-payment-method`,
    getPaymentMethods: `${API_URL}/api/stripe/payment-methods`,
    cancelSubscription: `${API_URL}/api/stripe/cancel`,
  },
} as const;
