import { WithClassName } from '@draw-house/common/dist/utils';
export type AnchorToProps = {
    anchored: React.ReactNode;
    children: React.ReactNode;
    xDirection: 'right' | 'left';
    yDirection: 'top' | 'bottom';
    xOffset?: string;
    yOffset?: string;
};
export declare const AnchorTo: ({ className, anchored, children, xDirection, yDirection, xOffset, yOffset, }: AnchorToProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map