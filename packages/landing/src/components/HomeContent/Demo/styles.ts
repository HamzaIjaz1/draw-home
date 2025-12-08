import styled from 'styled-components';
import Image from 'next/image';
import { breakpointMd } from '../../../commonStyles';
import { Europa, SofiaPro } from '../../../fonts';
import { IconBadge } from '../../IconBadge';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  width: 358px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 26px;

  @media (min-width: 770px) {
    width: 100%;
    flex-direction: row-reverse;
    justify-content: space-around;
  }

  @media (min-width: 1450px) {
    flex-direction: row-reverse;
    justify-content: flex-end;
    gap: 122px;
    padding: 80px;
    border-radius: 40px;
  }
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 0 0 auto;
  width: 318px;
  @media (min-width: 1300px) {
    width: 428px;
  }
`;

export const Title = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 26px;
  line-height: 1em;
  text-align: center;
  vertical-align: middle;
  color: #222733;
  @media (min-width: ${breakpointMd}) {
    font-size: 36px;
    text-align: start;
  }
`;

export const Subtitle = styled.span`
  margin-top: 14px;
  font-family: ${Europa};
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  text-align: center;
  vertical-align: middle;
  color: #7a7e83;

  @media (min-width: ${breakpointMd}) {
    text-align: start;
    font-size: 18px;
  }
`;

export const Items = styled.ul`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  @media (min-width: ${breakpointMd}) {
    gap: 20px;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const IconContainer = styled(IconBadge)`
  color: #222733;
`;

export const ItemText = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 17px;
  line-height: 1em;
  vertical-align: middle;
  color: #222733;
  @media (min-width: ${breakpointMd}) {
    font-size: 20px;
  }
`;

export const Img = styled(Image)`
  width: 318px;
  height: 226px;

  @media (min-width: 1100px) {
    width: 388px;
    height: 276px;
  }
  @media (min-width: 1450px) {
    width: 580px;
    height: 403px;
  }
`;
