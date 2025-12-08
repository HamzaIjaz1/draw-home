import styled from 'styled-components';
import Image from 'next/image';
import { breakpointMd, primaryColor } from '../../../commonStyles';
import { Europa, SofiaPro } from '../../../fonts';

export const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 24px;
  @media (min-width: ${breakpointMd}) {
    justify-content: space-between;
  }
`;

export const Img = styled(Image)`
  border-radius: 26px;
  width: 358px;
  height: 264px;
  @media (min-width: ${breakpointMd}) {
    width: 390px;
    height: 287px;
  }
  @media (min-width: 1000px) {
    width: clamp(390px, 46.1538vw - 71.5392px, 630px);
    height: clamp(287px, 33.8462vw - 51.4608px, 463px);
  }
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 358px;
  @media (min-width: ${breakpointMd}) {
    width: 390px;
  }
  @media (min-width: 1100px) {
    width: clamp(390px, 50vw - 160px, 600px);
  }
`;

export const Title = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 24px;
  line-height: 1em;
  vertical-align: middle;
  color: #222733;
  @media (min-width: ${breakpointMd}) {
    font-size: 36px;
  }
`;

export const Subtitle = styled.span`
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

export const Features = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Feature = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const IconContainer = styled.div`
  color: ${primaryColor};
`;

export const FeatureText = styled.span`
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
