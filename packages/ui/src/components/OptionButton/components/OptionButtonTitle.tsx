import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

const Title = styled('span')`
  font-family: Inter;
  font-weight: 400;
  font-size: 8px;
  line-height: 1;
  letter-spacing: 0px;
  text-align: center;
  color: #727272;
`;

export type OptionButtonTitleProps = {
  children: React.ReactNode;
};

export const OptionButtonTitle = ({ className, children }: OptionButtonTitleProps & WithClassName) => (
  <Title className={className}>{children}</Title>
);
