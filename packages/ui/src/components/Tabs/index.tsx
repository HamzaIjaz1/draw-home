import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import MuiTabs, { tabsClasses } from '@mui/material/Tabs';
import MuiTab, { TabProps as MuiTabProps, tabClasses } from '@mui/material/Tab';
import { Fragment } from 'react';
import { backgroundSecondary } from '../../theme';
import { $Props, $props } from '../../utils/$props';
import { menuHorizontalGutterWidth } from '../../utils/styles';

type StyledProps = {
  $stretch: boolean;
};

const tabHeight = '32px';

const TabGroup = styled(MuiTabs, $props())<$Props<StyledProps>>(({ theme, $stretch }) => css`
  background-color: ${backgroundSecondary};
  border-radius: 10px;
  min-height: ${tabHeight};
  height: ${tabHeight};
  margin-left: ${menuHorizontalGutterWidth}px;
  margin-right: ${menuHorizontalGutterWidth}px;
  overflow: visible;

  ${$stretch === true && css`
    flex: 1;

    .${tabClasses.root} {
      flex: 1;
    }
  `}
  ${$stretch === false && css`
    width: fit-content;
  `}

  .${tabsClasses.flexContainer} {
    position: relative;
    padding: 0 3px;
    z-index: 1;
  }

  .${tabsClasses.indicator} {
    top: 3px;
    bottom: 3px;
    right: 3px;
    height: auto;
    border-radius: 6px;
    background-color: ${theme.palette.background.paper};
  }

  .${tabsClasses.scroller} {
    overflow: visible !important;
  }
`);

const TabStyled = styled(MuiTab)(({ theme }) => css`
  min-height: ${tabHeight};
  height: ${tabHeight};
  min-width: 56px;
  max-width: unset;
  padding: 4px 6px;

  ${theme.breakpoints.up('md')} {
    min-width: 68px;
  }

  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  opacity: 0.6;
  color: ${theme.palette.text.primary};
  text-transform: initial;

  :hover, :focus {
    opacity: 1;
  }

  &.${tabClasses.selected} {
    color: ${theme.palette.text.primary};
    opacity: 1;
  }
`);

export type TabProps = {
  label: MuiTabProps['label'];
  Wrapper?: React.FCWithChildren;
};

export const Tab = ({
  className,
  label,
  Wrapper = Fragment,
  // MUI Tabs component passes props to its children
  ...rest
}: TabProps & WithClassName) => (
  <Wrapper>
    <TabStyled
      {...rest}
      className={className}
      label={label}
      disableTouchRipple
      tabIndex={0}
    />
  </Wrapper>
);

export type TabsProps = {
  children: React.ReactNode;
  onClick: (index: TabsProps['chosenTab']) => void;
  chosenTab: number;
  stretch?: boolean;
};

export const Tabs = ({
  className,
  children,
  chosenTab,
  onClick,
  stretch = false,
}: TabsProps & WithClassName) => (
  <TabGroup
    className={className}
    $stretch={stretch}
    value={chosenTab}
    onChange={(_, index) => onClick(index)}
  >
    {children}
  </TabGroup>
);
