import {
  TitledIsle,
} from '../CommonPageComponents';
import { TemplateButton, TemplateButtonProps } from '../TemplateButton';
import { ProjectCard, ProjectCardProps } from '../ProjectCard';
import { LogInSuggestion } from '../LogInSuggestion';
import {
  ProjectsLayout,
  SuggestionText,
  SuggestionWrap,
  TemplatesLayout,
} from './styles';

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

const Projects = ({
  projects,
  emptyProjectsSuggestionText,
}: Pick<ProjectsPageContentProps, 'projects' | 'emptyProjectsSuggestionText'>) => {
  if(projects.length === 0) {
    return (
      <SuggestionWrap>
        <SuggestionText>{emptyProjectsSuggestionText}</SuggestionText>
      </SuggestionWrap>
    );
  }

  return (
    <ProjectsLayout>
      {projects.map(project => (
        <ProjectCard
          key={project.href}
          {...project}
        />
      ))}
    </ProjectsLayout>
  );
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

export const ProjectsPageContent = ({
  isGuestUser,
  templateSectionTitle,
  templateSectionOptions,
  projectsSectionTitle,
  projects,
  logInSuggestionText,
  logInButtonText,
  onLoginButtonClick,
  emptyProjectsSuggestionText,
}: ProjectsPageContentProps) => (
  <>
    <TitledIsle title={templateSectionTitle} type='desktop-static'>
      <TemplatesLayout>
        {templateSectionOptions.map(({ title, image, onClick }) => (
          <TemplateButton
            key={`${title}${image}`}
            text={title}
            image={image}
            onClick={onClick}
          />
        ))}
      </TemplatesLayout>
    </TitledIsle>
    <TitledIsle title={projectsSectionTitle} type='desktop-static'>
      {
        isGuestUser === true ? (
          <LogInSuggestion
            text={logInSuggestionText}
            buttonText={logInButtonText}
            onClick={onLoginButtonClick}
          />
        ) : (
          <Projects
            projects={projects}
            emptyProjectsSuggestionText={emptyProjectsSuggestionText}
          />
        )
      }
    </TitledIsle>
  </>
);
