import { WithClassName } from '@draw-house/common/dist/utils';
declare const icons: {
    '.glb': ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    '.jpg': ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    '.jpeg': ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    '.png': ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
    '.skm': ({ className, color }: WithClassName & import("../Icons").IconProps) => import("react/jsx-runtime").JSX.Element;
};
export type SelectedUploadItemProps = {
    name: string;
    sizeBytes: number;
    extension: keyof typeof icons;
};
export declare const SelectedUploadItem: ({ className, name, sizeBytes, extension, }: SelectedUploadItemProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map