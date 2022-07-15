import { doctorInstance } from 'api/axios';

export const doctorGetMyPosts = (page) => {
  return doctorInstance
    .get('/my-posts', { params: { page } })
    .then((data) => data?.data);
};
