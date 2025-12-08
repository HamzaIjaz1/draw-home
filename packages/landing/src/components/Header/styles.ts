import { css, styled } from 'styled-components';
import { Button } from '../Button';
import { breakpointMd, MAX_PAGE_WIDTH, pagePaddingCss } from '../../commonStyles';
import { MenuButton } from '../MenuButton';

export const headerContainerCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (min-width: 700px) {
    // grow from 700px to 1000px
    height: clamp(70px, 6px + 8vw, 86px);
  }
`;

export const Wrapper = styled.header`
  contain: layout paint;

  ${headerContainerCss}

  ${pagePaddingCss}
  max-width: ${MAX_PAGE_WIDTH}px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
`;

export const NavigationWrapper = styled.ul`
  display: none;

  @media (min-width: ${breakpointMd}) {
    display: flex;
    align-items: center;
    gap: clamp(10px, 3.2258vw - 19.032px, 30px);
  }

  @media (min-width: 1100px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const DesktopUserButtonsWrapper = styled.div`
  display: none;

  @media (min-width: ${breakpointMd}) {
    display: flex;
    align-items: center;
    gap: clamp(5px, 11vw - 94px, 16px);
  }
`;

const commonButtonStyles = css`
  width: 120px;
  height: 48px;
`;

export const LogInButton = styled(Button)`
  ${commonButtonStyles}
`;

export const RegisterButton = styled(Button)`
  ${commonButtonStyles}
`;

export const MobileMenuButton = styled(MenuButton)`
  @media (min-width: ${breakpointMd}) {
    display: none;
  }
`;
