"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonLinkLike = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Icons_1 = require("../../Icons");
const styles_1 = require("../../../utils/styles");
const styles_2 = require("./styles");
const icons = {
    person: Icons_1.PersonIcon,
    logout: Icons_1.LogOutIcon,
    projects: Icons_1.ProjectsIcon,
    team: Icons_1.TeamIcon,
    coin: Icons_1.CoinIcon,
    questionMark: Icons_1.QuestionMarkIcon,
    delete: Icons_1.DeleteIcon,
};
const ButtonLinkLike = ({ className, icon, text, onClick, state = 'default', version = 'normal', }) => {
    const Icon = icons[icon];
    const active = state === 'active';
    return ((0, jsx_runtime_1.jsxs)(styles_2.Button, { className: className, variant: 'text', onClick: onClick, active: active, disableRipple: true, version: version, children: [(0, jsx_runtime_1.jsx)(Icon, { color: (0, styles_1.getCssVar)(styles_2.iconColorCssVariable) }), (0, jsx_runtime_1.jsx)(styles_2.Text, { active: active, version: version, noWrap: true, children: text })] }));
};
exports.ButtonLinkLike = ButtonLinkLike;
//# sourceMappingURL=index.js.map