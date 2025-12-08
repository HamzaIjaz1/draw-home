import { WithClassName } from '@draw-house/common/dist/utils';
import { type StyledSnackbarProps } from './styles';
export type SnackbarProps = {
    text: string;
    open: boolean;
    handleClose: () => void;
    type: StyledSnackbarProps['type'];
};
export declare const Snackbar: ({ className, text, open, handleClose, type, }: SnackbarProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map