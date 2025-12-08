import { WithClassName } from '@draw-house/common/dist/utils';
export type QuickTourContentProps = {
    title: string;
    description: string;
    media: null | {
        type: 'image' | 'video';
        src: string;
    };
    badgeText: string;
    onClose: () => void;
};
export declare const QuickTourContent: ({ className, badgeText, title, description, media, onClose, }: QuickTourContentProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map