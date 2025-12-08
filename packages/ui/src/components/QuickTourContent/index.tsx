import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import { isNull } from '@arthurka/ts-utils';
import { IconButton } from '../IconButton';

const contentWidth = 330;
const padding = 10;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  width: ${contentWidth + 2 * padding}px;
  max-width: 100%;
`;

const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: ${padding}px;
  max-height: 24px;
`;

const Content = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 4px ${padding}px ${padding}px;
`;

const TextContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Badge = styled('span')(({ theme }) => css`
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
`);

const Title = styled('h3')`
  font-weight: 500;
  font-size: 19px;
  line-height: 100%;
  letter-spacing: 0px;
  overflow-wrap: break-word;
  margin: 0;
`;

const Description = styled('p')(({ theme }) => css`
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  letter-spacing: 0px;
  color: ${theme.palette.text.secondary};
  overflow-wrap: break-word;
  margin: 0;
`);

export type QuickTourContentProps = {
  title: string;
  description: string;
  media: null | {
    type: 'image' | 'video';
    src: string;
  };
  badgeText: string;
  onClose: () => void;
};

export const QuickTourContent = ({
  className,
  badgeText,
  title,
  description,
  media,
  onClose,
}: QuickTourContentProps & WithClassName) => (
  <Container className={className}>
    <Header>
      <Badge>{badgeText}</Badge>
      <IconButton
        icon='closeNoBackground'
        size='xs'
        variant='text'
        onClick={onClose}
      />
    </Header>

    <Content>
      <TextContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextContainer>

      {!isNull(media) && media.type === 'video' && (
        <video
          src={media.src}
          width={contentWidth}
          height={160}
          autoPlay
          muted
        />
      )}

      {!isNull(media) && media.type === 'image' && (
        <img
          src={media.src}
          width={contentWidth}
          height={160}
          style={{ objectFit: 'fill' }}
        />
      )}
    </Content>
  </Container>
);
