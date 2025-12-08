import { WithClassName } from '@draw-house/common/dist/utils';
import { TabProps as MuiTabProps } from '@mui/material/Tab';
export type TabProps = {
    label: MuiTabProps['label'];
    Wrapper?: React.FCWithChildren;
};
export declare const Tab: ({ className, label, Wrapper, ...rest }: TabProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export type TabsProps = {
    children: React.ReactNode;
    onClick: (index: TabsProps['chosenTab']) => void;
    chosenTab: number;
    stretch?: boolean;
};
export declare const Tabs: ({ className, children, chosenTab, onClick, stretch, }: TabsProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map