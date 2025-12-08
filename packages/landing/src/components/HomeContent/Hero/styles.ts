import styled from 'styled-components';
import { Europa, SofiaPro } from '../../../fonts';
import { breakpointMd, primaryColor } from '../../../commonStyles';
import { Button } from '../../Button';

export const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: 80px 20px;

  @media (min-width: 1024px) {
    justify-content: space-between;
  }
  @media (min-width: 1100px) {
    gap: 0;
    height: 440px;
  }
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${breakpointMd}) {
    max-width: 454px;
    align-items: start;
  }
  @media (min-width: 1400px) {
    max-width: 548px;
  }
`;

export const Subtitle = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 14px;
  line-height: 1em;
  letter-spacing: 0.08em;
  vertical-align: middle;
  text-transform: uppercase;
  color: ${primaryColor};
`;

export const Title = styled.h1`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 34px;
  line-height: 44px;
  vertical-align: middle;
  color: #222733;
  margin-top: 14px;
  margin-bottom: 30px;
  @media (min-width: ${breakpointMd}) {
    font-size: 60px;
    line-height: 1em;
    margin-bottom: 24px;
  }
`;

export const Description = styled.span`
  font-family: ${Europa};
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5em;
  text-align: center;
  vertical-align: middle;
  color: #7a7e83;
  margin-bottom: 30px;
  @media (min-width: ${breakpointMd}) {
    text-align: start;
    font-size: 22px;
    margin-bottom: 40px;
  }
`;

export const TryButtonBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 14px;
  @media (min-width: ${breakpointMd}) {
    flex-direction: row;
    gap: 20px;
  }
`;

export const TryButton = styled(Button)`
  width: 174px;
  height: 48px;
  gap: 14px;
  @media (min-width: ${breakpointMd}) {
    width: 228px;
    height: 58px;
  }
`;

export const HintText = styled.span`
  font-family: ${SofiaPro};
  font-weight: 600;
  font-size: 15px;
  line-height: 1em;
  vertical-align: middle;
  color: #7a7e83;
  @media (min-width: ${breakpointMd}) {
    font-size: 17px;
    line-height: 1em;
  }
`;

export const Img = styled.img`
  object-fit: fill;
  border-radius: 15px;

  width: 358px;
  height: auto;
  aspect-ratio: 601 / 390;

  @media (min-width: 500px) {
    width: 420px;
  }
  @media (min-width: 750px) {
    width: 650px;
    border-radius: 30px;
  }

  @media (min-width: ${breakpointMd}) {
    width: 454px;
  }

  @media (min-width: 1100px) {
    width: 430px;
  }

  @media (min-width: 1200px) {
    width: 487px;
  }

  @media (min-width: 1300px) {
    width: 570px;
  }

  @media (min-width: 1400px) {
    width: 650px;
  }
  @media (min-width: 1500px) {
    width: 694px;
  }
`;
