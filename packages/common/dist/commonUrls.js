"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floorPlanScannerUrls = void 0;
exports.floorPlanScannerUrls = {
    floorPlanImage: {
        _: '/floor-plan-image',
        get scan() {
            return `${this._}/scan`;
        },
        get autoscale() {
            return `${this._}/autoscale`;
        },
    },
};
//# sourceMappingURL=commonUrls.js.map