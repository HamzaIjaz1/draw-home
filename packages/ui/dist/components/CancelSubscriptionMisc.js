"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelSubscriptionContentText = exports.AlertIconWrapper = exports.CancelSubscriptionPopUpHeader = exports.CancelSubscriptionContentWrapper = exports.CancelSubscriptionButtonsWrapper = exports.CancelSubscriptionPopUpWrapper = void 0;
const material_1 = require("@mui/material");
exports.CancelSubscriptionPopUpWrapper = (0, material_1.styled)('div') `
  height: 290px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
exports.CancelSubscriptionButtonsWrapper = (0, material_1.styled)('div') `
  display: flex;
  gap: 10px;
  margin: 0 30px;
`;
exports.CancelSubscriptionContentWrapper = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px 30px 30px;
`;
exports.CancelSubscriptionPopUpHeader = (0, material_1.styled)('div') `
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  position: relative;
`;
exports.AlertIconWrapper = (0, material_1.styled)('div') `
  height: 56px;
  width: 56px;
  background-color: #fdeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;
exports.CancelSubscriptionContentText = (0, material_1.styled)('span') `
  font-weight: 400;
  font-size: 17px;
  line-height: 1;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #7a7e83;
  text-align: center;

  strong {
    all: unset;
    font-size: 19px;
    color: #000;
  }
`;
//# sourceMappingURL=CancelSubscriptionMisc.js.map