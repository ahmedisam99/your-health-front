import { patientInstance } from 'api/axios';

export const patientGetComplaints = () => {
  return patientInstance.get('/complaints').then((data) => data?.data);
};
