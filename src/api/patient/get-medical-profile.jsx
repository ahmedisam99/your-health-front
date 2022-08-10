import { patientInstance } from 'api/axios';

export const patientGetMedicalProfile = () => {
  return patientInstance.get('/medical-profile').then((data) => data?.data);
};
