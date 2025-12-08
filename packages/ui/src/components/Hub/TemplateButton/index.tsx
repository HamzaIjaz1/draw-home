import { WithClassName } from '@draw-house/common/dist/utils';
import { isArrayIncludes, isNull, ObjKeys } from '@arthurka/ts-utils';
import { Button, Image, Text } from './styles';
import {
  BlankTemplateIcon,
  LShapeTemplateIcon,
  RectangularTemplateIcon,
  TShapeTemplateIcon,
} from '../../Icons';

const icons = {
  blank: BlankTemplateIcon,
  rectangular: RectangularTemplateIcon,
  TShape: TShapeTemplateIcon,
  LShape: LShapeTemplateIcon,
};

export type TemplateButtonProps = {
  onClick: () => void;
  text: string;
  image: keyof typeof icons | string & {};
};

export const TemplateButton = ({
  className,
  image,
  onClick,
  text,
}: TemplateButtonProps & WithClassName) => {
  const Icon = !isArrayIncludes(ObjKeys(icons), image) ? null : icons[image];

  return (
    <Button
      className={className}
      variant='text'
      onClick={onClick}
    >
      {
        !isNull(Icon) ? <Icon /> : (
          <Image
            src={image}
            width={72}
            height={66.73}
            draggable='false'
          />
        )
      }
      <Text accent={image === 'blank'}>{text}</Text>
    </Button>
  );
};
