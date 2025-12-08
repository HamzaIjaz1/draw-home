import { WithClassName } from '@draw-house/common/dist/utils';
export type MenuFrameProps = {
    children: React.ReactNode;
    corners?: Partial<Record<'top' | 'down', 'rounded' | 'angular'>>;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
};
export declare const MenuFrame: import("react").ForwardRefExoticComponent<MenuFrameProps & WithClassName & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=index.d.ts.map