import { WithClassName } from '@draw-house/common/dist/utils';
import Color from 'color';
export type HexRgbColorInputProps = {
    value: InstanceType<typeof Color>;
    alpha: number;
    setErrorMsg: (message: string) => void;
    onChange: (c: InstanceType<typeof Color>) => void;
};
export declare const HexRgbColorInput: ({ className, value, alpha, setErrorMsg, onChange, }: HexRgbColorInputProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map