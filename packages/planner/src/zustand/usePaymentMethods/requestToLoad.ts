import assert from 'assert';
import { usePaymentMethods } from './store';
import { isResolved } from '../../utils/isResolved';
import { getPaymentMethods } from '../../services/fetch/getPaymentMethods';

export const usePaymentMethodsResolved = () => {
  const { paymentMethods } = usePaymentMethods();
  assert(isResolved(paymentMethods) && paymentMethods !== 'skip', 'Something went wrong. |tsu8mh|');

  return { paymentMethods };
};
usePaymentMethodsResolved.getState = () => {
  const { paymentMethods } = usePaymentMethods.getState();
  assert(isResolved(paymentMethods) && paymentMethods !== 'skip', 'Something went wrong. |k6c8es|');

  return { paymentMethods };
};

export const requestToLoadPaymentMethods = async (forceRefresh = false) => {
  const { paymentMethods } = usePaymentMethods.getState();

  if(forceRefresh === false) {
    if(paymentMethods !== 'idle') {
      return;
    }

    usePaymentMethods.setState({ paymentMethods: 'loading' });
  }

  usePaymentMethods.setState({
    paymentMethods: await getPaymentMethods(),
  });
};
