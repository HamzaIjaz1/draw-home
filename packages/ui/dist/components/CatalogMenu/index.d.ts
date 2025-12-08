import { Union } from '@arthurka/ts-utils';
import { Controls } from '../MenuSection';
type Item = Union<{
    title: string;
    icon: string;
} & ({
    onClick: () => void;
    showArrowIcon?: boolean;
} | (Controls & {
    children: React.ReactElement;
}))>;
export type CatalogMenuContentProps = {
    items: Item[];
};
export declare const CatalogMenuContent: ({ items }: CatalogMenuContentProps) => import("react/jsx-runtime").JSX.Element[];
export {};
//# sourceMappingURL=index.d.ts.map