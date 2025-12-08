import styled from 'styled-components';
import Image from 'next/image';
import { breakpointMd, primaryColor } from '../../../commonStyles';
import { Europa, SofiaPro } from '../../../fonts';

export const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 20px 40px;

  @media (min-width: ${breakpointMd}) {
    gap: 20px;
  }
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;

  background-color: #fff;
  border-radius: 26px;

  @media (min-width: ${breakpointMd}) {
    padding: 30px;
    border-radius: 40px;
  }
`;

export const CommunityCard = styled(Card)`
  order: -1;
  max-width: 413px;

  @media (min-width: 1024px) {
    max-width: clamp(296px, 54.4512px + 23.5887vw, 413px);
  }
`;

export const BlogCard = styled(Card)`
  order: 1;
  max-width: 847px;
  gap: 40px;

  & ${TextBlock} {
    max-width: 366px;
  }

  @media (min-width: 830px) {
    gap: 14px;
  }

  @media (min-width: 1024px) {
    padding-right: 0px;
    max-width: clamp(612px, 126.8384px + 47.379vw, 847px);

    & ${TextBlock} {
      max-width: clamp(269px, 19.1936px + 24.3952vw, 390px);
    }
  }
`;

export const SupportCard = styled(Card)`
  order: 2;
  max-width: 522px;
  @media (min-width: 1024px) {
    order: 4;
    max-width: clamp(23.4375rem, 4.4698rem + 29.6371vw, 32.625rem);
  }
`;

export const TutorialsCard = styled(Card)`
  order: 3;
  max-width: 738px;
  gap: 40px;

  & ${TextBlock} {
    max-width: 366px;
  }

  @media (min-width: 830px) {
    gap: 14px;

    & ${TextBlock} {
      max-width: 350px;
    }
  }

  @media (min-width: ${breakpointMd}) {
    padding-right: 20px;
  }

  @media (min-width: 1024px) {
    max-width: clamp(33.3125rem, 6.8609rem + 41.3306vw, 46.125rem);
    & ${TextBlock} {
      max-width: clamp(14.3125rem, -1.3004rem + 24.3952vw, 21.875rem);
    }
  }
`;

export const IconContainer = styled.div`
  color: ${primaryColor};
  height: 64px;
`;

export const Title = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 20px;
  line-height: 1em;
  vertical-align: middle;
  color: #222733;
  margin-top: 26px;
  @media (min-width: ${breakpointMd}) {
    font-size: 24px;
    margin-top: 36px;
  }
`;

export const Description = styled.span`
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

export const LinkLabel = styled.span`
  font-family: ${SofiaPro};
  font-weight: 600;
  font-size: 15px;
  line-height: 1em;
  vertical-align: middle;
  text-decoration: underline solid 1px;
  text-underline-position: under;
  color: ${primaryColor};
  @media (min-width: ${breakpointMd}) {
    font-size: 17px;
  }
`;

export const BlogImage = styled(Image)`
  width: 318px;
  height: auto;
  @media (min-width: 1024px) {
    width: clamp(299px, 69.8384px + 22.379vw, 410px);
  }
`;

export const TutorialsImage = styled(Image)`
  width: 318px;
  height: auto;
  @media (min-width: ${breakpointMd}) {
    width: 314px;
  }
  @media (min-width: 1024px) {
    width: clamp(229px, 53.5168px + 17.1371vw, 314px);
  }
`;
