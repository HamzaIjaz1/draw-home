import { Dialog, DialogActions, DialogDescription, ProjectsPageContent, ProjectsPageContentProps } from '@draw-house/ui/dist/components/Hub';
import { useEffect, useState } from 'react';
import { LANDING_PAGE_URL, NODE_ENV, PLANNER_URL } from '@draw-house/common/dist/envVariables/public';
import { ProjectId, StrapiProjectId } from '@draw-house/common/dist/brands';
import assert from 'assert';
import { isNull } from '@arthurka/ts-utils';
import { authenticatedFreeUserProjectsLimit, loginSearchParam } from '@draw-house/common/dist/constants';
import { lang } from '../../lang';
import { createProjectHashWithReset, openSnackbar, requestToLoadMyProjects, useAppPage, useMyProjects, useUserResolved } from '../../zustand';
import { deleteMyProject, updateMyProject } from '../../utils';
import { apiUrls } from '../../services';
import { Animations } from '../animations';
import { isResolved } from '../../utils/isResolved';
import { useStrapiAppConfigResolved } from '../../zustand/useStrapiAppConfig';
import { usePaywallPopUpState } from '../../zustand/usePaywallPopUpState';
import { requestToLoadPaymentPlans, usePaymentPlans } from '../../zustand/usePaymentPlans';
import { PaywallPopUp } from '../PaywallPopUp';
import { isPrivilegedUser } from '../../utils/isPrivilegedUser';

export const MyProjectsPage: React.FC = () => {
  useEffect(() => {
    void createProjectHashWithReset();
    void requestToLoadMyProjects();
    void requestToLoadPaymentPlans();
  }, []);

  const { user } = useUserResolved();
  const { myProjects } = useMyProjects();
  const { paymentPlans } = usePaymentPlans();
  const { strapiAppConfig } = useStrapiAppConfigResolved();

  const [confirmProjectDeletingDialog, setConfirmProjectDeletingDialog] = useState<null | StrapiProjectId>(null);
  const [editProject, setEditProject] = useState<null | ProjectId>(null);

  return isResolved(myProjects) && isResolved(paymentPlans) && (
    <Animations.fade>
      <ProjectsPageContent
        isGuestUser={user === 'guest'}
        templateSectionTitle={lang.cabinet.startWithATemplate}
        templateSectionOptions={[
          {
            title: lang.cabinet.createDrawing,
            image: 'blank',
            onClick() {
              const hasLimitedAccess = user !== 'guest' && !isPrivilegedUser(user);
              if(hasLimitedAccess === true && myProjects.length >= authenticatedFreeUserProjectsLimit) {
                usePaywallPopUpState.setState({
                  paywallPopUpState: { type: 'paywall' },
                });
                return;
              }

              useAppPage.setState({ appPage: 'initial-settings' });
            },
          },
          ...strapiAppConfig.templateProjects.map((e): ProjectsPageContentProps['templateSectionOptions'][number] => ({
            title: e.name,
            image: !isNull(e.image) ? e.image : '/no-project2.png',
            onClick() {
              window.location.href = apiUrls.projects.href(e.projectId);
            },
          })),
        ]}
        emptyProjectsSuggestionText={lang.cabinet.emptyProjectsSuggestion}
        projectsSectionTitle={lang.cabinet.recentProjects}
        logInButtonText={lang.cabinet.logIn}
        logInSuggestionText={lang.cabinet.logInSuggestion}
        onLoginButtonClick={() => {
          window.location.href = `${NODE_ENV === 'production' ? PLANNER_URL : LANDING_PAGE_URL}/login?${loginSearchParam}`;
        }}
        projects={
          myProjects.map(({ id, projectId, name, image }): ProjectsPageContentProps['projects'][number] => ({
            name,
            href: apiUrls.projects.href(projectId),
            image: (
              !isNull(image)
                ? image
                : projectId.match(/[a-z]$/)
                  ? '/no-project.png'
                  : '/no-project2.png'
            ),
            nameEditMode: projectId === editProject,
            async onNameEditModeExit({ action, value }) {
              setEditProject(null);

              if(action === 'save' && value !== name) {
                await updateMyProject(id, { name: value });
              }
            },
            options: [
              {
                title: lang.cabinet.rename,
                icon: 'pencil',
                onClick() {
                  setEditProject(projectId);
                },
              },
              {
                title: lang.cabinet.delete,
                icon: 'bin',
                onClick() {
                  setConfirmProjectDeletingDialog(id);
                },
              },
            ],
          }))
        }
      />
      <Dialog
        open={!isNull(confirmProjectDeletingDialog)}
        onClose={() => {
          setConfirmProjectDeletingDialog(null);
        }}
        title={lang.cabinet.sureForProjectDeleting.title}
      >
        <DialogDescription text={lang.cabinet.sureForProjectDeleting.description} />
        <DialogActions
          primaryActionText={lang.confirm}
          onPrimaryAction={async () => {
            assert(!isNull(confirmProjectDeletingDialog), 'This should never happen. |79edg8|');

            setConfirmProjectDeletingDialog(null);
            await openSnackbar(
              await deleteMyProject(confirmProjectDeletingDialog) === true
                ? {
                  type: 'success',
                  message: lang.cabinet.projectSuccessfullyDeleted,
                }
                : {
                  type: 'warning',
                  message: lang.cabinet.projectDeletingError,
                },
            );
          }}
          secondaryActionText={lang.cancel}
          onSecondaryAction={() => {
            setConfirmProjectDeletingDialog(null);
          }}
        />
      </Dialog>
      <PaywallPopUp />
    </Animations.fade>
  );
};
