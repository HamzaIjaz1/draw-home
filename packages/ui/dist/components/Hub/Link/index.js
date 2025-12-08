"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Icons_1 = require("../../Icons");
const styles_1 = require("./styles");
const styles_2 = require("../../../utils/styles");
const icons = {
    person: Icons_1.PersonIcon,
    logout: Icons_1.LogOutIcon,
    projects: Icons_1.ProjectsIcon,
    team: Icons_1.TeamIcon,
    coin: Icons_1.CoinIcon,
    questionMark: Icons_1.QuestionMarkIcon,
};
const Link = ({ className, href, icon, text, state = 'default', }) => {
    const Icon = icons[icon];
    const active = state === 'active';
    return ((0, jsx_runtime_1.jsxs)(styles_1.StyledLink, { className: className, href: href, active: active, children: [(0, jsx_runtime_1.jsx)(Icon, { color: (0, styles_2.getCssVar)(styles_1.iconColorCssVariable) }), (0, jsx_runtime_1.jsx)(styles_1.Text, { active: active, noWrap: true, children: text })] }));
};
exports.Link = Link;
//# sourceMappingURL=index.js.map