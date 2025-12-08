import styled from 'styled-components';
import { breakpointMd, MAX_PAGE_WIDTH, primaryColor } from '../../../commonStyles';
import { Europa, SofiaPro } from '../../../fonts';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
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
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
  @media (min-width: ${breakpointMd}) {
    gap: 80px 10px;
    justify-content: space-evenly;
  }
  @media (min-width: ${MAX_PAGE_WIDTH}px) {
    justify-content: space-between;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 358px;
`;

export const IconContainer = styled.div`
  color: ${primaryColor};
`;

export const CardTitle = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 20px;
  line-height: 1em;
  text-align: center;
  vertical-align: middle;
  color: #222733;
  margin-top: 24px;
  @media (min-width: ${breakpointMd}) {
    font-size: 24px;
  }
`;

export const CardDescription = styled.span`
  font-family: ${Europa};
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  text-align: center;
  vertical-align: middle;
  color: #7a7e83;
  margin-top: 14px;
  @media (min-width: ${breakpointMd}) {
    font-size: 18px;
  }
`;
