import { LevelId } from '@draw-house/common/dist/brands';
export type LevelRailViewItem = {
    levelId: LevelId;
    title?: string;
    screenY: number;
    railX1: number;
    railX2: number;
    active?: boolean;
    worldY?: number;
    elevationText?: string;
};
export type LevelRailsOverlayComponentProps = {
    visible: boolean;
    rightPad: number;
    overlayRightEdgePx: number;
    rails: LevelRailViewItem[];
};
export declare const LevelRailsOverlayComponent: React.FC<LevelRailsOverlayComponentProps>;
//# sourceMappingURL=index.d.ts.map