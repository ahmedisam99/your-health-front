import { patientInstance } from 'api/axios';

export const patientCancelOrder = (orderId) => {
  return patientInstance
    .get(`/orders/${orderId}/cancel`)
    .then((data) => data?.data);
};
