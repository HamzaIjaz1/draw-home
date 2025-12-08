"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaywallPopUp = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Dialog_1 = __importStar(require("@mui/material/Dialog"));
const styles_1 = require("../utils/styles");
const _props_1 = require("../utils/$props");
const marginCssVar = '--paywall-popup-margin';
const Modal = (0, material_1.styled)(Dialog_1.default, (0, _props_1.$props)())(({ $variant }) => (0, material_1.css) `
  ${(0, styles_1.setCssVar)(marginCssVar, $variant === 'checkout' ? '0' : '16px')}

  .${Dialog_1.dialogClasses.container} {
    backdrop-filter: blur(10px);
  }

  .${Dialog_1.dialogClasses.paper} {
    border-radius: 20px;
    box-shadow: 0px 0px 16px 0px #0000004d;
    max-height: ${$variant === 'checkout' ? '100%' : '95%'};
    max-width: calc(100% - calc(2 * ${(0, styles_1.getCssVar)(marginCssVar)}));
    margin: ${(0, styles_1.getCssVar)(marginCssVar)};
  }

  ${$variant !== 'checkout' && (0, material_1.css) `
    @media (min-width: 600px) {
      ${(0, styles_1.setCssVar)(marginCssVar, '32px')}
    }
  `}

  @media (min-width: 900px) {
    ${(0, styles_1.setCssVar)(marginCssVar, '32px')}
    .${Dialog_1.dialogClasses.paper} {
      max-height: 95%;
    }
  }

  @media (min-width: 1100px) {
    .${Dialog_1.dialogClasses.paper} {
      border-radius: 30px;
    }
  }
`);
const Backdrop = ({ children }) => (0, jsx_runtime_1.jsx)("div", { children: children });
const PaywallPopUp = ({ className, open, onClose, children, variant, }) => ((0, jsx_runtime_1.jsx)(Modal, { className: className, open: open, onClose: onClose, slots: { backdrop: Backdrop }, maxWidth: false, "$variant": variant, children: children }));
exports.PaywallPopUp = PaywallPopUp;
//# sourceMappingURL=PaywallPopUp.js.map