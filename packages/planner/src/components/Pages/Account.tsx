import { AccountPageContent } from '@draw-house/ui/dist/components/Hub';
import assert from 'assert';
import { isNull, isUndefined } from '@arthurka/ts-utils';
import { capitalize } from '@draw-house/common/dist/utils';
import { LANDING_PAGE_URL } from '@draw-house/common/dist/envVariables/public';
import { openSnackbar, useUser, useUserResolved } from '../../zustand';
import { Animations } from '../animations';
import { lang } from '../../lang';
import { apiUrls, changeEmail, changeName, changePassword, deleteAccount, getMe, updateAvatar } from '../../services';

export const AccountPage: React.FC = () => {
  const { user } = useUserResolved();
  assert(user !== 'guest', 'Something went wrong. |1xkx46|');

  return (
    <Animations.fade>
      <AccountPageContent
        user={{
          name: !isNull(user.fullName) ? user.fullName : '',
          email: user.email,
          avatar: isNull(user.avatar) ? user.avatarExternal : user.avatar,
          passwordLess: user.provider !== 'local',
        }}
        templateSectionTitle={lang.account.accountSettings}
        mainFormTexts={{
          fields: {
            fullName: lang.account.fullName,
            email: lang.account.email,
          },
          buttons: {
            changeName: lang.account.changeName,
            changeEmail: lang.account.changeEmail,
            changePassword: lang.account.changePassword,
          },
        }}
        logoutTexts={{
          bottomLink: capitalize(lang.cabinet.logout.toLowerCase()),
          dialog: {
            title: lang.cabinet.sureForLogout,
            buttons: {
              confirm: lang.confirm,
              cancel: lang.cancel,
            },
          },
        }}
        deleteAccountTexts={{
          bottomLink: lang.account.deleteAccount,
          dialog: {
            title: lang.account.wantToDelete,
            description: lang.account.cannotBeReserved,
            description2: lang.account.enterPasswordConfirm,
            passwordField: lang.account.password,
            buttons: {
              confirm: lang.confirm,
              cancel: lang.cancel,
              confirmSuccess: lang.confirm,
            },
            deleteSuccessMessage: lang.account.successfullyDeleted,
            deleteErrorMessage: lang.account.deleteError,
          },
        }}
        changeNameDialogTexts={{
          title: lang.account.changeName,
          formTexts: {
            formFields: { name: { text: lang.account.newName } },
            buttons: {
              confirm: { text: lang.confirm },
              cancel: { text: lang.cancel },
            },
          },
        }}
        changeEmailDialogTexts={{
          title: lang.account.changeEmail,
          description: lang.account.receiveConfirmationCode,
          formTexts: {
            formFields: {
              newEmailAddress: {
                text: lang.account.newEmailAddress,
              },
              password: {
                text: lang.account.password,
              },
            },
            buttons: {
              confirm: {
                text: lang.confirm,
              },
              cancel: {
                text: lang.cancel,
              },
            },
          },
        }}
        changePasswordDialogTexts={{
          title: lang.account.changePassword,
          formTexts: {
            formFields: {
              oldPassword: {
                text: lang.account.oldPassword,
              },
              newPassword: {
                text: lang.account.newPassword,
              },
              newPasswordRepeat: {
                text: lang.account.repeatNewPassword,
              },
            },
            buttons: {
              confirm: {
                text: lang.confirm,
              },
              cancel: {
                text: lang.cancel,
              },
            },
          },
        }}
        commonErrorTexts={{
          required: lang.cabinet.requiredField,
          passwordsMismatch: lang.account.differentPasswords,
        }}
        handlers={{
          async changeNameSubmit({ name }) {
            const resp = await changeName(name);

            if(resp.ok === false) {
              return {
                ok: false,
                errors: { name: resp.error },
              };
            }

            const user = await getMe();
            useUser.setState({ user });

            return { ok: true };
          },

          async changeEmailSubmit({ email: newEmail, password }) {
            const resp = await changeEmail({ newEmail, password });

            if(resp.ok === true) {
              await openSnackbar({
                type: 'success',
                message: lang.account.checkEmail,
              });

              return { ok: true };
            }

            const { message, details } = resp.error;

            if(!isUndefined(details.formField)) {
              return {
                ok: false,
                errors: { [details.formField]: message },
              };
            }

            await openSnackbar({
              type: 'warning',
              message,
            });

            return { ok: false };
          },
          logout() {
            window.location.href = apiUrls.user.logout;
          },
          async deleteAccountSubmit({ password }) {
            const resp = await deleteAccount({ password });

            if(resp.ok === true) {
              window.location.href = LANDING_PAGE_URL;
              return { ok: true };
            }

            const { message, details } = resp.error;

            if(!isUndefined(details.formField)) {
              return {
                ok: false,
                errors: { [details.formField]: message },
              };
            }

            await openSnackbar({
              type: 'warning',
              message,
            });

            return { ok: false };
          },
          async changePasswordSubmit({ oldPassword, newPassword, newPasswordRepeat }) {
            const result = await changePassword({
              currentPassword: oldPassword,
              password: newPassword,
              passwordConfirmation: newPasswordRepeat,
            });

            if(result === true) {
              await openSnackbar({
                type: 'success',
                message: lang.account.passwordChanged,
              });

              return { ok: true };
            }

            await openSnackbar({
              type: 'warning',
              message: result,
            });

            return { ok: false };
          },
          async changeAvatar(file) {
            const { ok, error } = await updateAvatar(file);
            if(ok === true) {
              const user = await getMe();
              useUser.setState({ user });
            } else {
              await openSnackbar({
                type: 'warning',
                message: error,
              });
            }
          },
        }}
      />
    </Animations.fade>
  );
};
