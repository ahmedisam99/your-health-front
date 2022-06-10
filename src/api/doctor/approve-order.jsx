import { doctorInstance } from 'api/axios';

export const doctorApproveOrder = (orderId) => {
  return doctorInstance
    .get(`/orders/${orderId}/approve`)
    .then((data) => data?.data);
};
