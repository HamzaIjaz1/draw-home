import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
declare const icons: {
    myAssets: ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
export type DropdownItemProps = Union<{
    label: string;
    state?: 'default' | 'active';
    onClick: () => void;
} & ({
    icon: keyof typeof icons;
} | {
    image: string;
})>;
export declare const DropdownItem: ({ className, label, image, icon, state, onClick, }: DropdownItemProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map