import { WithClassName } from '@draw-house/common/dist/utils';
type RootProps = {
    children: React.ReactNode;
};
type BlockProps = {
    title: string;
    icon: JSX.Element;
    lines: string[];
};
type CombineProps = {
    children: React.ReactNode;
};
export declare const AllHotkeysLegend: {
    Root: ({ className, children }: RootProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
    Block: ({ className, title, icon, lines }: BlockProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
    Combine: ({ className, children }: CombineProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
};
export type AllHotkeysLegendProps = {
    RootProps: RootProps;
    BlockProps: BlockProps;
    CombineProps: CombineProps;
};
export {};
//# sourceMappingURL=AllHotkeysLegend.d.ts.map