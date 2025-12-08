import styled from 'styled-components';
import Image from 'next/image';
import { Europa, SofiaPro } from '../../../fonts';
import { breakpointMd, MAX_PAGE_WIDTH } from '../../../commonStyles';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  width: 100%;

  @media (min-width: ${breakpointMd}) {
    gap: 40px;
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  gap: 50px;
  width: 100%;

  @media (min-width: ${breakpointMd}) {
    flex-direction: row;
    gap: 50px 10px;
  }

  @media (min-width: 1280px) {
    justify-content: space-between;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 358px;
  @media (min-width: ${MAX_PAGE_WIDTH}px) {
    width: 413px;
  }
`;

export const Img = styled(Image)`
  width: 358px;
  height: 218px;
  border: 1px solid #0003;
  border-radius: 26px;

  @media (min-width: ${MAX_PAGE_WIDTH}px) {
    width: 413px;
    height: 258px;
  }
`;

export const Title = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 24px;
  line-height: 1em;
  vertical-align: middle;
  color: #222733;
`;

export const Badge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;

  width: fit-content;
  height: 32px;
  padding: 6px 12px;
  margin: 24px 0 10px;
  border-radius: 100px;
  background-color: ${p => p.$color};

  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 14px;
  line-height: 1em;
  vertical-align: middle;
  color: #222733;
`;

export const Description = styled.span`
  font-family: ${Europa};
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  vertical-align: middle;
  color: #7a7e83;
  margin-top: 14px;
  @media (min-width: ${breakpointMd}) {
    font-size: 18px;
  }
`;
