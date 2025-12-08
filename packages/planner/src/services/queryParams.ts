import { isNull } from '@arthurka/ts-utils';
import { CheckoutSessionId, isCheckoutSessionId, isProjectId, ProjectId } from '@draw-house/common/dist/brands';

export const queryParamsKeys = {
  projectId: 'projectId',
  checkoutSessionId: 'checkoutSessionId',
} satisfies Record<keyof typeof queryParams, string>;

const applySearchParams = (searchParams: URLSearchParams) => {
  const url = new URL(window.location.href);
  url.search = searchParams.toString();

  window.history.replaceState({}, '', url);
};

export const queryParams = {
  projectId: {
    get(): ProjectId | null {
      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get(queryParamsKeys.projectId);

      if(isNull(param)) {
        return null;
      }

      if(!isProjectId(param)) {
        this.delete();
        return null;
      }

      return param;
    },
    set(projectId: ProjectId) {
      const urlParams = new URLSearchParams(window.location.search);

      urlParams.set(queryParamsKeys.projectId, projectId);

      applySearchParams(urlParams);
    },
    delete() {
      const urlParams = new URLSearchParams(window.location.search);

      urlParams.delete(queryParamsKeys.projectId);

      applySearchParams(urlParams);
    },
  },
  checkoutSessionId: {
    get(): CheckoutSessionId | null {
      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get(queryParamsKeys.checkoutSessionId);

      if(isNull(param)) {
        return null;
      }

      if(!isCheckoutSessionId(param)) {
        this.delete();
        return null;
      }

      return param;
    },
    delete() {
      const urlParams = new URLSearchParams(window.location.search);

      urlParams.delete(queryParamsKeys.checkoutSessionId);

      applySearchParams(urlParams);
    },
  },
};
