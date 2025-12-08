import { isUndefined, Union } from '@arthurka/ts-utils';
import { Controls, MenuSection } from '../MenuSection';

type Item = Union<
  & {
    title: string;
    icon: string;
  }
  & (
    | {
      onClick: () => void;
      showArrowIcon?: boolean;
    }
    | (
      & Controls
      & {
        children: React.ReactElement;
      }
    )
  )
>;

export type CatalogMenuContentProps = {
  items: Item[];
};

export const CatalogMenuContent = ({ items }: CatalogMenuContentProps) => (
  items.map(({
    title,
    children,
    defaultExpanded,
    expanded,
    onChange,
    icon,
    onClick,
    showArrowIcon = false,
  }) => (
    <MenuSection
      key={`${title}${icon}`}
      title={title}
      image={icon}
      titleVariant='pale'
      divider='content'
      {
        ...isUndefined(onClick)
          ? {
            type: 'collapsible',
            children,
            ...(
              !isUndefined(expanded) && !isUndefined(onChange)
                ? { expanded, onChange }
                : { defaultExpanded }
            ),
          }
          : {
            type: 'buttonlike',
            onClick,
            showArrowIcon: showArrowIcon ?? false,
          }
      }
    />
  ))
);
