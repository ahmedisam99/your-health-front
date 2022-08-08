import { useQueryClient } from 'react-query';

import { adminInstance } from 'api/axios';
import DashboardLoading from 'components/DashboardLoading';

export default function AdminLogoutView() {
  const queryClient = useQueryClient();

  localStorage.removeItem('adminAccessToken');
  adminInstance.defaults.headers['Authorization'] = '';

  queryClient.refetchQueries('admin-me');

  return <DashboardLoading />;
}
