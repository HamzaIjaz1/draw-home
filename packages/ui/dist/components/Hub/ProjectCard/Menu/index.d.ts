import { WithClassName } from '@draw-house/common/dist/utils';
declare const icons: {
    pencil: import("@emotion/styled").StyledComponent<WithClassName & import("../../../Icons").IconProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
    bin: import("@emotion/styled").StyledComponent<WithClassName & import("../../../Icons").IconProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
};
export type MenuProps = {
    onClose: () => void;
    items: Array<{
        title: string;
        onClick: () => void;
        icon: keyof typeof icons;
    }>;
};
export declare const Menu: ({ className, items, onClose, }: MenuProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map