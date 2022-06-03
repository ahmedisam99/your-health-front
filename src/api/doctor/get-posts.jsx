import { doctorInstance } from 'api/axios';

export const doctorGetPosts = (page) => {
  return doctorInstance
    .get('/posts', { params: { page } })
    .then((data) => data?.data);
};
