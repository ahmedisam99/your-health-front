import { adminInstance } from 'api/axios';

export const adminDeleteDoctor = (doctorId) => {
  return adminInstance
    .delete('/doctors', { params: { doctorId } })
    .then((data) => data?.data);
};
