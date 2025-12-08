import { WithClassName } from '@draw-house/common/dist/utils';
export type SliderRowProps = {
    label: string;
    value: number;
    onChange: (value: number) => void;
    max?: number;
    min?: number;
    step?: number;
    color?: string;
};
export declare const SliderRow: ({ className, label, value, onChange, max, min, step, color, }: SliderRowProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map