import { WithClassName } from '@draw-house/common/dist/utils';
import { CloseButton, Container, Content, Header, Title } from './styles';

export type ShareExportPopUpContentWrapperProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

export const ShareExportPopUpContentWrapper = ({
  className,
  title,
  children,
  onClose,
}: ShareExportPopUpContentWrapperProps & WithClassName) => (
  <Container className={className}>
    <Header>
      <Title>{title}</Title>
      <CloseButton
        icon='close'
        size='sm'
        variant='text'
        onClick={onClose}
      />
    </Header>

    <Content>
      {children}
    </Content>
  </Container>
);
