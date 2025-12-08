import { WithClassName } from '@draw-house/common/dist/utils';
import { FormFields as ChangeNameFormFields, FormFieldsErrors as ChangeNameFormFieldsErrors, ChangeNameFormTexts } from './components/ChangeName';
import { FormFields as ChangeEmailFormFields, FormFieldsErrors as ChangeEmailFormFieldsErrors, ChangeEmailFormTexts } from './components/ChangeEmail';
import { FormFields as ChangePasswordFormFields, FormFieldsErrors as ChangePasswordFormFieldsErrors, ChangePasswordFormTexts } from './components/ChangePassword';
import { FormFields as DeleteAccountFormFields, FormFieldsErrors as DeleteAccountFormFieldsErrors } from './components/DeleteAccountForm';
import { CommonErrorTexts } from '../Form';
type SubmitResponse<T> = ({
    ok: true;
} | {
    ok: false;
    errors?: T;
});
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
export declare const AccountPageContent: ({ className, user, templateSectionTitle, mainFormTexts, logoutTexts, deleteAccountTexts, changeNameDialogTexts, changeEmailDialogTexts, changePasswordDialogTexts, commonErrorTexts, handlers: { changeNameSubmit, changeEmailSubmit, logout, deleteAccountSubmit, changePasswordSubmit, changeAvatar, }, }: AccountPageContentProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map