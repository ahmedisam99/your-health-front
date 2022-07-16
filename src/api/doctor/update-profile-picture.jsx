import { doctorInstance } from 'api/axios';

export const doctorUpdateProfilePicture = (image) => {
  return doctorInstance
    .put('/profile-picture', { image: image })
    .then((data) => data?.data);
};
