export const floorPlanScannerUrls = {
  floorPlanImage: {
    _: '/floor-plan-image',
    get scan() {
      return `${this._}/scan` as const;
    },
    get autoscale() {
      return `${this._}/autoscale` as const;
    },
  },
} as const;
