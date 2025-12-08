"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutSessionId = exports.isCheckoutSessionId = void 0;
const utils_1 = require("../utils");
const common_1 = require("./common");
const isCheckoutSessionId = (e) => (0, common_1.isNonEmptyString)(e);
exports.isCheckoutSessionId = isCheckoutSessionId;
const CheckoutSessionId = (e) => ((0, utils_1.initializeByTypeGuard)(e, exports.isCheckoutSessionId, 'CheckoutSessionId'));
exports.CheckoutSessionId = CheckoutSessionId;
//# sourceMappingURL=ids.js.map