import { patientInstance } from 'api/axios';

export const patientCreateOrder = (data) => {
  return patientInstance.post('/orders', data).then((data) => data?.data);
};
