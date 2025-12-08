"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnClickWithLoading = void 0;
const ts_utils_1 = require("@arthurka/ts-utils");
const utils_1 = require("@draw-house/common/dist/utils");
const react_1 = require("react");
const useOnClickWithLoading = (onClick) => {
    const [isOnClickLoading, setIsOnClickLoading] = (0, react_1.useState)(false);
    const isClickable = (0, react_1.useRef)(true);
    return {
        isOnClickLoading,
        async onCLickWithLoading(e) {
            if (isClickable.current === false) {
                return;
            }
            const promiseOrNot = onClick(e);
            if (promiseOrNot instanceof Promise) {
                try {
                    // eslint-disable-next-line no-param-reassign
                    isClickable.current = false;
                    await (0, ts_utils_1.wait)(0.3);
                    if (await (0, utils_1.isPromiseSettled)(promiseOrNot)) {
                        return;
                    }
                    setIsOnClickLoading(true);
                    try {
                        await promiseOrNot;
                    }
                    finally {
                        setIsOnClickLoading(false);
                    }
                }
                finally {
                    // eslint-disable-next-line no-param-reassign
                    isClickable.current = true;
                }
            }
        },
    };
};
exports.useOnClickWithLoading = useOnClickWithLoading;
//# sourceMappingURL=useOnClickWithLoading.js.map