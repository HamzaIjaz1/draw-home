import { WithClassName } from '@draw-house/common/dist/utils';
import { TabButtonProps } from '../TabButton';
import { TemplateButtonProps } from '../TemplateButton';
type Item = {
    title: string;
    image: TemplateButtonProps['image'];
    onClick: () => void;
};
type Tab = {
    title: string;
    state: TabButtonProps['state'];
    onClick: () => void;
    items: Item[];
};
export type TemplateScreenProps = {
    title: string;
    tabs: Tab[];
};
export declare const TemplateScreen: ({ className, title, tabs, }: TemplateScreenProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map