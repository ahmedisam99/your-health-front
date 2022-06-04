import { patientInstance } from 'api/axios';

export const patientCreateComment = (content, postId) => {
  return patientInstance
    .post('/comments', { content, postId })
    .then((data) => data?.data);
};
