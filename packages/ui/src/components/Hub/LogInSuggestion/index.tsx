import { WithClassName } from '@draw-house/common/dist/utils';
import { FormButton } from '../Form/Button';
import {
  Container,
  SuggestionText,
} from './styles';

export type LogInSuggestionProps = {
  text: string;
  buttonText: string;
  onClick: () => void;
};

export const LogInSuggestion = ({
  text,
  buttonText,
  onClick,
}: LogInSuggestionProps & WithClassName) => (
  <Container>
    <SuggestionText>{text}</SuggestionText>
    <FormButton
      variant='contained'
      size='medium'
      text={buttonText}
      onClick={onClick}
    />
  </Container>
);
