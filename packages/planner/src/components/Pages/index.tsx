import { isNull } from '@arthurka/ts-utils';
import { ComingSoonPageContent } from '@draw-house/ui/dist/components/Hub';
import { CenterWrapperFullViewport } from '@draw-house/ui/dist/components';
import { CircularProgress } from '@mui/material';
import { MyProjectsPage } from './MyProjects';
import { AppPage } from './AppPage';
import { requestToLoadCheckoutSession, requestToLoadProjectData, useAppPage } from '../../zustand';
import { PageWrapper } from './PageWrapper';
import { SupportPage } from './Support';
import { BillingPage } from './Billing';
import { Animations } from '../animations';
import { AccountPage } from './Account';
import { InitialSettings } from '../InitialSettings';
import { queryParams } from '../../services';

export const Pages: React.FC = () => {
  const { appPage } = useAppPage();

  if(isNull(appPage)) {
    const projectId = queryParams.projectId.get();
    const checkoutSessionId = queryParams.checkoutSessionId.get();

    switch(true) {
      case !isNull(projectId):
        void requestToLoadProjectData(projectId);
        break;
      case !isNull(checkoutSessionId):
        queryParams.checkoutSessionId.delete();
        void requestToLoadCheckoutSession(checkoutSessionId);
        break;
      default:
        useAppPage.setState({ appPage: 'my-projects' });
    }

    return null;
  }
  if(appPage === 'loading') {
    return (
      <CenterWrapperFullViewport>
        <CircularProgress />
      </CenterWrapperFullViewport>
    );
  }
  if(appPage === 'initial-settings') {
    return <InitialSettings />;
  }
  if(appPage === 'planner') {
    return <AppPage />;
  }

  return (
    <PageWrapper>
      {
        (() => {
          switch(appPage) {
            case 'my-projects':
              return <MyProjectsPage />;
            case 'support':
              return <SupportPage />;
            case 'account':
              return <AccountPage />;
            case 'billing':
              return <BillingPage />;
            case 'my-team':
              return (
                <Animations.fadeComingSoon key={appPage}>
                  <ComingSoonPageContent />
                </Animations.fadeComingSoon>
              );
            default:
              ((e: never) => e)(appPage);
              throw new Error('This should never happen. |j5j0eh|');
          }
        })()
      }
    </PageWrapper>
  );
};
