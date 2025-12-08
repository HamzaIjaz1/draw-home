import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 10px;
`;

const Text = styled('span')`
  font-size: 24px;
  text-align: center;
  font-weight: 600;
`;

export type ImportTabGuestContentProps = {
  text: string;
  children: React.ReactNode;
};

export const ImportTabGuestContent = ({
  className,
  text,
  children,
}: ImportTabGuestContentProps & WithClassName) => (
  <Container className={className}>
    <Text>{text}</Text>
    {children}
  </Container>
);
