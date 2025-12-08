import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
import { IconButtonProps } from '../IconButton';
type Option = Union<{
    selected: boolean;
    onClick: () => void;
} & ({
    icon: IconButtonProps['icon'];
    state?: 'default' | 'active';
} | {
    text: string;
})>;
export type ButtonOptionsRowProps = {
    label: string;
    options: Option[];
};
export declare const ButtonOptionsRow: ({ className, label, options, }: ButtonOptionsRowProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map