import { WithClassName } from '@draw-house/common/dist/utils';
import { H1, H2, H3, H4, H5, H6, P, P12px } from './styles';

type TypographyProps = {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'p12px';
  weight?: 'bold';
};
/** @deprecated only used in old sign-in page */
export const Typography: React.FCWithChildren<TypographyProps & WithClassName> = props => {
  const {
    type,
    children,
    className,
    weight,
  } = props;

  switch(type) {
    case 'h1':
      return (
        <H1 className={className} weight={weight}>{children}</H1>
      );
    case 'h2':
      return (
        <H2 className={className} weight={weight}>{children}</H2>
      );
    case 'h3':
      return (
        <H3 className={className} weight={weight}>{children}</H3>
      );
    case 'h4':
      return (
        <H4 className={className} weight={weight}>{children}</H4>
      );
    case 'h5':
      return (
        <H5 className={className} weight={weight}>{children}</H5>
      );
    case 'h6':
      return (
        <H6 className={className} weight={weight}>{children}</H6>
      );
    case 'p':
      return (
        <P className={className} weight={weight}>{children}</P>
      );
    case 'p12px':
      return (
        <P12px className={className} weight={weight}>{children}</P12px>
      );
    default:
      return (
        <span className={className}>{children}</span>
      );
  }
};
