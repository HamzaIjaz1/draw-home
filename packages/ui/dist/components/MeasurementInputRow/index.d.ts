import { WithClassName } from '@draw-house/common/dist/utils';
import { InputVariant } from '../TextField/types';
declare const icons: {
    levelElevationHint: import("@emotion/styled").StyledComponent<WithClassName & import("../Icons").IconProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
    floorHeightHint: import("@emotion/styled").StyledComponent<WithClassName & import("../Icons").IconProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
};
type InputProps = {
    value: string;
    onChange: (e: string) => void;
    min?: number;
    max?: number;
    allowNegative?: boolean;
    name: string;
    adornment: string;
    variant?: InputVariant;
    disabled?: boolean;
};
export type MeasurementInputRowProps = {
    firstInput: InputProps;
    secondInput?: InputProps;
    label: string;
    icon?: keyof typeof icons;
    onBlur?: () => void;
};
export declare const MeasurementInputRow: ({ className, label, icon, firstInput, secondInput, onBlur, }: MeasurementInputRowProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map