"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentTexturePicker = RecentTexturePicker;
const jsx_runtime_1 = require("react/jsx-runtime");
const color_1 = __importDefault(require("color"));
const styled_components_1 = __importDefault(require("styled-components"));
const styles_1 = require("./styles");
const ThumbFrame = styled_components_1.default.div `
  position: relative;
  display: grid;
  place-items: center;
  /* Match Image sizes from styles.ts */
  width: ${({ $size }) => ($size === 'sm' ? '48px' : '56px')};
  height: ${({ $size }) => ($size === 'sm' ? '48px' : '56px')};
  overflow: hidden;
  border-radius: ${({ $square }) => ($square ? '8px' : '50%')};
`;
const Overlay = styled_components_1.default.div `
  position: absolute;
  inset: 0;
  background: ${({ $rgba }) => $rgba};
  mix-blend-mode: multiply;
  pointer-events: none;
  border-radius: ${({ $square }) => ($square ? '8px' : '50%')};
`;
function RecentTexturePicker({ className, options, onClick, chosenOption, squareImages = false, wrap = false, highlightVariant = 'outline', size = 'md', }) {
    return ((0, jsx_runtime_1.jsx)(styles_1.Container, { className: className, wrap: wrap, children: options.map(({ id, image, name, wScale, lScale, rotateDeg, color }) => {
            const w = Number.isFinite(wScale) && wScale > 0 ? wScale : 1;
            const l = Number.isFinite(lScale) && lScale > 0 ? lScale : 1;
            const minAxis = Math.min(w, l);
            const normalize = minAxis < 1 ? 1 / Math.max(minAxis, 0.01) : 1;
            const transform = `rotate(${Number.isFinite(rotateDeg) ? rotateDeg : 0}deg) scale(${l * normalize}, ${w * normalize})`;
            const c = (() => {
                try {
                    const cc = (0, color_1.default)(color ?? '#fff');
                    const { r, g, b } = cc.rgb().object();
                    const a = cc.alpha();
                    return `rgba(${r}, ${g}, ${b}, ${a})`;
                }
                catch (e) {
                    return 'rgba(255,255,255,1)';
                }
            })();
            return ((0, jsx_runtime_1.jsxs)(styles_1.MaterialButton, { onClick: () => onClick(id), size: size, children: [(0, jsx_runtime_1.jsxs)(ThumbFrame, { "$size": size, "$square": squareImages, children: [(0, jsx_runtime_1.jsx)(styles_1.Image, { src: image, active: id === chosenOption, squareImages: squareImages, highlightVariant: highlightVariant, size: size, draggable: false, style: { transform, transformOrigin: 'center center' } }), (0, jsx_runtime_1.jsx)(Overlay, { "$rgba": c, "$square": squareImages })] }), (0, jsx_runtime_1.jsx)(styles_1.Text, { children: name })] }, id));
        }) }));
}
//# sourceMappingURL=index.js.map