import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
declare const icons: {
    plus: import("@emotion/styled").StyledComponent<WithClassName & import("../Icons").IconProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
    plusCircled: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    bin: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    saveCopy: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    eyeOutlined: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    reset: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    chain: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
type State = 'default' | 'disabled';
export type MainButtonProps = Union<{
    onClick: () => void | Promise<void>;
    state?: State;
    height?: 'md' | 'lg';
    iconColors?: Partial<Record<State, string>>;
    textColors?: Partial<Record<State, string>>;
    backgroundColors?: Partial<Record<State, string>>;
    padding?: 'sm' | 'md' | 'row 1/4';
    rounded?: 'sm' | 'md';
} & ({
    variant?: 'contained';
    shadowless?: boolean;
} | {
    variant: 'text';
}) & ({
    icon: keyof typeof icons;
    text?: string;
} | {
    icon?: keyof typeof icons;
    text: string;
    width?: 'xl' | 'lg' | 'md' | 'fit-content' | 'fill';
})>;
export declare const MainButton: ({ className, icon, onClick, state, text, width, height, shadowless, variant, iconColors, textColors, backgroundColors, padding, rounded, }: MainButtonProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map