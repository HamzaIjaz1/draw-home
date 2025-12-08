import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
import { headerSpacing } from '../base/styles';
export type SlideUpMenuProps = Union<{
    title: string;
    opened: boolean;
    onClose: () => void;
    onBack?: () => void;
    children: React.ReactNode;
    noDivider?: boolean;
    noHeightLimit?: boolean;
} & ({} | {
    header: React.ReactNode;
    headerSpacing?: Partial<Record<'top' | 'bottom', keyof typeof headerSpacing>>;
})>;
export declare const SlideUpMenu: ({ className, title, opened, onClose, onBack, children, header, noDivider, headerSpacing, noHeightLimit, }: SlideUpMenuProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map