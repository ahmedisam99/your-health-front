import { doctorInstance } from 'api/axios';

export const doctorCreatePost = (content) => {
  return doctorInstance.post('/posts', { content }).then((data) => data?.data);
};
