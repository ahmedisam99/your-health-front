import { useQueryClient } from 'react-query';

import { patientInstance } from 'api/axios';
import DashboardLoading from 'components/DashboardLoading';

export default function PatientLogoutView() {
  const queryClient = useQueryClient();

  localStorage.removeItem('patientAccessToken');
  patientInstance.defaults.headers['Authorization'] = '';

  queryClient.invalidateQueries('pat-me');

  return <DashboardLoading />;
}
