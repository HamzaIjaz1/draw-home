import { WithClassName } from '@draw-house/common/dist/utils';
export type MaterialProps = {
    text: string;
    image: string;
    onClick: () => void;
    disabled?: boolean;
    withCheckmark?: boolean;
    withArrow?: boolean;
};
export declare const Material: ({ className, image, text, onClick, disabled, withCheckmark, withArrow, }: MaterialProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map