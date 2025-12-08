"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingPaymentMethod = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const material_1 = require("@mui/material");
const Icons_1 = require("../../Icons");
const theme_1 = require("../../../theme");
const Container = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  border: 1px solid ${theme_1.backgroundSecondary};
  border-radius: 16px;
`;
const Row = (0, material_1.styled)('div') `
  display: flex;
  justify-content: space-between;
  height: 44px;
`;
const CardInfoContainer = (0, material_1.styled)('div') `
  display: flex;
  gap: 24px;
`;
const BrandIconContainer = (0, material_1.styled)('div') `
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 76px;
`;
const ButtonContainer = (0, material_1.styled)('div') `
  align-self: center;
`;
const CardInfo = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const BoldText = (0, material_1.styled)('span') `
  font-weight: 400;
  font-size: 18px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #222733;
`;
const RegularText = (0, material_1.styled)('span') `
  font-weight: 400;
  font-size: 16px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #7a7e83;
`;
const AddressContainer = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Mastercard = (0, material_1.styled)(Icons_1.MastercardIcon) `
  width: 76px;
`;
const Visa = (0, material_1.styled)(Icons_1.VisaIcon) `
  width: 76px;
`;
const CreditCard = (0, material_1.styled)(Icons_1.CreditCardIcon) `
  width: 50px;
`;
const brandIcons = {
    mastercard: (0, jsx_runtime_1.jsx)(Mastercard, {}),
    visa: (0, jsx_runtime_1.jsx)(Visa, {}),
};
const BillingPaymentMethod = ({ className, last4, expiry, brand, Button, address, }) => {
    const knownBrandIcon = brandIcons[brand];
    const brandIcon = (0, ts_utils_1.isUndefined)(knownBrandIcon) ? (0, jsx_runtime_1.jsx)(CreditCard, {}) : knownBrandIcon;
    return ((0, jsx_runtime_1.jsxs)(Container, { className: className, children: [(0, jsx_runtime_1.jsxs)(Row, { children: [(0, jsx_runtime_1.jsxs)(CardInfoContainer, { children: [(0, jsx_runtime_1.jsx)(BrandIconContainer, { children: brandIcon }), (0, jsx_runtime_1.jsxs)(CardInfo, { children: [(0, jsx_runtime_1.jsxs)(BoldText, { children: ["**** **** **** ", last4] }), (0, jsx_runtime_1.jsx)(RegularText, { children: expiry })] })] }), (0, jsx_runtime_1.jsx)(ButtonContainer, { children: Button })] }), (0, ts_utils_1.isNull)(address.line1) && (0, ts_utils_1.isNull)(address.line2) && (0, ts_utils_1.isNull)(address.city) && (0, ts_utils_1.isNull)(address.postalCode) && (0, ts_utils_1.isNull)(address.country)
                ? null
                : ((0, jsx_runtime_1.jsxs)(AddressContainer, { children: [!(0, ts_utils_1.isNull)(address.line1) && (0, jsx_runtime_1.jsx)(BoldText, { children: address.line1 }), !(0, ts_utils_1.isNull)(address.line2) && (0, jsx_runtime_1.jsx)(RegularText, { children: address.line2 }), !(0, ts_utils_1.isNull)(address.city) && (0, jsx_runtime_1.jsx)(RegularText, { children: address.city }), (() => {
                            const text = [address.postalCode, address.country]
                                .filter(e => !(0, ts_utils_1.isNull)(e))
                                .join(', ');
                            return text.length === 0 ? null : (0, jsx_runtime_1.jsx)(RegularText, { children: text });
                        })()] }))] }));
};
exports.BillingPaymentMethod = BillingPaymentMethod;
//# sourceMappingURL=BillingPaymentMethod.js.map