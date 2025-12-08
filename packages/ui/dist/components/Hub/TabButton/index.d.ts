import { WithClassName } from '@draw-house/common/dist/utils';
export type TabButtonProps = {
    state?: 'default' | 'active' | 'disabled';
    text: string;
    onClick: () => void;
};
export declare const TabButton: ({ className, onClick, text, state, }: TabButtonProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map