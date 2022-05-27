import { doctorInstance } from 'api/axios';

export const doctorLogin = (data) => {
  return doctorInstance.post('/login', data).then((data) => data?.data);
};
