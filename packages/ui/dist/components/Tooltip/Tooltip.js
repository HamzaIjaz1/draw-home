"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipWrapper = exports.tooltipArrowSize = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const _props_1 = require("../../utils/$props");
const lookup_1 = require("../../utils/lookup");
exports.tooltipArrowSize = 6;
const Container = (0, material_1.styled)('div', (0, _props_1.$props)())(({ $position }) => (0, material_1.css) `
  --tooltip-background-color: #000000b2;

  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 3px 8px 6px 8px;
  background-color: var(--tooltip-background-color);
  backdrop-filter: blur(6px);
  border-radius: 6px;

  position: relative;

  ::before {
    content: '';
    position: absolute;

    ${$position === 'bottom-to-left' && (0, material_1.css) `
      width: 100%;
      height: ${exports.tooltipArrowSize}px;
      bottom: 100%;
      right: 0;
    `}
    ${$position === 'top' && (0, material_1.css) `
      width: 100%;
      height: ${exports.tooltipArrowSize}px;
      top: 100%;
      left: 0;
    `}
    ${$position === 'left' && (0, material_1.css) `
      width: ${exports.tooltipArrowSize}px;
      height: 100%;
      top: 0;
      left: 100%;
    `}
  }

  ::after {
    content: '';
    position: absolute;

    width: 0;
    height: 0;

    ${(0, lookup_1.lookup)($position, {
    'bottom-to-left': (0, material_1.css) `
      bottom: 100%;
      right: 20px;
      border-left: ${exports.tooltipArrowSize}px solid transparent;
      border-right: ${exports.tooltipArrowSize}px solid transparent;
      border-bottom: ${exports.tooltipArrowSize}px solid var(--tooltip-background-color);
    `,
    left: (0, material_1.css) `
      left: 100%;
      top: 12px;
      border-top: ${exports.tooltipArrowSize}px solid transparent;
      border-bottom: ${exports.tooltipArrowSize}px solid transparent;
      border-left: ${exports.tooltipArrowSize}px solid var(--tooltip-background-color);
    `,
    top: (0, material_1.css) `
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-left: ${exports.tooltipArrowSize}px solid transparent;
      border-right: ${exports.tooltipArrowSize}px solid transparent;
      border-top: ${exports.tooltipArrowSize}px solid var(--tooltip-background-color);
    `,
})}
  }
`);
const TooltipWrapper = ({ className, children, position }) => ((0, jsx_runtime_1.jsx)(Container, { className: className, "$position": position, children: children }));
exports.TooltipWrapper = TooltipWrapper;
//# sourceMappingURL=Tooltip.js.map