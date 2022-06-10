import { patientInstance } from 'api/axios';

export const patientLikePost = (postId) => {
  return patientInstance
    .get('/likes', { params: { postId } })
    .then((data) => data?.data);
};
