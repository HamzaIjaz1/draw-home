import { WithClassName } from '@draw-house/common/dist/utils';
import { TabButton, TabButtonProps } from '../TabButton';
import { TemplateButton, TemplateButtonProps } from '../TemplateButton';
import { Buttons, Container, Tabs, Title } from './styles';

type Item = {
  title: string;
  image: TemplateButtonProps['image'];
  onClick: () => void;
};

type Tab = {
  title: string;
  state: TabButtonProps['state'];
  onClick: () => void;
  items: Item[];
};

export type TemplateScreenProps = {
  title: string;
  tabs: Tab[];
};

export const TemplateScreen = ({
  className,
  title,
  tabs,
}: TemplateScreenProps & WithClassName) => {
  const activeTab = tabs.find(tab => tab.state === 'active');
  const items = activeTab?.items ?? [];

  return (
    <Container className={className}>
      <Title>{title}</Title>

      <Tabs>
        {tabs.map(({ title, state, onClick }) => (
          <TabButton
            key={title}
            text={title}
            state={state}
            onClick={onClick}
          />
        ))}
      </Tabs>

      <Buttons>
        {items.map(({ title, image, onClick }) => (
          <TemplateButton
            key={`${title}${image}`}
            text={title}
            image={image}
            onClick={onClick}
          />
        ))}
      </Buttons>
    </Container>
  );
};
