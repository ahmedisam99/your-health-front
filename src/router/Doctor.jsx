import { useQuery } from 'react-query';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { doctorGetMe } from 'api/doctor';
import DashboardLoading from 'components/DashboardLoading';
import DoctorHomeView from 'views/Doctor/Home';
import DoctorLogoutView from 'views/Doctor/Logout';

export default function DoctorRouter() {
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery('doctor-me', doctorGetMe);
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
        <Route exact path='/logout' component={DoctorLogoutView} />

        <Route path='*' render={() => <Redirect to='/' />} />
      </Switch>
    </BrowserRouter>
  );
}
