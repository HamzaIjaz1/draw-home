import { Union } from '@arthurka/ts-utils';
type Item = Union<{
    title: string;
} & ({
    active: boolean;
    onClick: () => void;
} | {
    items: Item[];
})>;
export type VisibilityMenuContentProps = {
    items: Item[];
};
export declare const VisibilityMenuContent: React.FC<VisibilityMenuContentProps>;
export {};
//# sourceMappingURL=index.d.ts.map