import styled from 'styled-components';
import Image from 'next/image';
import { Europa, SofiaPro } from '../../../fonts';
import { breakpointMd } from '../../../commonStyles';

export const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 50px;
  @media (min-width: ${breakpointMd}) {
    gap: 60px 10px;
  }
  @media (min-width: 1500px) {
    justify-content: space-between;
  }
`;

export const TitledCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 358px;
  @media (min-width: ${breakpointMd}) {
    gap: 20px;
    width: 615px;
  }
`;

export const Card = styled.div`
  --card-border-radius: 26px;

  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: var(--card-border-radius);
  background-color: #f6f6f6;
  @media (min-width: ${breakpointMd}) {
    gap: 0;
    justify-content: space-between;
    height: 484px;
  }
`;

export const CardTitle = styled.span`
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

export const TextsBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px 0;
  gap: 24px;
  @media (min-width: ${breakpointMd}) {
    gap: 0;
    justify-content: space-between;
    padding: 30px 30px 0;
  }
`;

export const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 318px;
  @media (min-width: ${breakpointMd}) {
    gap: 10px;
    width: 275px;
  }
`;

export const Title = styled.span`
  font-family: ${SofiaPro};
  font-weight: 500;
  font-size: 20px;
  line-height: 1em;
  vertical-align: middle;
  color: #222733;
  @media (min-width: ${breakpointMd}) {
    line-height: 31px;
  }
`;

export const Subtitle = styled.span`
  font-family: ${Europa};
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5em;
  vertical-align: middle;
  color: #5b5b5b;
  @media (min-width: ${breakpointMd}) {
    font-size: 18px;
  }
`;

export const ImageBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Img = styled(Image)`
  width: 338px;
  height: auto;
  max-width: 100%;
  border-bottom-right-radius: var(--card-border-radius);
  @media (min-width: ${breakpointMd}) {
    width: 585px;
  }
`;
