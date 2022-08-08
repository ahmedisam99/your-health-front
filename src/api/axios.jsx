import axios from 'axios';

const adminAccessToken = 'Bearer ' + localStorage.getItem('adminAccessToken');
const doctorAccessToken = 'Bearer ' + localStorage.getItem('doctorAccessToken');
const patientAccessToken =
  'Bearer ' + localStorage.getItem('patientAccessToken');

export const adminInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api/v1/admin`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: adminAccessToken,
  },
});

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
