import { SupportPageContent } from '@draw-house/ui/dist/components/Hub';
import assert from 'assert';
import { isNull } from '@arthurka/ts-utils';
import { LANDING_PAGE_URL, NODE_ENV, PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { loginSearchParam } from '@draw-house/common/dist/constants';
import { lang } from '../../lang';
import { openSnackbar, useUserResolved } from '../../zustand';
import { apiUrls } from '../../services';
import { Animations } from '../animations';

export const SupportPage: React.FC = () => {
  const { user } = useUserResolved();

  return (
    <Animations.fade>
      <SupportPageContent
        isGuestUser={user === 'guest'}
        logInButtonText={lang.cabinet.logIn}
        logInSuggestionText={lang.cabinet.logInSuggestion}
        onLoginButtonClick={() => {
          window.location.href = `${NODE_ENV === 'production' ? PLANNER_URL : LANDING_PAGE_URL}/login?${loginSearchParam}`;
        }}
        mainSectionTitle={lang.cabinet.howCanWeHelp}
        subjectFieldLabel={lang.cabinet.subject}
        requestFieldLabel={lang.cabinet.howCanWeHelp}
        requiredErrorText={lang.cabinet.requiredField}
        submitButtonText={lang.send}
        onSubmit={async ({ subject, request }, resetForm) => {
          const { user } = useUserResolved.getState();
          assert(user !== 'guest', 'Something went wrong. |7c11yc|');

          const data = {
            subject,
            comment: request,
          };

          const resp = await fetch(apiUrls.user.sendEmail, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then(e => e.json());

          if(typeof resp === 'object' && !isNull(resp) && 'success' in resp && resp.success === true) {
            resetForm();
            await openSnackbar({
              type: 'success',
              message: lang.cabinet.emailSent,
            });
          } else {
            await openSnackbar({
              type: 'warning',
              message: lang.cabinet.emailSentError,
            });
          }
        }}
      />
    </Animations.fade>
  );
};
