import { WithClassName } from '@draw-house/common/dist/utils';
type PaletteColorButtonProps = {
    background: string;
    active: boolean;
    highlightVariant?: 'outline' | 'none';
};
export declare const PaletteColorButton: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & PaletteColorButtonProps, import("react").DetailedHTMLProps<import("react").ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, {}>;
export type PaletteProps = {
    value: string | null;
    noneOptionImage: string;
    onChange: (hex: string) => void;
    noneOptionClick: () => void;
};
export declare const Palette: React.FC<PaletteProps & WithClassName>;
export {};
//# sourceMappingURL=index.d.ts.map