import { doctorInstance } from 'api/axios';

export const doctorCreateComplaint = (content) => {
  return doctorInstance
    .post('/complaints', { content })
    .then((data) => data?.data);
};
