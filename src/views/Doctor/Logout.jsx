import { useQueryClient } from 'react-query';

import { doctorInstance } from 'api/axios';
import DashboardLoading from 'components/DashboardLoading';

export default function DoctorLogoutView() {
  const queryClient = useQueryClient();

  localStorage.removeItem('doctorAccessToken');
  doctorInstance.defaults.headers['Authorization'] = '';

  queryClient.invalidateQueries('doctor-me');

  return <DashboardLoading />;
}
