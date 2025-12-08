import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
type Controls = ({
    defaultCollapsed?: boolean;
} | {
    expanded: boolean;
    onChange: (expanded: boolean) => void;
});
export type TitledIsleProps = Union<{
    title: string;
    children: React.ReactNode;
} & ({
    type: 'always-static';
} | ({
    type: 'desktop-static';
} & Controls))>;
export declare const TitledIsle: ({ className, title, children, expanded, onChange, type, defaultCollapsed, }: TitledIsleProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map