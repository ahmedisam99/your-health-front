import { doctorInstance } from 'api/axios';

export const doctorCancelOrder = (orderId) => {
  return doctorInstance
    .get(`/orders/${orderId}/cancel`)
    .then((data) => data?.data);
};
