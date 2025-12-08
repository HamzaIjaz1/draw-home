import { WithClassName } from '@draw-house/common/dist/utils';
export type RecentColorsProps = {
    label: string;
    recentColors: string[];
    applyHexFromPalette: (hex: string) => void;
    activeHex?: string | null;
};
export declare const Stack: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const RecentColors: React.FC<RecentColorsProps & WithClassName>;
//# sourceMappingURL=index.d.ts.map