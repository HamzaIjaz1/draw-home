"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Menu_1 = require("./Menu");
const styles_1 = require("../../../utils/styles");
const styles_2 = require("./styles");
const usePrevious_1 = require("../../../hooks/usePrevious");
const ProjectCard = ({ className, image, name, href, options, nameEditMode, onNameEditModeExit, }) => {
    const [open, setOpen] = (0, react_1.useState)(false);
    const [value, setValue] = (0, react_1.useState)(name);
    const prevName = (0, usePrevious_1.usePrevious)(name);
    const nameHasChanged = prevName !== name;
    const localValueOutOfSync = value !== name;
    if (nameHasChanged && localValueOutOfSync) {
        setValue(name);
    }
    const saveOnExit = () => {
        const newValue = value.replace(/\s+/g, ' ').trim();
        onNameEditModeExit({ action: 'save', value: newValue });
        setValue(newValue);
    };
    const discardOnExit = () => {
        onNameEditModeExit({ action: 'discard' });
        setValue(name);
    };
    return ((0, jsx_runtime_1.jsxs)(styles_2.Card, { className: className, children: [(0, jsx_runtime_1.jsx)(styles_2.Link, { href: href, children: (0, jsx_runtime_1.jsx)(styles_2.Image, { src: image }) }), nameEditMode === true ? ((0, jsx_runtime_1.jsx)(styles_2.InputContainer, { children: (0, jsx_runtime_1.jsx)(styles_2.Input, { value: value, onBlur: saveOnExit, onChange: e => setValue(e.target.value), onKeyUp: ({ key }) => {
                        if (key === 'Escape') {
                            discardOnExit();
                        }
                        if (key === 'Enter') {
                            saveOnExit();
                        }
                    }, autoFocus: true }) })) : ((0, jsx_runtime_1.jsxs)(styles_2.TitleButton, { onClick: () => setOpen(!open), children: [(0, jsx_runtime_1.jsx)(styles_2.Title, { noWrap: true, children: name }), (0, jsx_runtime_1.jsx)(styles_2.MoreIcon, { color: (0, styles_1.getCssVar)(styles_2.moreIconCssVariable) })] })), open === true ? ((0, jsx_runtime_1.jsx)(Menu_1.Menu, { items: options, onClose: () => setOpen(false) })) : null] }));
};
exports.ProjectCard = ProjectCard;
//# sourceMappingURL=index.js.map