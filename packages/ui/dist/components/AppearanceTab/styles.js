"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadgeLabel = exports.Label = exports.Container = void 0;
const material_1 = require("@mui/material");
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const identity_1 = require("../../utils/identity");
const lookup_1 = require("../../utils/lookup");
const _props_1 = require("../../utils/$props");
exports.Container = (0, material_1.styled)('button', (0, _props_1.$props)())(({ theme, $state }) => (0, material_1.css) `
  /* reset some button styles */
  border: none;
  font: inherit;

  display: flex;
  align-items: center;
  gap: 2px;
  height: 28px;
  padding: 4px 6px;
  border-radius: 6px;
  background-color: ${(0, lookup_1.lookup)($state, {
    default: theme.palette.background.paper,
    active: theme.palette.primary.main,
})};
  user-select: none;
  cursor: pointer;
`);
exports.Label = (0, material_1.styled)(Typography_1.default, (0, _props_1.$props)())(({ theme, $state }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  text-align: center;
  color: ${(0, lookup_1.lookup)($state, {
    default: theme.palette.text.primary,
    active: '#fff',
})};
`);
exports.Label.defaultProps = (0, identity_1.identity)({ component: 'span' });
exports.BadgeLabel = (0, material_1.styled)(Typography_1.default, (0, _props_1.$props)())(({ theme, $state }) => (0, material_1.css) `
  font-weight: 600;
  font-size: 11px;
  line-height: 15px;
  letter-spacing: 0px;
  text-align: center;
  vertical-align: bottom;
  color: ${theme.palette.primary.main};
  background-color: ${(0, lookup_1.lookup)($state, {
    default: '#f1f1f1',
    active: theme.palette.background.paper,
})};
  border-radius: 100px;
  padding-right: 2px;
  padding-left: 2px;
`);
exports.BadgeLabel.defaultProps = (0, identity_1.identity)({ component: 'span' });
//# sourceMappingURL=styles.js.map