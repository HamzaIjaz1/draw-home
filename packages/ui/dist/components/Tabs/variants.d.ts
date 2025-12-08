import { WithClassName } from '@draw-house/common/dist/utils';
import { TabsProps } from '.';
export type AnnotatedTabsProps = {
    chosenTab: TabsProps['chosenTab'];
    children: TabsProps['children'];
    onClick: TabsProps['onClick'];
    levelName: string;
    annotation?: string;
    annotationDetails?: string;
};
export declare const AnnotatedTabs: ({ className, chosenTab, children, onClick, annotation, annotationDetails, levelName, }: AnnotatedTabsProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=variants.d.ts.map