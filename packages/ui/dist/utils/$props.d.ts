import type { styled } from '@mui/material';
export type $Props<T extends Exclude<keyof T, `$${string}`> extends never ? Record<string, unknown> : never> = (T);
type Options = NonNullable<Parameters<typeof styled>[1]>;
export declare function $props<T extends Options = Options>(options?: T): {
    label?: string;
    shouldForwardProp: (propName: string) => boolean;
    target?: string;
    name?: string;
    slot?: string;
    overridesResolver?: (props: any, styles: Record<string, import("@mui/styled-engine").CSSInterpolation>) => import("@mui/styled-engine").CSSInterpolation;
    skipVariantsResolver?: boolean;
    skipSx?: boolean;
};
export {};
//# sourceMappingURL=$props.d.ts.map