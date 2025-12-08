import { WithClassName } from '@draw-house/common/dist/utils';
import formatBytes from 'pretty-bytes';
import { GlbIcon, JpgIcon, PngIcon, SkmIcon } from '../Icons';
import { Container, Name, Size, TextContainer } from './styles';

const icons = {
  '.glb': GlbIcon,
  '.jpg': JpgIcon,
  '.jpeg': JpgIcon,
  '.png': PngIcon,
  '.skm': SkmIcon,
} satisfies Record<`.${string}`, React.FC>;

export type SelectedUploadItemProps = {
  name: string;
  sizeBytes: number;
  extension: keyof typeof icons;
};

export const SelectedUploadItem = ({
  className,
  name,
  sizeBytes,
  extension,
}: SelectedUploadItemProps & WithClassName) => {
  const Icon = icons[extension];

  return (
    <Container className={className}>
      <Icon />
      <TextContainer>
        <Name>{name}</Name>
        <Size>{formatBytes(sizeBytes)}</Size>
      </TextContainer>
    </Container>
  );
};
