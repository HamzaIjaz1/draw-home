import { apiUrls } from '../apiUrls';
import { fetchHelper } from './fetchHelper';
import { CancelSubscriptionResponse } from '../../zod/CancelSubscription';

export const stripeCancelSubscription = async (): Promise<CancelSubscriptionResponse> => {
  const res = await fetchHelper.post(apiUrls.stripe.cancelSubscription, {});

  const { success, data, error } = CancelSubscriptionResponse.safeParse(res);
  if(success === false) {
    console.error('|shu1oh|', error.issues);
    throw error;
  }

  return data;
};
