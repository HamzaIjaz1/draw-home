import { WithClassName } from '@draw-house/common/dist/utils';
export type LevelProps = {
    title: string;
    subtitle: string;
    visible: boolean;
    showTransparencyOption: boolean;
    transparent: boolean;
    onTransparencyClick: () => void;
    onVisibilityChange: () => void;
    onSettingsClick: () => void;
    onDuplicationClick: () => void;
};
export declare const Level: ({ className, title, subtitle, visible, showTransparencyOption, transparent, onVisibilityChange, onSettingsClick, onTransparencyClick, onDuplicationClick, }: LevelProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map