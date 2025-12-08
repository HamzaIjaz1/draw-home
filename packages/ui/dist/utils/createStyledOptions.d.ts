import type { styled } from '@mui/material';
type Options = NonNullable<Parameters<typeof styled>[1]>;
export declare function createStyledOptions<T extends Record<string, unknown>, O extends Options = Options>(props: Record<keyof T, true>, options?: O): {
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
//# sourceMappingURL=createStyledOptions.d.ts.map