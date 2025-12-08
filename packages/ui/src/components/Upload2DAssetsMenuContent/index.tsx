import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { menuRowHorizontalPadding } from '../../utils/styles';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
`;

const Description = styled('p')(({ theme }) => css`
  all: unset;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0px;
  color: ${theme.palette.text.disabled};
  ${menuRowHorizontalPadding()}
`);

const Title = styled('span')(({ theme }) => css`
  margin: 15px 0 10px;
  font-weight: 500;
  font-size: 17px;
  line-height: 1;
  letter-spacing: 0px;
  color: ${theme.palette.text.primary};
  ${menuRowHorizontalPadding()}
`);

export type Upload2DAssetsMenuContentProps = {
  description: string;
  title: string;
  children: React.ReactElement;
};

export const Upload2DAssetsMenuContent = ({
  className,
  description,
  title,
  children,
}: Upload2DAssetsMenuContentProps & WithClassName) => (
  <Container className={className}>
    <Description>{description}</Description>
    <Title>{title}</Title>
    {children}
  </Container>
);
