import { doctorInstance } from 'api/axios';

export const doctorGetPatientMedicalProfile = (patientId) => {
  return doctorInstance
    .get('/pat-medical-profile', { params: { patientId } })
    .then((data) => data?.data);
};
