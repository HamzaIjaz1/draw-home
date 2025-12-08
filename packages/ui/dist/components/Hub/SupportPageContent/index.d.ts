import { WithClassName } from '@draw-house/common/dist/utils';
type FormData = {
    subject: string;
    request: string;
};
export type SupportPageContentProps = {
    mainSectionTitle: string;
    requiredErrorText: string;
    subjectFieldLabel: string;
    requestFieldLabel: string;
    submitButtonText: string;
    onSubmit: (data: FormData, resetForm: () => void) => void;
    isGuestUser: boolean;
    logInSuggestionText: string;
    logInButtonText: string;
    onLoginButtonClick: () => void;
};
export declare const SupportPageContent: ({ className, mainSectionTitle, requiredErrorText, subjectFieldLabel, requestFieldLabel, submitButtonText, onSubmit, isGuestUser, logInButtonText, logInSuggestionText, onLoginButtonClick, }: SupportPageContentProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map