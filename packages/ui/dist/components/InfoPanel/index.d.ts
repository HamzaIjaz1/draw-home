import { WithClassName } from '@draw-house/common/dist/utils';
import { MouseEvent } from 'react';
export type InfoPanelProps = {
    title: string;
    description: string;
    onClose: (e: MouseEvent<HTMLButtonElement>) => void;
    onStartQuickTour?: (e: MouseEvent<HTMLButtonElement>) => void;
    onOpenTutorials?: (e: MouseEvent<HTMLButtonElement>) => void;
    onPrevious?: (e: MouseEvent<HTMLButtonElement>) => void;
    onNext?: (e: MouseEvent<HTMLButtonElement>) => void;
};
export declare const InfoPanel: ({ className, title, description, onClose, onStartQuickTour, onOpenTutorials, onPrevious, onNext, }: InfoPanelProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map