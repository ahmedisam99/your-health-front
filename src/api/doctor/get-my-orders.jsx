import { doctorInstance } from 'api/axios';

export const doctorGetMyOrders = () => {
  return doctorInstance.get('/orders').then((data) => data?.data);
};
