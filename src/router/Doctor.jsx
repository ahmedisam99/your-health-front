import { useQuery } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { doctorGetMe } from 'api/doctor';
import DashboardLoading from 'components/DashboardLoading';
import DoctorHomeView from 'views/Doctor/Home';
import DoctorLogoutView from 'views/Doctor/Logout';
import DoctorOrdersView from 'views/Doctor/Orders';
import DoctorPatientsView from 'views/Doctor/Patients';
import DoctorReportsView from 'views/Doctor/Reports';
import DoctorProfileView from 'views/Doctor/Profile';

export default function DoctorRouter() {
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery('doctor-me', doctorGetMe, {
    cacheTime: 0,
    staleTime: 0,
  });
  const isAuthenticated = isSuccess && !!user && user.role === 'doctor';

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!isAuthenticated) {
    return <Redirect to='/login?as=doctor' />;
  }

  return (
    <BrowserRouter basename='/doctor'>
      <Switch>
        <Route exact path='/' component={DoctorHomeView} />
        <Route exact path='/patients' component={DoctorPatientsView} />
        <Route exact path='/orders' component={DoctorOrdersView} />
        <Route exact path='/reports' component={DoctorReportsView} />
        <Route exact path='/profile' component={DoctorProfileView} />
        <Route exact path='/logout' component={DoctorLogoutView} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}
