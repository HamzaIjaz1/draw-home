import { css, styled } from '@mui/material';
import { isUndefined, Union } from '@arthurka/ts-utils';
import { MenuSection, MenuSectionProps } from '../MenuSection';
import { createStyledOptions } from '../../utils/createStyledOptions';

type Opts = {
  isRoot: boolean;
};

const opts = createStyledOptions<Opts>({
  isRoot: true,
});

const StyledMenuSection = styled(MenuSection, opts)<Opts>`
  ${p => p.isRoot === false && css`
    padding-left: 12px;
  `}
`;

type Item = Union<
  & {
    title: string;
  }
  & (
    | {
      active: boolean;
      onClick: () => void;
    }
    | {
      items: Item[];
    }
  )
>;

export type VisibilityMenuContentProps = {
  items: Item[];
};

const getActive = (items: VisibilityMenuContentProps['items']): boolean => {
  const actives = items.map(({ active, items = [] }) => !isUndefined(active) ? active : getActive(items));

  return actives.some(e => e === true);
};
const getOnClick = (_items: VisibilityMenuContentProps['items'], targetActive: boolean) => (
  () => {
    for(const { active, onClick, items = [] } of _items) {
      if(active === targetActive) {
        continue;
      }

      if(!isUndefined(onClick)) {
        onClick();
      } else {
        getOnClick(items, targetActive)();
      }
    }
  }
);

type VisibilityMenuContentInnerProps = {
  items: VisibilityMenuContentProps['items'];
  isRoot?: boolean;
};

const VisibilityMenuContentInner: React.FC<VisibilityMenuContentInnerProps> = ({ items, isRoot = false }) => (
  items.map(({ title, active: _active, onClick: _onClick, items = [] }) => {
    const active = !isUndefined(_active) ? _active : getActive(items);
    const onClick = !isUndefined(_onClick) ? _onClick : getOnClick(items, active === false);

    return (
      <StyledMenuSection
        key={title}
        isRoot={isRoot}
        title={title}
        icon='eye'
        titleVariant={
          active === false
            ? 'pale'
            : isRoot === true
              ? 'primary-600'
              : 'primary-400'
        }
        iconButton={{
          onClick,
          state: active === true ? 'active' : 'default',
        }}
        {
          ...(
            isRoot === false || items.length === 0
              ? {
                type: 'static',
              }
              : {
                type: 'collapsible',
                defaultExpanded: true,
              }
          ) satisfies Partial<MenuSectionProps>
        }
      >
        <VisibilityMenuContentInner items={items} />
      </StyledMenuSection>
    );
  })
);

export const VisibilityMenuContent: React.FC<VisibilityMenuContentProps> = ({ items }) => (
  <VisibilityMenuContentInner isRoot items={items} />
);
