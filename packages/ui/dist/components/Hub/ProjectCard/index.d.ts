import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
import { MenuProps } from './Menu';
type ExitModeParam = Union<({
    action: 'discard';
} | {
    action: 'save';
    value: string;
})>;
export type ProjectCardProps = {
    image: string;
    name: string;
    href: string;
    options: MenuProps['items'];
    nameEditMode: boolean;
    onNameEditModeExit: (params: ExitModeParam) => void;
};
export declare const ProjectCard: ({ className, image, name, href, options, nameEditMode, onNameEditModeExit, }: ProjectCardProps & WithClassName) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map