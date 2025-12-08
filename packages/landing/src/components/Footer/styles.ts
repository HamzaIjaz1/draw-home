import styled from 'styled-components';
import { Europa, SofiaPro } from '../../fonts';
import { breakpointMd, MAX_PAGE_WIDTH, pagePaddingCss } from '../../commonStyles';

export const Container = styled.footer`
  --footer-common-gap: 50px;
  --footer-vertical-padding: 50px;

  display: flex;
  flex-direction: column;
  gap: var(--footer-common-gap);

  ${pagePaddingCss}
  margin-left: auto;
  margin-right: auto;
  background-color: #171a21;

  padding-top: var(--footer-vertical-padding);
  padding-bottom: var(--footer-vertical-padding);

  @media (min-width: ${breakpointMd}) {
    gap: 40px;
    --footer-vertical-padding: 70px;
  }
  @media (min-width: ${MAX_PAGE_WIDTH + 100}px) {
    max-width: ${MAX_PAGE_WIDTH}px;
  }
`;

export const FirstRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--footer-common-gap);
  @media (min-width: ${breakpointMd}) {
    flex-direction: row;
    gap: clamp(100px, 30vw - 170px, 250px);
  }
`;

export const SecondRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--footer-common-gap);
  @media (min-width: ${breakpointMd}) {
    gap: 30px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const NavigationContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NavigationTitle = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 24px;
  line-height: 1em;
  vertical-align: middle;
  color: #fff;

  margin-bottom: 10px;
  display: none;
  @media (min-width: ${breakpointMd}) {
    display: inline;
  }
`;

export const NavigationLinkText = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 17px;
  line-height: 1em;
  vertical-align: middle;
  color: #fff;
`;

export const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const SocialTitle = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 24px;
  line-height: 1em;
  vertical-align: middle;
  color: #fff;

  display: none;
  @media (min-width: ${breakpointMd}) {
    display: inline;
  }
`;

export const DividerLine = styled.div`
  width: 100%;
  border-top: 1.5px solid #7a7e83;
`;

export const TermsText = styled.span`
  font-family: ${Europa};
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  vertical-align: middle;
  color: #7a7e83;
  @media (min-width: ${breakpointMd}) {
    font-size: 18px;
  }
`;
