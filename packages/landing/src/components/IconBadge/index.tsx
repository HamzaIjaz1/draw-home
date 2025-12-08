import { Union } from '@arthurka/ts-utils';
import { WithClassName } from '@draw-house/common/dist/utils';
import { FC } from 'react';
import styled, { css } from 'styled-components';

type ContainerProps = {
  $variant: IconBadgeProps['variant'];
  $theme: IconBadgeProps['theme'];
};

const Container = styled.div<ContainerProps>(({ $variant, $theme = 'dark' }) => css`
  width: 46px;
  height: 46px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #222733;

  ${$variant === 'outlined' && $theme === 'dark' && css`
    border: 0.82px solid #0003;
  `}

  ${$variant === 'outlined' && $theme === 'light' && css`
    border: 0.82px solid #7a7e83;
    color: #fff;
  `}

  ${$variant === 'contained' && css`
    background-color: #2227330d;
  `}
`);

export type IconBadgeProps = Union<
  & (
    | {
      variant: 'outlined';
      theme?: 'light' | 'dark';
    }
    | {
      variant: 'contained';
    }
  )
  & {
    children: JSX.Element;
  }
>;

export const IconBadge: FC<IconBadgeProps & WithClassName> = ({
  className,
  variant,
  theme,
  children,
}) => (
  <Container
    className={className}
    $variant={variant}
    $theme={theme}
  >
    {children}
  </Container>
);
