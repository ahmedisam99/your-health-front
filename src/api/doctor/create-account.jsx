import { doctorInstance } from 'api/axios';

export const doctorCreateAccount = (data) => {
  return doctorInstance.post('/register', data).then((data) => data?.data);
};
