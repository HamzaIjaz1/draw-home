import { SafeOmit, WithClassName } from '@draw-house/common/dist/utils';
import { LevelProps } from '../Level';
export type LevelsProps = {
    items: Array<SafeOmit<LevelProps, 'showTransparencyOption'> & {
        id: string;
        highlighted?: boolean;
        onClick: () => void;
    }>;
};
export declare const Levels: ({ className, items }: LevelsProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map