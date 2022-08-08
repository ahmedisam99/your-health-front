import { useQuery } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { adminGetMe } from 'api/admin';
import DashboardLoading from 'components/DashboardLoading';
import AdminLoginView from 'views/admin/Login';
import AdminDoctorsView from 'views/admin/doctors';
import AdminLogoutView from 'views/admin/Logout';
import AdminPatientsView from 'views/admin/patients';

export default function AdminRouter() {
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery('admin-me', adminGetMe, {
    cacheTime: 0,
    staleTime: 0,
  });
  const isAuthenticated = isSuccess && !!user && user.role === 'admin';

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!isAuthenticated) {
    return (
      <BrowserRouter basename='/admin'>
        <Switch>
          <Route exact path='/login' component={AdminLoginView} />

          <Route path='*' render={() => <Redirect to='/login' />} />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter basename='/admin'>
      <Switch>
        <Route exact path='/doctors' component={AdminDoctorsView} />
        <Route exact path='/patients' component={AdminPatientsView} />
        <Route exact path='/logout' component={AdminLogoutView} />

        <Route path='*' render={() => <Redirect to='/doctors' />} />
      </Switch>
    </BrowserRouter>
  );
}
