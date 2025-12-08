import { DialogActions } from '@draw-house/ui/dist/components';
import { lang } from '../../lang';
import { createProjectHashWithReset, useGlobalSettings, useUserResolved } from '../../zustand';
import { DialogForAppPage } from '../DialogForAppPage';
import { guestSaveAndLogIn, saveProject } from '../../utils';
import { usePaywallPopUpState } from '../../zustand/usePaywallPopUpState';

export type SaveDialogProps = {
  isShown: boolean;
  setIsShown: (e: boolean) => void;
  goBack: () => Promise<void>;
};

export const SaveDialog: React.FC<SaveDialogProps> = ({ isShown, setIsShown, goBack }) => {
  const projectName = useGlobalSettings(s => s.projectName);
  const { user } = useUserResolved();

  return (
    <DialogForAppPage
      open={isShown}
      title={
        user === 'guest'
          ? lang.notSavedProject.sureToGoBackGuest(projectName)
          : lang.notSavedProject.sureToGoBack(projectName)
      }
      onClose={() => {
        setIsShown(false);
      }}
    >
      <DialogActions
        primaryActionText={user === 'guest' ? lang.cabinet.logIn : lang.notSavedProject.saveAndExit}
        onPrimaryAction={async () => {
          setIsShown(false);

          if(user === 'guest') {
            await guestSaveAndLogIn();
            return;
          }

          const { success, error } = await saveProject();

          if(success === false) {
            switch(error) {
              case 'paymentRequired':
                usePaywallPopUpState.setState({
                  paywallPopUpState: { type: 'paywall' },
                });
                break;
              default:
                ((e: never) => e)(error);
                throw new Error('This should never happen. |24yc07|');
            }
            return;
          }

          await createProjectHashWithReset();
          await goBack();
        }}
        secondaryActionText={lang.exit}
        onSecondaryAction={async () => {
          setIsShown(false);
          await goBack();
        }}
      />
    </DialogForAppPage>
  );
};
