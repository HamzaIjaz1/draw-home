import { WithClassName } from '@draw-house/common/dist/utils';
import { BaseButtonProps } from '../BaseButton';
export type OptionButtonProps = {
    children: React.ReactNode;
    state: 'default' | 'active';
    onClick: NonNullable<BaseButtonProps['onClick']>;
};
export declare const OptionButton: ({ className, children, state, onClick, }: OptionButtonProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map