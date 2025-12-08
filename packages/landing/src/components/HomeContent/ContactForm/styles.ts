import styled from 'styled-components';
import { breakpointMd } from '../../../commonStyles';
import { Europa, SofiaPro } from '../../../fonts';

export const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 40px 0;

  @media (min-width: 1380px) {
    justify-content: space-between;
  }

  contain: layout paint;
`;

export const ContactBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 538px;
  height: fit-content;
  align-self: center;
`;

export const Title = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 26px;
  line-height: 1em;
  vertical-align: middle;
  color: #222733;
  @media (min-width: ${breakpointMd}) {
    font-size: 50px;
  }
`;

export const Comment = styled.span`
  font-family: ${Europa};
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  vertical-align: middle;
  color: #7a7e83;
  @media (min-width: ${breakpointMd}) {
    font-size: 22px;
  }
`;
