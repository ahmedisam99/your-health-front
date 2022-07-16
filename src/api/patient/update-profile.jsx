import { patientInstance } from 'api/axios';

export const patientUpdateProfile = (data) => {
  return patientInstance.put('/profile', data).then((data) => data?.data);
};
