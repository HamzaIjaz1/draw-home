import { WithClassName } from '@draw-house/common/dist/utils';
type FormFieldProp = {
    text: string;
    value: string;
};
type ButtonProp = {
    text: string;
    handler: () => void;
};
export type MainFormProps = {
    formFields: {
        fullName: FormFieldProp;
        email: FormFieldProp;
    };
    buttons: {
        changeName: ButtonProp;
        changeEmail: ButtonProp;
        changePassword: ButtonProp;
    };
    passwordLess: boolean;
};
export declare const MainForm: ({ className, formFields, buttons, passwordLess, }: MainFormProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map