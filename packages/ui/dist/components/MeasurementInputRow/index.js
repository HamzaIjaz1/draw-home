"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementInputRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ts_utils_1 = require("@arthurka/ts-utils");
const react_1 = require("react");
const TextField_1 = require("../TextField");
const styles_1 = require("./styles");
const icons = {
    levelElevationHint: styles_1.LevelElevationHintIcon,
    floorHeightHint: styles_1.FloorHeightHintIcon,
};
const NullComponent = () => null;
const MeasurementInputRow = ({ className, label, icon, firstInput, secondInput, onBlur, }) => {
    const id1 = (0, react_1.useId)();
    const id2 = (0, react_1.useId)();
    const Icon = (0, ts_utils_1.isUndefined)(icon) ? NullComponent : icons[icon];
    return ((0, jsx_runtime_1.jsxs)(styles_1.Container, { className: className, children: [(0, jsx_runtime_1.jsxs)(styles_1.Label, { htmlFor: firstInput.name, children: [(0, jsx_runtime_1.jsx)(Icon, {}), (0, jsx_runtime_1.jsx)(styles_1.LabelTypography, { as: 'span', children: label })] }), (0, jsx_runtime_1.jsxs)(styles_1.Inputs, { onBlur: (0, ts_utils_1.isUndefined)(onBlur) ? undefined : e => {
                    if (!(0, ts_utils_1.isNull)(e.relatedTarget) && e.currentTarget.contains(e.relatedTarget)) {
                        return;
                    }
                    onBlur();
                }, children: [(0, jsx_runtime_1.jsx)(TextField_1.Input, { id: id1, name: firstInput.name, type: 'number', size: (0, ts_utils_1.isUndefined)(secondInput) ? 'sm' : 'xs', variant: firstInput.variant, adornment: firstInput.adornment, value: firstInput.value, onChange: firstInput.onChange, min: firstInput.min, max: firstInput.max, allowNegative: firstInput.allowNegative, disabled: firstInput.disabled }), (0, ts_utils_1.isUndefined)(secondInput) ? null : ((0, jsx_runtime_1.jsx)(TextField_1.Input, { id: id2, name: secondInput.name, type: 'number', size: 'xs', variant: firstInput.variant, adornment: secondInput.adornment, value: secondInput.value, onChange: secondInput.onChange, min: secondInput.min, max: secondInput.max, allowNegative: secondInput.allowNegative, disabled: secondInput.disabled }))] })] }));
};
exports.MeasurementInputRow = MeasurementInputRow;
//# sourceMappingURL=index.js.map