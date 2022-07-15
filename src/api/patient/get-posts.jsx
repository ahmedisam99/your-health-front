import { patientInstance } from 'api/axios';

export const patientGetPosts = (page) => {
  return patientInstance
    .get('/posts', { params: { page } })
    .then((data) => data?.data);
};
