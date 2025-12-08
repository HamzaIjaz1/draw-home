import { WithClassName } from '@draw-house/common/dist/utils';
import { isNull } from '@arthurka/ts-utils';
import { Box } from '../Box';
import {
  Card,
  Description,
  FeatureItemText,
  FeatureList,
  FeatureListItem,
  FeaturesTitle,
  ListItemIcon,
  PriceBold,
  PriceContainer,
  PriceGray,
  PricePrevious,
  Title,
} from './styles';

export type PaymentPlanCardProps = {
  title: string;
  description: string;
  priceBold: string;
  pricePrevious: null | string;
  priceGray: string[];
  discountBadge: null | string;
  actionElement: React.JSX.Element;
  featuresTitle: string;
  features: readonly string[];
  highlight?: boolean;
};

export const PaymentPlanCard = ({
  className,
  title,
  description,
  priceBold,
  pricePrevious,
  priceGray,
  discountBadge,
  actionElement,
  featuresTitle,
  features,
  highlight = false,
}: PaymentPlanCardProps & WithClassName) => (
  <Card
    className={className}
    $highlight={highlight}
    $badge={discountBadge}
  >
    <Box column gap={6}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Box>
    <PriceContainer>
      <PriceBold>{priceBold}</PriceBold>
      {!isNull(pricePrevious) && (
        <PricePrevious>{pricePrevious}</PricePrevious>
      )}
      {priceGray.map(text => (
        <PriceGray key={text}>{text}</PriceGray>
      ))}
    </PriceContainer>
    {actionElement}
    <FeaturesTitle>{featuresTitle}</FeaturesTitle>
    <FeatureList>
      {features.map(text => (
        <FeatureListItem key={text}>
          <ListItemIcon />
          <FeatureItemText>{text}</FeatureItemText>
        </FeatureListItem>
      ))}
    </FeatureList>
  </Card>
);
