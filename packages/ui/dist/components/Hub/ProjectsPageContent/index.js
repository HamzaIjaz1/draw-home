"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsPageContent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const CommonPageComponents_1 = require("../CommonPageComponents");
const TemplateButton_1 = require("../TemplateButton");
const ProjectCard_1 = require("../ProjectCard");
const LogInSuggestion_1 = require("../LogInSuggestion");
const styles_1 = require("./styles");
const Projects = ({ projects, emptyProjectsSuggestionText, }) => {
    if (projects.length === 0) {
        return ((0, jsx_runtime_1.jsx)(styles_1.SuggestionWrap, { children: (0, jsx_runtime_1.jsx)(styles_1.SuggestionText, { children: emptyProjectsSuggestionText }) }));
    }
    return ((0, jsx_runtime_1.jsx)(styles_1.ProjectsLayout, { children: projects.map(project => ((0, jsx_runtime_1.jsx)(ProjectCard_1.ProjectCard, { ...project }, project.href))) }));
};
const ProjectsPageContent = ({ isGuestUser, templateSectionTitle, templateSectionOptions, projectsSectionTitle, projects, logInSuggestionText, logInButtonText, onLoginButtonClick, emptyProjectsSuggestionText, }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(CommonPageComponents_1.TitledIsle, { title: templateSectionTitle, type: 'desktop-static', children: (0, jsx_runtime_1.jsx)(styles_1.TemplatesLayout, { children: templateSectionOptions.map(({ title, image, onClick }) => ((0, jsx_runtime_1.jsx)(TemplateButton_1.TemplateButton, { text: title, image: image, onClick: onClick }, `${title}${image}`))) }) }), (0, jsx_runtime_1.jsx)(CommonPageComponents_1.TitledIsle, { title: projectsSectionTitle, type: 'desktop-static', children: isGuestUser === true ? ((0, jsx_runtime_1.jsx)(LogInSuggestion_1.LogInSuggestion, { text: logInSuggestionText, buttonText: logInButtonText, onClick: onLoginButtonClick })) : ((0, jsx_runtime_1.jsx)(Projects, { projects: projects, emptyProjectsSuggestionText: emptyProjectsSuggestionText })) })] }));
exports.ProjectsPageContent = ProjectsPageContent;
//# sourceMappingURL=index.js.map