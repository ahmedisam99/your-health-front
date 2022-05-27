import axios from 'axios';

const doctorAccessToken = 'Bearer ' + localStorage.getItem('doctorAccessToken');
const patientAccessToken =
  'Bearer ' + localStorage.getItem('patientAccessToken');

export const doctorInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1/doctor`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: doctorAccessToken,
  },
});

export const patientInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1/patient`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: patientAccessToken,
  },
});
