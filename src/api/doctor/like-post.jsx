import { doctorInstance } from 'api/axios';

export const doctorLikePost = (postId) => {
  return doctorInstance
    .get('/likes', { params: { postId } })
    .then((data) => data?.data);
};
