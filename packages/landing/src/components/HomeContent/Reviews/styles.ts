import styled from 'styled-components';
import Image from 'next/image';
import { breakpointMd } from '../../../commonStyles';
import { Europa, SofiaPro } from '../../../fonts';

export const Container = styled.section<{ $scrollbarWidth: string }>`
  width: calc(100vw - ${p => p.$scrollbarWidth});
  position: relative;
  /* pulls the element to the left edge of the viewport */
  margin-left: calc(50% - 50vw);

  @media (min-width: 2000px) {
    width: 100%;
    margin-left: 0;
    position: static;
  }
`;

export const Carousel = styled.div`
  contain: layout paint;

  display: flex;
  align-items: flex-start;
  gap: 10px;
  height: 100%;

  overflow-x: auto;
  scrollbar-width: thin;

  @media (min-width: ${breakpointMd}) {
    gap: 20px;
  }
`;

export const Card = styled.div`
  contain: paint;
  transition: opacity 0.3s ease;

  width: 312px;
  padding: 20px;
  flex: 0 0 auto;

  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (min-width: ${breakpointMd}) {
    width: 538px;
    padding: 40px;
  }
`;

export const Bio = styled.div`
  display: flex;
  gap: 14px;
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Name = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 20px;
  line-height: 1em;
  vertical-align: middle;
  color: #222733;
  @media (min-width: ${breakpointMd}) {
    font-size: 24px;
  }
`;

export const Job = styled.span`
  font-family: ${Europa};
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5em;
  vertical-align: middle;
  color: #7a7e83;
  @media (min-width: ${breakpointMd}) {
    font-size: 22px;
  }
`;

export const Comment = styled.span`
  font-family: ${Europa};
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5em;
  vertical-align: middle;
  color: #222733;
  @media (min-width: ${breakpointMd}) {
    font-size: 22px;
  }
`;

export const Avatar = styled(Image)`
  width: 56px;
  height: 56px;
  border-radius: 30px;
  @media (min-width: ${breakpointMd}) {
    width: 64px;
    height: 64px;
    border-radius: 34.5px;
  }
`;
