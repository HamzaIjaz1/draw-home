import { WithClassName } from '@draw-house/common/dist/utils';
import { useCallback, useRef, useState } from 'react';
import { isNull } from '@arthurka/ts-utils';
import { ButtonLinkLike } from '../ButtonLinkLike';
import { MainForm } from './components/MainForm';
import {
  ChangeNameForm,
  FormFields as ChangeNameFormFields,
  FormFieldsErrors as ChangeNameFormFieldsErrors,
  ChangeNameFormTexts,
} from './components/ChangeName';
import {
  ChangeEmailForm,
  FormFields as ChangeEmailFormFields,
  FormFieldsErrors as ChangeEmailFormFieldsErrors,
  ChangeEmailFormTexts,
} from './components/ChangeEmail';
import {
  ChangePasswordForm,
  FormFields as ChangePasswordFormFields,
  FormFieldsErrors as ChangePasswordFormFieldsErrors,
  ChangePasswordFormTexts,
} from './components/ChangePassword';
import {
  DeleteAccountForm,
  FormFields as DeleteAccountFormFields,
  FormFieldsErrors as DeleteAccountFormFieldsErrors,
} from './components/DeleteAccountForm';
import {
  Avatar,
  AvatarAndFormContainer,
  AvatarButton,
  AvatarContainer,
  BottomLinksContainer,
  MainFormContainer,
  PaddedTitledIsle,
} from './styles';
import { Dialog } from '../Dialog';
import { CommonErrorTexts } from '../Form';
import { DialogActions } from '../DialogActions';
import { VisuallyHiddenInput } from '../../../utils/styles';

type SubmitResponse<T> = (
  | { ok: true }
  | {
    ok: false;
    errors?: T;
  }
);

export type AccountPageContentProps = {
  user: {
    name: string;
    email: string;
    avatar: string | null;
    passwordLess: boolean;
  };
  templateSectionTitle: string;
  mainFormTexts: {
    fields: {
      fullName: string;
      email: string;
    };
    buttons: {
      changeName: string;
      changeEmail: string;
      changePassword: string;
    };
  };
  logoutTexts: {
    bottomLink: string;
    dialog: {
      title: string;
      buttons: {
        confirm: string;
        cancel: string;
      };
    };
  };
  deleteAccountTexts: {
    bottomLink: string;
    dialog: {
      title: string;
      description: string;
      description2: string;
      passwordField: string;
      buttons: {
        confirm: string;
        cancel: string;
        confirmSuccess: string;
      };
      deleteSuccessMessage: string;
      deleteErrorMessage: string;
    };
  };
  changeEmailDialogTexts: {
    title: string;
    description: string;
    formTexts: ChangeEmailFormTexts;
  };
  changeNameDialogTexts: {
    title: string;
    formTexts: ChangeNameFormTexts;
  };
  changePasswordDialogTexts: {
    title: string;
    formTexts: ChangePasswordFormTexts;
  };
  commonErrorTexts: CommonErrorTexts;
  handlers: {
    logout: () => void;
    changeNameSubmit: (data: ChangeNameFormFields) => Promise<SubmitResponse<ChangeNameFormFieldsErrors>>;
    changeEmailSubmit: (data: ChangeEmailFormFields) => Promise<SubmitResponse<ChangeEmailFormFieldsErrors>>;
    deleteAccountSubmit: (data: DeleteAccountFormFields) => Promise<SubmitResponse<DeleteAccountFormFieldsErrors>>;
    changePasswordSubmit: (data: ChangePasswordFormFields) => Promise<SubmitResponse<ChangePasswordFormFieldsErrors>>;
    changeAvatar: (file: File) => void;
  };
};


