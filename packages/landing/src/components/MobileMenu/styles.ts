import styled, { createGlobalStyle, css } from 'styled-components';
import { backgroundColor, pagePaddingCss, primaryColor } from '../../commonStyles';
import { headerContainerCss } from '../Header/styles';
import { SofiaPro } from '../../fonts';
import { Button } from '../Button';

export const GlobalStyle = createGlobalStyle<{ $open: boolean }>`
  body {
    overflow: ${p => p.$open === true ? 'hidden' : 'unset'};
  }
`;

export const Container = styled.div<{ $open: boolean }>`
  width: 100%;
  height: 100%;
  ${pagePaddingCss}

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;

  background-color: ${backgroundColor};
  transform: ${p => p.$open === true ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.25s ease;

  overflow-y: auto;
`;

export const Header = styled.div`
  ${headerContainerCss}
  flex-shrink: 0;
  background-color: ${backgroundColor};
`;

export const Navigation = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const NavigationLinkText = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 26px;
  line-height: 26px;
  text-align: center;
  vertical-align: middle;
  &:hover {
    color: ${primaryColor};
  }
`;

const commonButtonStyles = css`
  width: 168px;
  height: 52px;
`;

export const TryButton = styled(Button)`
  ${commonButtonStyles}
  gap: 14px;
`;

export const TryButtonText = styled.span`
  font-family: ${SofiaPro};
  font-weight: 600;
  font-size: 15px;
  line-height: 1em;
  vertical-align: middle;
  color: #fff;
`;

export const ButtonsBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-bottom: 70px;
`;

export const AuthButton = styled(Button)`
  ${commonButtonStyles}
`;

export const AuthButtonText = styled.span`
  font-family: ${SofiaPro};
  font-weight: 600;
  font-size: 15px;
  line-height: 15px;
`;

export const SubtitleText = styled.span`
  font-family: ${SofiaPro};
  font-weight: 600;
  font-size: 15px;
  line-height: 15px;
  text-align: center;
  vertical-align: middle;
  color: #7a7e83;
`;
