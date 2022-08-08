import { adminInstance } from 'api/axios';

export const adminDeletePatient = (patientId) => {
  return adminInstance
    .delete('/patients', { params: { patientId } })
    .then((data) => data?.data);
};