export const AccountPageContent = ({
  className,
  user,
  templateSectionTitle,
  mainFormTexts,
  logoutTexts,
  deleteAccountTexts,
  changeNameDialogTexts,
  changeEmailDialogTexts,
  changePasswordDialogTexts,
  commonErrorTexts,
  handlers: {
    changeNameSubmit,
    changeEmailSubmit,
    logout,
    deleteAccountSubmit,
    changePasswordSubmit,
    changeAvatar,
  },
}: AccountPageContentProps & WithClassName) => {
  const [openChangeNameDialog, setOpenChangeNameDialog] = useState(false);
  const [openChangeEmailDialog, setOpenChangeEmailDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoutCancel = () => setOpenLogoutDialog(false);

  const handleLogoutClickConfirm = () => {
    setOpenLogoutDialog(false);
    logout();
  };

  const handleDeleteAccountCancel = () => setOpenDeleteAccountDialog(false);

  const changeNameDialogClose = useCallback(() => {
    setOpenChangeNameDialog(false);
  }, []);

  const changeEmailDialogClose = useCallback(() => {
    setOpenChangeEmailDialog(false);
  }, []);

  const changePasswordDialogClose = useCallback(() => {
    setOpenChangePasswordDialog(false);
  }, []);

  return (
    <>
      <PaddedTitledIsle
        className={className}
        type='always-static'
        title={templateSectionTitle}
      >
        <AvatarAndFormContainer>
          <AvatarContainer>
            <AvatarButton
              onClick={() => {
                if(!isNull(fileInputRef.current)) {
                  fileInputRef.current.click();
                }
              }}
            >
              <Avatar src={isNull(user.avatar) ? '' : user.avatar} alt={user.name} />
            </AvatarButton>

            <VisuallyHiddenInput
              ref={fileInputRef}
              type='file'
              accept='image/png,image/jpeg'
              onChange={e => {
                const file = e.target.files?.[0];
                e.target.value = '';
                if(file instanceof File) {
                  changeAvatar(file);
                }
              }}
            />

          </AvatarContainer>
          <MainFormContainer>
            <MainForm
              formFields={{
                fullName: { text: mainFormTexts.fields.fullName, value: user.name },
                email: { text: mainFormTexts.fields.email, value: user.email },
              }}
              buttons={{
                changeName: {
                  text: mainFormTexts.buttons.changeName,
                  handler: () => setOpenChangeNameDialog(true),
                },
                changeEmail: {
                  text: mainFormTexts.buttons.changeEmail,
                  handler: () => setOpenChangeEmailDialog(true),
                },
                changePassword: {
                  text: mainFormTexts.buttons.changePassword,
                  handler: () => setOpenChangePasswordDialog(true),
                },
              }}
              passwordLess={user.passwordLess}
            />
          </MainFormContainer>
        </AvatarAndFormContainer>
        <BottomLinksContainer>
          <ButtonLinkLike
            icon='logout'
            text={logoutTexts.bottomLink}
            onClick={() => setOpenLogoutDialog(true)}
            state='active'
            version='smaller'
          />
          <ButtonLinkLike
            icon='delete'
            text={deleteAccountTexts.bottomLink}
            onClick={() => setOpenDeleteAccountDialog(true)}
            state='active'
            version='smaller'
          />
        </BottomLinksContainer>
      </PaddedTitledIsle>

      <Dialog
        open={openChangeNameDialog}
        onClose={changeNameDialogClose}
        title={changeNameDialogTexts.title}
      >
        <ChangeNameForm
          handleCancel={changeNameDialogClose}
          buttons={changeNameDialogTexts.formTexts.buttons}
          formFields={changeNameDialogTexts.formTexts.formFields}
          commonErrorTexts={commonErrorTexts}
          handleSubmit={async data => {
            const res = await changeNameSubmit(data);
            if(res.ok === false) {
              return res.errors ?? {};
            }

            changeNameDialogClose();
            return {};
          }}
        />
      </Dialog>
      <Dialog
        open={openChangeEmailDialog}
        onClose={changeEmailDialogClose}
        title={changeEmailDialogTexts.title}
      >
        <ChangeEmailForm
          handleCancel={changeEmailDialogClose}
          buttons={changeEmailDialogTexts.formTexts.buttons}
          formFields={changeEmailDialogTexts.formTexts.formFields}
          description={{
            text: changeEmailDialogTexts.description,
          }}
          commonErrorTexts={commonErrorTexts}
          handleSubmit={async data => {
            const res = await changeEmailSubmit(data);
            if(res.ok === false) {
              return res.errors ?? {};
            }

            changeEmailDialogClose();
            return {};
          }}
        />
      </Dialog>
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        title={logoutTexts.dialog.title}
      >
        <DialogActions
          primaryActionText={logoutTexts.dialog.buttons.confirm}
          onPrimaryAction={handleLogoutClickConfirm}
          secondaryActionText={logoutTexts.dialog.buttons.cancel}
          onSecondaryAction={handleLogoutCancel}
        />
      </Dialog>
      <Dialog
        open={openDeleteAccountDialog}
        onClose={handleDeleteAccountCancel}
        title={deleteAccountTexts.dialog.title}
      >
        <DeleteAccountForm
          buttons={{
            confirm: { text: deleteAccountTexts.dialog.buttons.confirm },
            cancel: { text: deleteAccountTexts.dialog.buttons.cancel },
          }}
          description={{
            text: deleteAccountTexts.dialog.description,
            text2: deleteAccountTexts.dialog.description2,
          }}
          commonErrorTexts={commonErrorTexts}
          formFields={{ password: { text: deleteAccountTexts.dialog.passwordField } }}
          handleSubmit={async data => {
            const res = await deleteAccountSubmit(data);
            if(res.ok === false) {
              return res.errors ?? {};
            }

            handleDeleteAccountCancel();
            return {};
          }}
          handleCancel={handleDeleteAccountCancel}
          passwordLess={user.passwordLess}
        />
      </Dialog>
      <Dialog
        open={openChangePasswordDialog}
        onClose={changePasswordDialogClose}
        title={changePasswordDialogTexts.title}
      >
        <ChangePasswordForm
          handleCancel={changePasswordDialogClose}
          buttons={changePasswordDialogTexts.formTexts.buttons}
          formFields={changePasswordDialogTexts.formTexts.formFields}
          commonErrorTexts={commonErrorTexts}
          handleSubmit={async data => {
            const res = await changePasswordSubmit(data);
            if(res.ok === false) {
              return res.errors ?? {};
            }

            changePasswordDialogClose();
            return {};
          }}
        />
      </Dialog>
    </>
  );
};
