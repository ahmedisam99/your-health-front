import { patientInstance } from 'api/axios';

export const patientUpdateProfilePicture = (image) => {
  return patientInstance
    .put('/profile-picture', { image: image })
    .then((data) => data?.data);
};
