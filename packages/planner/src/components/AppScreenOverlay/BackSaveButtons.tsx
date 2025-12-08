import { DialogActions, IconButton, IconButtonProps, TopToolbar } from '@draw-house/ui/dist/components';
import { queryParams } from '../../services';
import { useAppPage, useUserResolved } from '../../zustand';
import { clearZustandStore, guestSaveAndLogIn } from '../../utils';
import { lang } from '../../lang';
import { useIsProjectSavable } from '../../customHooks';
import { DialogForAppPage } from '../DialogForAppPage';
import { SaveDialog } from './SaveDialog';
import { useIsSaveDialogOpened } from '../../zustand/useIsSaveDialogOpened';
import { saveProjectButtonClick } from '../../utils/handlerHelpers/saveProjectButtonClick';
import { Hotkey } from '../Hotkey';

export const BackSaveButtons: React.FC = () => {
  const { isProjectSavable } = useIsProjectSavable();
  const { user } = useUserResolved();
  const { isSaveDialogOpened } = useIsSaveDialogOpened();

  const goBack = async () => {
    queryParams.projectId.delete();
    useAppPage.setState({ appPage: 'my-projects' });
    await clearZustandStore();
  };

  return (
    <>
      <TopToolbar>
        {
          mode => {
            const commonProps = {
              desktop: {
                variant: 'default',
                size: 'md',
              },
              mobile: {
                variant: 'text',
                size: 'sm',
                state: 'active',
              },
            } satisfies Record<typeof mode, Partial<IconButtonProps>>;

            return (
              <>
                <IconButton
                  {...commonProps[mode]}
                  icon='back'
                  onClick={async () => {
                    if(isProjectSavable === true) {
                      useIsSaveDialogOpened.setState({ isSaveDialogOpened: true });
                      return;
                    }

                    await goBack();
                  }}
                />
                <Hotkey position='bottom' label='Ctrl + S'>
                  <IconButton
                    {...commonProps[mode]}
                    {
                      ...isProjectSavable === false && {
                        state: 'disabled',
                      } satisfies Partial<IconButtonProps>
                    }
                    icon='save'
                    onClick={async () => {
                      await saveProjectButtonClick({});
                    }}
                  />
                </Hotkey>
              </>
            );
          }
        }
      </TopToolbar>
      <SaveDialog
        isShown={user !== 'guest' && isSaveDialogOpened === true}
        setIsShown={isSaveDialogOpened => {
          useIsSaveDialogOpened.setState({ isSaveDialogOpened });
        }}
        goBack={goBack}
      />
      <DialogForAppPage
        open={user === 'guest' && isSaveDialogOpened === true}
        title={lang.notLoggedInGuest}
        onClose={() => {
          useIsSaveDialogOpened.setState({ isSaveDialogOpened: false });
        }}
      >
        <DialogActions
          primaryActionText={lang.cabinet.logIn}
          onPrimaryAction={async () => {
            useIsSaveDialogOpened.setState({ isSaveDialogOpened: false });
            await guestSaveAndLogIn();
          }}
          secondaryActionText={lang.cancel}
          onSecondaryAction={() => {
            useIsSaveDialogOpened.setState({ isSaveDialogOpened: false });
          }}
        />
      </DialogForAppPage>
    </>
  );
};
