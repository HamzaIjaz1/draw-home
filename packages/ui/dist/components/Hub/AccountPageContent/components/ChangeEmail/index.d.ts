import { CommonErrorTexts } from '../../../Form';
type FormFieldProp = {
    text: string;
};
type ButtonProp = {
    text: string;
};
export type ChangeEmailFormTexts = {
    formFields: {
        newEmailAddress: FormFieldProp;
        password: FormFieldProp;
    };
    buttons: {
        confirm: ButtonProp;
        cancel: ButtonProp;
    };
};
export type FormFields = {
    email: string;
    password: string;
};
export type FormFieldsErrors = Partial<Record<keyof FormFields, string>>;
type ChangeEmailFormProps = (ChangeEmailFormTexts & {
    handleCancel: () => void;
    commonErrorTexts: CommonErrorTexts;
    handleSubmit: (data: FormFields) => Promise<FormFieldsErrors>;
    description: {
        text: string;
    };
});
export declare const ChangeEmailForm: ({ formFields, buttons, handleCancel, commonErrorTexts, handleSubmit: handleSubmitProp, description, }: ChangeEmailFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map