import { Contacts } from '../../Contacts';
import { Form } from './Form';
import { Comment, ContactBlock, Container, Title } from './styles';

export const ContactForm: React.FC = () => (
  <Container>
    <ContactBlock>
      <Title>Let’s Shape Your Space Together</Title>
      <Comment>Feel free to contact us any time. We will get back to you as soon as we can!</Comment>
      <Contacts />
    </ContactBlock>

    <Form />
  </Container>
);
