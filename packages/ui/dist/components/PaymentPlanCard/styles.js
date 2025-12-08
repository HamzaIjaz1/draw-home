"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureItemText = exports.ListItemIcon = exports.FeatureListItem = exports.FeatureList = exports.FeaturesTitle = exports.PriceGray = exports.PricePrevious = exports.PriceBold = exports.PriceContainer = exports.Description = exports.Title = exports.Card = void 0;
const material_1 = require("@mui/material");
const ts_utils_1 = require("@arthurka/ts-utils");
const _props_1 = require("../../utils/$props");
const Icons_1 = require("../Icons");
exports.Card = (0, material_1.styled)('div', (0, _props_1.$props)())(({ theme, $highlight, $badge }) => (0, material_1.css) `
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 20px;
  width: 300px;
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px #0000001a;
  background: ${theme.palette.background.paper};

  ${$highlight === true && (0, material_1.css) `
    background: #31bcfd0d;
    outline: 1px solid #31bcfd;
  `}

  ${!(0, ts_utils_1.isNull)($badge) && (0, material_1.css) `
    ::after {
      content: "${$badge}";
      position: absolute;
      top: -12px;
      right: 10px;
      background: #31bcfd;
      border-radius: 100px;
      padding: 6px 10px;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0px;
      color: #fff;
    }
  `}

  scroll-snap-align: center;

  @media (min-width: 1200px) {
    width: clamp(300px, 233.3328px + 5.5556vw, 340px);
  }
`);
exports.Title = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 500;
  font-size: 19px;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.primary};
`);
exports.Description = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-weight: 400;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);
exports.PriceContainer = (0, material_1.styled)('span') `
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;
exports.PriceBold = (0, material_1.styled)('span') `
  font-family: DM Sans;
  font-weight: 600;
  font-size: 30px;
  line-height: 1;
  letter-spacing: 0px;
  color: #000;
`;
exports.PricePrevious = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-family: DM Sans;
  font-weight: 400;
  font-size: 30px;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.disabled};
  text-decoration: line-through;
`);
exports.PriceGray = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-family: DM Sans;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);
exports.FeaturesTitle = (0, material_1.styled)('span') `
  font-family: DM Sans;
  font-weight: 500;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #222733;
`;
exports.FeatureList = (0, material_1.styled)('ul') `
  all: unset;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
exports.FeatureListItem = (0, material_1.styled)('li') `
  display: inline-flex;
  gap: 10px;
  align-items: center;
`;
exports.ListItemIcon = (0, material_1.styled)(Icons_1.CheckMarkIcon) `
  min-width: 24px;
`;
exports.FeatureItemText = (0, material_1.styled)('span')(({ theme }) => (0, material_1.css) `
  font-family: DM Sans;
  font-weight: 500;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);
//# sourceMappingURL=styles.js.map