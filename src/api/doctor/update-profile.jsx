import { doctorInstance } from 'api/axios';

export const doctorUpdateProfile = (data) => {
  return doctorInstance.put('/profile', data).then((data) => data?.data);
};
