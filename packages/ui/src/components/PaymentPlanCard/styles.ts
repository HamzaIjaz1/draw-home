import { css, styled } from '@mui/material';
import { isNull } from '@arthurka/ts-utils';
import { $Props, $props } from '../../utils/$props';
import { CheckMarkIcon } from '../Icons';

export const Card = styled('div', $props())<$Props<{
  $highlight: boolean;
  $badge: null | string;
}>>(({ theme, $highlight, $badge }) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 20px;
  width: 300px;
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px #0000001a;
  background: ${theme.palette.background.paper};

  ${$highlight === true && css`
    background: #31bcfd0d;
    outline: 1px solid #31bcfd;
  `}

  ${!isNull($badge) && css`
    ::after {
      content: "${$badge}";
      position: absolute;
      top: -12px;
      right: 10px;
      background: #31bcfd;
      border-radius: 100px;
      padding: 6px 10px;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      letter-spacing: 0px;
      color: #fff;
    }
  `}

  scroll-snap-align: center;

  @media (min-width: 1200px) {
    width: clamp(300px, 233.3328px + 5.5556vw, 340px);
  }
`);

export const Title = styled('span')(({ theme }) => css`
  font-weight: 500;
  font-size: 19px;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.primary};
`);

export const Description = styled('span')(({ theme }) => css`
  font-weight: 400;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);

export const PriceContainer = styled('span')`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

export const PriceBold = styled('span')`
  font-family: DM Sans;
  font-weight: 600;
  font-size: 30px;
  line-height: 1;
  letter-spacing: 0px;
  color: #000;
`;

export const PricePrevious = styled('span')(({ theme }) => css`
  font-family: DM Sans;
  font-weight: 400;
  font-size: 30px;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.disabled};
  text-decoration: line-through;
`);

export const PriceGray = styled('span')(({ theme }) => css`
  font-family: DM Sans;
  font-weight: 400;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);

export const FeaturesTitle = styled('span')`
  font-family: DM Sans;
  font-weight: 500;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  vertical-align: middle;
  color: #222733;
`;

export const FeatureList = styled('ul')`
  all: unset;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FeatureListItem = styled('li')`
  display: inline-flex;
  gap: 10px;
  align-items: center;
`;

export const ListItemIcon = styled(CheckMarkIcon)`
  min-width: 24px;
`;

export const FeatureItemText = styled('span')(({ theme }) => css`
  font-family: DM Sans;
  font-weight: 500;
  font-size: 17px;
  line-height: 1.5;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);
