"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckDnDSupport = void 0;
const material_1 = require("@mui/material");
const useCheckDnDSupport = () => {
    const isDnDSupported = (0, material_1.useMediaQuery)('(hover: none) and (pointer: coarse)') === false;
    return { isDnDSupported };
};
exports.useCheckDnDSupport = useCheckDnDSupport;
//# sourceMappingURL=useCheckDnDSupport.js.map