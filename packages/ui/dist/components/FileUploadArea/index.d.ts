import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
export type FileUploadAreaProps = Union<{
    primaryText: string;
    supportedFormatsText: string;
    accept: string;
} & ({
    onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
} | {
    onFileSelect: (file: File) => void;
    onFileReject?: (param: {
        file: File;
        showDefaultRejectionEffect: () => void;
    }) => void;
})>;
export declare const FileUploadArea: ({ className, primaryText, supportedFormatsText, accept, onClick, onFileSelect, onFileReject, }: FileUploadAreaProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map