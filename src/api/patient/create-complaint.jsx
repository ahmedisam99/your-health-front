import { patientInstance } from 'api/axios';

export const patientCreateComplaint = (content) => {
  return patientInstance
    .post('/complaints', { content })
    .then((data) => data?.data);
};
