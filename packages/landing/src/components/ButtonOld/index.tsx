import Image from 'next/image';
import { SafeOmit, WithClassName } from '@draw-house/common/dist/utils';
import { BlackButton, CardWithIconButton, Counter, DefaultButton, IconButton, IconWithCounter, OutlinedButton, PrimaryButton } from './styles';

type IconButton = {
  variant: 'icon';
  icon: string | JSX.Element;
  width: number;
  height: number;
};
type IconWithCounterButton = SafeOmit<IconButton, 'variant'> & {
  variant: 'iconWithCounter';
  counter: number;
};
type WithIconButton = {
  variant: 'withIcon';
  children?: React.ReactNode;
};
type OutlinedButton = {
  variant: 'outlined';
  children?: React.ReactNode;
};
type PrimaryButton = {
  variant?: 'primary';
  children?: React.ReactNode;
};
type BlackButton = {
  variant?: 'blackButton';
  children?: React.ReactNode;
};

type CommonButtonProps = {
  onClick?: () => void;
  tabIndex?: -1 | 0 | 1;
  type?: 'button' | 'submit' | 'reset';
};
type ButtonProps = CommonButtonProps & (
  | IconButton
  | IconWithCounterButton
  | WithIconButton
  | OutlinedButton
  | PrimaryButton
  | BlackButton
);

const Icon: React.FC<SafeOmit<IconButton, 'variant'> & CommonButtonProps & WithClassName> = props => (
  <IconButton className={props.className} tabIndex={props.tabIndex} onClick={props.onClick}>
    {
      typeof props.icon === 'string' ? (
        <Image src={props.icon} alt='' width={props.width} height={props.height} />
      ) : (
        props.icon
      )
    }
  </IconButton>
);

/** @deprecated only used in old sign-in page */
export const Button: React.FC<ButtonProps & WithClassName> = props => {
  const {
    variant,
    onClick,
    tabIndex,
    type,
  } = props;

  switch(variant) {
    case 'icon':
      return (
        <Icon {...props} type={type} />
      );
    case 'iconWithCounter':
      return (
        <IconWithCounter className={props.className} onClick={onClick}>
          <Icon {...props} />
          <Counter>
            {
              props.counter > 5 ? '5+' : props.counter
            }
          </Counter>
        </IconWithCounter>
      );
    case 'primary':
      return (
        <PrimaryButton className={props.className} onClick={onClick} tabIndex={tabIndex} type={type}>
          {
            props.children
          }
        </PrimaryButton>
      );
    case 'outlined':
      return (
        <OutlinedButton className={props.className} onClick={onClick} tabIndex={tabIndex} type={type}>
          {
            props.children
          }
        </OutlinedButton>
      );
    case 'blackButton':
      return (
        <BlackButton className={props.className} onClick={onClick} tabIndex={tabIndex} type={type}>
          {
            props.children
          }
        </BlackButton>
      );
    case 'withIcon':
      return (
        <CardWithIconButton className={props.className} onClick={onClick} tabIndex={tabIndex} type={type}>
          {
            props.children
          }
        </CardWithIconButton>
      );
    default:
      return (
        <DefaultButton className={props.className} onClick={onClick} tabIndex={tabIndex} type={type}>
          {
            props.children
          }
        </DefaultButton>
      );
  }
};
