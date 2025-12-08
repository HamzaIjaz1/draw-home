"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotatedTabs = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const react_1 = require("react");
const ts_utils_1 = require("@arthurka/ts-utils");
const _1 = require(".");
const Anchor = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Annotation = (0, material_1.styled)(Typography_1.default) `
  --lineHeight: 16px;

  margin-top: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: var(--lineHeight);
  text-align: center;
  color: #31bcfd;
`;
const LiveHint = (0, material_1.styled)(Typography_1.default)(({ theme }) => (0, material_1.css) `
  --lineHeight: 16px;

  margin-top: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: var(--lineHeight);
  text-align: center;
  color: ${theme.palette.text.disabled};
  white-space: normal;
  word-break: break-word;
`);
const hasText = (e) => (!(0, ts_utils_1.isUndefined)(e) && e.trim().length > 0);
const AnnotatedTabs = ({ className, chosenTab, children, onClick, annotation, annotationDetails, levelName, }) => {
    const [visible, setVisible] = (0, react_1.useState)(true);
    const hasAnyAnnotation = hasText(annotation) || hasText(annotationDetails);
    (0, react_1.useEffect)(() => {
        if (hasAnyAnnotation === false) {
            setVisible(false);
            return;
        }
        setVisible(true);
        const timeout = window.setTimeout(() => {
            setVisible(false);
        }, 4000);
        return () => {
            window.clearTimeout(timeout);
        };
    }, [hasAnyAnnotation, annotation, annotationDetails]);
    const annotationDisplay = hasText(annotation) === true && hasAnyAnnotation && visible ? 'block' : 'none';
    const liveHintText = hasAnyAnnotation === true && visible === true ? annotationDetails : levelName;
    const liveHintDisplay = hasText(liveHintText) === true ? 'block' : 'none';
    return ((0, jsx_runtime_1.jsxs)(Anchor, { className: className, children: [(0, jsx_runtime_1.jsx)(_1.Tabs, { chosenTab: chosenTab, onClick: onClick, children: children }), (0, jsx_runtime_1.jsx)(Annotation, { noWrap: true, style: { display: annotationDisplay }, children: annotation }), (0, jsx_runtime_1.jsx)(LiveHint, { style: { display: liveHintDisplay }, children: liveHintText })] }));
};
exports.AnnotatedTabs = AnnotatedTabs;
//# sourceMappingURL=variants.js.map