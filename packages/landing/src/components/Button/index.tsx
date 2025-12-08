import { FC, PropsWithChildren } from 'react';
import { WithClassName } from '@draw-house/common/dist/utils';
import { Union } from '@arthurka/ts-utils';
import { BaseButton } from './styles';

export type ButtonProps = Union<
  & {
    variant: 'primary' | 'secondary-contained' | 'secondary-outlined';
    tabIndex?: -1 | 0 | 1;
  }
  & (
    | (
      & {
        asLink?: false;
      }
      & (
        | {
            onClick: () => void;
            type?: 'button' | 'reset';
        }
        | {
          type: 'submit';
        }
      )
    )
    | {
      asLink: true;
      href: string;
    }
  )
>;

export const Button: FC<PropsWithChildren<ButtonProps & WithClassName>> = ({
  className,
  asLink,
  children,
  href,
  onClick,
  tabIndex,
  type,
  variant,
}) => (
  <BaseButton
    className={className}
    tabIndex={tabIndex}
    $variant={variant}
    {
      ...asLink === true
        ? {
          // eslint-disable-next-line arthurka/space-after-keywords
          as: 'a',
          href,
        }
        : {
          onClick,
          type,
        }
    }
  >
    {children}
  </BaseButton>
);
