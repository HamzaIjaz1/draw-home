import { WithClassName } from '@draw-house/common/dist/utils';
import { css, styled } from '@mui/material';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import { getCssVar, setCssVar } from '../utils/styles';
import { $Props, $props } from '../utils/$props';

const marginCssVar = '--paywall-popup-margin';

const Modal = styled(Dialog, $props())<$Props<{
  $variant: PaywallPopUpProps['variant'];
}>>(({ $variant }) => css`
  ${setCssVar(marginCssVar, $variant === 'checkout' ? '0' : '16px')}

  .${dialogClasses.container} {
    backdrop-filter: blur(10px);
  }

  .${dialogClasses.paper} {
    border-radius: 20px;
    box-shadow: 0px 0px 16px 0px #0000004d;
    max-height: ${$variant === 'checkout' ? '100%' : '95%'};
    max-width: calc(100% - calc(2 * ${getCssVar(marginCssVar)}));
    margin: ${getCssVar(marginCssVar)};
  }

  ${$variant !== 'checkout' && css`
    @media (min-width: 600px) {
      ${setCssVar(marginCssVar, '32px')}
    }
  `}

  @media (min-width: 900px) {
    ${setCssVar(marginCssVar, '32px')}
    .${dialogClasses.paper} {
      max-height: 95%;
    }
  }

  @media (min-width: 1100px) {
    .${dialogClasses.paper} {
      border-radius: 30px;
    }
  }
`);

const Backdrop: React.FCWithChildren = ({ children }) => <div>{children}</div>;

export type PaywallPopUpProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: 'checkout';
};

export const PaywallPopUp = ({
  className,
  open,
  onClose,
  children,
  variant,
}: PaywallPopUpProps & WithClassName) => (
  <Modal
    className={className}
    open={open}
    onClose={onClose}
    slots={{ backdrop: Backdrop }}
    maxWidth={false}
    $variant={variant}
  >
    {children}
  </Modal>
);
