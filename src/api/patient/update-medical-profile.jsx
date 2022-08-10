import { patientInstance } from 'api/axios';

export const patientUpdateMedicalProfile = (data) => {
  return patientInstance
    .put('/medical-profile', data)
    .then((data) => data?.data);
};
