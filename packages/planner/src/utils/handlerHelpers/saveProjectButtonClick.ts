import { useIsProjectSavable } from '../../customHooks';
import { queryParams } from '../../services';
import { createProjectHashWithReset, useUserResolved } from '../../zustand';
import { useIsSaveDialogOpened } from '../../zustand/useIsSaveDialogOpened';
import { saveProject } from '../project';
import { usePaywallPopUpState } from '../../zustand/usePaywallPopUpState';

type Params = {
  disablePaywall?: boolean;
};

export const saveProjectButtonClick = async ({ disablePaywall = false }: Params) => {
  const { user } = useUserResolved.getState();
  const { isProjectSavable } = useIsProjectSavable.getState();

  if(isProjectSavable === false) {
    return;
  }
  if(user === 'guest') {
    useIsSaveDialogOpened.setState({ isSaveDialogOpened: true });
    return;
  }

  const { success, error, projectId } = await saveProject();

  if(success === false) {
    switch(error) {
      case 'paymentRequired':
        if(disablePaywall === false) {
          usePaywallPopUpState.setState({
            paywallPopUpState: { type: 'paywall' },
          });
        }
        break;
      default:
        ((e: never) => e)(error);
        throw new Error('This should never happen. |v1l3p7|');
    }
    return;
  }

  queryParams.projectId.set(projectId);
  await createProjectHashWithReset();
};
