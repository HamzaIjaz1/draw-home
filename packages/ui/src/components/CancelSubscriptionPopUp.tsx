import { WithClassName } from '@draw-house/common/dist/utils';
import { styled } from '@mui/material';
import Dialog, { dialogClasses } from '@mui/material/Dialog';
import { getCssVar, setCssVar } from '../utils/styles';

const marginCssVar = '--paywall-popup-margin';

const Modal = styled(Dialog)`
  .${dialogClasses.container} {
    backdrop-filter: blur(10px);
  }

  .${dialogClasses.paper} {
    border-radius: 20px;
    box-shadow: 0px 0px 16px 0px #0000004d;
    max-height: 95%;
    max-width: calc(100% - calc(2 * ${getCssVar(marginCssVar)}));
    margin: ${getCssVar(marginCssVar)};
  }

  @media (min-width: 600px) {
    ${setCssVar(marginCssVar, '32px')}
  }

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
`;

export type CancelSubscriptionPopUpProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const CancelSubscriptionPopUp = ({
  className,
  open,
  onClose,
  children,
}: CancelSubscriptionPopUpProps & WithClassName) => (
  <Modal
    className={className}
    open={open}
    onClose={onClose}
    maxWidth={false}
  >
    {children}
  </Modal>
);
