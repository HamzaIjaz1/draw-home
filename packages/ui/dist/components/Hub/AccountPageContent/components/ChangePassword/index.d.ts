import { CommonErrorTexts } from '../../../Form';
type FormFieldProp = {
    text: string;
};
type ButtonProp = {
    text: string;
};
export type ChangePasswordFormTexts = {
    formFields: {
        oldPassword: FormFieldProp;
        newPassword: FormFieldProp;
        newPasswordRepeat: FormFieldProp;
    };
    buttons: {
        confirm: ButtonProp;
        cancel: ButtonProp;
    };
};
export type FormFields = {
    oldPassword: string;
    newPassword: string;
    newPasswordRepeat: string;
};
export type FormFieldsErrors = Partial<Record<keyof FormFields, string>>;
type ChangePasswordFormProps = (ChangePasswordFormTexts & {
    handleCancel: () => void;
    commonErrorTexts: CommonErrorTexts;
    handleSubmit: (data: FormFields) => Promise<FormFieldsErrors>;
});
export declare const ChangePasswordForm: ({ formFields, buttons, handleCancel, commonErrorTexts, handleSubmit: handleSubmitProp, }: ChangePasswordFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map