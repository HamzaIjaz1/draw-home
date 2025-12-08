import { isNull, wait } from '@arthurka/ts-utils';
import { PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { CheckoutSessionId, ProjectId } from '@draw-house/common/dist/brands';
import { AppPageStore, useAppPage } from './store';
import { loadProject } from '../../utils/project';
import { getCheckoutSessionStatus } from '../../services/fetch/getCheckoutSessionStatus';
import { openSnackbar } from '../useSnackbar';
import { lang } from '../../lang';
import { getMe } from '../../services';

export const isAppPageLoaded = (e: AppPageStore['appPage']) => (
  !isNull(e) && e !== 'loading'
);

export const requestToLoadProjectData = async (projectId: ProjectId) => {
  useAppPage.setState({ appPage: 'loading' });
  await loadProject(projectId);
  useAppPage.setState({ appPage: 'planner' });
};

export const requestToLoadCheckoutSession = async (checkoutSessionId: CheckoutSessionId) => {
  useAppPage.setState({ appPage: 'loading' });

  let maxRetries = 3;
  const retryDelaySeconds = 1;
  let isPaymentComplete = false;

  for(let i = 0; i < maxRetries; i++) {
    const [{ status }, user] = await Promise.all([
      getCheckoutSessionStatus(checkoutSessionId),
      getMe(),
    ]);

    if(status === 'complete') {
      if(isNull(user.paymentPlan) && maxRetries === 3) {
        maxRetries += 3;
      }
      if(!isNull(user.paymentPlan)) {
        isPaymentComplete = true;
        break;
      }
    }

    if(i < maxRetries - 1) {
      await wait(retryDelaySeconds);
    }
  }

  if(isPaymentComplete === true) {
    await openSnackbar({
      type: 'success',
      message: lang.paywall.paymentSuccess,
    });
  } else {
    await openSnackbar({
      type: 'warning',
      message: lang.paywall.paymentFailure,
    });
  }

  window.setTimeout(() => {
    window.location.href = PLANNER_URL;
  }, 2000);
};

export const withLoadedAppPage = <T>(cb: (state: T, prevState: T) => void) => (
  (...params: Parameters<typeof cb>) => {
    const { appPage } = useAppPage.getState();
    if(!isAppPageLoaded(appPage)) {
      return;
    }

    return cb(...params);
  }
);
