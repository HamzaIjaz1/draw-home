"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPlanCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const Box_1 = require("../Box");
const styles_1 = require("./styles");
const PaymentPlanCard = ({ className, title, description, priceBold, pricePrevious, priceGray, discountBadge, actionElement, featuresTitle, features, highlight = false, }) => ((0, jsx_runtime_1.jsxs)(styles_1.Card, { className: className, "$highlight": highlight, "$badge": discountBadge, children: [(0, jsx_runtime_1.jsxs)(Box_1.Box, { column: true, gap: 6, children: [(0, jsx_runtime_1.jsx)(styles_1.Title, { children: title }), (0, jsx_runtime_1.jsx)(styles_1.Description, { children: description })] }), (0, jsx_runtime_1.jsxs)(styles_1.PriceContainer, { children: [(0, jsx_runtime_1.jsx)(styles_1.PriceBold, { children: priceBold }), !(0, ts_utils_1.isNull)(pricePrevious) && ((0, jsx_runtime_1.jsx)(styles_1.PricePrevious, { children: pricePrevious })), priceGray.map(text => ((0, jsx_runtime_1.jsx)(styles_1.PriceGray, { children: text }, text)))] }), actionElement, (0, jsx_runtime_1.jsx)(styles_1.FeaturesTitle, { children: featuresTitle }), (0, jsx_runtime_1.jsx)(styles_1.FeatureList, { children: features.map(text => ((0, jsx_runtime_1.jsxs)(styles_1.FeatureListItem, { children: [(0, jsx_runtime_1.jsx)(styles_1.ListItemIcon, {}), (0, jsx_runtime_1.jsx)(styles_1.FeatureItemText, { children: text })] }, text))) })] }));
exports.PaymentPlanCard = PaymentPlanCard;
//# sourceMappingURL=index.js.map