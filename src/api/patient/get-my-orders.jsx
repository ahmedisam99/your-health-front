import { patientInstance } from 'api/axios';

export const patientGetMyOrders = () => {
  return patientInstance.get('/orders').then((data) => data?.data);
};
