import { TemplateButtonProps } from '../TemplateButton';
import { ProjectCardProps } from '../ProjectCard';
type TemplateOption = {
    title: string;
    image: TemplateButtonProps['image'];
    onClick: () => void;
};
type Project = {
    image: ProjectCardProps['image'];
    name: ProjectCardProps['name'];
    href: ProjectCardProps['href'];
    options: ProjectCardProps['options'];
    nameEditMode: ProjectCardProps['nameEditMode'];
    onNameEditModeExit: ProjectCardProps['onNameEditModeExit'];
};
export type ProjectsPageContentProps = {
    isGuestUser: boolean;
    templateSectionTitle: string;
    templateSectionOptions: TemplateOption[];
    projectsSectionTitle: string;
    projects: Project[];
    logInSuggestionText: string;
    emptyProjectsSuggestionText: string;
    logInButtonText: string;
    onLoginButtonClick: () => void;
};
export declare const ProjectsPageContent: ({ isGuestUser, templateSectionTitle, templateSectionOptions, projectsSectionTitle, projects, logInSuggestionText, logInButtonText, onLoginButtonClick, emptyProjectsSuggestionText, }: ProjectsPageContentProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map