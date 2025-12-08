import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
declare const icons: {
    roof: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    hint: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    eye: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
export type Controls = ({
    defaultExpanded?: boolean;
} | {
    expanded: boolean;
    onChange: (expanded: boolean) => void;
});
type IconOption = ({} | {
    icon: keyof typeof icons;
    iconButton?: {
        onClick: () => void;
        state: 'active' | 'default';
    };
});
type ImageOption = {
    image: string;
};
type IconOrImage = ImageOption | IconOption;
export type MenuSectionProps = Union<({
    title: string;
    titleVariant?: 'primary-600' | 'primary-500' | 'primary-400' | 'pale';
    titleSize?: string;
    divider?: 'summary' | 'content';
    paddingBottom?: `${number}px`;
} & IconOrImage & ({
    type: 'buttonlike';
    onClick: () => void;
    showArrowIcon?: boolean;
} | {
    type: 'static';
    children?: React.ReactNode;
} | ({
    type: 'collapsible';
    children: React.ReactNode;
} & Controls)))>;
export declare const MenuSection: ({ className, title, children, type, expanded, defaultExpanded, onChange, onClick, iconButton, icon, image, paddingBottom, titleSize, titleVariant, divider, showArrowIcon, }: MenuSectionProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map