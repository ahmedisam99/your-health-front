import { doctorInstance } from 'api/axios';

export const doctorCreateComment = (content, postId) => {
  return doctorInstance
    .post('/comments', { content, postId })
    .then((data) => data?.data);
};
