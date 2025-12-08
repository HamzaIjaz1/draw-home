import { CommonErrorTexts } from '../../../Form';
type FormFieldProp = {
    text: string;
};
type ButtonProp = {
    text: string;
};
export type DeleteAccountFormTexts = {
    formFields: {
        password: FormFieldProp;
    };
    buttons: {
        confirm: ButtonProp;
        cancel: ButtonProp;
    };
};
export type FormFields = {
    password: string;
};
export type FormFieldsErrors = Partial<Record<keyof FormFields, string>>;
type DeleteAccountFormProps = (DeleteAccountFormTexts & {
    commonErrorTexts: CommonErrorTexts;
    handleSubmit: (data: FormFields) => Promise<FormFieldsErrors>;
    handleCancel: () => void;
    description: {
        text: string;
        text2: string;
    };
    passwordLess: boolean;
});
export declare const DeleteAccountForm: ({ formFields, buttons, commonErrorTexts, handleSubmit: handleSubmitProp, handleCancel, description, passwordLess, }: DeleteAccountFormProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map