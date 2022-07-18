import { doctorInstance } from 'api/axios';

export const doctorEndPatient = (patId) => {
  return doctorInstance
    .get(`/patients/${patId}/remove`)
    .then((data) => data?.data);
};
